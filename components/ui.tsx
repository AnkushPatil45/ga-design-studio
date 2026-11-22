import type { ReactNode } from "react";

/** Section header styled like the label strip on a drawing sheet. */
export function SheetLabel({ sheet, label, tone = "dark" }: { sheet: string; label: string; tone?: "dark" | "light" }) {
  return (
    <div className={`sheet-label sheet-label--${tone}`}>
      <span className="sheet-label__no">{sheet}</span>
      <span className="sheet-label__rule" aria-hidden />
      <span className="sheet-label__text">{label}</span>
    </div>
  );
}

/** Small graphic scale bar, 0 to 5 metres. */
export function ScaleBar() {
  return (
    <svg className="scale-bar" viewBox="0 0 120 18" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={10 + i * 20} y={6} width={20} height={4} fill={i % 2 ? "none" : "currentColor"} stroke="currentColor" strokeWidth={0.8} />
      ))}
      <text x={10} y={18} fontSize={6} textAnchor="middle" fill="currentColor">0</text>
      <text x={110} y={18} fontSize={6} textAnchor="middle" fill="currentColor">5m</text>
    </svg>
  );
}

/** Corner crop marks around an image, like a print proof. */
export function Cropped({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`cropped ${className}`}>
      {children}
      <span className="crop crop--tl" aria-hidden />
      <span className="crop crop--tr" aria-hidden />
      <span className="crop crop--bl" aria-hidden />
      <span className="crop crop--br" aria-hidden />
    </div>
  );
}

/** Architectural title block: a small table of label / value rows. */
export function TitleBlock({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="title-block">
      {rows.map(([k, v]) => (
        <div key={k} className="title-block__row">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Horizontal dimension line with ticks and a centred label. */
export function DimLine({ label }: { label: string }) {
  return (
    <div className="dim-line" aria-hidden>
      <span className="dim-line__tick" />
      <span className="dim-line__bar" />
      <span className="dim-line__label">{label}</span>
      <span className="dim-line__bar" />
      <span className="dim-line__tick" />
    </div>
  );
}
