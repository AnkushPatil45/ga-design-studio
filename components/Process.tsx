"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { DimLine, SheetLabel } from "./ui";
import { asset } from "@/lib/asset";

export default function Process() {
  const { t } = useLang();
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
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <li key={s.name} className="step">
              <div className="step__frame">
                <div className="step__media">
                  <Image src={asset(s.image)} alt={s.name} width={1500} height={2009} sizes="(max-width: 700px) 80vw, (max-width: 1100px) 45vw, 22vw" />
                </div>
                <svg className="step__arch" viewBox="0 0 100 134" preserveAspectRatio="none" aria-hidden>
                  <path d="M0 134 V53.6 C0 26.8 26 8 50 0 C74 8 100 26.8 100 53.6 V134" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <span className="step__no">0{i + 1}</span>
              <h3 className="step__name">{s.name}</h3>
              <p className="step__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
