"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import { CONTACT } from "@/lib/content";
import { LangSwitch } from "./Nav";

const LINKS = ["studio", "work", "process", "cities", "contact"] as const;
const DEVA = "०१२३४५६७८९";

/** Time in Dhule (IST), and whether the studio is open: Mon to Sat, 10:00 to 19:00. */
function useStudioTime() {
  const [now, setNow] = useState<{ hh: number; mm: number; day: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date(Date.now() + (5.5 * 60 + new Date().getTimezoneOffset()) * 60000);
      setNow({ hh: d.getHours(), mm: d.getMinutes(), day: d.getDay() });
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export default function Footer() {
  const { t, lang } = useLang();
  const now = useStudioTime();
  const open = !!now && now.day !== 0 && now.hh >= 10 && now.hh < 19;
  let clock = now ? `${String(now.hh).padStart(2, "0")}:${String(now.mm).padStart(2, "0")}` : "--:--";
  if (lang === "mr") clock = clock.replace(/\d/g, (n) => DEVA[+n]);
  const words = t.footer.tagline.split(" · ");

  return (
    <footer className="footer">
      <svg className="footer__arch" viewBox="0 0 1000 760" preserveAspectRatio="xMidYMax meet" aria-hidden>
        <path className="fa fa--outer" pathLength={1} d="M200 700 V380 A340 340 0 0 1 500 42.6 A340 340 0 0 1 800 380 V700" />
        <path className="fa fa--inner" pathLength={1} d="M224 700 V380 A316 316 0 0 1 500 66.4 A316 316 0 0 1 776 380 V700" />
        <path className="fa fa--step" pathLength={1} d="M150 700 H850" />
        <path className="fa fa--step" pathLength={1} d="M110 722 H890" />
        <path className="fa fa--step" pathLength={1} d="M70 744 H930" />
      </svg>
      <div className="container footer__inner">
        <div className="footer__brand">
          <img
            className={`footer__logo footer__logo--${lang}`}
            src={asset(lang === "mr" ? "/brand/stacked-mr.svg" : "/brand/stacked-en.svg")}
            alt="GA Design Studio"
            width={520}
            height={400}
          />
          <p className="footer__tagline">
            {words.map((w, i) => (
              <span key={w} style={{ ["--i" as string]: i }}>{w}</span>
            ))}
          </p>
        </div>

        <div className="footer__clock">
          <span className={`footer__dot ${open ? "is-open" : ""}`} aria-hidden />
          <span>{t.footer.studioTime}</span>
          <b>{clock}</b>
          <span className="footer__status">{open ? t.footer.open : t.footer.closed}</span>
          <span className="footer__hours">{t.footer.hours}</span>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((k, i) => (
            <a key={k} href={`#${k}`}><span>0{i + 1}</span>{t.nav[k]}</a>
          ))}
        </nav>

        <div className="footer__bottom">
          <p>© 2026 {lang === "mr" ? "जी ए डिझाईन स्टुडिओ" : "GA Design Studio"} · {t.contact.address[1]}</p>
          <div className="footer__end">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <LangSwitch />
            <a href="#top" className="footer__top">{t.footer.top} ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
