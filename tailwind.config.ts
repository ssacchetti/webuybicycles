import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Brand tokens — change these to re-skin the site.
      // Also mirrored in app/globals.css as CSS variables.
      //
      // Naming kept from the previous (workshop) palette for diff-clarity;
      // values pivoted to a hi-vis marketplace direction:
      //   paper   → pure white
      //   ink     → near-black
      //   muted   → mid grey
      //   oxblood → hi-vis yellow accent  (was deep red)
      //   saffron → hi-vis yellow accent  (was warm gold)
      //   rule    → ink at 10% alpha
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        oxblood: "var(--color-accent)",
        saffron: "var(--color-accent)",
        accent: "var(--color-accent)",
        rule: "var(--color-rule)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        // Single family does display + body via wdth/opsz axes.
        display: ["var(--font-bricolage)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-bricolage)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        cap: "0.14em",
      },
      maxWidth: {
        page: "82rem",
        prose: "42rem",
      },
      animation: {
        "fade-up": "fadeUp 700ms cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 60s linear infinite",
        "ticker-pulse": "tickerPulse 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        tickerPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
