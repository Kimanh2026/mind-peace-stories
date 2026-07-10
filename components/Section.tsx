import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { FadeIn } from "./motion";
import { SevenDotArc } from "./Brand";

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "mist" | "pine";
  id?: string;
}) {
  const bg = tone === "mist" ? "bg-mist/60" : tone === "pine" ? "bg-pine text-paper" : "";
  return (
    <section id={id} className={`py-16 sm:py-24 ${bg} ${className}`}>
      <div className="container-content">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <FadeIn className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow ${center ? "justify-center" : ""} ${invert ? "!text-sage" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={`h-display mt-3 text-3xl sm:text-4xl ${invert ? "!text-paper" : ""}`}>{title}</h2>
      {body && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${invert ? "text-paper/75" : "text-charcoal/75"}`}>
          {body}
        </p>
      )}
    </FadeIn>
  );
}

export function CTAPair({
  locale,
  t,
  invert = false,
  center = false,
}: {
  locale: Locale;
  t: Dictionary;
  invert?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}>
      <Link href={`/${locale}/pricing#trial`} className={invert ? "btn-gold" : "btn-primary"}>
        {t.cta.primary}
      </Link>
      <Link
        href={`/${locale}/parent-starter-kit`}
        className={invert ? "btn border border-paper/30 text-paper hover:bg-paper/10" : "btn-secondary"}
      >
        {t.cta.secondary}
      </Link>
    </div>
  );
}

export function ArcDivider({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <SevenDotArc className="h-6 w-24 opacity-70" tone={invert ? "paper" : "mixed"} />
    </div>
  );
}
