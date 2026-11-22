"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

/** Floating WhatsApp doorway: appears after the hero, steps aside at the contact form. */
export function WhatsAppArch() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const hero = document.getElementById("top");
      const contact = document.getElementById("contact");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.5 : false;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setShow(pastHero && !atContact);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waIntro)}`;
  return (
    <a className={`wa-arch ${show ? "wa-arch--show" : ""}`} href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" tabIndex={show ? 0 : -1}>
      <svg viewBox="0 0 56 64" aria-hidden>
        <path className="wa-arch__shape" d="M2 64 V30 C2 14 16 5 28 1 C40 5 54 14 54 30 V64 Z" />
        <path className="wa-arch__icon" d="M28 22a12 12 0 0 0-10.4 18l-1.6 5.6 5.8-1.5A12 12 0 1 0 28 22zm0 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.4.9.9-3.3-.2-.4A9.8 9.8 0 1 1 28 43.8zm5.4-7.3c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6a.5.5 0 0 0 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}

/** Skip link for keyboard and screen reader users. */
export function SkipLink() {
  const { lang } = useLang();
  return <a className="skip" href="#studio">{lang === "mr" ? "मुख्य मजकुराकडे जा" : "Skip to content"}</a>;
}
