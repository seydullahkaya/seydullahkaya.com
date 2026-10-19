import { type ComponentProps, createElement } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const navigation = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = navigation;

/**
 * Otomatik prefetch'i varsayılan olarak kapalı Link.
 * localePrefix "as-needed" ile Next 16'nın segment prefetch'i "/blog" gibi
 * öneksiz adresleri "/[locale]" (locale = "blog") sanıp 404 alıyor ve aynı
 * segmenti saniyede yüzlerce kez yeniden istiyordu. Tıklayınca gezinme yine
 * istemci tarafında yapılır; gerekirse prefetch={true} ile açılabilir.
 */
export function Link({
  prefetch = false,
  ...props
}: ComponentProps<typeof navigation.Link>) {
  return createElement(navigation.Link, { prefetch, ...props });
}
