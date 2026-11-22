"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import type { Lang } from "@/lib/content";

const LINKS = ["studio", "work", "process", "cities", "contact"] as const;
type Key = (typeof LINKS)[number];

/* ------------------------------------------------------------------ logo */
export function Logo() {
  const { lang } = useLang();
  return (
    <span className="logo">
      <img className="logo__mark" src={asset("/brand/nav-mark.svg")} alt="" width={64} height={64} />
      {lang === "mr" ? (
        <span className="logo__word logo__word--mr">जी ए <i>डिझाईन स्टुडिओ</i></span>
      ) : (
        <span className="logo__word">GA <i>Design Studio</i></span>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ language switch
   Two letterforms inside a little doorway. A brass pointed arch slides behind the active one. */
export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const set = (l: Lang) => {
    if (l === lang) return;
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setLang(l);
    root.classList.add("lang-swap");
    window.setTimeout(() => {
      setLang(l);
      window.setTimeout(() => root.classList.remove("lang-swap"), 80);
    }, 240);
  };
  return (
    <div className={`langsw langsw--${lang}`} role="radiogroup" aria-label={t.nav.lang}>
      <svg className="langsw__arch" viewBox="0 0 40 44" preserveAspectRatio="none" aria-hidden>
        <path d="M1 44 V20 C1 10 11 4 20 1 C29 4 39 10 39 20 V44 Z" />
      </svg>
      <button type="button" role="radio" aria-checked={lang === "en"} aria-label="English" onClick={() => set("en")}>
        <span className="langsw__glyph">Aa</span>
      </button>
      <button type="button" role="radio" aria-checked={lang === "mr"} aria-label="मराठी" onClick={() => set("mr")}>
        <span className="langsw__glyph langsw__glyph--mr">अ</span>
      </button>
    </div>
  );
}
/** kept for older imports */
export const LangToggle = LangSwitch;

/* ------------------------------------------------------------------ floor plan index
   The menu is the plan of a courtyard house. Each room is a section. */
const ROOMS: { key: Key; area: string; cls: string }[] = [
  { key: "studio", area: "4.8 × 6.0", cls: "r-studio" },
  { key: "work", area: "9.6 × 6.0", cls: "r-work" },
  { key: "process", area: "4.8 × 10.2", cls: "r-process" },
  { key: "cities", area: "4.8 × 4.2", cls: "r-cities" },
  { key: "contact", area: "9.6 × 4.2", cls: "r-contact" },
];

function PlanMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: Key | null }) {
  const { t } = useLang();
  return (
    <div id="plan-menu" className={`plan ${open ? "plan--open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="plan__inner">
        <p className="plan__title">{t.nav.plan}</p>
        <nav className="plan__grid" aria-label="Index">
          {ROOMS.map((r, i) => (
            <a key={r.key} href={`#${r.key}`} className={`room ${r.cls} ${active === r.key ? "is-here" : ""}`} onClick={onClose} style={{ ["--i" as string]: i }}>
              <span className="room__door" aria-hidden />
              <span className="room__no">0{i + 1}</span>
              <span className="room__name">{t.nav[r.key]}</span>
              <span className="room__sub">{t.nav.rooms[r.key]}</span>
              <span className="room__area">{r.area} m</span>
            </a>
          ))}
          <div className="room r-court" aria-hidden>
            <svg className="court__tree" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" />
              <circle cx="36" cy="42" r="17" />
              <circle cx="64" cy="44" r="19" />
              <circle cx="50" cy="64" r="15" />
              <circle cx="50" cy="50" r="2.5" className="court__trunk" />
            </svg>
            <span className="room__sub">{t.nav.courtyard}</span>
          </div>
        </nav>
        <div className="plan__foot">
          <LangSwitch />
          <a href="#contact" className="btn btn--brass" onClick={onClose}>{t.nav.cta}</a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ nav */
export default function Nav() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Key | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const arch = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        const mid = window.innerHeight * 0.45;
        let cur: Key | null = null;
        for (const k of LINKS) {
          const el = document.getElementById(k);
          if (el && el.getBoundingClientRect().top <= mid) cur = k;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // slide the brass arch behind the active link
  useLayoutEffect(() => {
    const wrap = linksRef.current, a = arch.current;
    if (!wrap || !a) return;
    const el = active ? (wrap.querySelector(`[data-k="${active}"]`) as HTMLElement | null) : null;
    if (!el) { a.style.opacity = "0"; return; }
    a.style.opacity = "1";
    a.style.transform = `translateX(${el.offsetLeft}px)`;
    a.style.width = `${el.offsetWidth}px`;
  }, [active, lang]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("ga:menu", { detail: open }));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <span ref={progress} className="nav__progress" aria-hidden />
      <div className="nav__inner">
        <a href="#top" className="nav__logo" aria-label="GA Design Studio" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <div ref={linksRef} className="nav__links">
          <span ref={arch} className="nav__arch" aria-hidden>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M2 40 V20 C2 9 30 2 50 1 C70 2 98 9 98 20 V40" vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
          <nav aria-label="Primary">
            {LINKS.map((k) => (
              <a key={k} href={`#${k}`} data-k={k} className={active === k ? "is-active" : ""}>{t.nav[k]}</a>
            ))}
          </nav>
        </div>
        <div className="nav__end">
          <LangSwitch />
          <button type="button" className="nav__index" aria-expanded={open} aria-controls="plan-menu" onClick={() => setOpen((o) => !o)}>
            <span className="nav__index-icon" aria-hidden><i /><i /><i /><i /></span>
            <span className="nav__index-label">{open ? t.nav.close : t.nav.menu}</span>
          </button>
        </div>
      </div>
      <PlanMenu open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  );
}
