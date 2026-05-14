# Parish & Company — Website

Editorial website for **Bill Parish**, principal of Parish & Company LLC, an independent
Registered Investment Adviser in Lake Oswego, Oregon. Replaces the legacy WordPress site
at parishinvestments.com.

## Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript strict
- **Styling**: Tailwind v4 (`@theme` design tokens in `app/globals.css`)
- **Fonts**: Source Serif 4 (display), Inter (body), JetBrains Mono (tabular) — all self-hosted via `next/font/google`
- **Motion**: Framer Motion (3 patterns only: scroll fade-up, link hover, page fade)
- **Forms**: Server Action + Resend for inquiry email delivery
- **Content (Phase 1)**: file-based — `content/post-index.json` holds the 203 historical research notes scraped from parishinvestments.com
- **CMS (Phase 2 — not wired)**: Sanity (planned)

## Design tokens

Defined in `app/globals.css` under `@theme`. Use exclusively:

| Token            | Hex       | Use                                  |
| ---------------- | --------- | ------------------------------------ |
| `--color-bone`   | `#F7F4EE` | Primary background                   |
| `--color-mist`   | `#EBE6DD` | Secondary surfaces                   |
| `--color-basalt` | `#1A1F2B` | Primary text                         |
| `--color-slate`  | `#525866` | Secondary text                       |
| `--color-moss`   | `#4A6B4F` | Accent — links, active states        |
| `--color-brass`  | `#A88B5C` | Dark surfaces only                   |
| `--color-ink`    | `#14171F` | Dark surface (footer, contact strip) |

## Routes

| Path                   | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `/`                    | Home — hero, press marks, latest research, philosophy, about, fiduciary callout |
| `/research`            | Full archive — 203 posts, topic + year filter, search, pagination |
| `/research/[slug]`     | Individual research note                       |
| `/philosophy`          | Investment philosophy, four-environment table, 30-year track record |
| `/about`               | Bill's bio, credentials, services, Donaldson section, press archive |
| `/contact`             | Contact info + inquiry form (POSTs to `/api/contact`) |
| `/sitemap.xml`         | Auto-generated                                 |
| `/robots.txt`          | Auto-generated                                 |
| `/research/feed.xml`   | RSS feed (50 most recent notes)                |
| `/privacy`, `/terms`, `/form-adv`, `/code-of-ethics` | Disclosure pages |

## Local development

```bash
npm install
cp .env.example .env.local      # leave Sanity blank for Phase 1
npm run dev
```

## Build, lint, typecheck

```bash
npm run build
npm run lint
npm run typecheck
```

## Phase 2 — what's next

1. **WordPress body migration** — scraper has indexed all 203 posts. Next step is per-post body fetch + HTML → Portable Text conversion + image asset upload to Sanity.
2. **Sanity Studio at `/studio`** — schemas exist in plan; not wired.
3. **Visual editing + draft mode**.
4. **OG image generation** (Vercel `@vercel/og`).
5. **Plausible analytics**.
