"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";

const faqs = [
  {
    q: "How do you calculate an offer?",
    a: "We start with what the bike (or its parts) is realistically worth on the second-hand market, then factor in the work it'll need: a service, replacements, refinishing. You'll see the logic — we'll tell you what we're seeing and what we're offering, not just a number.",
  },
  {
    q: "What if the bike isn't worth taking?",
    a: "Sometimes that happens. We'll tell you honestly and, where we can, point you somewhere it might find a better home — a local club, a charity, or a parts forum. No fee, no pressure.",
  },
  {
    q: "Do I need to clean it or service it first?",
    a: "No. We'd rather see it as it is. A wipe-down is fine if you're feeling thorough, but please don't pay anyone to service or fix it before selling — that money is rarely recovered in the price.",
  },
  {
    q: "What area do you cover?",
    a: "We'll travel for anything worth picking up. Most pickups happen within an hour's drive of the workshop; further afield we'll work it out as part of the offer. WhatsApp us with your suburb and we'll let you know.",
  },
  {
    q: "How does payment work?",
    a: "Cash on the day, or EFT / bank transfer before we leave with the bike — your call. No instalments, no holding deposits, no waiting on consignment.",
  },
  {
    q: "Do you buy just frames or just parts?",
    a: "Yes. A bare frame in good shape is useful to us, and so are wheelsets, groupsets, and high-end components. Send what you have and we'll look at it the same way we'd look at a complete bike.",
  },
  {
    q: "How quickly will I hear back?",
    a: "Usually within 24 to 48 hours of receiving your message. If we need more info or photos, we'll just ask in the same WhatsApp thread.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string>("");

  return (
    <section id="faq" className="relative border-t border-rule">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <header className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight">
            Common questions.
          </h2>
          <p className="max-w-sm text-[1rem] leading-relaxed text-muted">
            The stuff people ask before sending us a bike. If yours isn&apos;t
            here, just put it in the notes when you submit.
          </p>
        </header>

        <Accordion.Root
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="border-t border-rule"
        >
          {faqs.map((item, i) => {
            const v = `item-${i}`;
            return (
              <Accordion.Item
                key={v}
                value={v}
                className="border-b border-rule"
              >
                <Accordion.Header asChild>
                  <h3 className="m-0">
                    <Accordion.Trigger
                      // Grid columns: fixed number col · question · plus icon.
                      // The fixed first column means the question text starts
                      // at a known x-offset (col-1 width + gap), which we mirror
                      // as the answer's left padding below so they align.
                      className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 py-6 text-left transition-colors hover:text-oxblood"
                      aria-label={item.q}
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-[0.78rem] uppercase tracking-cap text-muted"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.4rem] leading-[1.18] sm:text-[1.7rem]">
                        {item.q}
                      </span>
                      <Plus className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-acc-open data-[state=closed]:animate-acc-close">
                  {/* pl-12 (3rem) = 2rem number col + 1rem grid gap → aligns
                      with the question text in the trigger above */}
                  <p className="max-w-prose pb-6 pl-12 pr-10 text-[1rem] leading-relaxed text-ink/80">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>

        {/* Final nudge */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[1.5rem] leading-tight sm:text-[1.85rem]">
            Still wondering if it&apos;s worth our time?
          </p>
          <a href="#sell" className="btn-primary">
            Send it through anyway
            <Arrow />
          </a>
        </div>
      </div>

      {/* Local keyframes for accordion */}
      <style>{`
        @keyframes acc-open { from { height: 0; opacity: 0 } to { height: var(--radix-accordion-content-height); opacity: 1 } }
        @keyframes acc-close { from { height: var(--radix-accordion-content-height); opacity: 1 } to { height: 0; opacity: 0 } }
        .animate-acc-open { animation: acc-open 280ms cubic-bezier(0.22,1,0.36,1); }
        .animate-acc-close { animation: acc-close 220ms cubic-bezier(0.4,0,1,1); }
      `}</style>
    </section>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 7h9M7.5 3l4 4-4 4" />
    </svg>
  );
}
