"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only floating CTA pill.
 *
 * iOS 26 Safari tints its toolbar from the `background-color` /
 * `backdrop-filter` of any `position: fixed` element near the viewport
 * edge — and that sampling traverses static descendants too. The pattern
 * that keeps the toolbar untinted:
 *
 *   1. The fixed wrapper must have no background and no backdrop-filter.
 *   2. The visual pill lives on a `position: absolute` child, which Safari
 *      treats as out-of-flow and skips when sampling.
 *   3. `transform` / `opacity` on the fixed wrapper are safe for animation,
 *      but the wrapper must actually be removed (unmounted / display:none)
 *      when not shown — otherwise its descendants still get sampled.
 *
 * Hides when the sell form itself is in view so it doesn't cover the
 * submit button.
 */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  // Keeps the element mounted long enough for the slide-out transition
  // to play before we actually remove it from the DOM.
  const [mounted, setMounted] = useState(false);

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

  // Mount/unmount around the visibility state so Safari can't sample the
  // pill while it's offscreen.
  useEffect(() => {
    if (show) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [show]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!show}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-[140%]"
      }`}
    >
      <a
        href="#sell"
        style={{
          bottom: "max(env(safe-area-inset-bottom), 0.75rem)",
        }}
        className="pointer-events-auto absolute left-1/2 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-center gap-3 rounded-full bg-ink py-3 text-accent shadow-[0_10px_30px_-10px_rgba(10,10,10,0.55)]"
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
