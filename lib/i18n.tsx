"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { DICT, type Dict, type Lang } from "./content";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx | null>(null);
const KEY = "ga-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "en" || saved === "mr") setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
    document.documentElement.dataset.lang = lang;
    document.title = DICT[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  return <LangContext.Provider value={{ lang, t: DICT[lang], setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
