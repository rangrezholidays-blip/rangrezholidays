# Rangrez Holidays (Next.js)

Next.js 16 (App Router) + React 19 + Tailwind CSS 4. Converted from the original Vite + React Router project.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add Gmail SMTP credentials
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Deploy on Vercel

1. In **Vercel → Project → Settings → General**, set **Framework Preset = Next.js** and clear any
   Build Command / Output Directory overrides (the old Vite setup used `dist`; Next.js must not).
2. **Settings → Environment Variables**: add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFICATION_EMAIL`.
3. **Settings → Domains**: `www.rangrezholidays.com` is the primary domain. `next.config.mjs` already
   redirects the bare domain to `www`, so do not configure the opposite redirect in Vercel.
4. Do not add a `vercel.json` rewrite; Next.js routes every page itself.

## Structure

```
src/app/            routes (layout, pages, sitemap.ts, robots.ts, not-found.tsx, api/*)
src/views/          page UI (client components, previously src/pages)
src/components/     shared UI; AppShell.tsx holds navbar/footer/modals
src/data/           tours, destinations, travel styles, SEO text, JSON-LD
src/lib/            metadata helper, mailer, app context
public/llms.txt     static file
```

## SEO notes

- Page titles, descriptions, canonicals and Open Graph tags come from `src/data/seoData.ts` via `generateMetadata`.
- `/sitemap.xml` and `/robots.txt` are generated from the data files (`src/app/sitemap.ts`, `src/app/robots.ts`).
  New tours, destinations and travel styles appear in the sitemap automatically.
- Unknown URLs such as `/tour/does-not-exist` return a real HTTP 404.
- Canonical host: `https://www.rangrezholidays.com`.

## Adding content

- New tour: add an entry to `src/data/toursData.ts` (and optionally an SEO entry in `seoData.ts`).
- Bump `LAST_MODIFIED` in `src/app/sitemap.ts` when content changes.
