/** South elevation of a courtyard house, drafted in brass line work.
 *  Every stroke uses pathLength=1 so Round 2 can draw it on with stroke-dashoffset. */
export default function HeroDrawing({ label }: { label: string }) {
  const fins = Array.from({ length: 21 }, (_, i) => 452 + i * 14);
  const hatch = Array.from({ length: 59 }, (_, i) => 40 + i * 14);
  const joints = Array.from({ length: 22 }, (_, i) => 125 + i * 30);
  const lattice = Array.from({ length: 24 }, (_, i) => 100 + i * 12);
  const L = { pathLength: 1 } as const;

  return (
    <svg className="hero-drawing" viewBox="0 0 900 600" role="img" aria-label={label}>
      <defs>
        <clipPath id="jaali-clip"><rect x="150" y="360" width="150" height="110" /></clipPath>
        <clipPath id="earth-clip"><rect x="30" y="500" width="840" height="22" /></clipPath>
      </defs>

      {/* structural grid */}
      <g className="d-grid" strokeDasharray="14 4 2 4">
        {[120, 420, 760].map((x) => <line key={x} x1={x} y1={64} x2={x} y2={500} {...L} />)}
      </g>
      <g className="d-bubbles">
        {[["A", 120], ["B", 420], ["C", 760]].map(([t, x]) => (
          <g key={t as string}>
            <circle cx={x as number} cy={48} r={13} {...L} />
            <text x={x as number} y={52} textAnchor="middle">{t}</text>
          </g>
        ))}
      </g>

      {/* ground and earth hatch */}
      <line className="d-main" x1={30} y1={500} x2={870} y2={500} {...L} />
      <g className="d-fine" clipPath="url(#earth-clip)">
        {hatch.map((x) => <line key={x} x1={x} y1={500} x2={x - 14} y2={522} {...L} />)}
      </g>

      {/* basalt plinth */}
      <rect className="d-main" x={110} y={486} width={660} height={14} {...L} />
      <g className="d-fine">{joints.map((x) => <line key={x} x1={x} y1={486} x2={x} y2={500} {...L} />)}</g>

      {/* left volume */}
      <rect className="d-main" x={100} y={316} width={340} height={14} {...L} />
      <path className="d-main" d="M120 330 V486 M420 330 V486" {...L} />
      <rect className="d-sec" x={150} y={360} width={150} height={110} {...L} />
      <g className="d-fine" clipPath="url(#jaali-clip)">
        {lattice.map((x) => (
          <g key={x}>
            <line x1={x} y1={360} x2={x + 110} y2={470} {...L} />
            <line x1={x + 110} y1={360} x2={x} y2={470} {...L} />
          </g>
        ))}
      </g>
      <rect className="d-sec" x={330} y={360} width={66} height={126} {...L} />
      <path className="d-fine" d="M363 360 V486 M330 420 H396" {...L} />

      {/* right volume */}
      <rect className="d-main" x={410} y={156} width={380} height={14} {...L} />
      <path className="d-main" d="M760 170 V486" {...L} />
      <line className="d-sec" x1={420} y1={330} x2={760} y2={330} {...L} />
      <rect className="d-sec" x={444} y={190} width={300} height={120} {...L} />
      <g className="d-fine">{fins.map((x) => <line key={x} x1={x} y1={190} x2={x} y2={310} {...L} />)}</g>

      {/* pointed arch entrance */}
      <path className="d-main d-accent" d="M520 486 V410 A64 64 0 0 1 560 350.7 A64 64 0 0 1 600 410 V486" {...L} />
      <path className="d-sec" d="M526 486 V410 A58 58 0 0 1 560 357.2 A58 58 0 0 1 594 410 V486" {...L} />
      <path className="d-fine" d="M560 357 V486" {...L} />

      {/* window */}
      <rect className="d-sec" x={640} y={360} width={100} height={110} {...L} />
      <path className="d-fine" d="M673 360 V470 M707 360 V470 M640 415 H740" {...L} />

      {/* neem tree */}
      <g className="d-tree">
        <path d="M70 500 V392 M70 430 L48 404 M70 418 L94 392" {...L} />
        <circle cx={70} cy={336} r={48} {...L} />
        <circle cx={38} cy={360} r={34} {...L} />
        <circle cx={104} cy={352} r={36} {...L} />
        <circle cx={66} cy={298} r={30} {...L} />
      </g>

      {/* human for scale */}
      <g className="d-sec">
        <circle cx={470} cy={448} r={5} {...L} />
        <path d="M470 453 V474 M470 474 L463 486 M470 474 L477 486 M470 460 L462 470 M470 460 L478 470" {...L} />
      </g>

      {/* overall dimension */}
      <g className="d-dim">
        <path d="M120 114 V150 M760 114 V150 M120 120 H760" {...L} />
        <path d="M114 126 L126 114 M754 126 L766 114" {...L} />
        <text x={440} y={112} textAnchor="middle">19 200</text>
      </g>
      <g className="d-dim">
        <path d="M876 156 V500 M866 156 H884 M866 500 H884" {...L} />
        <path d="M870 162 L882 150 M870 506 L882 494" {...L} />
        <text x={0} y={0} transform="translate(890 328) rotate(90)" textAnchor="middle">8 400</text>
      </g>

      {/* level markers */}
      <g className="d-level">
        {[[500, "±0.00"], [330, "+3.60"], [156, "+7.20"]].map(([y, t]) => (
          <g key={t as string}>
            <path d={`M796 ${y} H850 M806 ${(y as number) - 8} L812 ${y} L818 ${(y as number) - 8} Z`} {...L} />
            <text x={822} y={(y as number) - 4}>{t}</text>
          </g>
        ))}
      </g>

      {/* sheet annotation */}
      <text className="d-note" x={30} y={566}>{label} · SOUTH · 1:100</text>
      <g className="d-north" transform="translate(846 560)">
        <circle r={14} {...L} />
        <path d="M0 -12 L5 6 L0 2 L-5 6 Z" />
        <text y={-18} textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
