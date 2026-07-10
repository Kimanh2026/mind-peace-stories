import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading, CTAPair, ArcDivider } from "@/components/Section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { HeroScene } from "@/components/Illustrations";
import { PhoneFrame, CoachScreen, StoryScreen, DashboardScreen } from "@/components/PhoneMockup";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LeadForm } from "@/components/Forms";
import { SevenDotArc } from "@/components/Brand";
import { PricingCards } from "@/components/PricingCards";

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <Section className="!pt-10 sm:!pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <FadeIn>
            <p className="eyebrow">{t.home.hero.eyebrow}</p>
            <h1 className="h-display mt-4 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              {t.home.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">{t.home.hero.subtitle}</p>
            <div className="mt-8">
              <CTAPair locale={locale} t={t} />
            </div>
            <p className="mt-4 text-sm text-charcoal/55">{t.home.hero.note}</p>
            <SevenDotArc className="mt-10 h-8 w-32" />
          </FadeIn>
          <FadeIn delay={0.15} y={26}>
            <HeroScene className="w-full max-w-xl drop-shadow-xl" />
          </FadeIn>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section tone="mist">
        <SectionHeading eyebrow={t.home.problem.eyebrow} title={t.home.problem.title} body={t.home.problem.body} />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {t.home.problem.points.map((p) => (
            <StaggerItem key={p.title} className="card p-6">
              <h3 className="font-display text-lg font-semibold text-forest">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* SOLUTION — three pillars */}
      <Section tone="pine">
        <SectionHeading
          eyebrow={t.home.solution.eyebrow}
          title={t.home.solution.title}
          body={t.home.solution.body}
          invert
          center
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {t.home.solution.pillars.map((p) => (
            <StaggerItem key={p.name} className="rounded-xl2 border border-paper/12 bg-paper/[0.06] p-7 text-center">
              <span className="font-display text-4xl text-gold" lang="zh" aria-hidden>
                {p.han}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-paper">{p.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/70">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10">
          <ArcDivider invert />
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionHeading eyebrow={t.home.how.eyebrow} title={t.home.how.title} center />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.how.steps.map((s, i) => (
            <StaggerItem key={s.title} className="relative card p-6 pt-8">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-pine">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-forest">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* AI COACH PREVIEW */}
      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading eyebrow={t.home.coach.eyebrow} title={t.home.coach.title} body={t.home.coach.body} />
            <div className="mt-8">
              <Link href={`/${locale}/the-wise-parent`} className="btn-secondary">
                {t.cta.learnMore}
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <PhoneFrame>
              <CoachScreen t={t} />
            </PhoneFrame>
          </FadeIn>
        </div>
      </Section>

      {/* DAILY STORIES */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn className="order-2 lg:order-1" delay={0.1} y={30}>
            <PhoneFrame>
              <StoryScreen t={t} />
            </PhoneFrame>
          </FadeIn>
          <FadeIn className="order-1 lg:order-2">
            <SectionHeading eyebrow={t.home.stories.eyebrow} title={t.home.stories.title} body={t.home.stories.body} />
            <div className="mt-8">
              <Link href={`/${locale}/blog`} className="btn-secondary">
                {t.cta.readStory}
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAMILY TOOLKIT */}
      <Section tone="mist">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading eyebrow={t.home.toolkit.eyebrow} title={t.home.toolkit.title} />
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
              {t.home.toolkit.items.map((item) => (
                <StaggerItem key={item.title} className="card p-5">
                  <h3 className="font-display text-base font-semibold text-forest">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{item.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <FadeIn delay={0.15} y={30} className="hidden lg:block">
            <PhoneFrame>
              <DashboardScreen t={t} />
            </PhoneFrame>
          </FadeIn>
        </div>
      </Section>

      {/* PARENT STARTER KIT */}
      <Section>
        <div className="rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/15 via-paper to-sage/20 p-8 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeIn>
              <p className="eyebrow">{t.home.starterKit.eyebrow}</p>
              <h2 className="h-display mt-3 text-3xl sm:text-4xl">{t.home.starterKit.title}</h2>
              <p className="mt-4 leading-relaxed text-charcoal/75">{t.home.starterKit.body}</p>
              <ul className="mt-6 space-y-3">
                {t.home.starterKit.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={`/${locale}/parent-starter-kit`} className="btn-gold">
                  {t.cta.secondary}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <LeadForm t={t} />
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section tone="mist">
        <SectionHeading eyebrow={t.home.testimonials.eyebrow} title={t.home.testimonials.title} center />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {t.home.testimonials.items.map((item) => (
            <StaggerItem key={item.name} className="card flex flex-col p-7">
              <SevenDotArc className="h-5 w-16 opacity-60" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-5">
                <p className="font-display font-semibold text-forest">{item.name}</p>
                <p className="text-xs text-charcoal/55">{item.detail}</p>
              </footer>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn className="mt-6 text-center">
          <p className="text-xs text-charcoal/50">{t.home.testimonials.note}</p>
        </FadeIn>
      </Section>

      {/* PRICING */}
      <Section>
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} body={t.pricing.subtitle} center />
        <div className="mt-12">
          <PricingCards locale={locale} t={t} />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="mist">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} center />
        <FadeIn className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={t.faq.items.slice(0, 5)} />
          <div className="mt-6 text-center">
            <Link href={`/${locale}/faq`} className="btn-secondary">
              {t.nav.faq} →
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* FINAL CTA */}
      <Section tone="pine" className="!pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <SevenDotArc className="mx-auto h-8 w-32" tone="paper" />
            <h2 className="h-display mt-6 !text-paper text-3xl sm:text-4xl">{t.home.finalCta.title}</h2>
            <p className="mt-4 text-lg text-paper/75">{t.home.finalCta.body}</p>
            <div className="mt-9">
              <CTAPair locale={locale} t={t} invert center />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
