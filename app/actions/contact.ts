"use server";

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  type ContactErrorKey,
  type ContactField,
  contactSchema,
  type ContactState,
} from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

// Cloudflare'in herkese açık test anahtarı (her zaman geçer). Sadece geliştirmede.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const MIN_FILL_MS = 3_000;

function turnstileSecret() {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) return secret;
  return process.env.NODE_ENV === "production" ? null : TURNSTILE_TEST_SECRET;
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = turnstileSecret();
  if (!secret || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(5_000) },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile doğrulaması başarısız", err);
    return false;
  }
}

async function clientIp() {
  const h = await headers();
  return (
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const at = Date.now();
  const fail = (
    error: Extract<ContactState, { status: "error" }>["error"],
    fieldErrors?: Partial<Record<ContactField, ContactErrorKey>>,
  ): ContactState => ({ status: "error", at, error, fieldErrors });
  const spam = (reason: string) => {
    console.warn(`[contact] reddedildi: ${reason}`);
    return fail("spam");
  };

  // 1) Honeypot: gerçek kullanıcı bu gizli alanı görmez
  if (String(formData.get("website") ?? "") !== "") return spam("honeypot");

  // 2) Süre kontrolü: form birkaç saniyeden hızlı doldurulamaz
  const elapsedMs = Number(formData.get("elapsedMs"));
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return spam("too-fast");
  }

  // 3) IP bazlı hız sınırı
  const ip = await clientIp();
  if (!rateLimit(ip ?? "unknown").ok) return fail("rateLimited");

  // 4) Alan doğrulaması (istemciyle aynı şema)
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, ContactErrorKey>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message as ContactErrorKey;
    }
    return fail("validation", fieldErrors);
  }

  // 5) Bot doğrulaması (Turnstile)
  const token = String(formData.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, ip))) return spam("turnstile");

  // 6) Gönderim
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[contact] RESEND_API_KEY yok, e-posta gönderilmedi:",
        parsed.data,
      );
      return { status: "success", at };
    }
    console.error("[contact] RESEND_API_KEY tanımlı değil");
    return fail("server");
  }

  const localeValue = String(formData.get("locale") ?? "");
  const locale = hasLocale(routing.locales, localeValue)
    ? localeValue
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const { name, email, topic, message } = parsed.data;
  const topicLabel = t(`topics.${topic}`);

  const { error } = await new Resend(apiKey).emails.send({
    // seydullahkaya.com Resend'de doğrulandı (DKIM/SPF/DMARC GoDaddy DNS'te)
    from:
      process.env.CONTACT_FROM_EMAIL ??
      "Seydullah Kaya <iletisim@seydullahkaya.com>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: email,
    subject: `[seydullahkaya.com] ${topicLabel} — ${name}`,
    text: [
      `Ad: ${name}`,
      `E-posta: ${email}`,
      `Konu: ${topicLabel}`,
      `Dil: ${locale}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend hatası", error.name, error.message);
    return fail("server");
  }

  return { status: "success", at };
}
