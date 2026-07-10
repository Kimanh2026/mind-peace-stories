import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, CTAPair } from "@/components/Section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { PhoneFrame, CoachScreen, StoryScreen, DashboardScreen } from "@/components/PhoneMockup";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.product, description: t.product.intro };
}

export default function ProductPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <Section className="!pb-10">
        <SectionHeading eyebrow={t.product.eyebrow} title={t.product.title} body={t.product.intro} center />
        <div className="mt-14 flex flex-wrap items-end justify-center gap-8">
          <FadeIn delay={0.05} className="hidden md:block md:scale-90 md:opacity-90">
            <PhoneFrame><StoryScreen t={t} /></PhoneFrame>
          </FadeIn>
          <FadeIn>
            <PhoneFrame><CoachScreen t={t} /></PhoneFrame>
          </FadeIn>
          <FadeIn delay={0.1} className="hidden lg:block lg:scale-90 lg:opacity-90">
            <PhoneFrame><DashboardScreen t={t} /></PhoneFrame>
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.product.features.map((f) => (
            <StaggerItem key={f.title} className="card p-7">
              <h2 className="font-display text-lg font-semibold text-forest">{f.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="pine">
        <SectionHeading title={t.product.pillarsTitle} invert center />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {t.home.solution.pillars.map((p) => (
            <StaggerItem key={p.name} className="rounded-xl2 border border-paper/12 bg-paper/[0.06] p-7 text-center">
              <span className="font-display text-4xl text-gold" lang="zh" aria-hidden>{p.han}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-paper">{p.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/70">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading title={t.product.closing.title} body={t.product.closing.body} center />
          <FadeIn className="mt-9 flex justify-center">
            <CTAPair locale={locale} t={t} center />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
