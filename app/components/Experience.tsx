"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  SiPython,
  SiOdoo,
  SiFlask,
  SiSelenium,
  SiDocker,
  SiLinux,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

interface TechTag {
  name: string;
  icon?: React.ReactNode;
}

interface ExperienceItem {
  id: string;
  role: { en: string; es: string };
  company: string;
  companyUrl?: string;
  location: { en: string; es: string };
  period: { en: string; es: string };
  description: { en: string; es: string };
  highlights: {
    title: { en: string; es: string };
    detail: { en: string; es: string };
  }[];
  tech: TechTag[];
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
    description: {
      en: "Engineering business software, automated data pipelines, and intelligent workflows using Python, Odoo ERP, and relational databases, with specialized LLM integrations via OpenRouter.",
      es: "Desarrollo de software empresarial, canalizaciones de datos automatizadas y flujos de trabajo inteligentes con Python, Odoo ERP y bases de datos relacionales, integrando LLMs mediante OpenRouter.",
    },
    highlights: [
      {
        title: {
          en: "Custom Odoo ERP Architecture",
          es: "Arquitectura Modular Odoo ERP",
        },
        detail: {
          en: "Engineered modular business models, automated invoicing hooks, and complex relational workflows in Python and PostgreSQL tailored to enterprise client specifications.",
          es: "Desarrollo de modelos de negocio modulares, automatización de facturación y flujos relacionales complejos en Python y PostgreSQL para clientes empresariales.",
        },
      },
      {
        title: {
          en: "Automated Scraping & Ingestion Pipelines",
          es: "Pipelines de Extracción y Web Scraping",
        },
        detail: {
          en: "Built high-resilience web scraping bots using Python and Selenium, orchestrating automated recurrent data extraction routines with structured error handling.",
          es: "Construcción de bots de scraping resilientes con Python y Selenium, orquestando rutinas recurrentes de extracción con gestión estructurada de errores.",
        },
      },
      {
        title: {
          en: "LLM Integrations & Semantic Services",
          es: "Integraciones con LLMs y Servicios Semánticos",
        },
        detail: {
          en: "Integrated Large Language Models via OpenRouter APIs into internal operational tools, implementing structured JSON output parsing and prompt workflows.",
          es: "Integración de modelos LLM mediante APIs de OpenRouter en herramientas internas, con validación de salidas estructuradas en JSON e ingeniería de prompts.",
        },
      },
      {
        title: {
          en: "Database Optimization & Backend Services",
          es: "Optimización SQL y Servicios Backend",
        },
        detail: {
          en: "Formulated optimized relational SQL queries, designed Flask microservice endpoints, and containerized internal operational tooling.",
          es: "Diseño y optimización de consultas SQL relacionales, desarrollo de endpoints con Flask y contenedorización de servicios con Docker.",
        },
      },
      {
        title: {
          en: "Engineering Mentorship & Review Standards",
          es: "Mentoría Técnica y Buenas Prácticas",
        },
        detail: {
          en: "Mentored junior developers and interns, participating in architectural code reviews, technical documentation, and project coordination.",
          es: "Mentoría a desarrolladores junior y estudiantes en prácticas, revisiones de código, documentación técnica y coordinación de proyectos.",
        },
      },
    ],
    tech: [
      { name: "Python", icon: <SiPython className="w-3.5 h-3.5" style={{ color: "#3776AB" }} /> },
      { name: "Odoo", icon: <SiOdoo className="w-3.5 h-3.5" style={{ color: "#714B67" }} /> },
      { name: "Flask", icon: <SiFlask className="w-3.5 h-3.5" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-3.5 h-3.5" style={{ color: "#4169E1" }} /> },
      { name: "SQL", icon: <TbSql className="w-3.5 h-3.5" /> },
      { name: "Selenium", icon: <SiSelenium className="w-3.5 h-3.5" style={{ color: "#43B02A" }} /> },
      { name: "Docker", icon: <SiDocker className="w-3.5 h-3.5" style={{ color: "#2496ED" }} /> },
      { name: "OpenRouter LLMs" },
    ],
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
    description: {
      en: "Provided tier-1 and tier-2 IT systems support, workstation deployment, diagnostic procedures, and local network maintenance across organizational headquarters and branch offices.",
      es: "Soporte de sistemas TI nivel 1 y 2, despliegue de puestos de trabajo, diagnóstico de hardware y mantenimiento de red local en sedes centrales y centros asociados.",
    },
    highlights: [
      {
        title: {
          en: "Workstation Provisioning & OS Imaging",
          es: "Despliegue de Puestos e Imágenes de SO",
        },
        detail: {
          en: "Automated deployment, configuration, and imaging of Windows and Linux workstations to minimize employee onboarding and replacement downtime.",
          es: "Automatización de configuración e imágenes de sistemas Windows y Linux para minimizar tiempos de provisión de puestos de trabajo.",
        },
      },
      {
        title: {
          en: "Hardware Diagnostics & Incident Resolution",
          es: "Diagnóstico Hardware y Resolución de Incidencias",
        },
        detail: {
          en: "Investigated and repaired hardware faults, peripheral devices, storage units, and network adapters to sustain continuous operational SLA.",
          es: "Resolución de fallos en equipos, periféricos, almacenamiento y tarjetas de red manteniendo el SLA operativo del servicio.",
        },
      },
      {
        title: {
          en: "Local Network & Access Administration",
          es: "Administración de Red Local y Accesos",
        },
        detail: {
          en: "Assisted with network switch cabling, patch panels, WiFi access points, and configured user permissions, shared credentials, and directory security policies.",
          es: "Cableado y parcheo de switches, puntos de acceso WiFi y gestión de permisos, credenciales compartidas y directivas de seguridad.",
        },
      },
    ],
    tech: [
      { name: "Linux", icon: <SiLinux className="w-3.5 h-3.5" style={{ color: "#FCC624" }} /> },
      { name: "Windows" },
      { name: "Networking" },
      { name: "Hardware Diagnostics" },
      { name: "MySQL", icon: <SiMysql className="w-3.5 h-3.5" style={{ color: "#4479A1" }} /> },
    ],
  },
];

export default function Experience() {
  const { lang } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>("esdi");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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

      <div className="relative ml-2 sm:ml-2.5 border-l border-neutral-200/60 dark:border-neutral-800/60 pl-5 sm:pl-6 space-y-7">
        {experienceData.map((item) => {
          const isOpen = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline indicator node */}
              <div
                className={`absolute -left-[25px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all duration-200 bg-bg ${
                  isOpen
                    ? "border-ink"
                    : "border-neutral-300 dark:border-neutral-700 group-hover:border-ink"
                }`}
              />

              {/* Accordion header button */}
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-3 text-left cursor-pointer group select-none transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[14.5px] sm:text-[15px] font-medium text-ink transition-colors leading-snug">
                      {item.role[lang]}
                    </span>
                    <span className="text-ink-faint hidden sm:inline">·</span>
                    <span className="text-[13.5px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-normal">
                      {item.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11.5px] text-ink-muted">
                    <span>{item.location[lang]}</span>
                    <span className="text-ink-faint">·</span>
                    <span>{item.period[lang]}</span>
                  </div>
                </div>

                <div className="shrink-0 text-ink-muted group-hover:text-ink transition-colors mt-1">
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
                    className={`lucide lucide-chevron-down h-4 w-4 transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180 text-ink" : "rotate-0"
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>

              {/* Accordion expandable body */}
              {isOpen && (
                <div className="mt-3.5 text-[13.5px] leading-[1.65] text-ink-muted space-y-3.5 animate-in fade-in duration-200">
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {item.description[lang]}
                  </p>

                  {/* Highlights with subtle bullets */}
                  <div className="space-y-2 border-l border-border/80 pl-3 my-2">
                    {item.highlights.map((h, idx) => (
                      <div key={idx} className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-ink">
                          {h.title[lang]}
                        </span>
                        <span className="text-[12.5px] text-ink-muted leading-relaxed">
                          {h.detail[lang]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tech.map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] bg-neutral-100/70 dark:bg-neutral-900/70 text-ink border border-border transition-colors hover:border-neutral-400 dark:hover:border-neutral-600 cursor-default"
                      >
                        {t.icon && <span className="shrink-0">{t.icon}</span>}
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}