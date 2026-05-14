# Deploy

## One-time Vercel setup

1. Go to https://vercel.com/new
2. Team scope: **AM Collective** (`am-collective`)
3. Import `adamwolfe2/parish`
4. Framework: **Next.js** (auto-detected)
5. Root directory: `./`
6. Build command: default (`next build`)
7. Output directory: default

Environment variables to set in the Vercel dashboard:

| Key | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://parishinvestments.com` | Used for canonical URLs, OG, sitemap, RSS |
| `RESEND_API_KEY` | (from resend.com) | Required for the contact form to actually deliver email |
| `CONTACT_FORM_TO` | `bill@billparish.com` | Optional — defaults to this |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `parishinvestments.com` | Optional — enables analytics if set |

After import, every push to `main` will auto-deploy production. Pushes to other branches → preview deploys.

## Resend setup (contact form)

1. Sign in at https://resend.com
2. Verify the domain that will send (likely `billparish.com` or `parishinvestments.com`)
3. Create an API key
4. Drop it in the Vercel env vars above

Until `RESEND_API_KEY` is set, the contact form accepts submissions and logs them server-side but does not forward email. The form UI still shows the success state to the user.

## Domain cutover

When ready to point parishinvestments.com at the new site:

1. Vercel project → Settings → Domains → add `parishinvestments.com` and `www.parishinvestments.com`
2. Update DNS at the registrar to point at the records Vercel shows
3. SSL provisions automatically
4. Verify the legacy permalink redirects work:
   - `/2012/02/22/inside-mitt-romneys-tax-return/` → `/research/inside-mitt-romneys-tax-return`
   - `/our-company` → `/about`
   - `/blog`, `/blog-2`, `/blog-3` → `/research`

## Verifying the build locally

```bash
npm install
npm run build      # 217 static pages + 203 OG images
npm run start      # serve the production build
```

Open http://localhost:3000.
