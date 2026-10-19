import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /api, /_next, /_vercel, nokta içeren yollar (dosyalar) ve OG görselleri atlanır.
  // OG görselleri /tr/... adresinde yönlendirmesiz açılmalı; bazı botlar 307 izlemiyor.
  matcher: "/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)",
};
