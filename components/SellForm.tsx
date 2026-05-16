"use client";

import { useMemo, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

/* -------------------------------------------------------------------------- */
/*  CONFIG – change me when you have the real number.                          */
/*  Use international format with no '+', spaces, or hyphens. e.g. 27821234567 */
/* -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "61422880536";

/* -------------------------------------------------------------------------- */
/*  Field options                                                              */
/* -------------------------------------------------------------------------- */
const BIKE_TYPES = ["Road", "Gravel", "Other"] as const;
type BikeType = (typeof BIKE_TYPES)[number];

const AGE_OPTIONS = [
  "Less than 2 years",
  "2–5 years",
  "5–10 years",
  "10+ years",
  "Not sure",
] as const;

const CONDITION_OPTIONS = [
  "Like new",
  "Good",
  "Fair",
  "Needs work",
  "Parts only",
] as const;

type FormState = {
  name: string;
  suburb: string;
  type: BikeType | "";
  brand: string;
  model: string;
  age: string;
  size: string;
  condition: string;
  price: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  suburb: "",
  type: "",
  brand: "",
  model: "",
  age: "",
  size: "",
  condition: "",
  price: "",
  notes: "",
};

type ErrorKey = "name" | "suburb" | "type" | "brand" | "age" | "condition";
type ErrorMap = Partial<Record<ErrorKey, string>>;

function buildMessage(f: FormState): string {
  return [
    "Hi, I'd like to sell a bike.",
    "",
    `Name: ${f.name}`,
    `Location: ${f.suburb}`,
    `Type: ${f.type}`,
    `Brand: ${f.brand}`,
    `Model: ${f.model || "–"}`,
    `Age: ${f.age}`,
    `Frame size: ${f.size || "–"}`,
    `Condition: ${f.condition}`,
    `Asking price: ${f.price || "Open to offers"}`,
    "",
    `Notes: ${f.notes || "–"}`,
  ].join("\r\n");
}

function validate(f: FormState): ErrorMap {
  const errs: ErrorMap = {};
  if (!f.name.trim()) errs.name = "Add your name";
  if (!f.suburb.trim()) errs.suburb = "Where are you?";
  if (!f.type) errs.type = "Pick a type";
  if (!f.brand.trim()) errs.brand = "Brand helps us price";
  if (!f.age) errs.age = "Roughly how old?";
  if (!f.condition) errs.condition = "Honest is fine";
  return errs;
}

export default function SellForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (key in errors) {
      setErrors((p) => {
        const next = { ...p };
        delete next[key as ErrorKey];
        return next;
      });
    }
  };

  const previewMsg = useMemo(() => buildMessage(form), [form]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      const el = document.getElementById(`f-${first}`);
      el?.focus();
      return;
    }
    // Open WhatsApp FIRST while we're still inside the click's transient
    // activation window – iOS 26 Safari shrinks this to ~0.5s, so any
    // state-update work before window.open can risk a blocked popup.
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage(form)
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    track("whatsapp_open", {
      type: form.type || "unknown",
      condition: form.condition || "unknown",
    });
    setSubmitted(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("sell-form");
      if (!el) return;
      // Tuck the hairline ~4px under the ~64px sticky nav so it isn't visible.
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  function resetForm() {
    setForm(EMPTY);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <section
      id="sell"
      className="relative border-b-[1.5px] border-ink bg-paper"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <Reveal>
          <header className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between reveal-fade">
            <div>
              <span className="eyebrow">§ 03 – Intake</span>
              <h2 className="display-mega mt-3 max-w-3xl text-[clamp(2.6rem,7.5vw,6rem)]">
                Sell your bike.
              </h2>
            </div>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-ink/70">
              Fill in what you know. The rest we&apos;ll sort out over WhatsApp.
              <span className="mt-2 block text-[0.85rem] text-muted">
                Required fields are marked
                <span className="ml-1 inline-block bg-accent px-[0.3em] text-ink">
                  ✱
                </span>
                .
              </span>
            </p>
          </header>
        </Reveal>

        <div
          id="sell-form"
          className="grid grid-cols-1 gap-12 border-t-[1.5px] border-ink pt-10 md:grid-cols-12 md:gap-10 md:pt-12"
        >
          {submitted ? (
            <SubmittedPanel onReset={resetForm} />
          ) : (
          <>
          {/* The form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="md:col-span-7 lg:col-span-8"
            aria-describedby="form-helper"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <Field
                id="f-name"
                label="Your name"
                required
                error={errors.name}
                value={form.name}
                onChange={(v) => update("name", v)}
                autoComplete="name"
                autoCapitalize="words"
                placeholder="First name's fine"
              />
              <Field
                id="f-suburb"
                label="Suburb / location"
                required
                error={errors.suburb}
                value={form.suburb}
                onChange={(v) => update("suburb", v)}
                autoComplete="address-level2"
                autoCapitalize="words"
                placeholder="eg. Melbourne"
              />

              {/* Bike type radio cluster – full width */}
              <div
                className={cn(
                  "col-span-full",
                  errors.type && "field-has-error"
                )}
              >
                <label className="field-label" id="f-type-label">
                  Bike type <Req />
                </label>
                <div
                  className="radio-row"
                  role="radiogroup"
                  aria-labelledby="f-type-label"
                  id="f-type"
                  tabIndex={-1}
                >
                  {BIKE_TYPES.map((t) => (
                    <label key={t} className="radio-tile">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={form.type === t}
                        onChange={() => update("type", t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <ErrorLine error={errors.type} />
              </div>

              <Field
                id="f-brand"
                label="Brand / make"
                required
                error={errors.brand}
                value={form.brand}
                onChange={(v) => update("brand", v)}
                autoCapitalize="words"
                spellCheck={false}
                placeholder="Specialized, Trek, Giant…"
              />
              <Field
                id="f-model"
                label="Model"
                value={form.model}
                onChange={(v) => update("model", v)}
                autoCapitalize="words"
                spellCheck={false}
                placeholder="Optional"
              />

              <SelectField
                id="f-age"
                label="Approximate age"
                required
                error={errors.age}
                value={form.age}
                onChange={(v) => update("age", v)}
                options={AGE_OPTIONS as unknown as string[]}
                placeholder="Choose one"
              />
              <Field
                id="f-size"
                label="Frame size"
                value={form.size}
                onChange={(v) => update("size", v)}
                placeholder="54cm, M, 17in, or 'not sure'"
              />

              <SelectField
                id="f-condition"
                label="Condition"
                required
                error={errors.condition}
                value={form.condition}
                onChange={(v) => update("condition", v)}
                options={CONDITION_OPTIONS as unknown as string[]}
                placeholder="Choose one"
              />
              <Field
                id="f-price"
                label="Asking price"
                value={form.price}
                onChange={(v) => update("price", v)}
                placeholder="Leave blank if unsure"
                inputMode="text"
              />

              <div className="col-span-full">
                <label className="field-label" htmlFor="f-notes">
                  Anything else?
                </label>
                <textarea
                  id="f-notes"
                  className="field-textarea"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Tell us anything we should know – extras included, known issues, recent service, etc."
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-yellow w-full sm:w-auto">
                <WhatsAppGlyph />
                Send via WhatsApp
              </button>
              <p
                id="form-helper"
                className="max-w-xs font-mono text-[0.7rem] uppercase leading-relaxed tracking-cap text-muted"
              >
                Opens WhatsApp with your details pre-filled. You send the
                message yourself.
              </p>
            </div>

            <p className="mt-6 max-w-md text-[0.78rem] leading-relaxed text-muted">
              Your details go straight to WhatsApp – we don&apos;t store them
              anywhere on this site.
            </p>
          </form>

          {/* Live preview – receipt-style */}
          <aside
            aria-hidden="true"
            className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
          >
            <div className="sticky top-24">
              <div className="border-[1.5px] border-ink bg-paper">
                {/* Receipt header */}
                <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-4 py-2.5">
                  <span className="font-mono text-[0.7rem] uppercase tracking-cap text-accent">
                    ▮ Outgoing
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-cap text-paper/65">
                    via WhatsApp
                  </span>
                </div>

                {/* Receipt body */}
                <pre className="whitespace-pre-wrap break-words p-5 font-mono text-[0.78rem] leading-[1.7] text-ink/80">
                  {previewMsg}
                </pre>

                {/* Receipt footer perforation */}
                <div
                  aria-hidden="true"
                  className="border-t-[1.5px] border-dashed border-ink/30 px-4 py-2.5 text-center font-mono text-[0.65rem] uppercase tracking-cap text-muted"
                >
                  – Tear here –
                </div>
              </div>

              <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-cap text-muted">
                This is what we&apos;ll receive on WhatsApp.
              </p>
            </div>
          </aside>
          </>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Submitted state – replaces the form once the WhatsApp window has opened.   */
/* -------------------------------------------------------------------------- */
function SubmittedPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="md:col-span-12" role="status" aria-live="polite">
      <div className="border-[1.5px] border-ink bg-paper p-8 sm:p-12 lg:p-16">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-cap text-muted">
            Status
          </span>
          <span className="inline-flex items-center gap-2 border-[1.5px] border-ink bg-accent px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-cap text-ink">
            <span className="inline-block h-[0.42rem] w-[0.42rem] rounded-full bg-ink" />
            Sent
          </span>
        </div>

        <h3 className="display-mega mt-6 text-[clamp(2.4rem,6.5vw,5.2rem)]">
          Off it goes.
        </h3>

        <p className="mt-5 max-w-prose text-[1.05rem] leading-relaxed text-ink/80">
          We&apos;ve handed you off to WhatsApp with your details pre-filled.
          Hit send there and we&apos;ll get back to you within 24-48 hours.
        </p>
        <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">
          If WhatsApp didn&apos;t open, your browser may have blocked the
          popup – give it another try below.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button onClick={onReset} className="btn-primary">
            Send another
            <ArrowRight />
          </button>
          <a href="#top" className="btn-ghost">
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 7h9M7.5 3l4 4-4 4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small subcomponents                                                         */
/* -------------------------------------------------------------------------- */

function Req() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block bg-accent px-[0.35em] text-ink"
    >
      ✱
    </span>
  );
}

function ErrorLine({ error }: { error?: string }) {
  return (
    <p
      className="field-error"
      data-show={Boolean(error)}
      role={error ? "alert" : undefined}
    >
      {error ?? " "}
    </p>
  );
}

function Field({
  id,
  label,
  required,
  error,
  value,
  onChange,
  placeholder,
  autoComplete,
  autoCapitalize,
  spellCheck,
  inputMode,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  spellCheck?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className={cn(error && "field-has-error")}>
      <label htmlFor={id} className="field-label">
        {label} {required && <Req />}
      </label>
      <input
        id={id}
        type="text"
        className="field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        spellCheck={spellCheck}
        inputMode={inputMode}
      />
      <p
        id={`${id}-err`}
        className="field-error"
        data-show={Boolean(error)}
        role={error ? "alert" : undefined}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

function SelectField({
  id,
  label,
  required,
  error,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className={cn(error && "field-has-error")}>
      <label htmlFor={id} className="field-label">
        {label} {required && <Req />}
      </label>
      <select
        id={id}
        className="field-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      >
        <option value="" disabled>
          {placeholder ?? "Choose…"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <p
        id={`${id}-err`}
        className="field-error"
        data-show={Boolean(error)}
        role={error ? "alert" : undefined}
      >
        {error ?? " "}
      </p>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.11 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.17 6.42 2.16 11.87a9.81 9.81 0 0 0 1.32 4.93L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.43 0 9.86-4.42 9.87-9.87a9.8 9.8 0 0 0-2.81-7zM12.05 20.1h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.16 8.16 0 0 1-1.25-4.35c0-4.52 3.69-8.2 8.22-8.2a8.16 8.16 0 0 1 5.8 2.4 8.14 8.14 0 0 1 2.4 5.81c0 4.53-3.68 8.25-8.16 8.25zm4.5-6.15c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.13-.16.25-.63.79-.78.96-.14.16-.29.18-.54.06-.25-.13-1.04-.38-1.97-1.22-.73-.65-1.22-1.46-1.36-1.71-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.41-.42-.55-.43h-.47c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.88 2.4 1 2.57.13.16 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.07.14-1.17-.07-.1-.23-.16-.48-.29z" />
    </svg>
  );
}
