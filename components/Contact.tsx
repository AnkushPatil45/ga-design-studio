"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { CITIES, CONTACT } from "@/lib/content";
import { SheetLabel } from "./ui";

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);

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

          <form className="form" onSubmit={onSubmit}>
            <div className="form__head" aria-hidden>
              <span>FORM · A–106.1</span>
              <span>{lang === "mr" ? "मराठी" : "EN"}</span>
            </div>
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
