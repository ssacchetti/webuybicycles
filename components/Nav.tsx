"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-we-buy", label: "What we buy" },
  { href: "#sell", label: "Sell" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Nav flips between dark and light treatments based on whether the section
 * beneath it is marked `data-nav-bg="dark"`. Hero is light now, so the default
 * is light; only the marquee + WhatWeBuy strips trip the dark state.
 */
export default function Nav() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const NAV_PROBE_Y = 56;

    const compute = () => {
      const sections = document.querySelectorAll('[data-nav-bg="dark"]');
      let dark = false;
      sections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
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
        "sticky top-0 z-40 w-full transition-colors duration-200",
        onDark
          ? "border-b-[1.5px] border-accent bg-ink text-paper"
          : "border-b-[1.5px] border-ink bg-paper text-ink"
      )}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        <a
          href="#top"
          aria-label="We Buy Bikes — home"
          className="font-display flex items-baseline gap-0 text-[1.35rem] uppercase leading-none sm:text-[1.55rem]"
          style={{
            fontVariationSettings: '"wdth" 75, "opsz" 96',
            fontWeight: 800,
            letterSpacing: "-0.025em",
          }}
        >
          We Buy Bikes
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "font-mono text-[0.72rem] uppercase tracking-cap transition-colors",
                onDark
                  ? "text-paper/80 hover:text-accent"
                  : "text-ink/70 hover:text-ink"
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#faq"
            className={cn(
              "font-mono text-[0.72rem] uppercase tracking-cap transition-colors",
              onDark
                ? "text-paper/80 hover:text-accent"
                : "text-ink/70 hover:text-ink"
            )}
          >
            FAQ
          </a>
          <a
            href="#sell"
            className={cn(
              "inline-flex items-center gap-2 border-[1.5px] px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors",
              onDark
                ? "border-accent bg-accent text-ink hover:bg-paper hover:border-paper"
                : "border-ink bg-ink text-paper hover:bg-accent hover:text-ink"
            )}
          >
            Sell your bike
          </a>
        </nav>

        {/* Mobile: single CTA in the nav, rest of menu via bottom sticky bar */}
        <a
          href="#sell"
          className={cn(
            "inline-flex items-center gap-2 border-[1.5px] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] md:hidden",
            onDark
              ? "border-accent bg-accent text-ink"
              : "border-ink bg-ink text-paper"
          )}
        >
          Sell
        </a>
      </div>
    </header>
  );
}
