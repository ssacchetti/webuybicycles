/* eslint-disable react/no-unescaped-entities */
// Masthead-style hero. Wordmark anchors the page. Single italic accent on
// "bikes" to give the typography a moment of warmth.
//
// PLACEHOLDER PHOTO: the hero image is sourced from Unsplash. Replace with a
// real workshop shot by dropping a file into /public and swapping `HERO_IMAGE`.

import Image from "next/image";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1605271864611-58dd08d10547?w=1800&q=70&auto=format&fit=crop",
  alt: "A bicycle workshop interior — placeholder image",
};

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-page px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12 lg:pb-28 lg:pt-20">
        {/* Top eyebrow row — feels like a masthead dateline */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 sm:mb-16">
          <span className="eyebrow">
            <span className="dot mr-2" />
            Now buying — Road &amp; Mountain
          </span>
          <span className="eyebrow hidden sm:inline">
            Vol. 01 · The Workshop
          </span>
        </div>

        <h1 className="font-display display-tight text-[clamp(3.4rem,11vw,9.5rem)] font-medium">
          <span className="block opacity-0 [animation-delay:60ms] animate-fade-up">
            We&nbsp;buy
          </span>
          <span className="block opacity-0 [animation-delay:220ms] animate-fade-up">
            your&nbsp;old{" "}
            <em
              className="not-italic font-display"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1, "slnt" -8',
                color: "var(--color-oxblood)",
              }}
            >
              bikes
            </em>
            .
          </span>
        </h1>

        {/* Sub-deck */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-6 opacity-0 [animation-delay:380ms] animate-fade-up">
            <p className="max-w-prose text-[1.2rem] leading-[1.5] text-ink sm:text-[1.32rem]">
              Got a road or mountain bike sitting in the garage? We&apos;ll take a
              look, make you a fair offer, and pick it up. Any condition — even
              the ones you&apos;d call &ldquo;parts only.&rdquo;
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#sell" className="btn-primary">
                Sell your bike
                <ArrowRight />
              </a>
              <a href="#how-it-works" className="btn-ghost">
                How it works
                <ArrowDown />
              </a>
            </div>
          </div>

          {/* Right-side notation — feels like a clipped-on workshop tag */}
          <aside
            aria-hidden="true"
            className="hidden md:col-span-5 md:col-start-8 md:block lg:col-span-4 lg:col-start-9"
          >
            <div className="relative border border-rule bg-paper/40 p-6 opacity-0 [animation-delay:540ms] animate-fade-up">
              <div className="absolute -top-3 left-5 bg-paper px-2">
                <span className="eyebrow">Workshop notes</span>
              </div>
              <ul className="space-y-3.5 text-[0.95rem]">
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-cap text-muted">
                    Offer in
                  </span>
                  <span>24–48 hrs</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-cap text-muted">
                    Pickup
                  </span>
                  <span>We come to you</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-cap text-muted">
                    Payment
                  </span>
                  <span>Cash or transfer</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="font-mono text-[0.72rem] uppercase tracking-cap text-muted">
                    Condition
                  </span>
                  <span>Anything goes</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Hero photo. Replace by editing HERO_IMAGE at the top of this file. */}
        <figure className="relative mt-16 hidden aspect-[16/7] w-full overflow-hidden border border-rule md:block">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-cover"
          />
          {/* Warm ink overlay so the cream palette stays dominant */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent"
          />
          <figcaption className="absolute bottom-3 right-4 z-10 font-mono text-[0.65rem] uppercase tracking-cap text-paper/80">
            Placeholder · Unsplash
          </figcaption>
        </figure>
      </div>

      <div className="hairline mx-auto max-w-page" />
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 7h9M7.5 3l4 4-4 4" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 2.5v9M3 7.5l4 4 4-4" />
    </svg>
  );
}
