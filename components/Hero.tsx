"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import HeroDrawing from "./HeroDrawing";
import type { HeroScene } from "./hero3d/scene";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const { t } = useLang();
  const track = useRef<HTMLElement>(null);
  const svgWrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"static" | "motion">("static");
  const [stage, setStage] = useState(0);

  // Decide once on the client whether the 3D build runs.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && webglOK()) setMode("motion");
  }, []);

  // Draw the elevation on load.
  useEffect(() => {
    const root = svgWrap.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const strokes = root.querySelectorAll("[pathLength]:not(.d-grid *)");
      gsap.fromTo(strokes, { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: { amount: 1.4, from: "start" }, delay: 0.25,
        onComplete: () => gsap.set(strokes, { clearProps: "strokeDasharray,strokeDashoffset" }),
      });
      gsap.from(root.querySelectorAll(".d-grid, text, .d-north path"), { opacity: 0, duration: 1, delay: 1.4, stagger: 0.02 });
      gsap.from(".hero__copy > *", { y: 28, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.1, delay: 0.1 });
    }, root.parentElement!.parentElement!);
    return () => ctx.revert();
  }, []);

  // Scroll driven build.
  useEffect(() => {
    if (mode !== "motion" || !track.current || !canvas.current) return;
    let scene: HeroScene | null = null;
    let st: ScrollTrigger | null = null;
    let disposed = false;
    let last = -1;

    const update = (p: number) => {
      if (svgWrap.current) svgWrap.current.style.opacity = String(1 - range(p, 0.03, 0.13));
      if (canvas.current) canvas.current.style.opacity = scene ? String(range(p, 0.0, 0.09)) : "0";
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const s = p < 0.17 ? 0 : p < 0.5 ? 1 : p < 0.85 ? 2 : 3;
      if (s !== last) { last = s; setStage(s); }
      scene?.setProgress(p);
    };

    st = ScrollTrigger.create({
      trigger: track.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
    });

    import("./hero3d/scene").then(({ createHeroScene }) => {
      if (disposed || !canvas.current) return;
      scene = createHeroScene(canvas.current);
      update(st?.progress ?? 0);
    });

    const onResize = () => scene?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      st?.kill();
      scene?.dispose();
    };
  }, [mode]);

  return (
    <section id="top" ref={track} className={`hero-track hero-track--${mode}`}>
      <div className="hero">
        <div className="grid-paper" aria-hidden />
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
          <div className="hero__stagewrap">
            <div className="hero__stage">
              <canvas ref={canvas} className="hero__canvas" aria-hidden />
              <div ref={svgWrap} className="hero__drawing">
                <HeroDrawing label={t.hero.sheet} />
              </div>
            </div>
          </div>
        </div>
        <div className="hero__foot">
          <span className="hero__scroll"><span className="hero__scroll-line" aria-hidden />{t.hero.scroll}</span>
          {mode === "motion" && (
            <div className="hero__stagebar" aria-hidden>
              <span className="hero__stagebar-label">
                <b>0{stage + 1}</b> {t.hero.stages[stage]}
              </span>
              <span className="hero__stagebar-track"><span ref={bar} className="hero__stagebar-fill" /></span>
              <span className="hero__stagebar-ticks">
                {t.hero.stages.map((x, i) => <i key={x} className={i <= stage ? "on" : ""} />)}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
