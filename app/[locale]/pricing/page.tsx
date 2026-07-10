import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/Section";
import { FadeIn } from "@/components/motion";
import { PricingCards } from "@/components/PricingCards";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LeadForm } from "@/components/Forms";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(isLocale(params.locale) ? params.locale : "en");
  return { title: t.nav.pricing, description: t.pricing.subtitle };
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const t = getDictionary(locale);
  const trialHeading =
    locale === "vi" ? "Đăng ký dùng thử miễn phí 7 ngày" : "Start your free 7-day trial";
  const trialNote =
    locale === "vi"
      ? "Ứng dụng sắp ra mắt. Để lại email, bạn sẽ nhận Bộ khởi đầu miễn phí ngay hôm nay và là những người đầu tiên được mời dùng thử."
      : "The app is launching soon. Leave your email and you'll get the free Starter Kit today — and be first in line for the trial.";

  return (
    <>
      <Section className="!pb-8">
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} body={t.pricing.subtitle} center />
      </Section>
      <Section className="!pt-8">
        <PricingCards locale={locale} t={t} />
      </Section>
      <Section tone="mist" id="trial">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <h2 className="h-display text-center text-3xl">{trialHeading}</h2>
            <p className="mt-3 text-center text-charcoal/70">{trialNote}</p>
            <div className="mt-8">
              <LeadForm t={t} compact leadType="trial-waitlist" />
            </div>
          </FadeIn>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} center />
        <FadeIn className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={t.faq.items.filter((_, i) => [1, 5, 6, 7].includes(i))} />
        </FadeIn>
      </Section>
    </>
  );
}
