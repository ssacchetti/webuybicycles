// Thin marquee rule beneath the hero — works as a masthead device and reinforces
// the trade-catalog feel. CSS-only, pauses for reduced motion.

const items = [
  "Est. 2026",
  "Road",
  "Mountain",
  "Any condition",
  "Fair offers",
  "We come to you",
  "Cash or transfer",
  "Refurbished or stripped for parts",
];

export default function MarqueeStrip() {
  // Duplicate the list once for seamless loop.
  const loop = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-rule bg-ink text-paper"
    >
      <div className="flex animate-marquee whitespace-nowrap py-3 [animation-duration:48s] motion-reduce:animate-none">
        {loop.map((label, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 px-6 font-mono text-[0.72rem] uppercase tracking-cap"
          >
            <span className="text-saffron">◆</span>
            <span>{label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
