"use client";

import { useLang } from "@/lib/i18n";
import HeroDrawing from "./HeroDrawing";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero">
      <div className="grid-paper" aria-hidden />
      <div className="hero__frame" aria-hidden />
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__title">
            <span>{t.hero.title1}</span>
            <span>{t.hero.title2}</span>
            <em>{t.hero.title3}</em>
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__ctas">
            <a href="#work" className="btn btn--brass">{t.hero.ctaPrimary}</a>
            <a href="#contact" className="btn btn--ghost">{t.hero.ctaSecondary}</a>
          </div>
        </div>
        <div className="hero__drawing">
          <HeroDrawing label={t.hero.sheet} />
        </div>
      </div>
      <div className="hero__foot">
        <span className="hero__scroll"><span className="hero__scroll-line" aria-hidden />{t.hero.scroll}</span>
        <span className="hero__coords">20.90° N · 74.77° E</span>
      </div>
    </section>
  );
}
