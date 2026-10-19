import { useLocale, useTranslations } from "next-intl";
import {
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/brand-icons";
import { CurrentYear } from "@/components/current-year";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Reveal, RevealItem } from "@/components/motion";
import { PillLink } from "@/components/pill-link";
import { getPathname } from "@/i18n/navigation";
import { ctaHref, site, socialLinks, whatsappUrl } from "@/lib/site";

const socialMeta = {
  github: { label: "GitHub", Icon: GithubIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedinIcon },
  x: { label: "X", Icon: XIcon },
  youtube: { label: "YouTube", Icon: YoutubeIcon },
  google: { label: "Google", Icon: GoogleIcon },
} as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tCommon = useTranslations("Common");
  const tHero = useTranslations("Hero");
  // Form ana sayfadaki #contact bölümünde; blog sayfalarından da oraya gider
  const contactHref = `${getPathname({ href: "/", locale: useLocale() })}${ctaHref.contact}`;
  const socials = socialLinks.map(({ key, href }) => ({
    href,
    ...socialMeta[key],
  }));

  return (
    <footer className="border-t border-border bg-card">
      <Reveal className="container-page flex flex-col items-center section-y text-center">
        <RevealItem>
          <h2 className="max-w-[14ch] text-display text-balance">
            {t("title")}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-6 max-w-[48ch] text-pretty text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </RevealItem>
        <RevealItem className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <PillLink
            href={contactHref}
            size="lg"
            arrow
            className="w-full sm:w-auto"
          >
            {tHero("secondaryCta")}
          </PillLink>
          <PillLink
            href={whatsappUrl(tCommon("whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <WhatsappIcon className="size-4 text-whatsapp" />
            {tCommon("whatsappCta")}
          </PillLink>
        </RevealItem>
        <RevealItem>
          <p className="mt-6 text-sm text-muted-foreground">
            {t("emailPrefix")}{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {site.email}
            </a>
          </p>
        </RevealItem>
      </Reveal>

      <div className="border-t border-border">
        <div className="container-page flex flex-col-reverse items-center justify-between gap-4 pt-6 pb-24 text-sm text-muted-foreground sm:flex-row sm:pb-6">
          <p>
            © <CurrentYear /> {site.name}. {t("copyright")}
          </p>
          <div className="flex items-center gap-1 sm:mr-20">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <LanguageSwitcher className="ml-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}
