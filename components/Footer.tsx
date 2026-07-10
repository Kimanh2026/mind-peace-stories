import Link from "next/link";
import { Logo, SevenDotArc } from "./Brand";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const cols = [
    {
      title: t.footer.product,
      links: [
        { href: `/${locale}/the-wise-parent`, label: t.nav.product },
        { href: `/${locale}/parent-starter-kit`, label: t.nav.starterKit },
        { href: `/${locale}/pricing`, label: t.nav.pricing },
        { href: `/${locale}/faq`, label: t.nav.faq },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: `/${locale}/about`, label: t.nav.about },
        { href: `/${locale}/success-stories`, label: t.nav.stories },
        { href: `/${locale}/contact`, label: t.nav.contact },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { href: `/${locale}/blog`, label: t.nav.blog },
        { href: `/${locale}/parent-starter-kit`, label: t.cta.secondary },
      ],
    },
  ];

  return (
    <footer className="mt-24 bg-pine text-paper">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-semibold">
                Mind Peace <span className="text-gold">Stories</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">{t.footer.blurb}</p>
            <SevenDotArc className="mt-6 h-8 w-28" tone="paper" />
          </div>
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-sage">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="focus-ring rounded text-sm text-paper/80 hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/55 sm:flex-row sm:justify-between">
          <p>{t.footer.legal}</p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
