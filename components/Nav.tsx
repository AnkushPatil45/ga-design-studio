"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

const LINKS = ["studio", "work", "process", "cities", "contact"] as const;

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <span aria-hidden>/</span>
      <button type="button" aria-pressed={lang === "mr"} onClick={() => setLang("mr")} className="lang-toggle__mr">मराठी</button>
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" aria-label="GA Design Studio, home">
          <img src={asset("/brand/lockup-horizontal-dark-transparent.svg")} alt="GA Design Studio" width={260} height={56} />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((k, i) => (
            <a key={k} href={`#${k}`}>
              <span className="nav__no">0{i + 1}</span>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="nav__end">
          <LangToggle />
          <a href="#contact" className="btn btn--brass nav__cta">{t.nav.cta}</a>
          <button type="button" className="nav__burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="mobile-menu__grid" aria-hidden />
        <nav aria-label="Mobile">
          {LINKS.map((k, i) => (
            <a key={k} href={`#${k}`} onClick={() => setOpen(false)}>
              <span className="nav__no">0{i + 1}</span>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <LangToggle />
          <a href="#contact" className="btn btn--brass" onClick={() => setOpen(false)}>{t.nav.cta}</a>
        </div>
      </div>
    </header>
  );
}
