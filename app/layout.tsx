import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
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
  title: "We Buy Bikes — Cash for road and mountain bikes.",
  description:
    "We buy unused road and mountain bikes. Tell us what you've got and we'll make you a cash offer.",
  metadataBase: new URL("https://webuybikes.com"),
  openGraph: {
    title: "We Buy Bikes",
    description:
      "We buy unused road and mountain bikes. Tell us what you've got and we'll make you a cash offer.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
