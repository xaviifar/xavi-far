"use client";

import { useLanguage } from "../context/LanguageContext";

interface EducationItem {
  id: string;
  degree: { en: string; es: string };
  institution: string;
  period: { en: string; es: string };
  skills: string[];
}

const educationData: EducationItem[] = [
  {
    id: "msc-ai",
    degree: {
      en: "MSc in Artificial Intelligence & Big Data",
      es: "Máster en Inteligencia Artificial y Big Data",
    },
    institution: "Centre Estudis Monlau",
    period: {
      en: "2025 — 2026",
      es: "2025 — 2026",
    },
    skills: ["PyTorch", "Apache Spark", "Apache Kafka", "Databricks", "Deep Learning"],
  },
  {
    id: "dam",
    degree: {
      en: "Cross-platform Application Development (DAM)",
      es: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
    },
    institution: "Centre Estudis Monlau",
    period: {
      en: "2024 — 2025",
      es: "2024 — 2025",
    },
    skills: ["Python", "PostgreSQL", "Docker", "Database Systems", "Software Design"],
  },
  {
    id: "udl",
    degree: {
      en: "BSc in Computer Engineering",
      es: "Grado en Ingeniería Informática",
    },
    institution: "Universitat de Lleida",
    period: {
      en: "Academic Background",
      es: "Formación Universitaria",
    },
    skills: ["Algorithms & Data Structures", "Operating Systems", "Linux", "SQL", "Networking"],
  },
];

export default function Education() {
  const { lang } = useLanguage();

  return (
    <section id="education" className="scroll-mt-14 sm:scroll-mt-16 w-full pb-10 sm:pb-12">
      <p className="mb-6 font-mono text-[15px] text-ink-muted">
        <span className="text-ink-faint">#</span>{" "}
        {lang === "es" ? "formación" : "education"}
      </p>

      {/* Education Timeline */}
      <div className="relative ml-2 sm:ml-2.5 border-l border-neutral-200/60 dark:border-neutral-800/60 pl-5 sm:pl-6 space-y-6">
        {educationData.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all duration-200 border-neutral-300 dark:border-neutral-700 bg-bg group-hover:border-ink" />

            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] sm:text-[14.5px] font-medium text-ink transition-colors leading-snug">
                {item.degree[lang]}
              </span>
              <div className="flex items-center gap-2 font-mono text-[11.5px] text-ink-muted">
                <span>{item.institution}</span>
                <span className="text-ink-faint">·</span>
                <span>{item.period[lang]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] bg-neutral-100 dark:bg-neutral-900 text-ink-muted border border-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
