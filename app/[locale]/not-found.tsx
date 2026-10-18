import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { pillVariants } from "@/components/pill-link";
import { SiteHeader } from "@/components/site-header";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <>
      <SiteHeader />
      <main className="container-page flex flex-1 flex-col items-center justify-center py-40 text-center">
        <p className="eyebrow text-primary">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-[18ch] text-h2 text-balance">{t("title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("description")}</p>
        <Link
          href="/"
          className={pillVariants({ size: "lg", className: "group/pill mt-9" })}
        >
          {t("cta")}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/pill:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </main>
    </>
  );
}
