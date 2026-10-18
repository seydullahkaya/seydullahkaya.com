# seydullahkaya.com

Kişisel web sitesi: freelance portfolyo + blog.

**Teknolojiler:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · pnpm

## Geliştirme

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # ESLint
pnpm format     # Prettier
pnpm build      # üretim derlemesi
```

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyala. Gizli anahtarlar sadece `.env.local` dosyasında ve Vercel ortam değişkenlerinde tutulur, repoya eklenmez.

Geliştirmede anahtarlar boş kalabilir:

- Turnstile, Cloudflare'in test anahtarlarıyla çalışır.
- `RESEND_API_KEY` yoksa form e-posta göndermez, mesajı konsola yazar.

Üretimde her iki servis de tanımlı olmalı, aksi hâlde form hata döner.

## İletişim formu

`app/actions/contact.ts` dosyasındaki Server Action şu adımları sırayla uygular:

1. Honeypot kontrolü
2. Doldurma süresi kontrolü
3. IP bazlı hız sınırı (10 dakikada 5 istek)
4. Zod doğrulaması (istemciyle ortak şema: `lib/contact.ts`)
5. Turnstile doğrulaması
6. Resend ile gönderim
