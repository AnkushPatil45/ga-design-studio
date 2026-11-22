"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Cropped, SheetLabel } from "./ui";
import { asset } from "@/lib/asset";

const NUMERALS = ["I", "II", "III"];

function Monogram({ letter }: { letter: string }) {
  return (
    <svg className="person__mark" viewBox="0 0 80 100" aria-hidden>
      <path d="M8 96 V44 C8 22 26 8 40 2 C54 8 72 22 72 44 V96" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 96 H78" stroke="currentColor" strokeWidth="1.2" />
      <text x="40" y="80" textAnchor="middle">{letter}</text>
    </svg>
  );
}

export default function Studio() {
  const { t } = useLang();
  const s = t.studio;
  return (
    <section id="studio" className="section section--paper studio">
      <div className="container">
        <SheetLabel sheet="A–102" label={s.label} tone="light" />
        <div className="studio__grid">
          <div className="studio__copy">
            <h2 className="display">
              <span>{s.title1}</span>
              <em>{s.title2}</em>
            </h2>
            <p className="lead">{s.body1}</p>
            <p className="body">{s.body2}</p>
            <div className="people">
              <div className="person">
                <Monogram letter="F" />
                <div>
                  <p className="person__name">Farzeb Shaikh</p>
                  <p className="person__role">{s.farzebRole}</p>
                </div>
              </div>
              <div className="person">
                <Monogram letter="S" />
                <div>
                  <p className="person__name">Shoaib Shaikh</p>
                  <p className="person__role">{s.shoaibRole}</p>
                </div>
              </div>
            </div>
          </div>
          <figure className="studio__figure">
            <Cropped>
              <Image src={asset("/images/studio-model.jpg")} alt={s.caption} width={1500} height={2009} sizes="(max-width: 900px) 100vw, 40vw" />
            </Cropped>
            <figcaption><span>FIG. 01</span>{s.caption}</figcaption>
          </figure>
        </div>

        <ol className="values">
          {s.values.map((v, i) => (
            <li key={v.name} className="value" style={{ ["--step" as string]: i }}>
              <span className="value__bar" aria-hidden />
              <span className="value__no">{NUMERALS[i]}</span>
              <h3 className="value__name">{v.name}</h3>
              <p className="value__text">{v.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
