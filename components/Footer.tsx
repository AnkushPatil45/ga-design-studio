"use client";

import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { LangToggle } from "./Nav";

const LINKS = ["studio", "work", "process", "cities", "contact"] as const;

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="footer">
      <div className="grid-paper" aria-hidden />
      <div className="container">
        <div className="footer__top">
          <img
            className="footer__logo"
            src={lang === "mr" ? "/brand/lockup-marathi-dark.svg" : "/brand/lockup-horizontal-dark-transparent.svg"}
            alt="GA Design Studio"
            width={420}
            height={90}
          />
          <nav className="footer__links" aria-label="Footer">
            {LINKS.map((k) => <a key={k} href={`#${k}`}>{t.nav[k]}</a>)}
          </nav>
        </div>
        <div className="footer__steps" aria-hidden>
          <span /><span /><span />
        </div>
        <div className="footer__bottom">
          <p>© 2026 {lang === "mr" ? "जी ए डिझाईन स्टुडिओ" : "GA Design Studio"}. {t.footer.rights}</p>
          <p className="footer__tag">{t.footer.tagline}</p>
          <div className="footer__end">
            <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
            <LangToggle />
            <a href="#top">{t.footer.top} ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
