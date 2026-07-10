import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/Section";
import { FadeIn } from "@/components/motion";
import { ContactForm } from "@/components/Forms";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.contact, description: t.contact.intro };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <Section className="!pb-8">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.intro} center />
      </Section>
      <Section className="!pt-8">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <ContactForm t={t} />
          </FadeIn>
          <FadeIn delay={0.1} className="space-y-6">
            <div className="card p-7">
              <h2 className="font-display text-lg font-semibold text-forest">{t.contact.alt.title}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{t.contact.alt.body}</p>
              <a
                href={`mailto:${t.contact.alt.email}`}
                className="focus-ring mt-2 inline-block rounded font-semibold text-golddeep hover:underline"
              >
                {t.contact.alt.email}
              </a>
              <p className="mt-3 text-xs text-charcoal/55">{t.contact.alt.response}</p>
            </div>
            <div className="rounded-xl2 border border-sage/50 bg-sage/15 p-7">
              <h2 className="font-display text-lg font-semibold text-forest">{t.contact.support.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{t.contact.support.body}</p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
