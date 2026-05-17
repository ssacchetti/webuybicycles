import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title:
    "Sell Your Road Bike for Cash – Melbourne & Geelong | We Buy Bicycles",
  description:
    "Sell your used road bike for cash across Melbourne and Geelong. Message us on WhatsApp, get a fair offer in 24–48 hours, pickup at your door. No haggling, no consignment.",
  metadataBase: new URL("https://webuybicycles.com.au"),
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Sell Your Road Bike for Cash – Melbourne & Geelong | We Buy Bicycles",
    description:
      "Cash on the day for road bikes across Melbourne and Geelong. WhatsApp us, get an offer in 24–48 hours, pickup included.",
    type: "website",
    url: "https://webuybicycles.com.au",
    siteName: "We Buy Bicycles",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sell Your Road Bike for Cash – Melbourne & Geelong | We Buy Bicycles",
    description:
      "Cash on the day for road bikes across Melbourne and Geelong. WhatsApp us, get an offer in 24–48 hours.",
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
