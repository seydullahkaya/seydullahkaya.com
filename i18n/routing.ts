import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // TR: /, EN: /en
  localePrefix: "as-needed",
  // Tarayıcı diline göre otomatik yönlendirme yok; / her zaman Türkçe açılır
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
