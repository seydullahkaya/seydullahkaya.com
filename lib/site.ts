// Dilden bağımsız site ayarları. Çevrilen metinler messages/*.json içinde.

export const site = {
  name: "Seydullah Kaya",
  url: "https://seydullahkaya.com",
  // Profil fotoğrafı (512×512, public/images)
  photo: "/images/seydullah.jpg",
  email: "seydullahkaya@gmail.com",
  // wa.me formatı: ülke koduyla, "+" ve boşluk olmadan
  whatsappNumber: "905071621061",
  timeZone: "Europe/Istanbul",
  // Yerel SEO (JSON-LD) için konum
  city: "Kahramanmaraş",
  countryCode: "TR",
  // Sosyal hesaplar: boş olanlar sitede gösterilmez
  socials: {
    github: "https://github.com/seydullahkaya",
    linkedin: "https://www.linkedin.com/in/seydullah-kaya-1b155116b/",
    x: "https://x.com/seydullahkaya",
    youtube: "https://www.youtube.com/@seydullahkaya",
    // Google İşletme Profili (paylaşım linki)
    google: "https://share.google/B5wrHwmXtUvBZM9P0",
  },
  // Google bilgi grafiği kimliği: JSON-LD'de işletme profiliyle eşleşme için
  googleKgUrl: "https://www.google.com/search?kgmid=/g/11vjv4z39p",
} as const;

export const socialLinks = Object.entries(site.socials)
  .filter(([, href]) => href)
  .map(([key, href]) => ({ key: key as keyof typeof site.socials, href }));

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "#contact", key: "contact" },
] as const;

export const ctaHref = { services: "#services", contact: "#contact" } as const;

export const techMarquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Django",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "React Native",
  "Vercel",
  "Git",
];

export const skills = [
  {
    key: "frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  { key: "backend", items: ["Python", "Django", "Node.js", "REST API"] },
  { key: "data", items: ["PostgreSQL", "Supabase", "Vercel", "Git"] },
] as const;

export const learning = ["React Native", "Expo", "Motion"];

export const serviceKeys = [
  "website",
  "webapp",
  "mobile",
  "maintenance",
] as const;
