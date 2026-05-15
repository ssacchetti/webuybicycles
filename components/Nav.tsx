"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-we-buy", label: "What we buy" },
  { href: "#sell", label: "Sell your bike" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  // Two state flags so the nav can adapt to (a) the dark hero behind it at
  // the top of the page and (b) the lighter paper sections once scrolled.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When at the top, the nav sits over the dark hero image — invert to paper.
  const onDark = !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-rule bg-paper/85 backdrop-blur-sm text-ink"
          : "border-b border-transparent bg-transparent text-paper"
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
