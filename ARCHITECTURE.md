# ARCHITECTURE.md

Deeper reference for webuybicycles.com.au. See `CLAUDE.md` for quick-start directives; this file
covers how the pieces fit together, the (very thin) data model, and known tech debt.

## Request flow, entry to output

1. **Build time**: `next build` statically prerenders every route (confirmed by README.md's build
   trace note — every route lists as `○ Static`). `app/robots.ts` and `app/sitemap.ts` are
   Metadata-route functions that resolve to `text/plain`/XML at build; `app/icon.tsx`,
   `app/apple-icon.tsx`, and `app/opengraph-image.tsx` use `next/og`'s `ImageResponse` to render PNGs
   at build, each reading `public/fonts/BricolageGrotesque-ExtraBold.ttf` from disk
   (`app/icon.tsx:16-18` et al.). There is no server runtime work at request time — Vercel serves
   static output from its CDN.
2. **`app/layout.tsx`** is the root: loads `Bricolage_Grotesque` (variable font, `axes: ["opsz","wdth"]`,
   `app/layout.tsx:9-14`) and `JetBrains_Mono` (`app/layout.tsx:16-21`) via `next/font/google`, both
   `display: "swap"`; builds the `metadata`/`viewport` exports (OG/Twitter cards, theme color);
   renders `<JsonLd/>` inside `<head>` (`app/layout.tsx:67`) and `<Analytics/>` (Vercel Web
   Analytics) after `{children}` inside `<body>` (`app/layout.tsx:71`).
3. **`app/page.tsx`** is the single route (`/`). It composes, in exact order:
   `Nav → (main: Hero → MarqueeStrip → HowItWorks → WhatWeBuy → SellForm → FAQ) → Footer →
   StickyMobileCTA → ToolbarBottomTint`. No component receives props — every one is invoked bare
   and pulls its own copy/config from a module-scope constant inside its own file.
4. **The only "backend" action anywhere** is `components/SellForm.tsx`'s submit handler: it
   validates client-side, builds a `wa.me` deep-link URL with `encodeURIComponent(buildMessage(form))`,
   and calls `window.open()` — the user's own WhatsApp app sends the message. No fetch, no API call,
   nothing persisted. Confirmed via repo-wide grep: zero `fetch(`/`axios`/`XMLHttpRequest` calls in
   `components/` or `app/`.

## Data model

There is no database. The entire "data layer" is a handful of plain TypeScript types/arrays:

- **`FormState`** (`components/SellForm.tsx:36-47`) — the intake form's shape: `name, suburb,
  type (BikeType | ""), brand, model, age, size, condition, price, notes`, all strings except
  `type`. Required fields per `validate()` (`SellForm.tsx:83-92`): `name`, `suburb`, `type`,
  `brand`, `age`, `condition` — `model`, `size`, `price`, `notes` are always optional.
  `buildMessage()` (`SellForm.tsx:65-81`) is the only transformation: `FormState` → a `\r\n`-joined
  WhatsApp message string, with empty optionals defaulting to `"–"` (or `"Open to offers"` for
  `price`).
- **`Faq`** (`lib/faqs.ts`) — `{ q: string; a: string }`, 8 entries, module-scope array. This exact
  array is imported and rendered by both `components/FAQ.tsx` (the visible accordion) and
  `components/JsonLd.tsx` (the `FAQPage` schema block) — one source of truth for both.
- **JSON-LD graph** (`components/JsonLd.tsx`) — a single `<script type="application/ld+json">`
  combining `LocalBusiness` (`@id` `${SITE_URL}/#business`, `addressRegion: "VIC"`, 24/7
  `openingHoursSpecification`, `sameAs` → Instagram), `FAQPage` (sourced from `lib/faqs.ts`), and
  `Service` (references the `LocalBusiness` by `@id`). Two hardcoded `GeoCircle` service areas:
  Melbourne CBD (50km radius) and Geelong CBD (25km radius) — deliberately two circles rather than
  one larger one, because a Melbourne-centered radius wide enough to reach Geelong would also sweep
  in unserviced far-north suburbs.

## Key abstractions

- **`components/Reveal.tsx`** — a generic scroll-reveal wrapper. Props: `children` (required),
  `className?`, `threshold?` (default 0.15). Internally: one `IntersectionObserver`, sets
  `data-revealed={true}` on its wrapper `<div>` on first intersection, then disconnects. Consuming
  components apply the `.reveal-fade` CSS class (`app/globals.css:355-365`) which reads that
  attribute to drive an
  opacity/translateY transition. Used by `FAQ.tsx`, `HowItWorks.tsx`, `SellForm.tsx`, `WhatWeBuy.tsx`
  — always wrapping just the section `<header>`.
- **The `data-nav-bg="dark"` DOM-attribute convention** — the site's only cross-component
  coordination channel (no React Context anywhere; confirmed by repo-wide grep for
  `createContext`/`useContext` returning zero matches). *Producers* (dark full-bleed sections):
  `Footer.tsx:8`, `MarqueeStrip.tsx:21`, `WhatWeBuy.tsx:25`. *Consumers* (poll it on scroll to flip
  their own light/dark treatment): `Nav.tsx:43-70`, `StickyMobileCTA.tsx:34-77`,
  `ToolbarBottomTint.tsx:32-58`. See Tech Debt below — this polling logic is copy-pasted three times.
- **`lib/site-status.ts`'s `PAUSED`** — a build-time boolean imported by Hero, Nav, SellForm,
  StickyMobileCTA, FAQ, WhatWeBuy, Footer, `app/error.tsx` and JsonLd. While true the page stays a
  static 200 with all copy indexable, but every intake path is removed: Hero renders a "Back soon."
  poster (with a `posterRef` the parallax effect falls back to), Nav adds a status strip *below*
  the wordmark row (keeping the iOS top-bar tint on the header's top edge), and SellForm's
  `PausedLock` blurs the form/preview inside an `inert` wrapper under a sticky notice card. When
  false, `PausedLock` is a bare fragment and every branch renders the original markup.
- **`lib/utils.ts`'s `cn()`** — a 5-line wrapper around `clsx` only (no `tailwind-merge`), used in
  2 of 12 components for conditional Tailwind classes.
- **Implicit DOM-id coupling**: `StickyMobileCTA.tsx` hides itself when `#sell` (the id
  `SellForm.tsx:151` sets on its wrapper div) scrolls into view, so the floating pill doesn't cover
  the submit button — there's no prop or event for this, just both files agreeing on the string
  `"sell"`.

## Third-party integrations

- **`@vercel/analytics`** (`^2.0.1`) — `<Analytics/>` mounted once in `app/layout.tsx:71`. `track()`
  custom events fired from exactly 3 places: `Footer.tsx:54` (`instagram_click`),
  `SellForm.tsx:129-132` (`whatsapp_open`, with `type`/`condition` metadata),
  `StickyMobileCTA.tsx:101` (`sticky_cta_tap`). No cookies involved (Vercel Web Analytics is
  cookieless).
- **`@radix-ui/react-accordion`** (`^1.2.2`) — the one client-side UI-library dependency, used bare
  (not via shadcn) only in `components/FAQ.tsx`. It's bundled into the page JS, not lazy-loaded.
- **`next/font/google`** — `Bricolage_Grotesque` (variable, `opsz`/`wdth` axes) and `JetBrains_Mono`,
  both self-hosted at build time by Next (no runtime Google Fonts calls). The Bricolage ExtraBold
  weight is *also* separately self-hosted as a static `.ttf` in `public/fonts/` because the three
  `next/og` image routes run outside the React tree and need to load a font file directly via
  Node's `fs.readFile`.
- **`next/og`** (`ImageResponse`) — powers `app/icon.tsx` (192×192, chosen as a multiple of 48 so
  Google Search accepts it), `app/apple-icon.tsx` (180×180), `app/opengraph-image.tsx` (1200×630).
- No other external APIs, SDKs, or services anywhere in the codebase.

## Build & deploy

Zero-config Vercel deploy (confirmed: no `vercel.json`/`vercel.ts` anywhere). `next.config.mjs` is
a single line (`reactStrictMode: true`) — no image domains, redirects, headers, or experimental
flags. Domain (`webuybicycles.com.au`) is registered at GoDaddy; README.md documents the DNS
handoff (either switch nameservers to Vercel's, or add A/CNAME records manually) — no CI/CD config
beyond Vercel's default git-push-to-deploy.

## Environment variables

**None.** Repo-wide `grep -rn 'process.env'` (excluding `node_modules`/`.next`/`.git`) returns zero
matches; no `.env*` files exist. `.gitignore:5` ignores `.env*.local` preemptively but nothing
currently uses it.

## Test setup

**None.** No test runner in `package.json` (scripts are only `dev`/`build`/`start`/`lint`), no
`*.test.*`/`*.spec.*` files, no `__tests__` directory anywhere in the repo.

## Surprising things / tech debt

1. **The `data-nav-bg` polling loop is independently reimplemented 3 times** — `Nav.tsx:43-70`,
   `StickyMobileCTA.tsx:34-77`, `ToolbarBottomTint.tsx:32-58` all run near-identical code
   (`querySelectorAll('[data-nav-bg="dark"]')` → compare `getBoundingClientRect()` against a
   viewport band → `setState`, each in its own rAF-throttled scroll/resize listener pair). A shared
   `useNavBgDark(band)` hook would collapse these into one; not done.
2. **Scroll-reveal has three distinct mechanisms**, not one: the `<Reveal>` component
   (IntersectionObserver → `data-revealed` → `.reveal-fade`), a hand-rolled second
   `IntersectionObserver` inside `HowItWorks.tsx:42-56` (used for the staggered `.step-rule`
   animation instead of extending `Reveal`), and pure CSS `animate-fade-up` with hardcoded
   `animation-delay` in `Hero.tsx:108,111` (no scroll-trigger at all, since it's above the fold).
3. **The hero is still the Unsplash placeholder**, self-hosted at `public/hero.jpg` (2400×3600).
   The source is pre-converted to greyscale (the CSS `grayscale(1)` filter hid the colour anyway)
   and `Hero.tsx` sets `quality={50}`. Together these cut served WebP sizes from ~188 KB → ~115 KB
   (phone, w=1200) and ~544 KB → ~276 KB (retina desktop, w=3840) with no visible change
   (verified by screenshot diff, 2026-10-10). Locally, `.next/cache/images` is keyed by URL not
   file contents, so swapping the file needs that cache cleared and the dev server restarted.
4. **The WhatsApp number is duplicated**: `SellForm.tsx:12` (`WHATSAPP_NUMBER`) and the `wa.me`
   link in `app/error.tsx:21`.
5. **`cn()` usage is inconsistent** — used in only 2 of 12 components (`Nav.tsx`, `SellForm.tsx`);
   the other 9 use plain template-literal string concatenation for conditional classes. Not
   incorrect, just not uniform.
6. **Three Tailwind color names, one CSS variable**: `oxblood`, `saffron`, and `accent` in
   `tailwind.config.ts:18-26` all resolve to `var(--color-accent)`. A comment
   (`tailwind.config.ts:7-16`) explains this is deliberate — names kept from a prior ("workshop")
   palette for diff-clarity even though the values were repointed to a single hi-vis yellow.
7. **No ESLint.** It isn't installed and there's no config, so `npm run lint` would prompt to set
   it up and `next build`'s lint step does nothing (type-checking still runs). `Hero.tsx:3` still carries an `eslint-disable` comment
   from an earlier setup.
8. **`dangerouslySetInnerHTML` in `JsonLd.tsx:116`** — the only use of it in the codebase. Justified
   inline by a comment: the JSON-LD graph is static, server-rendered, contains no user input, so
   there's no XSS surface. Correct reasoning, worth knowing it's there if `JsonLd.tsx` is ever
   changed to include dynamic data.
9. **`WHATSAPP_NUMBER` and the intake form intentionally have no phone field** — the visitor's
   number arrives with the WhatsApp message automatically, so the form only ever collects bike
   details. This is a documented decision (README.md "Decisions" section), not an oversight.
10. **`window.open()` ordering in `SellForm.tsx:112-141` is fragile-by-design** — it must fire
    before any `setState` call to stay inside the click's iOS Safari "transient activation window."
    Any future refactor of `onSubmit` that reorders these calls (e.g. to add a loading state before
    opening the link) would silently break WhatsApp-launch reliability on iOS 26 Safari specifically.

## Open questions for the user

- Will the Unsplash placeholder in `public/hero.jpg` be replaced with a real product photo?

Resolved 2026-10-10: `61422880536` is the live WhatsApp number; README.md's stale claims
(analytics, hero image, icon size, mobile preview, JS size) were corrected.
