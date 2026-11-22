"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import type { Project } from "@/lib/content";
import Photo from "./Photo";

type Props = { list: Project[]; index: number | null; onChange: (i: number | null) => void };

/** A project opened as a full drawing sheet: photograph, story and a proper title block. */
export default function ProjectSheet({ list, index, onChange }: Props) {
  const { t, lang } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const p = open ? list[index] : null;
  const f = t.work.fields;

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("ga:menu", { detail: true }));
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % list.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("ga:menu", { detail: false }));
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [open, index, list.length, onChange]);

  // swipe between projects on touch screens
  const touch = useRef<number | null>(null);

  return (
    <div className={`psheet ${open ? "psheet--open" : ""}`} role="dialog" aria-modal="true" aria-label={p?.name ?? ""} aria-hidden={!open} inert={!open}>
      <div className="psheet__backdrop" onClick={() => onChange(null)} />
      {p && (
        <article
          key={p.id}
          className="psheet__card"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            touch.current = null;
            if (Math.abs(dx) > 60) onChange((index! + (dx < 0 ? 1 : -1) + list.length) % list.length);
          }}
        >
          <div className="psheet__media">
            <Photo name={p.image} alt={`${p.name}, ${p.city[lang]}`} sizes="(max-width: 900px) 100vw, 66vw" priority />
          </div>
          <div className="psheet__body">
            <div className="psheet__top">
              <span className="psheet__no">{t.work.sheet} {p.id} / 0{list.length}</span>
              <button ref={closeRef} type="button" className="psheet__close" onClick={() => onChange(null)}>
                <span>{t.work.close}</span><i aria-hidden />
              </button>
            </div>
            <h3 className="psheet__name">{p.name}</h3>
            <p className="psheet__note">{p.note[lang]}</p>
            <p className="psheet__story">{p.story[lang]}</p>
            <dl className="psheet__table">
              <div><dt>{f.location}</dt><dd>{p.city[lang]}</dd></div>
              <div><dt>{f.type}</dt><dd>{p.type[lang]}</dd></div>
              <div><dt>{f.area}</dt><dd>{p.area}</dd></div>
              <div><dt>{f.year}</dt><dd>{p.year}</dd></div>
              <div className="psheet__wide"><dt>{f.materials}</dt><dd>{p.materials[lang]}</dd></div>
            </dl>
            <div className="psheet__nav">
              <button type="button" onClick={() => onChange((index! - 1 + list.length) % list.length)}>← {t.work.prev}</button>
              <span className="psheet__dots" aria-hidden>
                {list.map((x, i) => <i key={x.id} className={i === index ? "on" : ""} />)}
              </span>
              <button type="button" onClick={() => onChange((index! + 1) % list.length)}>{t.work.next} →</button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
