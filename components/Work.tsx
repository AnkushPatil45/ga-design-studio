"use client";

import { useCallback, useState } from "react";
import { useLang } from "@/lib/i18n";
import { PROJECTS, type ProjectCategory } from "@/lib/content";
import { Cropped, SheetLabel } from "./ui";
import Photo from "./Photo";
import ProjectSheet from "./ProjectSheet";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "homes", "education", "commercial", "residential"];

export default function Work() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  const onChange = useCallback((i: number | null) => setOpenIdx(i), []);

  return (
    <section id="work" className="section section--green work">
      <div className="container">
        <SheetLabel sheet="A–103" label={t.work.label} />
        <div className="work__head">
          <h2 className="display display--light">{t.work.title}</h2>
          <div className="filters" role="tablist" aria-label={t.work.label}>
            {FILTERS.map((k) => (
              <button key={k} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}>
                {t.work.filters[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="work__grid">
          {list.map((p, i) => (
            <article key={p.id} className={`project ${i === 0 && filter === "all" ? "project--feature" : ""}`}>
              <button type="button" className="project__open" onClick={() => setOpenIdx(i)} aria-label={`${t.work.open}: ${p.name}`}>
                <Cropped className="project__media">
                  <Photo name={p.image} alt={`${p.name}, ${p.city[lang]}`} sizes="(max-width: 1000px) 100vw, (max-width: 1400px) 62vw, 900px" />
                  <span className="project__view" aria-hidden><span>{t.work.open}</span></span>
                </Cropped>
              </button>
              <div className="project__body">
                <div className="project__heading">
                  <span className="project__no">{p.id}</span>
                  <div>
                    <h3 className="project__name">
                      <button type="button" onClick={() => setOpenIdx(i)}>{p.name}</button>
                    </h3>
                    <p className="project__note">{p.note[lang]}</p>
                  </div>
                </div>
                <p className="project__meta">
                  <span>{p.city[lang]}</span><span>{p.type[lang]}</span><span>{p.area}</span><span>{p.year}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectSheet list={list} index={openIdx} onChange={onChange} />
    </section>
  );
}
