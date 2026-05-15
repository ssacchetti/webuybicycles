/* eslint-disable react/no-unescaped-entities */
// Image-led poster hero. A single atmospheric photo fills the viewport with
// layered scrims so the type stays legible. The italic 'bikes' accent shifts
// from oxblood to saffron — saffron reads better on the dark image.
//
// PLACEHOLDER PHOTO: sourced from Unsplash. Swap by editing HERO_IMAGE.

import Image from "next/image";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1605271864611-58dd08d10547?w=2400&q=75&auto=format&fit=crop",
  alt: "A bicycle in the workshop — placeholder image",
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image + layered scrims for legibility */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "saturate(0.85) contrast(1.05)" }}
        />
        {/* Base ink wash — keeps the image atmospheric without going monochrome */}
        <div className="absolute inset-0 bg-ink/40" />
        {/* Bottom-up gradient so the headline area reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 via-40% to-ink/10" />
        {/* Left side gradient — extra darkness behind the type column */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
      </div>

      {/* Content frame */}
      <div className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-page flex-col px-5 pb-14 pt-6 text-paper sm:px-8 sm:pb-20 sm:pt-8 lg:min-h-[760px] lg:px-12 lg:pb-24">
        {/* Top eyebrow row — masthead dateline */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem] uppercase tracking-cap text-paper/75">
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-[6px] w-[6px] rounded-full bg-saffron align-middle"
            />
            Now buying — Road &amp; Mountain
          </span>
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-cap text-paper/55 sm:inline">
            Vol. 01 · The Workshop
          </span>
        </div>

        {/* Spacer pushes content to the bottom — poster anchor */}
        <div className="flex-1" />

        {/* Headline */}
        <h1 className="font-display display-tight max-w-[16ch] text-[clamp(3.2rem,11vw,9rem)] font-medium">
          <span className="block animate-fade-up opacity-0 [animation-delay:60ms]">
            We&nbsp;buy
          </span>
          <span className="block animate-fade-up opacity-0 [animation-delay:220ms]">
            your old{" "}
            <em
              className="not-italic font-display"
              style={{
                fontVariationSettings:
                  '"opsz" 144, "SOFT" 100, "WONK" 1, "slnt" -8',
                color: "var(--color-saffron)",
              }}
            >
              bikes
            </em>
            .
          </span>
        </h1>

        {/* Sub-deck + CTAs */}
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:mt-10 lg:grid-cols-12">
          <p className="max-w-prose animate-fade-up text-[1.15rem] leading-[1.5] text-paper/85 opacity-0 [animation-delay:380ms] sm:text-[1.3rem] lg:col-span-7">
            Got a road or mountain bike sitting in the garage? We&apos;ll take a
            look, make you a fair offer, and pick it up. Any condition — even
            the ones you&apos;d call &ldquo;parts only.&rdquo;
          </p>
          <div className="flex animate-fade-up flex-wrap items-center gap-x-7 gap-y-4 opacity-0 [animation-delay:540ms] lg:col-span-5 lg:justify-end">
            <a href="#sell" className="btn-primary">
              Sell your bike
              <ArrowRight />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-b border-paper/65 pb-1 text-[0.94rem] text-paper transition hover:gap-3 hover:border-saffron hover:text-saffron"
            >
              How it works
              <ArrowDown />
            </a>
          </div>
        </div>
      </div>
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
