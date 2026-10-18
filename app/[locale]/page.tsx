import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { About } from "@/components/about";
import { BlogSection } from "@/components/blog/blog-section";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappButton } from "@/components/whatsapp-button";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <BlogSection locale={locale} />
      </main>
      <SiteFooter />
      <WhatsappButton />
    </>
  );
}
