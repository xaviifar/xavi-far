"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
});

function getSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "es" || saved === "en") return saved;
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "es") return "es";
  } catch {
    // ignore
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const storeLang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [overrideLang, setOverrideLang] = useState<Language | null>(null);

  const lang = overrideLang ?? storeLang;

  const setLang = (newLang: Language) => {
    setOverrideLang(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
      document.documentElement.lang = newLang;
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
