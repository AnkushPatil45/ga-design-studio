"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { PROJECTS, type ProjectCategory } from "@/lib/content";
import { Cropped, SheetLabel } from "./ui";
import { asset } from "@/lib/asset";

type Filter = "all" | ProjectCategory;
const FILTERS: Filter[] = ["all", "homes", "education", "commercial", "residential"];

export default function Work() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const list = PROJECTS.filter((p) => filter === "all" || p.category === filter);

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
              <Cropped className="project__media">
                <Image src={asset(p.image)} alt={`${p.name}, ${p.city[lang]}`} width={2400} height={1340} sizes="(max-width: 900px) 100vw, (max-width: 1400px) 60vw, 900px" />
              </Cropped>
              <div className="project__body">
                <div className="project__heading">
                  <span className="project__no">{p.id}</span>
                  <div>
                    <h3 className="project__name">{p.name}</h3>
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
    </section>
  );
}
