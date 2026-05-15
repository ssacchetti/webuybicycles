import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display: Fraunces variable. We dial OPSZ + SOFT via CSS for workshop character.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-hanken",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "We Buy Bikes — Road and mountain bikes, any condition.",
  description:
    "We buy unused road and mountain bikes, refurbish them, and give them a second life. Tell us what you've got and we'll make you an offer.",
  metadataBase: new URL("https://webuybikes.com"),
  openGraph: {
    title: "We Buy Bikes",
    description:
      "We buy unused road and mountain bikes. Tell us what you've got and we'll make you an offer.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EBDD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
