"use client";

import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import { CONTACT } from "@/lib/content";
import { LangSwitch } from "./Nav";

const LINKS = ["studio", "work", "process", "cities", "contact"] as const;

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand">
          <img
            className={`footer__logo footer__logo--${lang}`}
            src={asset(lang === "mr" ? "/brand/stacked-mr.svg" : "/brand/stacked-en.svg")}
            alt="GA Design Studio"
            width={520}
            height={400}
          />
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((k, i) => (
            <a key={k} href={`#${k}`}><span>0{i + 1}</span>{t.nav[k]}</a>
          ))}
        </nav>

        <div className="footer__bottom">
          <p>© 2026 {lang === "mr" ? "जी ए डिझाईन स्टुडिओ" : "GA Design Studio"} · {t.contact.address[1]}</p>
          <div className="footer__end">
            <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
            <LangSwitch />
            <a href="#top" className="footer__top">{t.footer.top} ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
