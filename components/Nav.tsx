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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "bg-paper/85 backdrop-blur-sm border-b border-rule"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-display text-[1.05rem] sm:text-[1.15rem] tracking-tight"
          aria-label="We Buy Bikes — home"
        >
          We Buy Bikes
          <span className="ml-1.5 align-middle text-oxblood">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.92rem] text-ink/75 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#faq"
            className="text-[0.92rem] text-ink/75 transition-colors hover:text-ink"
          >
            FAQ
          </a>
          <a href="#sell" className="btn-primary !py-2.5 !px-4 text-[0.88rem]">
            Sell your bike
          </a>
        </nav>

        {/* Mobile: single CTA in the nav, full menu lives at the bottom sticky bar */}
        <a
          href="#sell"
          className="btn-primary !py-2 !px-3.5 text-[0.85rem] md:hidden"
        >
          Sell your bike
        </a>
      </div>
    </header>
  );
}
