import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, CTAPair } from "@/components/Section";
import { FadeIn } from "@/components/motion";
import { SevenDotArc } from "@/components/Brand";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.stories, description: t.successStories.intro };
}

export default function SuccessStoriesPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);
  const s = t.successStories;
  const labels =
    locale === "vi"
      ? { challenge: "Khó khăn", turning: "Bước ngoặt", result: "Kết quả" }
      : { challenge: "The struggle", turning: "The turning point", result: "The result" };

  return (
    <>
      <Section className="!pb-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} body={s.intro} center />
      </Section>

      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl space-y-10">
          {s.stories.map((story, i) => (
            <FadeIn key={story.name} delay={i * 0.04}>
              <article className="card p-8 sm:p-10">
                <SevenDotArc className="h-5 w-16 opacity-60" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-sagedeep">{story.name}</p>
                <h2 className="h-display mt-2 text-2xl">{story.title}</h2>
                <dl className="mt-6 space-y-5 text-sm leading-relaxed sm:text-base">
                  <div>
                    <dt className="font-semibold text-forest">{labels.challenge}</dt>
                    <dd className="mt-1 text-charcoal/80">{story.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-forest">{labels.turning}</dt>
                    <dd className="mt-1 text-charcoal/80">{story.turning}</dd>
                  </div>
                  <div className="rounded-xl border-l-4 border-gold bg-gold/10 px-4 py-3">
                    <dt className="font-semibold text-forest">{labels.result}</dt>
                    <dd className="mt-1 text-charcoal/85">{story.result}</dd>
                  </div>
                </dl>
              </article>
            </FadeIn>
          ))}
          <FadeIn>
            <p className="text-center text-xs text-charcoal/50">{s.disclaimer}</p>
          </FadeIn>
        </div>
      </Section>

      <Section tone="pine">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading title={t.home.finalCta.title} body={t.home.finalCta.body} invert center />
          <FadeIn className="mt-9 flex justify-center">
            <CTAPair locale={locale} t={t} invert center />
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
