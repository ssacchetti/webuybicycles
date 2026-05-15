"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky CTA that floats just above the bottom edge once the
 * user has scrolled past the hero. Ink black with yellow type so it reads
 * as intentional dark chrome — and so iOS Safari's bottom toolbar samples
 * black rather than tinting yellow.
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
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-3 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-[140%]"
      }`}
    >
      <a
        href="#sell"
        className="pointer-events-auto flex w-full items-center justify-center gap-3 border-t-[2px] border-accent bg-ink py-4 text-accent shadow-[0_-12px_28px_-14px_rgba(10,10,10,0.55)]"
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
