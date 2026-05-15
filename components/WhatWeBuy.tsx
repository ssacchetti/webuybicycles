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
    <section
      id="what-we-buy"
      data-nav-bg="dark"
      className="relative bg-ink text-paper"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <header className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight">
            What we buy.
          </h2>
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

        {/* Closing line — quiet trust signal, no imagery */}
        <p className="mt-16 max-w-2xl border-t border-paper/15 pt-8 text-[1.05rem] leading-relaxed text-paper/75 sm:mt-20">
          Not sure if yours fits? Send the details anyway. We&apos;d rather
          tell you straight than have you wonder.
        </p>
      </div>
    </section>
  );
}
