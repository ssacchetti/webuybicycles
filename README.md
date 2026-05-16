# We Buy Bicycles – webuybicycles.com.au

Single-page marketing site for a Melbourne + Geelong business that pays cash
for used road bikes. The intake form opens WhatsApp with a pre-filled
message – there's no backend, no database, no API routes, no analytics, no
cookies.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS**, deployed
on Vercel, domain at GoDaddy.

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

Every route is statically prerendered at build time (the build trace lists
each one as `○ Static`), including the dynamic-looking ones like
`/sitemap.xml`, `/robots.txt`, `/opengraph-image`, and the favicons –
those are all `next/og` and Metadata routes that resolve to PNGs / text
at build. Output is therefore CDN-friendly and Node-free at request time;
Vercel just serves it.

## Deploy to Vercel

Zero configuration:

1. Push the repo to GitHub / GitLab / Bitbucket.
2. In the Vercel dashboard, **Add New Project** → import the repo.
3. Accept the defaults (Vercel auto-detects Next.js) and **Deploy**.
4. Add `webuybicycles.com.au` (and `www.webuybicycles.com.au`) in
   **Settings → Domains**. Vercel will print the exact DNS values you need.
5. At GoDaddy, go to **DNS Management** (NOT the "Connect to any website"
   / "Forward to any site" wizard – that's a 301 redirect, not real
   hosting). Either:
   - **Easiest:** switch nameservers to `ns1.vercel-dns.com` +
     `ns2.vercel-dns.com`. DNS becomes Vercel's problem after that.
   - **Or:** keep GoDaddy's nameservers and add the A / CNAME records
     Vercel shows you.
6. Wait for propagation (usually minutes; up to 48h worst case). Vercel
   auto-issues an SSL cert once DNS resolves.

No environment variables. No build overrides. No `vercel.json`.

---

## What to change, and where

All customisation points are intentionally small and obvious.

### WhatsApp number

**File:** `components/SellForm.tsx` (top of file)

```ts
const WHATSAPP_NUMBER = "61422880536";
```

International format, no `+`, no spaces, no hyphens. (e.g. `+61 422 880 536`
becomes `61422880536`.)

### Brand colours

Defined as CSS custom properties at the top of `app/globals.css` and read
through Tailwind via `tailwind.config.ts`. Editing `globals.css` is enough –
Tailwind classes (`bg-paper`, `text-ink`, `text-accent`, etc.) pick up the
change automatically.

```css
:root {
  --color-paper:        #ffffff;            /* page background  */
  --color-ink:          #0a0a0a;            /* type, borders    */
  --color-muted:        #6e6e6e;            /* secondary text   */
  --color-accent:       #eaff00;            /* hi-vis yellow    */
  --color-rule:         rgba(10,10,10,.10); /* hairline rule    */
  --color-rule-strong:  rgba(10,10,10,.85);
}
```

### Fonts

**File:** `app/layout.tsx`. Two Google Fonts loaded via `next/font` (no
licence or runtime-call concerns):

- **Bricolage Grotesque** – variable font (axes: `opsz`, `wdth`). Used for
  both display and body, with CSS `font-variation-settings` switching
  between condensed-poster mode for headings and normal-width mode for
  paragraph text.
- **JetBrains Mono** – used for eyebrows, form labels, and the marquee
  ticker.

The Bricolage TTF is also self-hosted at `public/fonts/` as a fallback.

### Copy

Each section is its own file under `components/`, with copy held in plain
data arrays / strings at the top:

| Section            | File                                                |
| ------------------ | --------------------------------------------------- |
| Top nav links      | `components/Nav.tsx`                                |
| Marquee strip      | `components/MarqueeStrip.tsx`                       |
| Hero copy          | `components/Hero.tsx`                               |
| Process steps      | `components/HowItWorks.tsx`                         |
| In/out of scope    | `components/WhatWeBuy.tsx`                          |
| Form fields        | `components/SellForm.tsx`                           |
| WhatsApp message   | `components/SellForm.tsx` → `buildMessage()`        |
| FAQ items          | `lib/faqs.ts` (rendered by `components/FAQ.tsx`)    |
| Footer             | `components/Footer.tsx`                             |
| 404 page           | `app/not-found.tsx`                                 |
| Runtime error page | `app/error.tsx`                                     |

### Hero image

**File:** `components/Hero.tsx`

```ts
const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1605271864611-58dd08d10547?...",
  alt: "A used bicycle",
};
```

Currently an Unsplash placeholder (free under the Unsplash License, treated
to high-contrast grayscale at opacity 0.4 so it sits behind the type). To
swap to a local photo:

1. Drop the file into `public/` (e.g. `public/hero.jpg`).
2. Change `HERO_IMAGE.src` to `"/hero.jpg"`.
3. Update `HERO_IMAGE.alt` to describe the actual photo.
4. Remove the `images.remotePatterns` block in `next.config.mjs` – no longer
   needed once nothing's hotlinking Unsplash.

### Structured data / JSON-LD

**File:** `components/JsonLd.tsx`

Emits LocalBusiness + FAQPage + Service in a single `<script>` tag. The
service-area is encoded as two `GeoCircle` entries (Melbourne CBD with a
50km radius and Geelong CBD with a 25km radius) rather than a single
larger circle, because a Melbourne-centred radius that covered Geelong
would also sweep in far-north suburbs that aren't actually serviced.

Update the constants at the top (`SITE_URL`, `serviceAreas`, `sameAs`) when
adding social profiles or expanding the service area.

---

## Project structure

```
app/
  apple-icon.tsx         180×180 home-screen icon, generated by next/og
  error.tsx              Runtime error boundary ("Something broke.")
  globals.css            Brand tokens, base styles, .eyebrow, .btn-*,
                         form styles, scroll-reveal classes, motion-reduce
  icon.tsx               64×64 favicon, generated by next/og
  layout.tsx             Root layout – fonts, metadata, viewport, JsonLd
  not-found.tsx          404 ("Off the map.")
  opengraph-image.tsx    1200×630 social card, generated by next/og
  page.tsx               Composition of all sections, in order
  robots.ts              Built-in robots.txt route
  sitemap.ts             Built-in sitemap.xml route

components/
  Nav.tsx              Sticky top nav, scroll-driven dark/light theming,
                       mobile hamburger → fullscreen overlay (unmounts when
                       closed for iOS 26 toolbar-tinting safety)
  Hero.tsx             Poster hero with parallax image + headline
                       (prefers-reduced-motion honoured)
  MarqueeStrip.tsx     Black/yellow ticker (CSS animation, pauses for
                       prefers-reduced-motion)
  HowItWorks.tsx       Four numbered cards with staggered rule-reveal on
                       scroll-into-view (IntersectionObserver)
  WhatWeBuy.tsx        Two-column in-scope / out-of-scope list, dark section
  SellForm.tsx         Intake form with radio tiles, selects, validation,
                       live message preview (desktop only), WhatsApp deep
                       link with CRLF newlines for iOS WhatsApp's URL
                       handler
  FAQ.tsx              Radix Accordion, custom inline keyframes for the
                       height transition
  Footer.tsx           Big wordmark, contact column, navigation column,
                       dark section
  StickyMobileCTA.tsx  Mobile-only floating pill (rounded-full bg-ink, or
                       bg-accent when over a dark section). Transparent
                       fixed wrapper + absolute child + unmount-when-hidden
                       so iOS 26 Safari can't sample its colour for the
                       URL-bar tint.
  JsonLd.tsx           Schema.org graphs – LocalBusiness, FAQPage, Service
  Reveal.tsx           IntersectionObserver wrapper that toggles
                       data-revealed on its children, used with the
                       .reveal-fade CSS class

lib/
  faqs.ts              Source-of-truth FAQ array (rendered by FAQ.tsx and
                       embedded in the FAQPage schema)
  utils.ts             cn() className helper

public/
  fonts/               Self-hosted Bricolage Grotesque TTF
```

---

## Design direction

- **Concept:** a hi-vis classified ad. Loud, confident, plainspoken – not
  a "modern SaaS" landing page and not a craftsy workshop site. The
  hierarchy puts the wordmark and the action first.
- **Palette:** white paper (`#FFFFFF`), ink black (`#0A0A0A`), hi-vis
  highway yellow (`#EAFF00`) as the only accent. No gradients, no soft
  pastels, no oxblood/saffron warmth. Sections alternate light and dark
  for rhythm.
- **Typography:** Bricolage Grotesque used across both display and body,
  with the variable axes (`opsz`, `wdth`) flipping between condensed
  poster-mode for headings and normal mode for paragraphs. JetBrains Mono
  for eyebrows and form labels (the "§ 01 – Process" pattern).
- **Voice:** short, blunt, dry. "Four steps. That's it." / "Off it goes." /
  "Off the map." Half the copy is one or two words.
- **Motion:** scroll-reveals (opacity + small translateY), a parallax hero,
  a staggered yellow-rule reveal on the steps, an infinite marquee. All
  honour `prefers-reduced-motion`.

---

## Decisions

A few judgement calls worth remembering when extending the site:

- **Next 14.2.x on React 18.** The site needs nothing 15-only and 14 has
  the widest deployment history.
- **Tailwind v3 over v4** for ecosystem stability and Vercel build
  determinism.
- **No `lucide-react`.** The handful of icons (WhatsApp glyph, arrows,
  plus, hamburger) are inlined SVGs. Keeps runtime deps to four packages.
- **Radix Accordion for the FAQ.** Same primitive shadcn wraps, but used
  bare – the rest of the site is custom Tailwind styling that wouldn't
  benefit from a component library.
- **No phone field in the intake form.** The user is on WhatsApp at the
  point of submit; their number reaches us automatically.
- **Live "carbon-copy" preview** of the WhatsApp message on desktop only.
  Reassures the user what they're about to send. Hidden on mobile to save
  vertical space.
- **No email.** WhatsApp is the single contact channel. Setting up
  `hello@webuybicycles.com.au` was out of scope for launch; the schema
  and footer reflect that.
- **`data-nav-bg="dark"`** convention. Any section that's a dark slab
  marks itself with this attribute; the top nav and the sticky mobile CTA
  watch the attribute and flip their colour treatment when scrolled over.
- **Sticky mobile CTA is iOS-26-aware.** A `position: fixed` wrapper that
  paints anything (background-color, backdrop-filter) – even at opacity
  0 – gets sampled by iOS 26 Safari for its translucent URL-bar tint. The
  pill works around this with a transparent fixed wrapper, an absolute
  child carrying the visual bg, and a full unmount when offscreen. The
  mobile menu overlay follows the same pattern.
- **CRLF newlines (`\r\n`) for the WhatsApp message.** iOS WhatsApp's
  `wa.me` URL handler is unreliable with bare LF newlines; `\r\n`
  (`%0D%0A` after encoding) preserves the line breaks consistently.

---

## Performance notes

- Fonts loaded via `next/font` with `display: "swap"` – no FOIT, minimal
  layout shift.
- Hero image set to `priority` (LCP candidate). All other imagery is
  generated server-side via `next/og` (favicons, social card).
- One client-side dependency (`@radix-ui/react-accordion`) gated behind
  the FAQ section. Everything else is server-rendered HTML and CSS.
- No third-party scripts, no analytics, no cookies → no consent banner
  needed.
- Total first-load JS: **~98 kB**.

If you swap the Unsplash hero for a real photo, run it through `next/image`
or pre-compress it – that's typically the next-biggest perf win.
