// Dilden bağımsız site ayarları. Çevrilen metinler messages/*.json içinde.

export const site = {
  name: "Seydullah Kaya",
  email: "seydullahkaya@gmail.com",
  // TODO: WhatsApp numarası (ülke koduyla, boşluksuz: 905xxxxxxxxx)
  whatsappNumber: "",
  github: "https://github.com/seydullahkaya",
  // TODO: LinkedIn profil linki
  linkedin: "",
  timeZone: "Europe/Istanbul",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
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
