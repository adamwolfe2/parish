# Parish & Company — Phase 1 Execution Plan

## Scope Covered
This plan translates the PRD into concrete implementation work for **Phase 1**:

1. Design system foundations (typography, colors, spacing, breakpoints)
2. Static marketing routes:
   - `/`
   - `/philosophy`
   - `/about`
   - `/contact`
3. Layout primitives:
   - Top navigation
   - Contact strip
   - Footer
4. Motion system (3 approved patterns only)
5. Content authoring in `/content/*.md` for easy swap in Phase 2

## Proposed Build Order

### 1) Foundation and app skeleton
- Initialize Next.js 15 App Router with TypeScript strict + Tailwind v4.
- Configure base route groups:
  - `app/(marketing)/page.tsx`
  - `app/(marketing)/philosophy/page.tsx`
  - `app/(marketing)/about/page.tsx`
  - `app/(marketing)/contact/page.tsx`
- Add shared site layout in `app/layout.tsx`.

### 2) Design tokens and typography
- Implement color tokens in CSS variables:
  - Bone `#F7F4EE`
  - Mist `#EBE6DD`
  - Basalt `#1A1F2B`
  - Slate `#525866`
  - Moss `#4A6B4F`
  - Brass `#A88B5C`
  - Ink `#14171F`
- Configure fonts via `next/font/google`:
  - Source Serif 4 (display)
  - Inter (body)
  - JetBrains Mono (tabular)
- Create utility classes for editorial rhythm and max widths.

### 3) Content model for Phase 1
- Add markdown files:
  - `content/home.md`
  - `content/philosophy.md`
  - `content/about.md`
  - `content/contact.md`
  - `content/site-settings.md`
- Build a lightweight content loader to map frontmatter + sections into page components.
- Keep JSX free of hardcoded body copy.

### 4) Layout primitives
- `components/layout/Nav.tsx`
  - Four-item nav: Research, Philosophy, About, Contact
- `components/layout/ContactStrip.tsx`
  - Dark full-width contact band
- `components/layout/Footer.tsx`
  - Nav links, disclosure links, fiduciary line

### 5) Editorial components (static only in Phase 1)
- Hero block
- Publication wordmark strip (text placeholders until final assets)
- Latest research teaser cards (placeholder entries)
- Philosophy summary + framework table
- About summary + headshot placeholder container

### 6) Motion system (Framer Motion)
Only three patterns from PRD:
1. Scroll fade-up for major sections
2. Link/card hover transitions
3. Page transition fade

Guardrails:
- No parallax systems beyond hero styling
- No counters, blobs, cursor trails, bouncing arrows
- Keep transitions subtle and brief

### 7) Responsiveness and QA
- Mobile-first build
- Breakpoints aligned to PRD:
  - Mobile baseline
  - Tablet around 768px+
  - Desktop around 1024px+
- Manual QA for typography scale, spacing rhythm, and readability.

## Acceptance Checklist (Phase 1)
- [ ] Static pages render with editorial tone and visual hierarchy.
- [ ] All copy is sourced from markdown under `/content`.
- [ ] Color palette and typography strictly match PRD tokens.
- [ ] Layout primitives are shared and reusable.
- [ ] Motion system implements only the three approved patterns.
- [ ] `next build` passes with zero TypeScript errors.
- [ ] `next lint` passes with zero warnings.

## Risks / Dependencies
- Dependency installation currently blocked by npm registry access in this environment.
- Without package installation, full Next.js implementation and validation cannot run locally.
- Once package access is available, this plan can be executed directly in a single implementation branch.
