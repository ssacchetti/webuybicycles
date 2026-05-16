import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import HowItWorks from "@/components/HowItWorks";
import WhatWeBuy from "@/components/WhatWeBuy";
import SellForm from "@/components/SellForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ToolbarBottomTint from "@/components/ToolbarBottomTint";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top" className="relative overflow-clip">
        <Hero />
        <MarqueeStrip />
        <HowItWorks />
        <WhatWeBuy />
        <SellForm />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
      <ToolbarBottomTint />
    </>
  );
}
