// Two columns – what we buy / what we don't. Reads like a parts list.

import Reveal from "@/components/Reveal";

const inScope = [
  "Road bikes – any era, any groupset",
  "Gravel & cyclocross frames",
  "Frames with decent parts, even if it doesn't roll",
  "Carbon frames with cosmetic damage (we'll assess)",
  "Wheelsets, groupsets, and high-end parts on their own",
];

const outOfScope = [
  "Mountain bikes – hardtail or full-sus",
  "Kids' bikes & BMX",
  "Department-store / supermarket bikes",
  "E-bikes (for now – ask us anyway)",
  "Frames with structural cracks or unsafe damage",
];

export default function WhatWeBuy() {
  return (
    <section
      id="what-we-buy"
      data-nav-bg="dark"
      className="relative border-b-[1.5px] border-ink bg-ink text-paper"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <Reveal>
          <header className="mb-14 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between reveal-fade">
            <div>
              <span className="font-mono text-[0.7rem] uppercase tracking-cap text-accent">
                § 02 – Scope
              </span>
              <h2 className="display-mega mt-3 max-w-3xl text-[clamp(2.6rem,7.5vw,6rem)]">
                What we buy.
              </h2>
            </div>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-paper/70">
              Road bikes, any condition – plus the bits that come off them. If
              it has frame or parts value, it&apos;s worth a conversation.
              Honest about the few things we can&apos;t take.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 border-t-[1.5px] border-paper/25 md:grid-cols-2">
          {/* YES column */}
          <div className="border-b-[1.5px] border-paper/25 px-1 py-10 md:border-b-0 md:border-r-[1.5px] md:py-12 md:pr-12 md:pl-0 lg:pr-16">
            <div className="mb-7 flex items-baseline justify-between">
              <span
                className="text-[2rem] uppercase leading-none sm:text-[2.5rem]"
                style={{
                  fontVariationSettings: '"wdth" 75, "opsz" 96',
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Yes
              </span>
              <span className="border-[1.5px] border-accent bg-accent px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-cap text-ink">
                Bring it
              </span>
            </div>
            <ul className="space-y-4">
              {inScope.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-[1rem] leading-relaxed sm:text-[1.05rem]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-[0.5em] w-[0.5em] shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NO column */}
          <div className="px-1 py-10 md:py-12 md:pl-12 md:pr-0 lg:pl-16">
            <div className="mb-7 flex items-baseline justify-between">
              <span
                className="text-[2rem] uppercase leading-none text-paper/45 sm:text-[2.5rem]"
                style={{
                  fontVariationSettings: '"wdth" 75, "opsz" 96',
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Not yet
              </span>
              <span className="border-[1.5px] border-paper/35 px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-cap text-paper/55">
                Skip
              </span>
            </div>
            <ul className="space-y-4">
              {outOfScope.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-[1rem] leading-relaxed text-paper/55 sm:text-[1.05rem]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-[1.5px] w-[0.7em] shrink-0 bg-paper/35"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing line */}
        <p className="mt-12 max-w-2xl border-t-[1.5px] border-paper/25 pt-8 text-[1rem] leading-relaxed text-paper/75 sm:text-[1.05rem]">
          Not sure if yours fits?{" "}
          <a
            href="#sell"
            className="underline decoration-accent decoration-[3px] underline-offset-4 transition-colors hover:text-accent"
          >
            Send the details anyway
          </a>
          . We&apos;d rather tell you straight than have you wonder.
        </p>
      </div>
    </section>
  );
}
