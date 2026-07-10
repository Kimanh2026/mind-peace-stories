# DECISIONS.md — Senior product & design decisions

## Product & funnel

1. **Trial CTA before app launch.** The app is pre-launch, so "Start Your Free 7-Day Trial" cannot open a signup. Every trial CTA points to `/{locale}/pricing#trial`, a trial-waitlist email capture. The copy is honest about this ("launching soon; you'll get the Starter Kit today and be first in line"). Swap the anchor for the real signup URL at launch — one place: `CTAPair` in `components/Section.tsx` and `PricingCards.tsx`.
2. **Two conversion paths everywhere.** Primary (trial) + secondary (Starter Kit) appear in the header, hero, final CTA and page closers, per the brief. The Starter Kit is the lower-friction path and feeds the existing Apps Script funnel.
3. **Lead capture backend.** Forms post JSON to `NEXT_PUBLIC_LEAD_ENDPOINT` (intended: the project's Google Apps Script Web App URL, matching the existing Parent Starter Kit backend). Payloads carry `type` (`starter-kit`, `trial-waitlist`, `contact`), `locale`, and fields. With no endpoint configured, forms validate and show the success state locally so the UX is complete in preview. Set the env var to go live.
4. **Testimonials & success stories are sample content.** The product is in validation; there are no public customers yet. Copy is framed as "early-access families", names marked as changed, plus a non-guarantee disclaimer. **Replace with real quotes (with permission) before paid traffic** — fabricated reviews would breach Australian Consumer Law.
5. **Pricing: $0 / $14 AUD monthly / $119 AUD annual (29% saving).** Consistent with a consumer parenting-app price band and the existing funnel economics; monthly is the highlighted anchor. GST-inclusive wording for the AU market. Adjust in the dictionaries only.
6. **Professional-support disclaimers** appear in the FAQ and Contact page (GP / child psychologist / Parentline), continuing the credibility decision already made for the AU market.

## Internationalisation

7. **Path-based locales (`/en`, `/vi`)** rather than a client-side toggle: real URLs per language are indexable, shareable and hreflang-correct. Middleware redirects `/` by `Accept-Language`. `hreflang` alternates are emitted on every page.
8. **Vietnamese is written, not translated.** The VI dictionary was authored directly for tone (e.g. "Không thể phạt cho hết nghiện — nhưng có thể yêu thương cho hết nghiện" rather than a literal rendering of the EN headline). Blog posts are full native rewrites.
9. **Single source of truth for copy**: `lib/i18n/en.ts` defines the `Dictionary` type; `vi.ts` must satisfy it, so a missing translation is a compile error.

## Design

10. **Palette** maps the brief to the existing brand system: Warm White `#FBF8F2` (paper), Forest Green `#1E3A2C`, deep pine `#14291F` for dark sections, Sage `#A7BCA1`, Warm Gold `#C2A14D`, Charcoal `#2A2A26`.
11. **Type**: Fraunces (display serif — warm, literary, premium) + Be Vietnam Pro (body — humanist, excellent Vietnamese diacritic support, a deliberate nod to the bilingual brand). Loaded via Google Fonts `<link>` with preconnect rather than `next/font`, because `next/font` fetches at build time and fails in offline/CI builds; runtime loading with `display=swap` keeps builds portable. If your CI has network access, switching to `next/font` is a 10-line change for slightly better CLS.
12. **Signature element: the seven-dot rising arc** (7 days, 7 small steps, gradual rise — 漸). It appears in the logo, hero, dividers, testimonials, footer and the dashboard streak. This is the one memorable motif; everything else stays quiet.
13. **Illustrations are hand-built inline SVG**, not raster "3D renders": an AI text model cannot generate raster 3D artwork, and stock would break the "not templated" requirement. The SVG scenes (parent & child under a tree at dusk; lantern & books) use soft gradients and rounded forms to hit the warm, calm, soft-anime-adjacent brief, weigh ~4 KB, and scale perfectly. Swap for commissioned 3D renders later without layout changes.
14. **App mockups are real UI, built in code** (Coach chat, Daily Story, Family Dashboard in a device frame), using genuine product copy — more honest and more convincing than fake screenshots.
15. **Motion discipline**: one entrance system (fade+rise, 0.5s, custom ease), stagger on card grids, accordion height animation, header blur on scroll. All animation respects `prefers-reduced-motion`.

## Engineering

16. **Fully static output** (SSG for all 20 routes + middleware only for locale redirect). No server data dependencies → deployable to Vercel free tier, instant TTFB.
17. **Accessibility floor**: skip link, semantic landmarks, `aria-expanded/controls` on menu & accordion, visible focus rings, form labels + `role="alert"` errors, `aria-label`ed decorative SVGs, WCAG-AA contrast on all text pairs.
18. **SEO**: per-page titles/descriptions, canonical + hreflang, Open Graph + `og.png`, Twitter card, `sitemap.xml`, `robots.txt`, FAQPage JSON-LD, localized `<html lang>`.
19. **First Load JS ≈ 130 kB** shared across routes (Next runtime + framer-motion); pages themselves are 0.2–2.8 kB. No images beyond a 20 KB OG PNG.
