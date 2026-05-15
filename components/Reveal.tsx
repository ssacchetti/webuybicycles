"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wrap children in an IntersectionObserver. Toggles `data-revealed` on
 * the wrapper when the element scrolls into view. Children use the
 * `.reveal-fade` CSS class (defined in globals.css) to drive the
 * fade-up motion off that attribute.
 *
 * Set `delay` (ms) for staggered sequences.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-revealed={revealed}
      className={className}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
