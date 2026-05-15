"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hide when the form is in view to avoid covering the submit button.
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
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-3 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <a
        href="#sell"
        className="pointer-events-auto flex w-full items-center justify-center gap-2 bg-ink py-3.5 text-paper shadow-[0_-6px_24px_-12px_rgba(26,22,18,0.5)]"
      >
        <span className="font-mono text-[0.72rem] uppercase tracking-cap text-saffron">
          ↘
        </span>
        <span className="text-[0.95rem]">Sell your bike</span>
      </a>
    </div>
  );
}
