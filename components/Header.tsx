"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Brand";
import type { Dictionary, Locale } from "@/lib/i18n";

const navItems = (locale: Locale, t: Dictionary) => [
  { href: `/${locale}/the-wise-parent`, label: t.nav.product },
  { href: `/${locale}/parent-starter-kit`, label: t.nav.starterKit },
  { href: `/${locale}/success-stories`, label: t.nav.stories },
  { href: `/${locale}/blog`, label: t.nav.blog },
  { href: `/${locale}/pricing`, label: t.nav.pricing },
  { href: `/${locale}/about`, label: t.nav.about },
];

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const items = navItems(locale, t);
  const otherLocale: Locale = locale === "en" ? "vi" : "en";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href={`/${locale}`} className="focus-ring flex items-center gap-2.5 rounded-full" aria-label="Mind Peace Stories — home">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-tight text-forest">
            Mind Peace <span className="text-gold">Stories</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active ? "font-semibold text-forest" : "text-charcoal/70 hover:text-forest"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchedPath}
            className="focus-ring rounded-full border border-forest/20 px-3 py-1.5 text-xs font-semibold text-forest hover:border-forest/50"
            aria-label={t.langSwitch.label}
          >
            {otherLocale === "vi" ? "VI" : "EN"}
          </Link>
          <Link href={`/${locale}/pricing#trial`} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            {t.cta.primary}
          </Link>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-forest/10 bg-paper lg:hidden"
          >
            <div className="container-content flex flex-col gap-1 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-xl px-3 py-3 text-base font-medium text-forest hover:bg-forest/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link href={`/${locale}/faq`} className="focus-ring rounded-xl px-3 py-3 text-base font-medium text-forest hover:bg-forest/5">
                {t.nav.faq}
              </Link>
              <Link href={`/${locale}/contact`} className="focus-ring rounded-xl px-3 py-3 text-base font-medium text-forest hover:bg-forest/5">
                {t.nav.contact}
              </Link>
              <Link href={`/${locale}/pricing#trial`} className="btn-primary mt-3">
                {t.cta.primary}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
