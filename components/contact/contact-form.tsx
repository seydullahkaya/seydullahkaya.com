"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  type FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { sendContact } from "@/app/actions/contact";
import { pillVariants } from "@/components/pill-link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  type ContactErrorKey,
  type ContactField,
  contactSchema,
  type ContactState,
  contactTopics,
  type ContactTopic,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

// Turnstile site anahtarı herkese açıktır (sayfa kaynağında görünür), bu yüzden kodda
// durabilir. Gizli anahtar (TURNSTILE_SECRET_KEY) sadece sunucuda, ortam değişkeninde.
// Geliştirmede Cloudflare'in her zaman geçen test anahtarı kullanılır.
const TURNSTILE_SITE_KEY = "0x4AAAAAAFbCDZQ7YO4aLtF1";
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "production"
    ? TURNSTILE_SITE_KEY
    : TURNSTILE_TEST_SITE_KEY);

type Values = {
  name: string;
  email: string;
  topic: ContactTopic | "";
  message: string;
};
const emptyValues: Values = { name: "", email: "", topic: "", message: "" };
type FieldErrors = Partial<Record<ContactField, ContactErrorKey>>;

const fieldClass =
  "h-11 rounded-md border-border bg-background px-3.5 text-[0.95rem] shadow-[0_1px_2px_rgb(0_0_0/0.03)] focus-visible:border-primary focus-visible:ring-primary/25 md:text-[0.95rem]";

export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const id = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const startedAtRef = useRef(0);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Sunucu yanıtı action içinde işlenir: toast, form temizliği ve
  // Turnstile token'ı tek kullanımlık olduğu için widget'ı yenileme
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    async (prev, formData) => {
      // Geçen süre istemcide hesaplanır; cihaz saati yanlış olsa bile tutarlı
      formData.set("elapsedMs", String(Date.now() - startedAtRef.current));
      const result = await sendContact(prev, formData);
      turnstileRef.current?.reset();
      if (result.status === "success") {
        toast.success(t("toast.successTitle"), {
          description: t("toast.successBody"),
        });
        setValues(emptyValues);
        setClientErrors(null);
        startedAtRef.current = Date.now();
      } else if (result.status === "error") {
        toast.error(t(`toast.${result.error}`));
      }
      return result;
    },
    { status: "idle" },
  );

  // Süre kontrolü için formun açıldığı an (hydration farkı olmasın diye efektte)
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const serverErrors = state.status === "error" ? state.fieldErrors : undefined;
  const errors: FieldErrors = clientErrors ?? serverErrors ?? {};

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Kullanıcı düzelttikçe o alanın hatası kaybolsun
    setClientErrors((e) => (e ? { ...e, [key]: undefined } : e));
  }

  // Gönderimi elle başlatıyoruz: form action prop'u işlem sonunda formu otomatik
  // sıfırlar ve kontrollü radio'lar DOM ile senkron dışı kalır
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (parsed.success) {
      setClientErrors(null);
      const formData = new FormData(e.currentTarget);
      startTransition(() => formAction(formData));
      return;
    }
    const next: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      next[field] ??= issue.message as ContactErrorKey;
    }
    setClientErrors(next);
    const first = Object.keys(next)[0];
    document.getElementById(`${id}-${first}`)?.focus();
  }

  const errorId = (field: ContactField) => `${id}-${field}-error`;
  const fieldProps = (field: ContactField) => ({
    id: `${id}-${field}`,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.03)] md:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: ekran dışında, botlar doldurur */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          {t("form.honeypot")}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("form.name")}
          htmlFor={`${id}-name`}
          error={errors.name && t(`errors.${errors.name}`)}
          errorId={errorId("name")}
        >
          <Input
            {...fieldProps("name")}
            name="name"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field
          label={t("form.email")}
          htmlFor={`${id}-email`}
          error={errors.email && t(`errors.${errors.email}`)}
          errorId={errorId("email")}
        >
          <Input
            {...fieldProps("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t("form.emailPlaceholder")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>

      <fieldset
        aria-invalid={errors.topic ? true : undefined}
        aria-describedby={errors.topic ? errorId("topic") : undefined}
      >
        <legend className="text-sm font-medium">{t("form.topic")}</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {contactTopics.map((topic, i) => (
            <label
              key={topic}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors select-none has-focus-visible:ring-3 has-focus-visible:ring-primary/25",
                values.topic === topic
                  ? "border-primary bg-accent-soft font-medium text-accent-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="topic"
                value={topic}
                id={i === 0 ? `${id}-topic` : undefined}
                checked={values.topic === topic}
                onChange={() => update("topic", topic)}
                className="sr-only"
              />
              {t(`topics.${topic}`)}
            </label>
          ))}
        </div>
        {errors.topic && (
          <ErrorText id={errorId("topic")}>
            {t(`errors.${errors.topic}`)}
          </ErrorText>
        )}
      </fieldset>

      <Field
        label={t("form.message")}
        htmlFor={`${id}-message`}
        error={errors.message && t(`errors.${errors.message}`)}
        errorId={errorId("message")}
      >
        <Textarea
          {...fieldProps("message")}
          name="message"
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(fieldClass, "h-auto min-h-36 py-3")}
        />
      </Field>

      {turnstileSiteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          options={{ language: locale, theme: "light", size: "flexible" }}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{t("form.privacy")}</p>
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={pillVariants({
            size: "lg",
            className:
              "group/pill disabled:cursor-progress disabled:opacity-80",
          })}
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {t("form.sending")}
            </>
          ) : (
            <>
              {t("form.submit")}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/pill:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {children}
    </p>
  );
}
