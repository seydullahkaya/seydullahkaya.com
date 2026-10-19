import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site, socialLinks } from "@/lib/site";

/**
 * Google'ın siteyi ve yerel işletmeyi anlaması için schema.org verisi (JSON-LD).
 * Kahramanmaraş konumu ve hizmet bölgesi yerel aramalarda sinyal olarak kullanılır.
 */
export async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tServices = await getTranslations({ locale, namespace: "Services" });

  const address = {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.city,
    addressCountry: site.countryCode,
  };
  const sameAs = [...socialLinks.map((s) => s.href), site.googleKgUrl];
  const homeUrl = locale === "tr" ? site.url : `${site.url}/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle:
          locale === "tr"
            ? "Bilgisayar Mühendisi, Yazılım Geliştirici"
            : "Computer Engineer, Software Developer",
        address,
        sameAs,
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "Django",
          "React Native",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: `${site.name} — ${locale === "tr" ? "Yazılım Geliştirme" : "Software Development"}`,
        description: t("description"),
        url: homeUrl,
        email: site.email,
        telephone: `+${site.whatsappNumber}`,
        image: `${site.url}/${locale}/opengraph-image`,
        address,
        areaServed: [
          { "@type": "City", name: site.city },
          { "@type": "Country", name: "Türkiye" },
        ],
        hasMap: site.socials.google,
        founder: { "@id": `${site.url}/#person` },
        knowsLanguage: ["tr", "en"],
        serviceType: (
          ["website", "webapp", "mobile", "maintenance"] as const
        ).map((key) => tServices(`items.${key}.title`)),
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["tr-TR", "en"],
        publisher: { "@id": `${site.url}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON içindeki "<" kaçırılır; script etiketinden çıkış olmasın
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
