# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## What this is

Single-page marketing site for **We Buy Bicycles**, a Melbourne + Geelong cash-for-used-road-bikes
business. No backend: the "form submission" is a client-side WhatsApp deep link
(`components/SellForm.tsx`), nothing is persisted, nothing is fetched. Confirmed: no database, no
ORM, no `app/api/` routes, no auth, no test suite, no environment variables, no `vercel.json`.

Stack: **Next.js 14.2.35 (App Router) · React 18.3.1 · TypeScript 5.6.3 · Tailwind CSS 3.4.15**,
npm (not pnpm/yarn — `package-lock.json` is the lockfile), deployed on Vercel, domain at GoDaddy.

## Commands

```bash
npm run dev     # local dev server, http://localhost:3000
npm run build   # production build — every route is statically prerendered
npm run start   # serve the production build
npm run lint    # next lint
```

There is no test command and no test files anywhere in the repo. There is nothing to run after
changes (no codegen, no migrations, no schema sync) — this is a purely static site.

## Directory map

```
app/
  layout.tsx            Root layout: loads 2 Google Fonts via next/font, sets metadata/viewport,
                         renders <JsonLd/> in <head>, <Analytics/> (Vercel) after children in <body>
  page.tsx               The entire site: composes all section components in render order
  globals.css            Brand CSS vars, base styles, .btn-*/.field-*/.radio-tile/.reveal-fade etc.
  error.tsx               Client error boundary ("Something broke.")
  not-found.tsx           404 ("Off the map."), noindex
  robots.ts, sitemap.ts   Generated robots.txt / sitemap.xml (one URL — it's a one-page site)
  icon.tsx, apple-icon.tsx, opengraph-image.tsx   next/og-generated images (see Gotchas)
  favicon.ico             Static fallback icon alongside the generated icon.tsx

components/               One file per page section, each self-contained with its own copy/data
  Nav.tsx, Hero.tsx, MarqueeStrip.tsx, HowItWorks.tsx, WhatWeBuy.tsx, SellForm.tsx, FAQ.tsx,
  Footer.tsx, StickyMobileCTA.tsx, ToolbarBottomTint.tsx, JsonLd.tsx, Reveal.tsx (shared wrapper)

lib/
  faqs.ts                Source-of-truth FAQ array — shared by FAQ.tsx AND JsonLd.tsx's FAQPage
  utils.ts                cn() — a bare clsx wrapper, no tailwind-merge

public/
  fonts/BricolageGrotesque-ExtraBold.ttf   Read from disk by the three next/og routes
  hero.jpg                                  Hero background photo (see Gotchas)
```

## Conventions this codebase actually follows

- **Every component is `export default function Name()`.** No named exports of the main
  component, no `React.FC`. Small inline subcomponents (icons, tiny pieces) are unexported plain
  `function Name() {}` declarations in the same file — never split into separate files.
- **Prop types are always inline type literals at the call site**, never an exported
  `interface`/`type`. See `components/Reveal.tsx` or the `Field`/`SelectField` helpers in
  `components/SellForm.tsx` for the pattern. Follow this — don't introduce a shared props-types file.
- **Client vs. Server Components is deliberate and minimal.** Only 3 of 12 files under
  `components/` are Server Components (`JsonLd.tsx`, `MarqueeStrip.tsx`, `WhatWeBuy.tsx` — none
  have `"use client"`); the other 9 have `"use client"` as line 1 and are exactly the ones using
  `useState`/`useEffect`/click handlers. Don't add `"use client"` to a component unless it actually
  needs interactivity.
- **No React Context anywhere.** Cross-component state is coordinated entirely through the DOM —
  see `data-nav-bg` in Gotchas below. Don't reach for Context; follow the existing DOM-attribute
  pattern for anything similar, or better, extract a shared hook (see tech debt in ARCHITECTURE.md).
- **`cn()` from `lib/utils.ts`** is used in exactly 2 of 12 components (`Nav.tsx`, `SellForm.tsx`)
  for conditional classes; everywhere else conditional classes are plain template-literal string
  concatenation. Either is acceptable here — this is not a project-wide rule to enforce, just
  observed inconsistency (see ARCHITECTURE.md).
- **All configuration lives in module-scope constants inside the component that uses it**
  (`WHATSAPP_NUMBER` in `SellForm.tsx`, `HERO_IMAGE` in `Hero.tsx`, `SITE_URL` in `JsonLd.tsx`).
  No component ever receives props from `app/page.tsx` — every one is invoked bare (`<Hero />`).
  When asked to make something configurable, follow this pattern rather than introducing new
  prop-drilling or a central config file.
- **Motion always respects `prefers-reduced-motion`** — either via the global CSS override in
  `app/globals.css:388-397`, a `motion-reduce:` Tailwind variant, or an explicit
  `window.matchMedia("(prefers-reduced-motion: reduce)")` check (e.g. `Hero.tsx:26`). Any new
  animation must do one of these.
- **Brand colors live in two places that must stay in sync**: CSS custom properties in
  `app/globals.css:9-16` (`--color-paper`, `--color-ink`, `--color-muted`, `--color-accent`,
  `--color-rule`) and their Tailwind aliases in `tailwind.config.ts:18-26`. Note `oxblood`,
  `saffron`, and `accent` are three Tailwind names for the *same* CSS var (`--color-accent`) —
  legacy naming from a prior palette, kept for diff-clarity per a comment in `tailwind.config.ts:7-16`.
  Edit `globals.css` only; the Tailwind config doesn't need touching for a color-value change.

## Known gotchas

- **iOS 26 Safari toolbar-tint workaround spans 3 files** — don't "simplify" any of these without
  understanding why they exist: `Nav.tsx` (sticky header handles the top bar directly by swapping
  bg color), `ToolbarBottomTint.tsx` (an invisible 12px fixed strip purely to give Safari something
  to sample for the bottom bar), and `StickyMobileCTA.tsx` (transparent fixed wrapper + absolute
  child + full DOM unmount when hidden, rather than CSS visibility). All three independently
  re-implement the same `data-nav-bg` polling loop (see ARCHITECTURE.md for the duplication).
- **`data-nav-bg="dark"` is the site's only cross-component coordination mechanism.** Any full-bleed
  dark section sets this attribute (`Footer.tsx:8`, `MarqueeStrip.tsx:21`, `WhatWeBuy.tsx:25`);
  `Nav.tsx`, `StickyMobileCTA.tsx`, and `ToolbarBottomTint.tsx` each poll
  `document.querySelectorAll('[data-nav-bg="dark"]')` on scroll to decide their own light/dark
  treatment. Preserve this convention for any new dark section — don't invent a new mechanism.
- **The WhatsApp message must use `\r\n`, not `\n`.** `buildMessage()` in `SellForm.tsx:65-81`
  joins lines with `"\r\n"` deliberately — iOS WhatsApp's `wa.me` URL handler drops plain LF line
  breaks. Preserve this if you touch `buildMessage()`.
- **`window.open()` for the WhatsApp link must stay synchronous inside the click handler**
  (`SellForm.tsx:122-128`) — it's called before any `setState`, specifically to stay inside the
  click's "transient activation window," which iOS 26 Safari shrinks to ~0.5s. Moving it after
  `track()` or a state update risks the popup getting blocked.
- **`WHATSAPP_NUMBER` (`SellForm.tsx:12`) is flagged in its own preceding comment as a placeholder
  to replace** ("CONFIG – change me when you have the real number") — verify with the user before
  assuming `61422880536` is the live production number.
- **`Hero.tsx`'s top comment is stale.** It says "PLACEHOLDER PHOTO: sourced from Unsplash"
  (`Hero.tsx:10`), but `HERO_IMAGE.src` (`Hero.tsx:16`) is already `"/hero.jpg"`, a locally self-hosted
  file in `public/`. `next.config.mjs` has no `images.remotePatterns` block (nothing hotlinks
  Unsplash anymore) — this matches README.md's documented "how to swap the hero image" instructions
  having already been carried out, just without updating the comment.
- **README.md has one stale claim**: it says "no analytics" (README.md:5-6), but
  `@vercel/analytics` is a real dependency and `<Analytics />` is mounted in `app/layout.tsx:71`,
  with `track()` calls in `Footer.tsx:54`, `SellForm.tsx:129-132`, and `StickyMobileCTA.tsx:101`.
  Trust the code over that line of the README.
- **The favicon is 192×192, not the usual 16/32/64**, deliberately — `app/icon.tsx:5-11` explains
  Google Search only accepts favicon sizes that are multiples of 48.
