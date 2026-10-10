"use client";

import { useState } from "react";
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

const certifications = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    description: {
      en: "Core principles of machine learning, computer vision, natural language processing, and responsible AI governance on Azure.",
      es: "Principios fundamentales de machine learning, visión por computador, procesamiento del lenguaje natural y gobernanza de IA responsable en Azure.",
    },
  },
];

export default function Education() {
  const { lang } = useLanguage();
  const [expandedCert, setExpandedCert] = useState<string | null>("AI-900");

  return (
    <section id="education" className="scroll-mt-14 sm:scroll-mt-16 w-full pb-10 sm:pb-12">
      <p className="mb-6 font-mono text-[15px] text-ink-muted">
        <span className="text-ink-faint">#</span>{" "}
        {lang === "es" ? "formación y certificaciones" : "education & credentials"}
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

      {/* Certifications Sub-block */}
      <div className="mt-8 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
        <p className="mb-4 font-mono text-[13px] text-ink-muted uppercase tracking-wider">
          {lang === "es" ? "Certificaciones" : "Certifications"}
        </p>

        <div className="flex flex-col divide-y divide-neutral-200/50 dark:divide-neutral-800/50">
          {certifications.map((cert) => {
            const isOpen = expandedCert === cert.code;
            return (
              <div key={cert.code} className="py-3 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setExpandedCert(isOpen ? null : cert.code)}
                  className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group select-none py-1 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
                    <span className="text-[14px] font-medium text-ink leading-snug">
                      {cert.title}
                    </span>
                    <span className="font-mono text-[11.5px] text-ink-muted">
                      ({cert.code}) · {cert.issuer}
                    </span>
                  </div>

                  <div className="shrink-0 text-ink-muted group-hover:text-ink transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-down h-4 w-4 transition-transform duration-250 ease-out ${
                        isOpen ? "rotate-180 text-ink" : "rotate-0"
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted font-sans animate-in fade-in duration-150">
                    {cert.description[lang]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
