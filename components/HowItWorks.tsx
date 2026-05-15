// Four steps. Big serif numerals do the visual heavy lifting.

const steps = [
  {
    n: "01",
    title: "Tell us about your bike",
    body:
      "Fill in the short form below — type, brand, age, condition. A photo or two helps. It opens WhatsApp with everything prefilled.",
  },
  {
    n: "02",
    title: "We review and make an offer",
    body:
      "We usually get back within 24–48 hours with a fair, no-pressure offer. If there's something we need to clarify, we'll just ask.",
  },
  {
    n: "03",
    title: "We pick it up",
    body:
      "Happy with the offer? We come to you at a time that works. No need to clean it, box it, or strip it down.",
  },
  {
    n: "04",
    title: "You get paid",
    body:
      "Cash or bank transfer on the spot, your choice. That's the whole thing — no paperwork to chase, no waiting around.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <header className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight">
            How it works.
          </h2>
          <p className="max-w-sm text-[1rem] leading-relaxed text-muted">
            Four steps from &ldquo;it&apos;s been in the shed for two years&rdquo; to
            paid and gone. No back-and-forth, no haggling games.
          </p>
        </header>

        <ol className="grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`group relative flex items-start gap-6 border-t border-rule py-8 md:py-10 ${
                // last row gets a bottom rule
                i >= steps.length - 2 ? "md:border-b" : ""
              }`}
            >
              <span
                className="font-display text-[3.4rem] leading-none text-oxblood md:text-[4.2rem]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 0' }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-[1.55rem] leading-[1.15] md:text-[1.7rem]">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-prose text-[0.98rem] leading-relaxed text-ink/75">
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
