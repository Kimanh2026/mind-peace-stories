import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, CTAPair } from "@/components/Section";
import { FadeIn } from "@/components/motion";
import { FAQAccordion } from "@/components/FAQAccordion";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.faq, description: t.faq.title };
}

export default function FAQPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Section className="!pb-8">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} center />
      </Section>
      <Section className="!pt-8">
        <FadeIn className="mx-auto max-w-3xl">
          <FAQAccordion items={t.faq.items} />
        </FadeIn>
        <FadeIn className="mt-14 flex justify-center">
          <CTAPair locale={locale} t={t} center />
        </FadeIn>
      </Section>
    </>
  );
}
