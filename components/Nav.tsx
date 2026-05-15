"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-we-buy", label: "What we buy" },
  { href: "#sell", label: "Sell your bike" },
  { href: "#faq", label: "FAQ" },
];

/**
 * The nav reads the page sections beneath it (marked `data-nav-bg="dark"`)
 * on each scroll and flips its colour so the text is never invisible.
 *  - Over a dark section: transparent bg, paper text, saffron accent
 *  - Over a light section: paper-with-blur bg, ink text, oxblood accent
 */
export default function Nav() {
  // Assume the page starts over a dark hero so SSR matches the common case.
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const NAV_PROBE_Y = 56; // a little more than the nav's visible height

    const compute = () => {
      const sections = document.querySelectorAll('[data-nav-bg="dark"]');
      let dark = false;
      sections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        // Section overlaps the nav strip if it crosses y in [0, NAV_PROBE_Y].
        if (r.top < NAV_PROBE_Y && r.bottom > 0) dark = true;
      });
      setOnDark(dark);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        onDark
          ? "border-b border-transparent bg-transparent text-paper"
          : "border-b border-rule bg-paper/85 text-ink backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-display text-[1.05rem] tracking-tight sm:text-[1.15rem]"
          aria-label="We Buy Bikes — home"
        >
          We Buy Bikes
          <span
            className={cn(
              "ml-1.5 align-middle transition-colors",
              onDark ? "text-saffron" : "text-oxblood"
            )}
          >
            .
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-[0.92rem] transition-colors",
                onDark
                  ? "text-paper/80 hover:text-paper"
                  : "text-ink/75 hover:text-ink"
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#faq"
            className={cn(
              "text-[0.92rem] transition-colors",
              onDark
                ? "text-paper/80 hover:text-paper"
                : "text-ink/75 hover:text-ink"
            )}
          >
            FAQ
          </a>
          <a href="#sell" className="btn-primary !px-4 !py-2.5 text-[0.88rem]">
            Sell your bike
          </a>
        </nav>

        {/* Mobile: single CTA in the nav, rest of menu via bottom sticky bar */}
        <a
          href="#sell"
          className="btn-primary !px-3.5 !py-2 text-[0.85rem] md:hidden"
        >
          Sell your bike
        </a>
      </div>
    </header>
  );
}
