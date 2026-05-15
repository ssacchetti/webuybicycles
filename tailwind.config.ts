import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Brand tokens — change these to re-skin the site.
      // Also mirrored in app/globals.css as CSS variables.
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        oxblood: "var(--color-oxblood)",
        saffron: "var(--color-saffron)",
        rule: "var(--color-rule)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        cap: "0.14em",
      },
      maxWidth: {
        page: "78rem",
        prose: "42rem",
      },
      animation: {
        "fade-up": "fadeUp 700ms cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 60s linear infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
