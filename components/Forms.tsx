"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Lead capture. Posts to NEXT_PUBLIC_LEAD_ENDPOINT (e.g. the project's
 * Google Apps Script Web App URL) when configured. See DECISIONS.md.
 */
async function submitLead(payload: Record<string, string>): Promise<boolean> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
  if (!endpoint) return true; // Accept locally until an endpoint is connected.
  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

export function LeadForm({
  t,
  compact = false,
  heading,
  leadType = "starter-kit",
}: {
  t: Dictionary;
  compact?: boolean;
  heading?: string;
  leadType?: string;
}) {
  const f = t.starterKitPage.form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    const ok = await submitLead({ type: leadType, name, email, locale: t.locale });
    setState(ok ? "success" : "error");
  }

  if (state === "success") {
    return (
      <div role="status" className="rounded-xl2 border border-sage/60 bg-sage/15 px-6 py-6 text-forest">
        <p className="font-display text-lg font-medium">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "" : "card p-6 sm:p-8"}>
      {!compact && <h3 className="h-display mb-5 text-xl">{heading ?? f.title}</h3>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`lead-name-${compact ? "c" : "f"}`}>{f.namePlaceholder}</label>
        <input
          id={`lead-name-${compact ? "c" : "f"}`}
          type="text"
          autoComplete="given-name"
          placeholder={f.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-ring w-full rounded-full border border-forest/20 bg-white px-5 py-3 text-sm placeholder:text-charcoal/40 sm:flex-1"
        />
        <label className="sr-only" htmlFor={`lead-email-${compact ? "c" : "f"}`}>{f.emailPlaceholder}</label>
        <input
          id={`lead-email-${compact ? "c" : "f"}`}
          type="email"
          required
          autoComplete="email"
          placeholder={f.emailPlaceholder}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "lead-error" : undefined}
          className="focus-ring w-full rounded-full border border-forest/20 bg-white px-5 py-3 text-sm placeholder:text-charcoal/40 sm:flex-1"
        />
        <button type="submit" disabled={state === "sending"} className="btn-gold shrink-0 disabled:opacity-60">
          {state === "sending" ? "…" : f.button}
        </button>
      </div>
      {state === "error" && (
        <p id="lead-error" role="alert" className="mt-3 text-sm font-medium text-red-800">{f.error}</p>
      )}
      <p className="mt-3 text-xs text-charcoal/55">{f.privacy}</p>
    </form>
  );
}

export function ContactForm({ t }: { t: Dictionary }) {
  const f = t.contact.form;
  const [values, setValues] = useState({ name: "", email: "", topic: f.topics[0], message: "" });
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || !EMAIL_RE.test(values.email) || !values.message.trim()) {
      setState("error");
      return;
    }
    setState("sending");
    const ok = await submitLead({ type: "contact", locale: t.locale, ...values });
    setState(ok ? "success" : "error");
  }

  if (state === "success") {
    return (
      <div role="status" className="rounded-xl2 border border-sage/60 bg-sage/15 px-6 py-8 text-forest">
        <p className="font-display text-lg font-medium">{f.success}</p>
      </div>
    );
  }

  const inputCls =
    "focus-ring w-full rounded-xl border border-forest/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/40";

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="mb-1.5 block text-sm font-medium text-forest">{f.name}</label>
          <input id="ct-name" type="text" autoComplete="name" className={inputCls}
            value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="ct-email" className="mb-1.5 block text-sm font-medium text-forest">{f.email}</label>
          <input id="ct-email" type="email" autoComplete="email" className={inputCls}
            value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        </div>
      </div>
      <div>
        <label htmlFor="ct-topic" className="mb-1.5 block text-sm font-medium text-forest">{f.topic}</label>
        <select id="ct-topic" className={inputCls}
          value={values.topic} onChange={(e) => setValues({ ...values, topic: e.target.value })}>
          {f.topics.map((topic) => <option key={topic}>{topic}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="ct-message" className="mb-1.5 block text-sm font-medium text-forest">{f.message}</label>
        <textarea id="ct-message" rows={5} className={inputCls}
          value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </div>
      {state === "error" && <p role="alert" className="text-sm font-medium text-red-800">{f.error}</p>}
      <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
        {state === "sending" ? "…" : f.button}
      </button>
    </form>
  );
}
