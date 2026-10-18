import type messages from "./messages/tr.json";
import type { routing } from "./i18n/routing";

// next-intl: mesaj anahtarları ve diller için tip güvenliği
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
