"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const format = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

/** Türkiye yerel saati. Hydration farkı olmasın diye sadece tarayıcıda hesaplanır. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return <time suppressHydrationWarning>{time ?? "--:--"}</time>;
}
