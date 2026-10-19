"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { pillVariants } from "@/components/pill-link";

/**
 * Tam ekran mobil menü. Tarayıcının yerleşik <dialog> öğesi kullanılır:
 * odak yakalama, Esc ile kapanma ve arka planın etkisizleşmesi hazır gelir,
 * ek bir UI kütüphanesi yüklenmez.
 */
export function MobileMenu({
  links,
  cta,
}: {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
}) {
  const t = useTranslations("Nav");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={t("openMenu")}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="grid size-10 place-items-center rounded-full border border-border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t("menu")}
        // Arka plana (backdrop) tıklanınca kapanır
        onClick={(e) => e.target === e.currentTarget && close()}
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-black/10"
      >
        <div className="flex h-full flex-col px-4 pt-4 pb-8">
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={close}
            className="grid size-10 place-items-center self-end rounded-full outline-none hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <nav
            aria-label={t("mobileLabel")}
            className="mt-6 flex flex-1 flex-col"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <a
                    href={link.href}
                    onClick={close}
                    className="block py-5 text-3xl font-semibold tracking-tight outline-none focus-visible:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher className="mt-8 self-start" />
            <a
              href={cta.href}
              onClick={close}
              className={pillVariants({
                size: "lg",
                className: "mt-auto w-full",
              })}
            >
              {cta.label}
            </a>
          </nav>
        </div>
      </dialog>
    </>
  );
}
