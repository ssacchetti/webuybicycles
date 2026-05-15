// Two columns — what we buy / what we don't. Reads like a parts list.

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

        {/* Before/after placeholder strip — clearly marked for real photos later */}
        <div
          aria-label="Before / after placeholder strip"
          className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5"
        >
          {["Before", "After"].map((label) => (
            <div
              key={label}
              className="relative flex aspect-[4/3] items-end justify-between border border-paper/20 bg-paper/[0.04] p-4"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/55">
                [ {label} · workshop photo ]
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/40">
                /public/{label.toLowerCase()}.jpg
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
