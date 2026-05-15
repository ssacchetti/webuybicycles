"use client";

/* eslint-disable react/no-unescaped-entities */
// Image-led poster hero with scroll-driven parallax. The hero photo translates
// at ~0.35× the scroll rate while the text drifts in the opposite direction at
// ~0.12× — creates separation between the type and the image as you scroll.
//
// PLACEHOLDER PHOTO: sourced from Unsplash. Swap by editing HERO_IMAGE.

import Image from "next/image";
import { useEffect, useRef } from "react";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1605271864611-58dd08d10547?w=2400&q=75&auto=format&fit=crop",
  alt: "A bicycle in the workshop — placeholder image",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const apply = () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      const content = contentRef.current;
      if (!section || !image || !content) return;

      const rect = section.getBoundingClientRect();
      // Skip when the section is far off-screen
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      // Image lags behind scroll (~35% speed)
      image.style.transform = `translate3d(0, ${-rect.top * 0.35}px, 0)`;
      // Text drifts up faster than scroll (~12% faster)
      content.style.transform = `translate3d(0, ${rect.top * 0.12}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-bg="dark"
      className="relative isolate overflow-hidden"
    >
      {/* Image layer — extended above & below so it can translate without exposing edges */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[20%] -top-[20%] -z-10"
      >
        <div
          ref={imageRef}
          className="relative h-full w-full will-change-transform"
        >
          <Image
            src={HERO_IMAGE.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.85) contrast(1.05)" }}
          />
        </div>
      </div>

      {/* Scrims (do not translate — stay locked to the section bounds) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent"
      />

      {/* Content frame */}
      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-page flex-col px-5 pb-14 pt-6 text-paper will-change-transform sm:px-8 sm:pb-20 sm:pt-8 lg:min-h-[760px] lg:px-12 lg:pb-24"
      >
        {/* Top eyebrow row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.72rem] uppercase tracking-cap text-paper/75">
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-[6px] w-[6px] rounded-full bg-saffron align-middle"
            />
            Now buying — Road &amp; Mountain
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
