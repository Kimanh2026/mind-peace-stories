import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://mindpeacestories.com";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${t.meta.siteName} — ${t.meta.tagline}`, template: `%s — ${t.meta.siteName}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", vi: "/vi" },
    },
    openGraph: {
      type: "website",
      siteName: t.meta.siteName,
      title: `${t.meta.siteName} — ${t.meta.tagline}`,
      description: t.meta.description,
      url: `/${locale}`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
      locale: locale === "vi" ? "vi_VN" : "en_AU",
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg" },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-paper"
        >
          {locale === "vi" ? "Bỏ qua, đến nội dung chính" : "Skip to main content"}
        </a>
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
