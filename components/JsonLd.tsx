import { faqs } from "@/lib/faqs";

// Emits three schema.org graphs in a single <script> tag:
//   - LocalBusiness (Melbourne placeholder — fill in once we have a real
//     trading address, phone number, and opening hours)
//   - FAQPage     (uses the same source-of-truth FAQ list as the section)
//   - Service     (declares "used bicycle buying" as a structured service)

const SITE_URL = "https://webuybicycles.com";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "We Buy Bicycles",
  description:
    "Cash buyers of used road and mountain bikes across Melbourne.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: "Melbourne",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  // TODO: fill these in once the business has real contact details
  // telephone: "+61-...",
  // openingHoursSpecification: [...],
  email: "hello@webuybicycles.com",
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Used bicycle buying",
  serviceType: "Used bicycle purchase",
  description:
    "We buy used road and mountain bikes, frames, and components for cash. Free pickup across the Melbourne metro.",
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: {
    "@type": "City",
    name: "Melbourne",
  },
  offers: {
    "@type": "Offer",
    description:
      "Free assessment, fair cash offer within 24-48 hours, free pickup.",
    priceCurrency: "AUD",
  },
};

export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, faqPage, service],
  };
  return (
    <script
      type="application/ld+json"
      // Schema graphs are static, server-rendered, and contain no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
