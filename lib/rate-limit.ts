import "server-only";

// Basit, bellek içi kayan pencere hız sınırı.
// Not: Vercel'de her sunucu örneğinin kendi belleği var, yani sınır örnek başına
// geçerli. Asıl bot koruması Turnstile; bu katman tek kaynaktan gelen seriyi keser.
// Trafik artarsa Upstash/Vercel KV gibi paylaşılan bir depoya taşınmalı.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false as const };
  }

  recent.push(now);
  hits.set(key, recent);

  // Bellek sınırsız büyümesin
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
    if (hits.size > MAX_KEYS) hits.clear();
  }

  return { ok: true as const };
}
