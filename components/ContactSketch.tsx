/** A small elevation that builds itself as the form fills in.
 *  stage 0 nothing · 1 ground and plinth · 2 walls · 3 roof · 4 arch door · 5 windows, jaali and tree */
export default function ContactSketch({ stage, sent, label, done, stamp }: { stage: number; sent: boolean; label: string; done: string; stamp: string }) {
  const L = { pathLength: 1 } as const;
  const on = (n: number) => (stage >= n ? "sk on" : "sk");
  return (
    <div className={`csk ${sent ? "csk--sent" : ""}`}>
      <div className="csk__head">
        <span>{stage >= 5 ? done : label}</span>
        <span className="csk__count">{Math.min(stage, 5)}/5</span>
      </div>
      <svg className="csk__svg" viewBox="0 0 360 150" aria-hidden>
        <g className={on(1)}>
          <path d="M10 132 H350" {...L} />
          <path d="M60 132 V124 H300 V132" {...L} />
          {[30, 50, 70, 90, 110, 130].map((x) => <path key={x} d={`M${x} 132 l-8 10`} className="sk__fine" {...L} />)}
          {[230, 250, 270, 290, 310, 330].map((x) => <path key={x} d={`M${x} 132 l-8 10`} className="sk__fine" {...L} />)}
        </g>
        <g className={on(2)}>
          <path d="M70 124 V70 H170 V124" {...L} />
          <path d="M170 124 V38 H290 V124" {...L} />
        </g>
        <g className={on(3)}>
          <path d="M62 70 H178 V64 H62 Z" {...L} />
          <path d="M162 38 H298 V32 H162 Z" {...L} />
        </g>
        <g className={on(4)}>
          <path className="sk__accent" d="M214 124 V98 A22 22 0 0 1 230 77 A22 22 0 0 1 246 98 V124" {...L} />
          <path d="M230 80 V124" className="sk__fine" {...L} />
        </g>
        <g className={on(5)}>
          <path d="M84 84 H140 V116 H84 Z" {...L} />
          <path d="M84 84 L140 116 M140 84 L84 116 M112 84 V116" className="sk__fine" {...L} />
          <path d="M184 48 H276 V66 H184 Z" {...L} />
          {[196, 208, 220, 232, 244, 256, 268].map((x) => <path key={x} d={`M${x} 48 V66`} className="sk__fine" {...L} />)}
          <path d="M28 132 V96" {...L} />
          <circle cx="28" cy="82" r="16" {...L} />
          <circle cx="18" cy="92" r="10" {...L} />
          <circle cx="40" cy="90" r="11" {...L} />
          <path d="M262 124 m0 -12 a3 3 0 1 0 0.1 0 M262 115 V124" className="sk__fine" {...L} />
        </g>
      </svg>
      <div className="csk__stamp" aria-hidden>
        <span>GA</span>
        <b>{stamp}</b>
      </div>
    </div>
  );
}
