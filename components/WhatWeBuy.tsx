// Two columns — what we buy / what we don't. Reads like a parts list.
//
// PLACEHOLDER PHOTOS: the before/after strip pulls from Unsplash. Swap with
// real workshop photos by editing `BEFORE_AFTER` below.

import Image from "next/image";

const BEFORE_AFTER = [
  {
    label: "Before",
    src: "https://images.unsplash.com/photo-1595697541361-38ade4692c90?w=900&q=70&auto=format&fit=crop",
    alt: "A rusty old bicycle — placeholder before photo",
  },
  {
    label: "After",
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=900&q=70&auto=format&fit=crop",
    alt: "A clean, restored bicycle — placeholder after photo",
  },
];

const inScope = [
  "Road bikes — any era, any groupset",
  "Mountain bikes — hardtail or full-suspension",
  "Gravel and cyclocross frames",
  "Frames with decent parts, even if the bike doesn't roll",
  "Carbon frames with cosmetic damage (we'll assess)",
  "Wheelsets, groupsets, and high-end parts on their own",
];

const outOfScope = [
  "Kids' bikes and BMX",
  "Department-store / supermarket bikes",
  "E-bikes (for now — get in touch anyway, we may make exceptions)",
  "Frames with structural cracks or unsafe damage",
];

export default function WhatWeBuy() {
  return (
    <section id="what-we-buy" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <header className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow !text-paper/55">Section 02 — Scope</span>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight">
              What we buy.
            </h2>
          </div>
          <p className="max-w-md text-[1rem] leading-relaxed text-paper/70">
            Road and mountain bikes, any condition. If it has frame or parts
            value, it&apos;s worth a conversation. Honest about the few things we
            can&apos;t take.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <div className="mb-5 flex items-baseline justify-between border-b border-paper/15 pb-3">
              <span className="font-mono text-[0.72rem] uppercase tracking-cap text-paper/55">
                In scope
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-cap text-saffron">
                Yes
              </span>
            </div>
            <ul className="space-y-3.5">
              {inScope.map((item) => (
                <li key={item} className="flex gap-3 text-[1rem] leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-[3px] w-3 shrink-0 bg-saffron"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-5 flex items-baseline justify-between border-b border-paper/15 pb-3">
              <span className="font-mono text-[0.72rem] uppercase tracking-cap text-paper/55">
                Out of scope
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-cap text-paper/55">
                Not yet
              </span>
            </div>
            <ul className="space-y-3.5">
              {outOfScope.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[1rem] leading-relaxed text-paper/65"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-[1px] w-3 shrink-0 bg-paper/40"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Before / after strip. Replace by editing BEFORE_AFTER at the top of this file. */}
        <div
          aria-label="Before and after workshop photos"
          className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5"
        >
          {BEFORE_AFTER.map((item) => (
            <figure
              key={item.label}
              className="relative aspect-[4/3] overflow-hidden border border-paper/20"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 560px, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-3 left-4 right-4 z-10 flex items-baseline justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper">
                  {item.label}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-cap text-paper/55">
                  Placeholder · Unsplash
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
