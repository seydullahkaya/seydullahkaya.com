// Site genelindeki metinler ve ayarlar.
// Aşama 3'te (next-intl) bu metinler messages/tr.json ve en.json dosyalarına taşınacak.

export const site = {
  name: "Seydullah Kaya",
  email: "seydullahkaya@gmail.com",
  // TODO: WhatsApp numarası (ülke koduyla, boşluksuz: 905xxxxxxxxx)
  whatsappNumber: "",
  whatsappMessage:
    "Merhaba Seydullah, web sitenden ulaşıyorum. Bir proje hakkında konuşmak istiyorum.",
  github: "https://github.com/seydullahkaya",
  // TODO: LinkedIn profil linki
  linkedin: "",
  timeZone: "Europe/Istanbul",
} as const;

export function whatsappUrl() {
  const text = encodeURIComponent(site.whatsappMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export const nav = [
  { href: "#about", label: "Hakkımda" },
  { href: "#services", label: "Hizmetler" },
  { href: "#contact", label: "İletişim" },
] as const;

export const hero = {
  badge: "Yeni projelere açığım",
  // Vurgulanan kelime gradient metinle gösterilir
  titleBefore: "İşinizi",
  titleHighlight: "büyüten",
  titleAfter: "web ve mobil ürünler geliştiriyorum.",
  description:
    "Ben Seydullah, bilgisayar mühendisi ve freelance yazılım geliştiriciyim. Kurumsal sitelerden web ve mobil uygulamalara kadar fikrinizi hızlı, güvenilir ve bakımı kolay ürünlere dönüştürüyorum.",
  primaryCta: { href: "#services", label: "Hizmetlerime göz at" },
  secondaryCta: { href: "#contact", label: "Teklif al" },
};

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

export const about = {
  eyebrow: "Hakkımda",
  title: "Sağlam mühendislik, sade ürünler.",
  greeting: "Merhaba, ben Seydullah.",
  // TODO: Kendi cümlelerinle güncelle (PROJE_1.md Bölüm 9)
  paragraphs: [
    "Bilgisayar mühendisiyim ve işletmeler için web ve mobil ürünler geliştiriyorum. Bir projeye başlamadan önce işinizi ve kullanıcılarınızı anlarım; mimariyi ve teknolojiyi bu ihtiyaca göre seçerim.",
    "Okunabilir, tip güvenli ve test edilebilir kod yazarım; performansı ve güvenliği en baştan hesaba katarım. Teslimattan sonra da yanınızda kalır, bakım ve yeni özelliklerle ürünün büyümeye devam etmesini sağlarım.",
  ],
  skills: [
    {
      group: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    { group: "Backend", items: ["Python", "Django", "Node.js", "REST API"] },
    {
      group: "Veri ve altyapı",
      items: ["PostgreSQL", "Supabase", "Vercel", "Git"],
    },
  ],
  location: { label: "Konum", value: "Türkiye · Uzaktan" },
  workStyle: {
    label: "Çalışma şekli",
    value: "Uzaktan · Hızlı dönüş",
    note: "Mesajlarına genellikle 24 saat içinde dönüş yaparım.",
  },
  learning: {
    label: "Şu sıralar öğreniyorum",
    items: ["React Native", "Expo", "Motion"],
  },
};

export const services = {
  eyebrow: "Hizmetler",
  title: "Fikirden yayına, uçtan uca geliştirme.",
  description:
    "İhtiyacınıza göre tek bir sayfadan kapsamlı bir uygulamaya kadar her aşamada destek veriyorum.",
  includesLabel: "Neler dahil",
  items: [
    {
      icon: "globe",
      title: "Kurumsal web siteleri",
      description:
        "Markanızı doğru anlatan, hızlı açılan ve arama motorlarında bulunan modern web siteleri.",
      includes: [
        "Mobil uyumlu tasarım",
        "SEO altyapısı",
        "İletişim formu",
        "Çok dilli yapı",
      ],
    },
    {
      icon: "layout",
      title: "Web uygulamaları",
      description:
        "Panel, rezervasyon, yönetim sistemi gibi işinize özel, ölçeklenebilir web uygulamaları.",
      includes: [
        "Kullanıcı girişi ve yetkiler",
        "Veritabanı ve API",
        "Üçüncü parti entegrasyonlar",
        "Yönetim paneli",
      ],
    },
    {
      icon: "smartphone",
      title: "Mobil uygulamalar",
      description:
        "Tek kod tabanıyla hem iOS hem Android'de çalışan, akıcı mobil uygulamalar.",
      includes: [
        "iOS ve Android (React Native)",
        "Bildirimler",
        "Web ile ortak altyapı",
        "Mağaza yayın desteği",
      ],
    },
    {
      icon: "wrench",
      title: "Bakım ve geliştirme",
      description:
        "Mevcut sitenizi veya uygulamanızı güncel, güvenli ve hızlı tutmak için düzenli destek.",
      includes: [
        "Hata düzeltme",
        "Yeni özellikler",
        "Performans iyileştirme",
        "Güvenlik güncellemeleri",
      ],
    },
  ],
} as const;

export const footer = {
  title: "Birlikte bir şey inşa edelim.",
  description:
    "Aklında bir proje mi var? Kısaca anlat, en kısa sürede dönüş yapayım.",
  emailCta: "E-posta gönder",
  whatsappCta: "WhatsApp'tan yaz",
  copyright: "Tüm hakları saklıdır.",
};
