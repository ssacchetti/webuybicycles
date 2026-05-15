export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-page px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.95] tracking-tight"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0' }}
            >
              We Buy Bikes<span className="text-saffron">.</span>
            </p>
            <p className="mt-4 max-w-md text-[0.95rem] text-paper/70">
              Fair offers for road and mountain bikes. Tell us what you have
              and we&apos;ll come to you.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[0.92rem]">
            <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/55">
              Get in touch
            </span>
            <a
              href="#sell"
              className="text-paper underline-offset-4 transition hover:text-saffron hover:underline"
            >
              Sell your bike →
            </a>
            <a
              href="mailto:hello@webuybikes.com"
              className="text-paper/85 underline-offset-4 transition hover:text-saffron hover:underline"
            >
              hello@webuybikes.com
            </a>
            <span className="text-paper/55">WhatsApp via the form above</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-3 border-t border-paper/15 pt-6 text-[0.78rem] text-paper/55 sm:flex-row sm:items-center">
          <span>© {year} We Buy Bikes. All rights reserved.</span>
          <span className="font-mono uppercase tracking-cap">
            webuybikes.com
          </span>
        </div>
      </div>
    </footer>
  );
}
