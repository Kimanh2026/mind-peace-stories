# PROJECT_STRUCTURE.md

```
mind-peace-stories/
├── app/
│   ├── globals.css              # Tailwind layers + design tokens/utilities
│   ├── sitemap.ts               # /sitemap.xml (all pages × locales × posts)
│   ├── robots.ts                # /robots.txt
│   └── [locale]/                # en | vi — every route is bilingual
│       ├── layout.tsx           # html/body, fonts, metadata, header/footer, skip link
│       ├── page.tsx             # Home (12 sections)
│       ├── not-found.tsx        # 404
│       ├── about/page.tsx
│       ├── the-wise-parent/page.tsx      # Product page + app mockups
│       ├── parent-starter-kit/page.tsx   # Lead magnet + email capture
│       ├── success-stories/page.tsx
│       ├── blog/page.tsx                 # Index
│       ├── blog/[slug]/page.tsx          # 3 full posts per locale (SSG)
│       ├── pricing/page.tsx              # Plans + #trial waitlist form
│       ├── faq/page.tsx                  # Full FAQ + JSON-LD
│       └── contact/page.tsx
├── components/
│   ├── Brand.tsx                # Logo + SevenDotArc signature motif
│   ├── Header.tsx               # Sticky nav, mobile menu, language switch
│   ├── Footer.tsx
│   ├── Section.tsx              # Section, SectionHeading, CTAPair, ArcDivider
│   ├── motion.tsx               # FadeIn / Stagger primitives (reduced-motion aware)
│   ├── Illustrations.tsx        # Inline SVG hero & lantern scenes
│   ├── PhoneMockup.tsx          # Device frame + Coach/Story/Dashboard screens
│   ├── PricingCards.tsx
│   ├── FAQAccordion.tsx
│   └── Forms.tsx                # LeadForm (starter kit / trial waitlist) + ContactForm
├── lib/i18n/
│   ├── en.ts                    # Source-of-truth copy; exports Dictionary type
│   ├── vi.ts                    # Native-written Vietnamese copy (type-checked)
│   └── index.ts                 # getDictionary, locales helpers
├── middleware.ts                # / → /en or /vi by Accept-Language
├── public/                      # icon.svg, og.png
├── tailwind.config.ts           # Brand palette, fonts, shadows
├── README.md · DECISIONS.md · PROJECT_STRUCTURE.md
└── package.json / tsconfig / next.config.mjs / postcss.config.mjs
```

## Where to change things
- **Copy (both languages):** `lib/i18n/en.ts`, `lib/i18n/vi.ts` — everything on the site lives here.
- **Prices:** `pricing.plans` in both dictionaries.
- **Lead backend:** set `NEXT_PUBLIC_LEAD_ENDPOINT` (see `.env.example`).
- **Trial CTA target at app launch:** `CTAPair` in `components/Section.tsx` + button href in `components/PricingCards.tsx` + header buttons.
- **Add a blog post:** append to `blog.posts` in both dictionaries — routes, sitemap and index update automatically.
