import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

// Single variable family for display + body. We push wght/wdth/opsz axes
// via CSS to switch between condensed signage display and refined body text.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-bricolage",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "We Buy Bicycles — Cash for road & mountain bikes across Melbourne",
  description:
    "We pay cash for unused road and mountain bikes around Melbourne. Tell us what you've got via WhatsApp, get a fair offer in 24–48 hours, and we'll come to you.",
  metadataBase: new URL("https://webuybicycles.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "We Buy Bicycles — Cash for road & mountain bikes across Melbourne",
    description:
      "Cash on the day for road and mountain bikes across Melbourne. WhatsApp us, get an offer in 24–48 hours, pickup included.",
    type: "website",
    url: "https://webuybicycles.com",
    siteName: "We Buy Bicycles",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Buy Bicycles — Cash for road & mountain bikes across Melbourne",
    description:
      "Cash on the day for road and mountain bikes across Melbourne. WhatsApp us, get an offer in 24–48 hours.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
