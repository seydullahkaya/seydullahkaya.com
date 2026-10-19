"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Form; zod, Turnstile ve toast kütüphanesini getirir. Sayfa açılışını
// yavaşlatmasın diye form ekrana yaklaşınca yüklenir.
const ContactForm = lazy(() =>
  import("@/components/contact/contact-form").then((m) => ({
    default: m.ContactForm,
  })),
);
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

function FormPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[640px] rounded-xl border border-border bg-card sm:min-h-[560px]"
    />
  );
}

export function ContactFormLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Bağlantıyla doğrudan #contact'a gelinirse hemen yüklenir
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {load ? (
        <Suspense fallback={<FormPlaceholder />}>
          <ContactForm />
          <Toaster position="bottom-center" />
        </Suspense>
      ) : (
        <FormPlaceholder />
      )}
    </div>
  );
}
