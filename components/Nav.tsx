"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-we-buy", label: "What we buy" },
  { href: "#sell", label: "Sell" },
  { href: "#faq", label: "FAQ" },
];

const mobileLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-we-buy", label: "What we buy" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Nav flips between dark and light treatments based on whether the section
 * beneath it is marked `data-nav-bg="dark"`. Mobile shows wordmark + a
 * prominent centered SELL button + a hamburger that opens a fullscreen
 * overlay menu. Desktop is unchanged.
 */
export default function Nav() {
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Background detection (existing logic)
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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Close the menu on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-colors duration-200",
          onDark
            ? "border-b-[1.5px] border-accent bg-ink text-paper"
            : "border-b-[1.5px] border-ink bg-paper text-ink"
        )}
      >
        <div className="mx-auto flex max-w-page items-center gap-3 px-5 py-3 sm:px-8 lg:px-12">
          {/* Wordmark */}
          <a
            href="#top"
            aria-label="We Buy Bikes — home"
            className="font-display shrink-0 text-[1.25rem] uppercase leading-none sm:text-[1.55rem]"
            style={{
              fontVariationSettings: '"wdth" 75, "opsz" 96',
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            We Buy Bikes
            <span className="text-accent">.</span>
          </a>

          {/* Mobile hamburger — sticky CTA at the bottom of the viewport
              handles the SELL action, so the bar stays clean. */}
          <button
            type="button"
            className={cn(
              "ml-auto flex h-10 w-10 shrink-0 items-center justify-center border-[1.5px] transition-colors md:hidden",
              onDark
                ? "border-paper text-paper hover:bg-paper hover:text-ink"
                : "border-ink text-ink hover:bg-ink hover:text-paper"
            )}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <HamburgerIcon />
          </button>

          {/* Desktop nav */}
          <nav className="ml-auto hidden items-center gap-7 md:flex">
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
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-ink text-paper transition-opacity duration-200 md:hidden",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div className="flex items-center justify-between border-b-[1.5px] border-paper/20 px-5 py-3 sm:px-8">
        <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/70">
          Menu
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border-[1.5px] border-paper text-paper transition-colors hover:bg-paper hover:text-ink"
          aria-label="Close menu"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6 sm:px-10">
        {mobileLinks.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={cn(
              "block text-[clamp(2.6rem,9vw,4rem)] transition-colors hover:text-accent",
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
            style={{
              fontVariationSettings: '"wdth" 80, "opsz" 96',
              fontWeight: 800,
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
              lineHeight: 1,
              transition: `opacity 320ms cubic-bezier(.16,1,.3,1) ${
                open ? 80 + i * 60 : 0
              }ms, transform 320ms cubic-bezier(.16,1,.3,1) ${
                open ? 80 + i * 60 : 0
              }ms, color 180ms`,
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#sell"
          onClick={onClose}
          className="mt-6 inline-flex w-fit items-center gap-2 border-[1.5px] border-accent bg-accent px-5 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-paper hover:border-paper"
        >
          Sell your bike →
        </a>
      </nav>

      <div className="border-t-[1.5px] border-paper/20 px-6 py-5 sm:px-10">
        <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/55">
          Or email us
        </span>
        <a
          href="mailto:hello@webuybikes.com"
          className="mt-1 block text-[1rem] text-paper hover:text-accent"
        >
          hello@webuybikes.com
        </a>
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 6h14M3 14h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
