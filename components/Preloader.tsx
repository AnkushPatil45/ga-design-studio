"use client";

import { useEffect, useState } from "react";

/** First visit only: the Mehrab arch draws itself, GA settles in, then the curtain lifts. */
export default function Preloader() {
  const [state, setState] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ga-intro") === "1"; sessionStorage.setItem("ga-intro", "1"); } catch { /* ignore */ }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) { setState("gone"); return; }
    const a = window.setTimeout(() => setState("leave"), 1500);
    const b = window.setTimeout(() => setState("gone"), 2300);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);

  if (state === "gone") return null;
  return (
    <div className={`intro intro--${state}`} aria-hidden>
      <svg className="intro__mark" viewBox="0 0 64 64">
        <path className="intro__arch" pathLength={1} d="M12 56 V33 A27 27 0 0 1 32 6.92 A27 27 0 0 1 52 33 V56" />
        <path className="intro__base" pathLength={1} d="M7 56 H57" />
      </svg>
      <p className="intro__word">GA <i>Design Studio</i></p>
    </div>
  );
}
