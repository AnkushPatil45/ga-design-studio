"use client";

import { useLang } from "@/lib/i18n";
import { CITIES } from "@/lib/content";
import { SheetLabel } from "./ui";

// Map window in degrees, projected linearly (fine at this scale).
const LON0 = 72.2, LON1 = 75.6, LAT0 = 17.8, LAT1 = 21.6;
const W = 600, H = 640;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

const COAST: [number, number][] = [
  [72.86, 21.6], [72.8, 21.1], [72.74, 20.5], [72.7, 19.9], [72.8, 19.3], [72.84, 19.0], [72.92, 18.8], [73.0, 18.4], [73.08, 17.8],
];

export default function Cities() {
  const { t, lang } = useLang();
  const hq = CITIES.find((c) => c.hq)!;
  const coast = COAST.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join(" ");
  const sea = `M0,0 L${coast.split(" ").join(" L")} L0,${H} Z`;

  return (
    <section id="cities" className="section section--green cities">
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
                <li key={c.key} className={c.hq ? "is-hq" : ""}>
                  <span className="city-list__no">0{i + 1}</span>
                  <span className="city-list__name">{c[lang]}</span>
                  <span className="city-list__meta">{c.hq ? t.cities.hq : t.cities.site}</span>
                  <span className="city-list__coord">{c.lat.toFixed(2)}° N · {c.lon.toFixed(2)}° E</span>
                </li>
              ))}
            </ul>
          </div>

          <svg className="map" viewBox={`-30 -20 ${W + 60} ${H + 50}`} role="img" aria-label={`${t.cities.title1} ${t.cities.title2}`}>
            <defs>
              <pattern id="sea-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" className="map__sea-line" />
              </pattern>
            </defs>
            <path d={sea} fill="url(#sea-hatch)" />
            <polyline points={coast} className="map__coast" pathLength={1} />
            {[73, 74, 75].map((lo) => (
              <g key={lo}>
                <line x1={px(lo)} y1={0} x2={px(lo)} y2={H} className="map__graticule" />
                <text x={px(lo)} y={H + 18} textAnchor="middle" className="map__tick">{lo}° E</text>
              </g>
            ))}
            {[18, 19, 20, 21].map((la) => (
              <g key={la}>
                <line x1={0} y1={py(la)} x2={W} y2={py(la)} className="map__graticule" />
                <text x={W + 6} y={py(la) + 3} className="map__tick">{la}° N</text>
              </g>
            ))}
            <rect x={0} y={0} width={W} height={H} className="map__frame" />
            <text x={px(72.35)} y={py(18.6)} className="map__sea" transform={`rotate(-90 ${px(72.35)} ${py(18.6)})`}>{t.cities.sea}</text>

            {CITIES.filter((c) => !c.hq).map((c) => (
              <line key={c.key} x1={px(hq.lon)} y1={py(hq.lat)} x2={px(c.lon)} y2={py(c.lat)} className="map__route" pathLength={1} />
            ))}
            {CITIES.map((c) => (
              <g key={c.key} transform={`translate(${px(c.lon)} ${py(c.lat)})`} className={c.hq ? "map__city map__city--hq" : "map__city"}>
                {c.hq && <circle r={22} className="map__ring" />}
                <circle r={c.hq ? 7 : 5} />
                <text x={c.hq ? 30 : 14} y={5}>{c[lang]}</text>
              </g>
            ))}
            <g transform={`translate(${W - 30} ${H - 40})`} className="map__north">
              <circle r={16} />
              <path d="M0 -13 L5 7 L0 3 L-5 7 Z" />
              <text y={-22} textAnchor="middle">N</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
