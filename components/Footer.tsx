export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-nav-bg="dark" className="bg-ink text-paper">
      <div className="mx-auto max-w-page px-5 pb-24 pt-16 sm:px-8 sm:pt-20 md:pb-0 lg:px-12 lg:pt-24">
        {/* Massive footer lock-up — last big chance to leave a mark */}
        <p className="display-mega text-[clamp(2.8rem,11.5vw,10rem)] leading-[0.85]">
          We Buy Bicycles
          <span className="text-accent">.</span>
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t-[1.5px] border-paper/25 pt-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p className="max-w-md text-[1rem] leading-relaxed text-paper/75">
              Cash offers for road bikes across Melbourne and Geelong.
              Tell us what you&apos;ve got and we&apos;ll come to you.
            </p>
            <p className="mt-4 max-w-md text-[0.78rem] leading-relaxed text-paper/55">
              We don&apos;t store any of the details you submit — they go
              straight to WhatsApp and never touch a database.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-cap text-accent">
              Get in touch
            </span>
            <ul className="mt-3 space-y-2 text-[0.95rem]">
              <li>
                <a
                  href="#sell"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  Sell your bike →
                </a>
              </li>
              <li className="text-paper/55">WhatsApp via the form above</li>
            </ul>

            <span className="mt-8 block font-mono text-[0.7rem] uppercase tracking-cap text-accent">
              Follow
            </span>
            <ul className="mt-3 space-y-2 text-[0.95rem]">
              <li>
                <a
                  href="https://www.instagram.com/webuybicycles"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="We Buy Bicycles on Instagram"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-cap text-accent">
              Navigate
            </span>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-[0.95rem]">
              <li>
                <a href="#how-it-works" className="text-paper/85 hover:text-accent">
                  How it works
                </a>
              </li>
              <li>
                <a href="#what-we-buy" className="text-paper/85 hover:text-accent">
                  What we buy
                </a>
              </li>
              <li>
                <a href="#sell" className="text-paper/85 hover:text-accent">
                  Sell
                </a>
              </li>
              <li>
                <a href="#faq" className="text-paper/85 hover:text-accent">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-3 border-t border-paper/15 py-6 text-[0.74rem] text-paper/55 sm:flex-row sm:items-center">
          <span className="font-mono uppercase tracking-cap">
            © {year} We Buy Bicycles · Melbourne, AU
          </span>
          <span className="font-mono uppercase tracking-cap">
            webuybicycles.com.au
          </span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
