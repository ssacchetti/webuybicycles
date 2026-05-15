# We Buy Bikes — webuybikes.com

A single-page marketing site for a workshop that buys, refurbishes, and resells
road and mountain bikes. The submission form opens WhatsApp with a prefilled
message — there is no backend, no database, and no API routes.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS**.

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build for production

```bash
npm run build
npm run start
```

The page is statically prerendered, so output works on any static host.

## Deploy to Vercel

This project deploys to Vercel with **zero configuration**:

1. Push the repo to GitHub / GitLab / Bitbucket.
2. In the Vercel dashboard, *Add New Project* → import the repo.
3. Accept the defaults (Vercel detects Next.js) and *Deploy*.
4. Point the `webuybikes.com` domain at the project in *Settings → Domains*.

No environment variables. No build overrides.

---

## What to change, and where

All customization points are intentionally small and obvious.

### WhatsApp number

**File:** `components/SellForm.tsx` (top of file)

```ts
const WHATSAPP_NUMBER = "0000000000"; // TODO: replace with real number
```

Use international format with no `+`, spaces, or hyphens. For example, a South
African number `+27 82 123 4567` becomes `27821234567`.

### Brand colours

Defined in **two synced places** — change both:

**File:** `app/globals.css` (CSS variables at the top, lines ~10–17)

```css
:root {
  --color-paper: #f2ebdd;
  --color-ink: #1a1612;
  --color-muted: #6b5e4d;
  --color-oxblood: #7a1f1a;
  --color-saffron: #d4a03b;
  --color-rule: rgba(26, 22, 18, 0.12);
}
```

**File:** `tailwind.config.ts` — the `theme.extend.colors` block already reads
from those CSS variables, so editing `globals.css` is enough.

### Fonts

**File:** `app/layout.tsx` (lines ~5–28). Currently uses
**Fraunces** (display), **Hanken Grotesk** (body), and **JetBrains Mono**
(labels). All Google Fonts, loaded with `next/font` — no licence concerns.

### Copy

Each section is in its own file under `components/`, with the copy held in
plain data arrays at the top of the file:

| Section          | File                              |
|------------------|-----------------------------------|
| Top nav links    | `components/Nav.tsx`              |
| Marquee strip    | `components/MarqueeStrip.tsx`     |
| Hero copy        | `components/Hero.tsx`             |
| Process steps    | `components/HowItWorks.tsx`       |
| In/out of scope  | `components/WhatWeBuy.tsx`        |
| Form fields      | `components/SellForm.tsx`         |
| WhatsApp message | `components/SellForm.tsx` → `buildMessage()` |
| FAQ items        | `components/FAQ.tsx`              |
| Footer contact   | `components/Footer.tsx`           |

### Replacing placeholder photos

Three placeholder images are loaded from **Unsplash** (free to use under the
Unsplash License) and rendered through `next/image`. Each one is defined as
a small `const` at the top of its component file so they're trivial to swap:

| Slot           | File                            | Constant         |
|----------------|---------------------------------|------------------|
| Hero photo     | `components/Hero.tsx`           | `HERO_IMAGE`     |
| Before / After | `components/WhatWeBuy.tsx`      | `BEFORE_AFTER`   |

To replace with your own workshop photography:

1. Drop the file(s) into `public/` (e.g. `public/hero.jpg`).
2. Change the `src` to a root-relative path: `"/hero.jpg"`.
3. Update the `alt` text to describe the actual photo.
4. Once all Unsplash URLs are gone, you can delete the
   `images.remotePatterns` block in `next.config.mjs`.

---

## Project structure

```
app/
  layout.tsx       Root layout — fonts and metadata
  page.tsx         Composition of all sections
  globals.css      Brand tokens, base styles, form styles, paper-grain texture

components/
  Nav.tsx              Sticky top nav, scroll-aware blur
  Hero.tsx             Masthead-style hero
  MarqueeStrip.tsx     Black/cream marquee under hero
  HowItWorks.tsx       Four numbered steps
  WhatWeBuy.tsx        Two-column scope (dark section)
  SellForm.tsx         Intake form + live message preview + WhatsApp deep link
  FAQ.tsx              Accordion (Radix primitive)
  Footer.tsx           Wordmark, contact, copyright
  StickyMobileCTA.tsx  Bottom bar, mobile only, hides while form is in view

lib/
  utils.ts             `cn()` className helper
```

---

## Design direction (the brief, summarised)

- **Concept:** workshop intake form meets editorial masthead. Trustworthy local
  trade business with a quiet sense of craft — not "modern SaaS."
- **Palette:** warm paper cream background (`#F2EBDD`), espresso ink type
  (`#1A1612`), deep oxblood primary (`#7A1F1A`), sharp saffron accent
  (`#D4A03B`).
- **Typography:** Fraunces (display, variable — tuned softer and chunkier at
  large sizes), Hanken Grotesk (body), JetBrains Mono (eyebrows / form labels).
- **Differentiator:** the form is treated as a real paper intake document with
  monospace uppercase labels and underline-only inputs, paired with a live
  "carbon copy" preview of the WhatsApp message.

## Decisions I made

A few judgement calls where the brief left room:

- **Tailwind v3 over v4** for ecosystem stability and Vercel build determinism.
- **Next 14.2.x over Next 15.** Next 14 is on React 18 with widest deployment
  history; the site needs nothing 15-only.
- **No `lucide-react` dependency.** The few icons (WhatsApp glyph, arrows,
  plus) are inlined SVGs. Keeps the dependency list to four runtime packages.
- **shadcn/ui scoped to one component.** Form controls are custom-styled to
  match the intake-document aesthetic — default shadcn inputs would have
  clashed. The FAQ uses Radix Accordion (the same primitive shadcn wraps) for
  smooth, accessible expand / collapse.
- **No phone field in the form.** The user is already on WhatsApp at the
  point of submit; asking for a number again would be friction with no value.
  The phone number reaches us automatically when they hit send.
- **Live "carbon copy" preview on desktop** of the WhatsApp message. Reinforces
  the workshop-intake metaphor and reassures the user what's about to be sent.
  Hidden on mobile to save vertical space.
- **Marquee strip pauses for `prefers-reduced-motion`** rather than being
  removed entirely — the static content still reads as a list of trust signals.
- **Sticky mobile CTA hides while the form is in view** so it never overlaps
  the actual submit button.

---

## Lighthouse notes

- Static prerendered (no client-side route logic).
- Fonts loaded via `next/font` with `display: swap` — no layout shift.
- One client-side dependency (Radix Accordion) gated behind a small interactive
  section. Everything else is server-rendered HTML and CSS.
- Total First Load JS: ~98 kB.

If you add real photos, run them through Next's image optimizer (`next/image`)
or pre-compress them — that's typically the next-biggest win.
