"use client";

import { useLanguage } from "../context/LanguageContext";

interface ExperienceItem {
  id: string;
  role: { en: string; es: string };
  company: string;
  companyUrl?: string;
  location: { en: string; es: string };
  period: { en: string; es: string };
}

const experienceData: ExperienceItem[] = [
  {
    id: "esdi",
    role: {
      en: "Python & Software Developer",
      es: "Desarrollador Python y Software",
    },
    company: "ESDI Systems",
    companyUrl: "https://esdisystems.com",
    location: {
      en: "Barcelona, Spain",
      es: "Barcelona, España",
    },
    period: {
      en: "Jan 2025 — Aug 2026",
      es: "Ene 2025 — Ago 2026",
    },
  },
  {
    id: "peretarres",
    role: {
      en: "IT Support Technician",
      es: "Técnico de Soporte TI y Sistemas",
    },
    company: "Fundació Pere Tarrés",
    companyUrl: "https://www.peretarres.org",
    location: {
      en: "Barcelona, Spain",
      es: "Barcelona, España",
    },
    period: {
      en: "Dec 2023 — Jul 2024",
      es: "Dic 2023 — Jul 2024",
    },
  },
];

export default function Experience() {
  const { lang } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-14 sm:scroll-mt-16 w-full pb-10 sm:pb-12">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[15px] text-ink-muted">
          <span className="text-ink-faint">#</span> {lang === "es" ? "experiencia" : "experience"}
        </p>
        <span className="font-mono text-[11px] text-ink-muted/70">
          {lang === "es" ? "2 puestos · 2023–2026" : "2 roles · 2023–2026"}
        </span>
      </div>

      <div className="relative ml-2 sm:ml-2.5 border-l border-neutral-200/60 dark:border-neutral-800/60 pl-5 sm:pl-6 space-y-6">
        {experienceData.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline indicator node */}
            <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all duration-200 bg-bg border-neutral-300 dark:border-neutral-700 group-hover:border-ink" />

            {/* Static Role information (no accordion / non-expandable) */}
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[14.5px] sm:text-[15px] font-medium text-ink transition-colors leading-snug">
                  {item.role[lang]}
                </span>
                <span className="text-ink-faint hidden sm:inline">·</span>
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-normal hover:text-ink transition-colors"
                  >
                    {item.company}
                  </a>
                ) : (
                  <span className="text-[13.5px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-normal">
                    {item.company}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 font-mono text-[11.5px] text-ink-muted">
                <span>{item.location[lang]}</span>
                <span className="text-ink-faint">·</span>
                <span>{item.period[lang]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}