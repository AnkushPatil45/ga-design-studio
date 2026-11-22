"use client";

import { useEffect, useRef, useState } from "react";

import Photo from "./Photo";
import type { ImageName } from "@/lib/images";
import { useLang } from "@/lib/i18n";
import { DimLine, SheetLabel } from "./ui";

export default function Process() {
  const { t } = useLang();
  const track = useRef<HTMLOListElement>(null);
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      setCur(Math.round((el.scrollLeft / max) * (t.process.steps.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [t.process.steps.length]);
  return (
    <section id="process" className="section section--paper process">
      {/* pointed arch mask shared by every step image */}
      <svg width="0" height="0" className="sr-only" aria-hidden>
        <clipPath id="arch-mask" clipPathUnits="objectBoundingBox">
          <path d="M0 1 V0.4 C0 0.2 0.26 0.06 0.5 0 C0.74 0.06 1 0.2 1 0.4 V1 Z" />
        </clipPath>
      </svg>
      <div className="container">
        <SheetLabel sheet="A–104" label={t.process.label} tone="light" />
        <h2 className="display process__title">{t.process.title}</h2>
        <DimLine label="01 — 04" />
        <ol className="steps" ref={track}>
          {t.process.steps.map((s, i) => (
            <li key={s.name} className="step">
              <div className="step__frame">
                <div className="step__media">
                  <Photo name={s.image as ImageName} alt={s.name} sizes="(max-width: 700px) 78vw, (max-width: 1000px) 45vw, 24vw" />
                </div>
                <svg className="step__arch" viewBox="0 0 100 134" preserveAspectRatio="none" aria-hidden>
                  <path d="M0 134 V53.6 C0 26.8 26 8 50 0 C74 8 100 26.8 100 53.6 V134" vectorEffect="non-scaling-stroke" pathLength={1} />
                </svg>
              </div>
              <span className="step__no">0{i + 1}</span>
              <h3 className="step__name">{s.name}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="steps__swipe" aria-hidden>
          {t.process.steps.map((x, i) => <i key={x.name} className={i === cur ? "on" : ""} />)}
          <span>0{cur + 1} / 0{t.process.steps.length}</span>
        </div>
      </div>
    </section>
  );
}
