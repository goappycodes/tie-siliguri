"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/Icons";

/**
 * Contact / enquiry form that submits to Web3Forms (https://web3forms.com) via
 * AJAX, so submissions are emailed to the chapter with no backend of our own.
 *
 * Setup: create a free access key at web3forms.com against the chapter inbox
 * (president@siliguri.tie.org) and set it as the env var
 * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel (and .env.local for dev). The key
 * is public by design — it can only send to the pre-configured inbox, not read
 * submissions.
 *
 * Spam is caught by Web3Forms' built-in `botcheck` honeypot (a hidden field a
 * real user never sees or fills).
 */
// Trim so a stray space/newline in the env var can't invalidate the key.
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate/70 focus:border-tie-red focus:outline-none focus:ring-1 focus:ring-tie-red";
const labelClass = "block text-[11px] font-bold tracking-[0.1em] text-slate uppercase";

export default function ContactForm({
  subject = "TiE Siliguri — website enquiry",
  interests,
  defaultInterest,
  submitLabel = "Send message",
}: {
  subject?: string;
  interests?: string[];
  defaultInterest?: string;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: a real user never fills this hidden field.
    if (data.botcheck) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form isn't configured yet. Please email us directly for now.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: "TiE Siliguri Website",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't send your message. Please check your connection or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t-2 border-tie-red bg-paper-alt p-8 lg:p-10">
        <p className="eyebrow-plain">Message sent</p>
        <h3 className="display-3 mt-4">Thank you — we&apos;ll be in touch.</h3>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
          Your message has reached the TiE Siliguri chapter team. We usually respond within a couple
          of working days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-arrow mt-6"
        >
          Send another message
          <ArrowRight />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — visually hidden, off-screen, not focusable. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${inputClass}`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${inputClass}`}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="font-medium normal-case text-slate/70">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`mt-2 ${inputClass}`}
            placeholder="+91 …"
          />
        </div>
        {interests && interests.length > 0 && (
          <div>
            <label htmlFor="cf-interest" className={labelClass}>
              I&apos;m interested in
            </label>
            <select
              id="cf-interest"
              name="interest"
              defaultValue={defaultInterest ?? interests[0]}
              className={`mt-2 ${inputClass}`}
            >
              {interests.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className={`mt-2 ${inputClass} resize-y`}
          placeholder="Tell us a little about you and how we can help…"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[14px] font-medium text-tie-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
        {status !== "submitting" && <ArrowRight />}
      </button>
    </form>
  );
}
