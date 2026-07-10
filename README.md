# Mind Peace Stories — Marketing Website

Bilingual (EN/VI) marketing site for **The Wise Parent — AI Parenting Companion**.
Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · fully static.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /vi
npm run build      # production build (all 20 routes prerendered)
npm start
```

## Configuration

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_LEAD_ENDPOINT=   # Google Apps Script Web App URL for lead capture
```

Without it, forms validate and show success locally (no data leaves the browser) — set it before launch.

## Deploy (Vercel)

```bash
npx vercel --prod
```

No server config needed; middleware handles the locale redirect. Add the env var in Vercel → Settings → Environment Variables.

## Pages (× en/vi)

Home · About · The Wise Parent · Parent Starter Kit · Success Stories · Blog (3 full posts) · Pricing · FAQ · Contact — plus sitemap.xml, robots.txt, 404.

## Before paid traffic — launch checklist

- [ ] Set `NEXT_PUBLIC_LEAD_ENDPOINT` to the Apps Script Web App URL
- [ ] Replace sample testimonials/success stories with real, permissioned quotes (see DECISIONS.md #4)
- [ ] Point trial CTAs at the real app signup when the app ships
- [ ] Update `SITE_URL` in `app/[locale]/layout.tsx` and `app/sitemap.ts` if the domain differs from mindpeacestories.com

See **DECISIONS.md** for the reasoning behind every product/design call and **PROJECT_STRUCTURE.md** for the file map.
