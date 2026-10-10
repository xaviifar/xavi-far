"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { lang, toggleLang } = useLanguage();
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
    <header className="w-full pt-8 pb-14 flex items-center justify-between">
      <nav className="flex items-center gap-5 sm:gap-7 text-[13.5px] sm:text-[14px]">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "text-ink font-medium"
                  : "text-ink-muted hover:text-ink font-normal"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleLang}
          aria-label="Switch language"
          className="inline-flex items-center rounded-md border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/50 px-2 py-0.5 font-mono text-[11px] sm:text-[11.5px] transition-all hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer select-none"
        >
          <span className={lang === "en" ? "text-ink font-semibold" : "text-ink-muted"}>EN</span>
          <span className="text-ink-faint mx-1 font-normal">/</span>
          <span className={lang === "es" ? "text-ink font-semibold" : "text-ink-muted"}>ES</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
