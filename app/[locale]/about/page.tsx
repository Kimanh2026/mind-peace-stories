import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, CTAPair, ArcDivider } from "@/components/Section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { LanternScene } from "@/components/Illustrations";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.about, description: t.about.intro };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <Section className="!pb-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} body={t.about.intro} />
          <FadeIn delay={0.12}>
            <LanternScene className="w-full max-w-md drop-shadow-xl lg:ml-auto" />
          </FadeIn>
        </div>
      </Section>

      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {t.about.sections.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.03}>
              <h2 className="h-display text-2xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-charcoal/80">{s.body}</p>
            </FadeIn>
          ))}
        </div>
        <ArcDivider />
      </Section>

      <Section tone="mist">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {t.about.values.map((v) => (
            <StaggerItem key={v.title} className="card p-7 text-center">
              <h3 className="font-display text-xl font-semibold text-forest">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-14 flex justify-center">
          <CTAPair locale={locale} t={t} center />
        </FadeIn>
      </Section>
    </>
  );
}
