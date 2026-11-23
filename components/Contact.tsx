"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { CITIES, CONTACT } from "@/lib/content";
import { SheetLabel } from "./ui";
import ContactSketch from "./ContactSketch";

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const [stage, setStage] = useState(0);
  const touched = useRef<Set<string>>(new Set());

  function onInput(e: FormEvent<HTMLFormElement>) {
    const f = e.currentTarget;
    const target = e.target as HTMLInputElement;
    if (target?.name) touched.current.add(target.name);
    const d = new FormData(f);
    const filled = (k: string) => String(d.get(k) ?? "").trim().length > 1;
    let n = 0;
    if (filled("name")) n++;
    if (String(d.get("phone") ?? "").replace(/\D/g, "").length >= 6) n++;
    if (touched.current.has("city")) n++;
    if (touched.current.has("type")) n++;
    if (filled("message")) n++;
    setStage(n);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      c.waIntro,
      "",
      `${c.name}: ${d.get("name") ?? ""}`,
      `${c.phone}: ${d.get("phone") ?? ""}`,
      `${c.city}: ${d.get("city") ?? ""}`,
      `${c.type}: ${d.get("type") ?? ""}`,
      "",
      String(d.get("message") ?? ""),
    ];
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setStage(5);
  }

  return (
    <section id="contact" className="section section--paper contact">
      <div className="container">
        <SheetLabel sheet="A–106" label={c.label} tone="light" />
        <div className="contact__grid">
          <div>
            <h2 className="display">
              <span>{c.title1}</span>
              <em>{c.title2}</em>
            </h2>
            <p className="lead">{c.body}</p>

            <div className="contact__cards">
              <div className="contact__card">
                <p className="contact__card-label">{c.visit}</p>
                <p className="contact__card-value">{c.address[0]}<br />{c.address[1]}</p>
              </div>
              <a className="contact__card" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                <p className="contact__card-label">{c.call}</p>
                <p className="contact__card-value">{CONTACT.phone}</p>
              </a>
              <a className="contact__card" href={`mailto:${CONTACT.email}`}>
                <p className="contact__card-label">{c.write}</p>
                <p className="contact__card-value">{CONTACT.email}</p>
              </a>
            </div>
          </div>

          <form className="form" onSubmit={onSubmit} onInput={onInput} onChange={onInput}>
            <ContactSketch stage={stage} sent={sent} label={c.sketch} done={c.sketchDone} stamp={c.stamp} />
            <label className="field">
              <span>{c.name}</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>{c.phone}</span>
              <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
            </label>
            <div className="field-row">
              <label className="field">
                <span>{c.city}</span>
                <select name="city" defaultValue={CITIES[0][lang]}>
                  {CITIES.map((x) => <option key={x.key}>{x[lang]}</option>)}
                </select>
              </label>
              <label className="field">
                <span>{c.type}</span>
                <select name="type" defaultValue={c.types[0]}>
                  {c.types.map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
            </div>
            <label className="field">
              <span>{c.message}</span>
              <textarea name="message" rows={4} />
            </label>
            <button type="submit" className="btn btn--green form__submit">{c.submit}</button>
            <p className="form__note" aria-live="polite">{sent ? "✓ " : ""}{c.note}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
