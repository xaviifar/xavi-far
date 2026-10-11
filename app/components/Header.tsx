"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "../context/LanguageContext";

// Clear, easy-to-tap segmented language control
function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: "en" | "es";
  setLang: (lang: "en" | "es") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-lg border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100/70 dark:bg-neutral-900/70 p-0.5 font-mono text-[11px] sm:text-[11.5px] select-none"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-label="Switch to English"
        className={`px-2 sm:px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
          lang === "en"
            ? "bg-card text-ink font-semibold shadow-xs"
            : "text-ink-muted hover:text-ink font-normal"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-label="Cambiar a Español"
        className={`px-2 sm:px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
          lang === "es"
            ? "bg-card text-ink font-semibold shadow-xs"
            : "text-ink-muted hover:text-ink font-normal"
        }`}
      >
        ES
      </button>
    </div>
  );
}

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: lang === "es" ? "Inicio" : "Home", href: "#" },
    { id: "about", label: lang === "es" ? "Sobre mí" : "About", href: "#about" },
    { id: "projects", label: lang === "es" ? "Proyectos" : "Projects", href: "#projects" },
    { id: "experience", label: lang === "es" ? "Experiencia" : "Experience", href: "#experience" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 200) {
        setActiveSection("home");
        return;
      }

      const about = document.getElementById("about");
      const projects = document.getElementById("projects");
      const experience = document.getElementById("experience");

      const expTop = experience?.offsetTop ?? Infinity;
      const projTop = projects?.offsetTop ?? Infinity;
      const aboutTop = about?.offsetTop ?? Infinity;

      const offset = scrollY + 180;
      if (offset >= expTop) {
        setActiveSection("experience");
      } else if (offset >= projTop) {
        setActiveSection("projects");
      } else if (offset >= aboutTop) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full pt-8 pb-12 sm:pb-14 flex items-center justify-between gap-3 sm:gap-6">
      {/* Navigation links in a single cohesive row */}
      <nav className="flex items-center gap-3.5 sm:gap-7 text-[13.5px] sm:text-[14px] overflow-x-auto no-scrollbar shrink min-w-0 pr-1">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`shrink-0 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "text-ink font-medium"
                  : "text-ink-muted hover:text-ink font-normal"
              }`}
            >
              {link.label}
            </a>
          );
        })}

        {/* Clean Ask AI link matching other navigation items */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
          className="shrink-0 text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer select-none font-normal"
        >
          Ask AI
        </button>
      </nav>

      {/* Language Switcher and Theme Toggle nicely situated on the right (never squished) */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <ThemeToggle />
      </div>
    </header>
  );
}
