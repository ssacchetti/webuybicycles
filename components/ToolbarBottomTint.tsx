"use client";

import { useEffect, useState } from "react";

/**
 * Deterministic anchor for iOS Safari's bottom URL-bar tint.
 *
 * iOS 26 Safari picks the toolbar tint by sampling the background colour
 * of `position: fixed` / `position: sticky` elements near the viewport
 * edge. Without a stable anchor it falls back to body bg, but the
 * sampling timing is loose – the bar can get "stuck" on the last
 * colour after the user scrolls between light and dark sections.
 *
 * This renders a 12px-tall fixed strip pinned to the viewport bottom,
 * with its bg dynamically flipped between paper and ink based on
 * whether any `data-nav-bg="dark"` section is currently overlapping the
 * bottom edge. The strip itself sits at `z-index: -1` so it's hidden
 * behind the body background (invisible to users), but Safari still
 * sees it for sampling.
 *
 * Net effect: the bar visually merges with whatever section is at the
 * bottom of the viewport – looks transparent over both light and dark
 * sections instead of getting stuck.
 *
 * The top toolbar is already deterministic because the Nav itself is
 * `position: sticky` with a paper/ink swap driven by the same
 * `data-nav-bg` convention; Safari samples the Nav directly.
 */
export default function ToolbarBottomTint() {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const compute = () => {
      const h = window.innerHeight;
      const sections = document.querySelectorAll('[data-nav-bg="dark"]');
      let dark = false;
      sections.forEach((sec) => {
        const r = (sec as HTMLElement).getBoundingClientRect();
        if (r.top < h && r.bottom > h - 8) dark = true;
      });
      setOverDark(dark);
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
    <div
      aria-hidden="true"
      style={{ zIndex: -1 }}
      className={`pointer-events-none fixed inset-x-0 bottom-0 h-3 transition-colors duration-200 ${
        overDark ? "bg-ink" : "bg-paper"
      }`}
    />
  );
}
