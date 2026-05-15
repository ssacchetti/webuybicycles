// Four steps. Huge sans-serif numerals do the visual heavy lifting.
// One column on mobile, four-up grid on desktop with hard rules between.

const steps = [
  {
    n: "01",
    title: "Tell us about it",
    body:
      "Fill in the short form. Type, brand, age, condition. A photo or two helps. It opens WhatsApp with everything pre-filled.",
  },
  {
    n: "02",
    title: "We make an offer",
    body:
      "We come back within 24–48 hours with a fair, no-pressure cash number. If something's unclear, we ask in the same thread.",
  },
  {
    n: "03",
    title: "We come to you",
    body:
      "Happy with the number? We turn up at a time that works. No need to clean it, box it, or strip it down.",
  },
  {
    n: "04",
    title: "You get paid",
    body:
      "Cash on the day, or bank transfer before we leave with the bike. Your choice. No paperwork, no waiting.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-b-[1.5px] border-ink bg-paper"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <header className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">§ 01 — Process</span>
            <h2 className="display-mega mt-3 max-w-3xl text-[clamp(2.6rem,7.5vw,6rem)]">
              Four steps. <span className="text-muted">That&apos;s it.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-ink/70">
            From &ldquo;it&apos;s been in the shed for two years&rdquo; to paid and gone.
            No back-and-forth. No haggling games.
          </p>
        </header>

        <ol className="grid grid-cols-1 border-t-[1.5px] border-ink md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`group relative flex flex-col gap-6 border-ink p-6 transition-colors hover:bg-accent/15 sm:p-7 lg:p-8 ${
                // hard rules between cells — bottom on all, right on every except last per row
                "border-b-[1.5px]"
              } ${i % 2 === 0 ? "md:border-r-[1.5px]" : ""} ${
                i < 2 ? "lg:border-r-[1.5px]" : ""
              } ${i === 2 ? "lg:border-r-[1.5px]" : ""}`}
            >
              <span
                aria-hidden="true"
                className="numeral block text-[clamp(4.5rem,10vw,7.5rem)] text-ink"
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="text-[1.35rem] uppercase leading-[1.05] tracking-tight sm:text-[1.45rem]"
                  style={{
                    fontVariationSettings: '"wdth" 80, "opsz" 48',
                    fontWeight: 700,
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
