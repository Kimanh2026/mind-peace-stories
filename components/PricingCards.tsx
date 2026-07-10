import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { FadeIn, Stagger, StaggerItem } from "./motion";

export function PricingCards({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <>
      <Stagger className="grid gap-6 lg:grid-cols-3">
        {t.pricing.plans.map((plan) => (
          <StaggerItem
            key={plan.name}
            className={`relative flex flex-col rounded-xl2 border p-7 shadow-soft ${
              plan.highlight
                ? "border-gold bg-forest text-paper lg:-translate-y-3"
                : "border-forest/10 bg-white/70"
            }`}
          >
            {"badge" in plan && plan.badge && (
              <span className="absolute -top-3.5 left-7 rounded-full bg-gold px-3.5 py-1 text-xs font-semibold text-pine">
                {plan.badge}
              </span>
            )}
            <h3 className={`font-display text-lg font-semibold ${plan.highlight ? "text-paper" : "text-forest"}`}>
              {plan.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className={`font-display text-4xl font-semibold ${plan.highlight ? "text-gold" : "text-forest"}`}>
                {plan.price}
              </span>
              <span className={`text-sm ${plan.highlight ? "text-paper/60" : "text-charcoal/55"}`}>{plan.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-gold" : "text-sagedeep"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M3 8.5l3.5 3.5L13 4.5" />
                  </svg>
                  <span className={plan.highlight ? "text-paper/85" : "text-charcoal/80"}>{feat}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/pricing#trial`}
              className={`mt-7 ${plan.highlight ? "btn-gold w-full" : "btn-secondary w-full"}`}
            >
              {plan.cta}
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-8 text-center">
        <p className="text-sm text-charcoal/60">{t.pricing.currencyNote}</p>
        <p className="mx-auto mt-3 max-w-xl text-sm italic text-charcoal/70">{t.pricing.guarantee}</p>
      </FadeIn>
    </>
  );
}
