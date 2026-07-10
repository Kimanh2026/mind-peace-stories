import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/Section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { LeadForm } from "@/components/Forms";
import { SevenDotArc } from "@/components/Brand";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.starterKit, description: t.starterKitPage.subtitle };
}

export default function StarterKitPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);
  const sk = t.starterKitPage;

  return (
    <>
      <Section className="!pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow={sk.eyebrow} title={sk.title} body={sk.subtitle} center />
          <FadeIn delay={0.1} className="mt-9">
            <LeadForm t={t} compact />
          </FadeIn>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title={sk.whatsInside} center />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {sk.items.map((item, i) => (
            <StaggerItem key={item.title} className="card flex gap-5 p-7">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 font-display font-semibold text-forest">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading title={sk.how.title} center />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
            {sk.how.steps.map((step, i) => (
              <StaggerItem key={step} className="text-center">
                <SevenDotArc className="mx-auto h-6 w-20 opacity-70" />
                <p className="mt-3 text-sm font-medium text-charcoal/85">
                  <span className="font-display text-forest">{i + 1}.</span> {step}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-14">
            <LeadForm t={t} />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
