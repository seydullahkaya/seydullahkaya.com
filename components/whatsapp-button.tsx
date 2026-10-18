"use client";

import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/brand-icons";
import { cn } from "@/lib/utils";
import { footer, whatsappUrl } from "@/lib/site";

/** Sağ altta sabit WhatsApp butonu. Açılıştan birkaç saniye sonra bir kez zıplar. */
export function WhatsappButton() {
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setNudge(true), 4000);
    return () => clearTimeout(id);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={footer.whatsappCta}
      className={cn(
        "group/wa fixed right-4 bottom-4 z-30 flex h-14 items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-6px_rgb(37_211_102/0.55)] transition-[box-shadow,transform] duration-200 outline-none hover:shadow-[0_10px_28px_-6px_rgb(37_211_102/0.7)] focus-visible:ring-3 focus-visible:ring-ring/40 active:scale-95 sm:right-6 sm:bottom-6",
        nudge && "animate-nudge",
      )}
    >
      {/* Hover'da sola doğru açılan etiket */}
      <span className="grid max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width,padding] duration-300 ease-out group-hover/wa:max-w-40 group-hover/wa:pl-5 group-focus-visible/wa:max-w-40 group-focus-visible/wa:pl-5">
        {footer.whatsappCta}
      </span>
      <span className="grid size-14 place-items-center">
        <WhatsappIcon className="size-7" />
      </span>
    </a>
  );
}
