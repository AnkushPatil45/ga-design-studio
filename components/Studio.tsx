"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Photo from "./Photo";
import { useLang } from "@/lib/i18n";
import { Cropped, SheetLabel } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const NUMERALS = ["I", "II", "III"];

/** Ground floor plan of the courtyard house in the model photo, drawn in brass over it. */
function PlanOverlay({ stage }: { stage: string }) {
  const L = { pathLength: 1 } as const;
  return (
    <svg className="plan-ov" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g className="plan-ov__walls">
        <path d="M14 22 H86 V100 H14 Z" {...L} />
        <path d="M17 25 H83 V97 H17 Z" {...L} />
        <path d="M38 45 H62 V74 H38 Z" {...L} />
        <path d="M14 45 H38 M62 45 H86 M14 74 H38 M62 74 H86 M38 22 V45 M62 22 V45 M50 74 V100" {...L} />
      </g>
      <g className="plan-ov__fine">
        <path d="M24 74 A7 7 0 0 1 31 67 M31 74 V67" {...L} />
        <path d="M70 45 A7 7 0 0 0 77 52 M70 45 V52" {...L} />
        <path d="M44 100 A6 6 0 0 1 50 94 M50 100 V94" {...L} />
        <path d="M40 47 L60 72 M60 47 L40 72" {...L} />
        <circle cx="50" cy="59.5" r="6" {...L} />
        <path d="M14 112 H86 M14 109 V115 M86 109 V115" {...L} />
        <path d="M6 22 V100 M3 22 H9 M3 100 H9" {...L} />
      </g>
      <text x="50" y="119" textAnchor="middle" className="plan-ov__dim">14 400</text>
      <text x="14" y="15" className="plan-ov__label">{stage}</text>
    </svg>
  );
}

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
  const { t, lang } = useLang();
  const s = t.studio;
  const fig = useRef<HTMLElement>(null);

  // scroll: the plan draws, the model photo comes alive, the plan steps back
  useEffect(() => {
    const el = fig.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const paths = el.querySelectorAll(".plan-ov [pathLength]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 35%", scrub: 0.8 } });
      tl.fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.45, stagger: 0.012 }, 0)
        .fromTo(el.querySelectorAll(".plan-ov text"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.3)
        .fromTo(el.querySelector(".studio__tint"), { opacity: 1 }, { opacity: 0, ease: "power1.inOut", duration: 0.4 }, 0.42)
        .fromTo(el.querySelector(".studio__figure .photo img"), { filter: "grayscale(1) contrast(1.1) brightness(0.9)" }, { filter: "grayscale(0) contrast(1) brightness(1)", ease: "none", duration: 0.4 }, 0.42)
        .to(el.querySelector(".plan-ov"), { opacity: 0.18, duration: 0.25 }, 0.78);
      // the two arches above Farzeb and Shoaib trace themselves
      gsap.fromTo(".person__mark path", { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.25, scrollTrigger: { trigger: ".people", start: "top 88%", once: true } });
    });
    // gentle tilt toward the pointer, desktop only
    const media = el.querySelector(".cropped") as HTMLElement | null;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(media, { rotateY: x * 7, rotateX: -y * 7, duration: 0.8, ease: "power3.out" });
    };
    const leave = () => gsap.to(media, { rotateY: 0, rotateX: 0, duration: 1.1, ease: "power3.out" });
    if (fine && media) { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave); }
    return () => { ctx.revert(); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [lang]);
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
          <figure className="studio__figure" ref={fig}>
            <Cropped>
              <Photo name="studio-model" alt={s.caption} sizes="(max-width: 1000px) 90vw, 40vw" />
              <span className="studio__tint" aria-hidden />
              <PlanOverlay stage={lang === "mr" ? "तळमजला · १:५०" : "GROUND FLOOR · 1:50"} />
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
