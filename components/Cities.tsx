"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import { CITIES } from "@/lib/content";
import { SheetLabel } from "./ui";

gsap.registerPlugin(ScrollTrigger);

// Map window in degrees, projected linearly (fine at this scale).
const LON0 = 72.2, LON1 = 75.6, LAT0 = 17.8, LAT1 = 21.6;
const W = 600, H = 640;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

const COAST: [number, number][] = [
  [72.86, 21.6], [72.8, 21.1], [72.74, 20.5], [72.7, 19.9], [72.8, 19.3], [72.84, 19.0], [72.92, 18.8], [73.0, 18.4], [73.08, 17.8],
];
// rough course of the Tapi and Godavari, for texture
const TAPI: [number, number][] = [[75.6, 21.25], [75.0, 21.2], [74.6, 21.32], [74.2, 21.28], [73.7, 21.2], [73.2, 21.18], [72.86, 21.2]];
const GODAVARI: [number, number][] = [[73.55, 19.95], [73.9, 19.9], [74.3, 19.78], [74.75, 19.6], [75.2, 19.45], [75.6, 19.3]];
const line = (pts: [number, number][]) => pts.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join(" ");

const SCALE = 1.9;

export default function Cities() {
  const { t, lang } = useLang();
  const hq = CITIES.find((c) => c.hq)!;
  const coast = line(COAST);
  const sea = `M0,0 L${coast.split(" ").join(" L")} L0,${H} Z`;
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const world = el.querySelector(".map__world") as SVGGElement;
    const dot = el.querySelector(".map__traveller") as SVGCircleElement;
    const routes = gsap.utils.toArray<SVGLineElement>(".map__route", el);
    const others = CITIES.filter((c) => !c.hq);
    const focus = (lon: number, lat: number, s = SCALE) => ({ x: W / 2 - s * px(lon), y: H / 2 - s * py(lat), scale: s });

    const mm = gsap.matchMedia();
    // Large screens: the section holds still and the map takes you on a trip.
    mm.add("(min-width: 1001px) and (min-height: 760px)", () => {
      gsap.set(world, { svgOrigin: "0 0" });
      gsap.set(routes, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(dot, { attr: { cx: px(hq.lon), cy: py(hq.lat) }, opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el, start: "top top", end: "+=260%", pin: true, scrub: 0.8, anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setActive(p < 0.14 ? -1 : p < 0.34 ? 0 : p < 0.53 ? 1 : p < 0.72 ? 2 : p < 0.86 ? 3 : 4);
          },
        },
      });
      tl.fromTo(el.querySelector(".map__coast"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
        .fromTo(el.querySelectorAll(".map__river"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0.2)
        .from(el.querySelectorAll(".map__graticule"), { opacity: 0, duration: 0.6, stagger: 0.05 }, 0)
        .from(el.querySelectorAll(".map__city"), { opacity: 0, duration: 0.4, stagger: 0.1 }, 0.6)
        .to(world, { ...focus(hq.lon, hq.lat), duration: 1 }, 1.2)
        .to(el.querySelector(".map__ticks"), { opacity: 0, duration: 0.4 }, 1.2)
        .to(dot, { opacity: 1, duration: 0.2 }, 2);
      let at = 2.4;
      others.forEach((c, i) => {
        tl.to(routes[i], { strokeDashoffset: 0, duration: 1 }, at)
          .to(dot, { attr: { cx: px(c.lon), cy: py(c.lat) }, duration: 1 }, at)
          .to(world, { ...focus((hq.lon + c.lon) / 2, (hq.lat + c.lat) / 2, 1.35), duration: 0.5, ease: "power1.inOut" }, at)
          .to(world, { ...focus(c.lon, c.lat), duration: 0.6 }, at + 0.5)
          .set(dot, { attr: { cx: px(hq.lon), cy: py(hq.lat) } }, at + 1.3);
        at += 1.4;
      });
      tl.to(world, { x: 0, y: 0, scale: 1, duration: 1 }, at)
        .to(dot, { opacity: 0, duration: 0.2 }, at)
        .to(el.querySelector(".map__ticks"), { opacity: 1, duration: 0.4 }, at + 0.6)
        .to({}, { duration: 0.6 });
      return () => setActive(-1);
    });
    // Phones and short screens: draw once, then the routes keep flowing and cities take turns.
    mm.add("(max-width: 1000px), (max-height: 759px)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector(".map"), start: "top 75%", once: true } });
      tl.fromTo(el.querySelector(".map__coast"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
        .fromTo(el.querySelectorAll(".map__river"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4 }, 0.3)
        .from(el.querySelectorAll(".map__city"), { opacity: 0, duration: 0.5, stagger: 0.15 }, 0.8)
        .fromTo(routes, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.2, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 1.2)
        .add(() => el.classList.add("cities--alive"));
      let i = 0;
      const id = window.setInterval(() => { if (el.classList.contains("cities--alive")) setActive(i++ % 4); }, 2400);
      return () => { window.clearInterval(id); el.classList.remove("cities--alive"); setActive(-1); };
    });
    return () => mm.revert();
  }, [hq.lat, hq.lon]);

  const cur = active >= 0 && active < 4 ? CITIES[active] : null;

  return (
    <section id="cities" ref={root} className={`section section--green cities ${active === 4 ? "cities--all" : ""}`}>
      <div className="container">
        <SheetLabel sheet="A–105" label={t.cities.label} />
        <div className="cities__grid">
          <div className="cities__copy">
            <h2 className="display display--light">
              <span>{t.cities.title1}</span>
              <em>{t.cities.title2}</em>
            </h2>
            <p className="lead lead--light">{t.cities.body}</p>
            <ul className="city-list">
              {CITIES.map((c, i) => (
                <li key={c.key} className={`${c.hq ? "is-hq" : ""} ${active === i || active === 4 ? "is-on" : ""}`}>
                  <span className="city-list__no">0{i + 1}</span>
                  <span className="city-list__name">{c[lang]}</span>
                  <span className="city-list__meta">{c.hq ? t.cities.hq : `${c.km} km`}</span>
                  <span className="city-list__coord">{c.lat.toFixed(2)}° N · {c.lon.toFixed(2)}° E</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="map-wrap">
            <svg className="map" viewBox={`-30 -20 ${W + 60} ${H + 50}`} role="img" aria-label={`${t.cities.title1} ${t.cities.title2}`}>
              <defs>
                <pattern id="sea-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" className="map__sea-line" />
                </pattern>
                <clipPath id="map-clip"><rect x={0} y={0} width={W} height={H} /></clipPath>
              </defs>
              <g clipPath="url(#map-clip)">
                <g className="map__world">
                  <path d={`M-400,-400 L${px(72.86)},-400 L${coast.split(" ").join(" L")} L${px(73.08)},${H + 400} L-400,${H + 400} Z`} fill="url(#sea-hatch)" />
                  {[73, 74, 75].map((lo) => <line key={lo} x1={px(lo)} y1={-400} x2={px(lo)} y2={H + 400} className="map__graticule" />)}
                  {[18, 19, 20, 21].map((la) => <line key={la} x1={-400} y1={py(la)} x2={W + 400} y2={py(la)} className="map__graticule" />)}
                  <polyline points={line(TAPI)} className="map__river" pathLength={1} />
                  <polyline points={line(GODAVARI)} className="map__river" pathLength={1} />
                  <polyline points={coast} className="map__coast" pathLength={1} />
                  <text x={px(72.4)} y={py(18.6)} className="map__sea" transform={`rotate(-90 ${px(72.4)} ${py(18.6)})`}>{t.cities.sea}</text>
                  {CITIES.filter((c) => !c.hq).map((c) => (
                    <line key={c.key} x1={px(hq.lon)} y1={py(hq.lat)} x2={px(c.lon)} y2={py(c.lat)} className="map__route" pathLength={1} />
                  ))}
                  {CITIES.map((c, i) => (
                    <g key={c.key} transform={`translate(${px(c.lon)} ${py(c.lat)})`} className={`map__city ${c.hq ? "map__city--hq" : ""} ${active === i ? "is-on" : ""}`}>
                      <circle r={18} className="map__pulse" />
                      {c.hq ? <path className="map__arch" d="M-7 9 V-1 C-7 -6 -3 -9 0 -11 C3 -9 7 -6 7 -1 V9 Z" /> : <circle r={5} className="map__pin" />}
                      <text x={c.hq ? 16 : 12} y={5}>{c[lang]}</text>
                    </g>
                  ))}
                  <circle r={4.5} className="map__traveller" cx={px(hq.lon)} cy={py(hq.lat)} />
                </g>
              </g>
              <rect x={0} y={0} width={W} height={H} className="map__frame" />
              <g className="map__ticks">
                {[73, 74, 75].map((lo) => <text key={lo} x={px(lo)} y={H + 18} textAnchor="middle" className="map__tick">{lo}° E</text>)}
                {[18, 19, 20, 21].map((la) => <text key={la} x={W + 6} y={py(la) + 3} className="map__tick">{la}° N</text>)}
              </g>
              <g transform={`translate(${W - 30} ${H - 40})`} className="map__north">
                <circle r={16} />
                <path d="M0 -13 L5 7 L0 3 L-5 7 Z" />
                <text y={-22} textAnchor="middle">N</text>
              </g>
            </svg>

            <div className={`map-card ${cur || active === 4 ? "map-card--on" : ""}`} aria-live="polite">
              {cur ? (
                <div key={cur.key} className="map-card__in">
                  <p className="map-card__no">0{active + 1} · {cur.hq ? t.cities.hq : `${cur.km} ${t.cities.km}`}</p>
                  <p className="map-card__name">{cur[lang]}</p>
                  <p className="map-card__line">{cur.line[lang]}</p>
                </div>
              ) : active === 4 ? (
                <div key="all" className="map-card__in"><p className="map-card__name">{t.cities.all}</p></div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
