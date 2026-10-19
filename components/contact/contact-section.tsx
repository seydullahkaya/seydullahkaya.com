import { Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { GoogleIcon, WhatsappIcon } from "@/components/brand-icons";
import { ContactFormLazy } from "@/components/contact/contact-form-lazy";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { site, whatsappUrl } from "@/lib/site";

export function ContactSection() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  return (
    <section id="contact" className="border-t border-border/60 section-y">
      {/* Mobilde sıra: başlık → form → kartlar. Masaüstünde form sağda, iki satır boyunca. */}
      <Reveal className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </div>

        <RevealItem className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ContactFormLazy />
        </RevealItem>

        <ul className="grid grid-cols-1 content-start gap-3 lg:col-start-1 lg:row-start-2">
          <InfoCard
            href={`mailto:${site.email}`}
            icon={<Mail className="size-4" />}
            label={t("emailLabel")}
            value={site.email}
          />
          <InfoCard
            href={whatsappUrl(tCommon("whatsappMessage"))}
            external
            icon={<WhatsappIcon className="size-4 text-whatsapp" />}
            label={t("whatsappLabel")}
            value={t("whatsappValue")}
          />
          <InfoCard
            href={site.socials.google}
            external
            icon={<GoogleIcon className="size-4" />}
            label={t("googleLabel")}
            value={t("googleValue")}
          />
          <InfoCard
            icon={<MapPin className="size-4" />}
            label={t("locationLabel")}
            value={t("locationValue")}
          />
        </ul>
      </Reveal>
    </section>
  );
}

function InfoCard({
  href,
  external,
  icon,
  label,
  value,
}: {
  href?: string;
  external?: boolean;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-background text-primary"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block eyebrow text-muted-foreground">{label}</span>
        <span className="mt-1 block truncate font-medium">{value}</span>
      </span>
    </>
  );
  const className =
    "flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors";

  return (
    <RevealItem as="li">
      {href ? (
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className={`${className} outline-none hover:border-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/40`}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </RevealItem>
  );
}
