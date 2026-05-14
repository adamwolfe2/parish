# Publishing research notes — Bill's guide

The new site has a built-in publishing tool ("Studio") that lives at:

> **https://parishinvestments.vercel.app/studio**

This guide walks Bill through everything he needs to publish a new
research note, manage topics, upload images, and have it appear on the
site within seconds.

There is **no FTP, no WordPress login, no plugin-update reminders**. You log
in once, write your note, hit **Publish**, and it goes live.

---

## One-time setup (Adam — do this before the demo)

1. Go to https://sanity.io/manage → **Create new project**
   - Project name: **Parish & Company**
   - Use default dataset configuration → **production**
2. Once created, copy the **Project ID** from the project dashboard
3. In Vercel project settings → Environment Variables, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = (the project ID from step 2)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_REVALIDATE_SECRET` = (any random 32-char string)
4. Sanity → API → CORS Origins → add:
   - `https://parishinvestments.vercel.app`
   - `http://localhost:3003` (for local dev)
5. Sanity → API → Webhooks → Add webhook:
   - Name: **Revalidate site on publish**
   - URL: `https://parishinvestments.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"`
   - Projection: `{ "slug": slug.current, "_type": _type }`
   - HTTP method: POST
6. Sanity → Members → Invite Bill by email as an **Editor**
7. Redeploy Vercel so the env vars take effect (Deployments → … → Redeploy)

Total time: **5–10 minutes**.

---

## Walking Bill through the publishing flow

### Step 1 — Log in to Studio

Bill opens https://parishinvestments.vercel.app/studio and signs in with
the Google or email link Sanity sent him after his invitation.

The first screen shows two content types in the left sidebar:

- **Research notes** — every published article
- **Topics** — the editorial categories that organize the archive

### Step 2 — Create a new research note

1. Click **Research notes** in the sidebar
2. Click the green **+** button (top right) → "New Research Note"
3. Fill in the fields:

| Field | What goes here |
| --- | --- |
| **Title** | The headline of the note (220 char max) |
| **Slug (URL)** | Auto-generated from the title. Click **Generate** if it doesn't appear. The slug becomes the URL: `/research/<slug>` |
| **Published** | Date and time of publication. Set this to "Now" for an immediate post, or schedule a future date. |
| **Dek / Excerpt** | 1–2 sentence summary. Shown on the archive list and on social-share cards. |
| **Topics** | Click **Add item** → choose existing topics, or create new ones inline |
| **Featured on home page?** | Toggle on to surface this note in the "Notable research" section on `/` |
| **Hero image** | Optional. Drag-and-drop a photo. Crop with the hotspot tool. |
| **Hero image caption** | Optional. Shown under the hero image. |
| **Original publication / URL** | If the note is republished from a media feature (e.g. WSJ), put the source name + link here. |
| **Body** | The article itself. See "Writing the body" below. |
| **Sources** | List of citations with label + URL. Renders as footnotes at the bottom of the article. |

### Step 3 — Writing the body

The body editor supports rich text with all the controls in the toolbar:

- **Headings** — Use H2 for major sections, H3 for sub-sections
- **Bold / italic / underline** — Standard formatting
- **Links** — Highlight text → click the link icon → paste URL
- **Bulleted / numbered lists**
- **Block quote** — For pulled quotes from other articles or sources
- **Images** — Drag-and-drop directly into the editor. Add a caption underneath.
- **Pull quote** — For dramatic mid-article quotes set apart from the body. (Click the **+** menu in the editor → Pull Quote)

If you paste from Word or another app, Sanity strips the messy formatting
and keeps the structure clean.

### Step 4 — Preview before publishing

In the top-right of the editor, click **▼ Publish** to expand the menu and
pick **Preview** if available — this opens the unpublished draft on the
real site so Bill can see it as a reader will.

(Note: preview mode requires one extra wiring step we can do after launch.
Until then, drafts only appear inside Studio.)

### Step 5 — Publish

When the note is ready:

1. Click the green **Publish** button (top right)
2. Within ~10 seconds the new note appears at:
   - `/research/<slug>` — the article page
   - `/research` — the archive index, sorted newest-first
   - `/research/topics` — under each tagged topic
   - The home page if **Featured** is toggled on
3. The RSS feed at `/research/feed.xml` updates automatically
4. The sitemap at `/sitemap.xml` updates automatically

### Step 6 — Editing or unpublishing later

- **Edit:** Find the note in the sidebar → make changes → click **Publish** again
- **Unpublish (keep as draft):** Click the **▼** next to Publish → **Unpublish**
- **Delete forever:** Click the **▼** menu → **Delete**

---

## Managing topics

Topics are the editorial categories that organize the archive (Corporate
Governance, Pensions & Retirement, Tax Policy, Microsoft & Tech, etc.).

1. Click **Topics** in the sidebar
2. **+** → Create new topic
3. Set **Title** + **Slug** + optional **Description**
4. Publish

Then on any research note, the **Topics** field will offer the new topic
as an option.

---

## Uploading photos / images

Sanity has a built-in image library with automatic resizing, format
conversion, and lazy loading:

1. In the editor → drag any image file into the body, or into the hero image field
2. Sanity uploads it, then offers a **Hotspot** crop tool to pick the focal point for different aspect ratios
3. Add **alt text** for accessibility (a brief description of what's in the image)
4. The image is served from Sanity's CDN at the right size for every device

Recommended image specs:
- **Hero images:** at least 1600 px wide, JPG or PNG
- **Inline body images:** at least 1200 px wide
- **Bill's headshot (already on site):** keep the current one or upload a new one anytime

---

## Migrating the historical archive (Phase 2 — when ready)

The 203 historical research notes from the old WordPress site are
currently rendered from file storage as a read-only archive. They appear
on the site and are searchable, but Bill cannot edit them in Studio yet.

When Bill is ready to start editing or updating those, we run the
migration script we already built (`scripts/scrape-bodies.mjs` + a
companion importer) that pulls the file content into Sanity as proper
documents. After that, every research note — old and new — is editable
from Studio.

---

## Common questions

**Q: What if I make a typo and need to fix a published note?**
A: Edit the note in Studio → click **Publish**. The change appears within
about 10 seconds.

**Q: What if I want to write a draft and save it without publishing?**
A: Just stop editing. Sanity auto-saves your draft. The note doesn't go
live until you click **Publish**. You can come back to it any time.

**Q: Can I schedule a note to publish later?**
A: Set the **Published** date to a future time. The note becomes visible
on the site at that moment automatically.

**Q: Can I have someone else log in and write a guest piece?**
A: Yes. In sanity.io/manage → Members → Invite by email. Roles available:
Viewer, Editor, Administrator.

**Q: What happens to my work if the internet goes down mid-edit?**
A: Sanity auto-saves continuously. When you come back, your draft is
exactly where you left it.

**Q: How do I include a PDF (e.g., a quarterly letter)?**
A: Drag the PDF into the body. Sanity uploads it and creates a link. The
PDF is served from Sanity's CDN.

**Q: What if I want to fix a typo in an old WordPress post?**
A: For now, those are read-only. We can either edit them by hand and
redeploy, or wait until we migrate them into Sanity (Phase 2).

---

## What this costs

- **Sanity free tier:** 3 users, 10K documents, 500K API requests/month,
  100GB CDN bandwidth. Parish & Company will be well under all of these.
- **Cost above free tier:** $99/month for the Growth plan (only needed if
  you exceed 3 users, which is unlikely).

---

## If something goes wrong

- **Studio doesn't load:** Likely a CORS issue. Adam should check
  https://sanity.io/manage → API → CORS Origins includes
  `https://parishinvestments.vercel.app`.
- **A published note doesn't appear on the site:** Wait 30 seconds, then
  hard-refresh the page (Cmd+Shift+R). If still missing, Adam can
  manually re-deploy via Vercel.
- **The editor is missing fields:** Sanity schemas live in the codebase.
  Adam updates them via a code change and redeploy.

---

## Adam's contact

For anything that needs a code change or backend tweak, message Adam.
The Studio itself is self-serve; everything below the surface is in the
Next.js codebase.
