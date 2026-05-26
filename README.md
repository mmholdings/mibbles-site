# Mibbles — Marketing Website

The marketing site for **Mibbles**, the iOS app for cat mental wellness, enrichment, and Cat TV.

Built to (1) drive App Store installs, (2) rank for high-intent cat-owner search terms via an automated blog engine, and (3) serve as a press/media hub.

---

## Stack

| Concern             | Choice |
|---------------------|--------|
| Framework           | Next.js 14 (App Router) + TypeScript |
| Styling             | Tailwind CSS + custom Mibbles design system |
| Content             | MDX + Contentlayer (file-based) |
| Blog automation     | OpenAI API + GitHub Actions cron → opens draft PRs |
| SEO                 | next-sitemap, JSON-LD components, `@vercel/og` |
| Newsletter / waitlist | **Supabase** (`subscribers` table, server-only `service_role` writes) |
| Email sending       | Resend (optional — falls back to console.log) |
| Forms               | react-hook-form + zod |
| Analytics           | Plausible + GA4 (both optional, env-driven) |
| Hosting             | **Railway** (Nixpacks + `railway.json` config) |
| Source              | **GitHub** (Railway auto-deploys on push to `main`) |

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev                     # → http://localhost:3000
```

Build for production:

```bash
pnpm build
pnpm start
```

---

## Project structure

```
mibbles-site/
├── app/                          ← Next.js App Router pages
│   ├── page.tsx                  Home
│   ├── features/                 Feature deep-dives
│   ├── pricing/                  Pricing + FAQ
│   ├── about/                    Story, mission, founder
│   ├── press/                    Press kit + downloadable assets
│   ├── media-kit/                Creator program
│   ├── support/                  Help articles + FAQ
│   ├── contact/                  Contact form
│   ├── privacy/  terms/          Legal
│   ├── blog/                     Blog index + [slug] template
│   ├── admin/                    Performance dashboard (basic-auth)
│   ├── api/
│   │   ├── og/                   Dynamic OG image generator
│   │   ├── newsletter/           Email capture (Resend)
│   │   └── contact/              Contact form handler
│   └── layout.tsx                Root layout, fonts, nav, footer
│
├── components/
│   ├── ui/                       Buttons, container, card, mockup, FAQ
│   ├── marketing/                Nav, footer, newsletter, hero pieces
│   ├── blog/                     Post card, TOC, MDX components, exit-intent
│   └── seo/                      JSON-LD components, analytics
│
├── content/
│   ├── blog/                     MDX posts (the SEO engine)
│   └── keywords/
│       ├── queue.json            Upcoming keywords for the cron
│       └── published.json        What's already shipped
│
├── lib/
│   ├── site-config.ts            Brand strings, nav, pricing, CTAs
│   └── utils.ts                  cn, formatDate, absoluteUrl, slugify
│
├── public/
│   ├── press-kit/                Logos, screenshots, founder photos
│   ├── screenshots/              iPhone screenshots used on marketing pages
│   └── images/                   Hero photography
│
├── scripts/
│   ├── editorial-prompt.ts       The blog's editorial system prompt
│   ├── generate-post.ts          One-shot post generator
│   ├── generate-seed-posts.ts    Bulk generator (bootstraps the blog)
│   └── package-press-kit.ts      Zips /public/press-kit
│
├── .github/workflows/
│   └── blog-generator.yml        Cron — runs Mon/Wed/Fri ~9am ET
│
├── styles/globals.css
├── tailwind.config.ts
├── contentlayer.config.ts
├── next.config.mjs
├── next-sitemap.config.js
├── middleware.ts                 Basic-auth for /admin
└── .env.example
```

---

## Design system

- **Palette**: Cream `#FAFAF7` base, deep charcoal text `#1A1A1A`, soft terracotta accent `#E27D5F`. Defined in `tailwind.config.ts` as `cream`, `ink`, `terracotta`.
- **Type**: Inter (sans, UI) + Fraunces (serif, headlines). Loaded from `next/font/google` in `app/layout.tsx`.
- **Max content width**: 1200px (`max-w-content`). Generous vertical rhythm (`py-20 md:py-28 lg:py-32` per Section).
- **Components live in `components/ui` and `components/marketing`** — Button, Container, Section, Eyebrow, Card, Badge, IPhoneMockup, FAQAccordion, etc. Everything composes from primitives.

---

## Blog automation pipeline

This is the SEO engine. The system:

1. Pulls the next keyword from `content/keywords/queue.json`.
2. Calls OpenAI (default `gpt-4o`) with the editorial system prompt in `scripts/editorial-prompt.ts`.
3. Runs guardrails: banned-word check, primary-keyword placement, Flesch readability score.
4. Writes the MDX to `content/blog/<slug>.mdx` with `draft: true`.
5. Opens a pull request labeled `blog-draft` for human review.

### Run manually

```bash
pnpm generate:post           # one post
pnpm generate:seed 5         # five posts in a row
```

### Cron schedule

Lives in `.github/workflows/blog-generator.yml`. Default: Mon / Wed / Fri at 13:00 UTC (~9am ET) — 3 posts per week. Edit the `cron:` line to change frequency.

You can also trigger it manually from the GitHub Actions tab → "Blog Generator" → Run workflow.

### Required secrets (in GitHub repo settings)

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional — defaults to `gpt-4o`)
- The default `GITHUB_TOKEN` handles PR creation; no extra setup needed.

### Editorial workflow

When a draft PR opens:

1. Read the post end-to-end. Does it sound human?
2. Click every external link — confirm citations are real.
3. Verify FAQ answers.
4. Tune the meta title / description if needed.
5. Use the `heroImagePrompt` in the frontmatter to generate an image (Midjourney, DALL·E, Adobe Firefly), upload to `/public/blog/<slug>-hero.jpg`, set `heroImage:` in frontmatter.
6. Remove `draft: true` from the frontmatter.
7. Merge.

### Adding new keywords

Edit `content/keywords/queue.json`. The shape:

```json
{
  "primaryKeyword": "...",
  "secondaryKeywords": ["...", "..."],
  "intent": "informational | commercial | navigational",
  "category": "Behavior | Enrichment | Health | How-To | Mental Health | Trends",
  "targetWordCount": 1500,
  "internalLinks": ["existing-post-slug-a", "existing-post-slug-b"]
}
```

---

## SEO setup

**Already wired:**

- `sitemap.xml` (via `next-sitemap`, regenerated each `pnpm build`)
- `robots.txt` (allow all, disallow `/admin` and `/api`)
- JSON-LD: `Organization` (every page), `Article` (every post), `FAQPage` (where present), `SoftwareApplication` (home), `BreadcrumbList` (most pages)
- Open Graph + Twitter card meta on every page
- Per-post dynamic OG images via `@vercel/og` at `/api/og?title=...&category=...`
- `next/image` for all marketing imagery — automatic AVIF/WebP, lazy loading
- Smart App Banner `<meta name="apple-itunes-app" ...>` — auto-shows download prompt to Safari iOS visitors
- Canonical tags on every page

**You need to do:**

1. **Verify the site in [Google Search Console](https://search.google.com/search-console)**:
   - Add `https://mibbles.app` as a Domain property (preferred) or URL prefix property.
   - Submit `https://mibbles.app/sitemap.xml`.
2. **Verify in [Bing Webmaster Tools](https://www.bing.com/webmasters)** — same flow.
3. **Set up Plausible** at https://plausible.io (or PostHog), then set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in your env.
4. **Set up GA4** (optional) — paste your measurement ID into `NEXT_PUBLIC_GA_ID`.

---

## Deployment (Railway + Supabase + GitHub)

The site deploys to **Railway**, with **Supabase** as the newsletter backend and **GitHub** as the source. Railway auto-deploys on every push to `main`.

### One-time setup

**1. GitHub**

```bash
git init
git add .
git commit -m "Initial Mibbles site"
git branch -M main
# Create an empty repo at github.com/new, then:
git remote add origin git@github.com:<you>/mibbles-site.git
git push -u origin main
```

**2. Supabase**

- Create a project at https://supabase.com/dashboard
- SQL editor → paste `supabase/migrations/0001_subscribers.sql` → Run
- Project Settings → API → copy `Project URL` and `service_role` key

**3. Railway**

- https://railway.app → New Project → Deploy from GitHub repo → pick `mibbles-site`
- Railway detects Next.js + Nixpacks automatically (config is in `railway.json` and `nixpacks.toml`)
- Variables → Raw editor → paste from your env, including:

| Variable                       | Used for |
|--------------------------------|----------|
| `NEXT_PUBLIC_SITE_URL`         | Set to your Railway public URL (e.g. `https://mibbles-site-production.up.railway.app`) — update after deploy |
| `SUPABASE_URL`                 | From Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY`    | From Supabase project settings (secret) |
| `NEXT_PUBLIC_APP_STORE_URL`    | Real App Store URL once the app launches (placeholder for now) |
| `NEXT_PUBLIC_APP_STORE_ID`     | iOS smart app banner ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics (optional) |
| `RESEND_API_KEY`               | Contact form (optional) |
| `ADMIN_USER` / `ADMIN_PASSWORD`| Basic-auth for `/admin` |

`NEXT_PUBLIC_*` values are baked into the client bundle at build time — set them before the first deploy or trigger a redeploy after adding them.

**4. Custom domain (later)**

- Buy a domain via Railway → Project → Settings → Networking → Custom Domain
- Railway issues a free Let's Encrypt cert automatically
- Update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy

### Subsequent deploys

```bash
git add . && git commit -m "..." && git push
```

Railway watches `main` and rebuilds automatically.

---

## Asset replacement checklist

These are the placeholders you'll want to swap before going live:

- [ ] **App Store URL** — `lib/site-config.ts` → `appStoreUrl` and `appStoreId`
- [ ] **Logo** — replace `M` placeholder in `components/marketing/nav.tsx` and `components/marketing/footer.tsx` with `/public/logo.svg`
- [ ] **App screenshots** — drop iPhone 15 Pro shots into `/public/screenshots/` matching the filenames in `/public/screenshots/.gitkeep`
- [ ] **Hero image** — `/public/images/cat-watching-ipad.jpg` for the home page big visual
- [ ] **Founder photo + bio** — `/public/images/founder.jpg` + edit `app/about/page.tsx`
- [ ] **Press kit assets** — drop into `/public/press-kit/`, run `pnpm package:press-kit`
- [ ] **Favicon set** — `/public/favicon.ico`, `/public/apple-touch-icon.png`, `/public/android-chrome-{192,512}.png`
- [ ] **OG fallback image** — `/public/og-default.png` (1200×630)
- [ ] **Featured-in logos** — currently text in `app/page.tsx`; replace with real logos when available
- [ ] **Press mentions** — `app/press/page.tsx` → `recentMentions` array, replace placeholder URLs

---

## Admin dashboard

`/admin` is protected by basic auth (`middleware.ts`). Credentials from env (`ADMIN_USER`, `ADMIN_PASSWORD`).

The dashboard is a static shell. Wire it up to:

- **Plausible API** for top blog posts, total views, CTR to App Store (look at `[data-analytics="app-store-cta"]` events).
- **Resend API** for newsletter audience size.
- **GitHub API** for pending blog draft PRs: `GET /repos/:owner/:repo/pulls?state=open&labels=blog-draft`.

---

## Conversion components

- **Sticky App Store CTA** — mobile only, appears after 600px scroll (`components/marketing/sticky-app-cta.tsx`)
- **Newsletter signup** — in the footer + at the end of every blog post (`components/marketing/newsletter.tsx`)
- **Exit-intent modal** — desktop only, on blog posts (`components/blog/exit-intent-modal.tsx`)
- **App Store smart banner meta** — wired in `app/layout.tsx`
- **In-content CTA cards** — `<AppStoreCTACard />` in any MDX post

---

## What's NOT included (you'll do)

- Real photography — placeholders use gradients and dummy color blocks
- Real founder bio + photo
- Final legal text (privacy / terms have summaries + a placeholder for the lawyer-generated body)
- Live press mentions
- Actual screenshots in `/public/screenshots/`
- Connected analytics accounts
- Verified Google Search Console
- Live cron secrets in GitHub

---

## Local development tips

- Blog drafts won't appear in `/blog` (filtered by `draft: true`). Flip `draft: false` to preview a post locally.
- Contentlayer regenerates types on save; if TypeScript errors get confused, `rm -rf .contentlayer && pnpm dev`.
- The OG image route runs on the Vercel Edge runtime — to test locally, `pnpm dev` then visit `http://localhost:3000/api/og?title=Hello&category=Behavior`.

---

## License

This repo is private. Brand assets belong to Mibbles.
