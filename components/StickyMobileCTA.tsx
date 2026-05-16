"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only floating CTA pill. Without viewport-fit: cover the iOS Safari
 * viewport stops above the URL bar, so this fixed element sits naturally
 * above the toolbar rather than being sampled by it.
 *
 * Hides when the sell form itself is in view so it doesn't cover the
 * submit button.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("sell");
      if (!form) {
        setShow(window.scrollY > 320);
        return;
      }
      const rect = form.getBoundingClientRect();
      const formInView =
        rect.top < window.innerHeight - 80 && rect.bottom > 120;
      setShow(window.scrollY > 320 && !formInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-3 pt-3 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-[140%]"
      }`}
    >
      <a
        href="#sell"
        className="pointer-events-auto mx-auto flex max-w-sm items-center justify-center gap-3 rounded-full bg-ink py-3 text-accent shadow-[0_10px_30px_-10px_rgba(10,10,10,0.55)]"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-cap">
          ▮
        </span>
        <span className="text-[0.92rem] font-semibold uppercase tracking-[0.1em]">
          Sell your bike
        </span>
        <span aria-hidden="true" className="text-[0.92rem]">
          →
        </span>
      </a>
    </div>
  );
}
