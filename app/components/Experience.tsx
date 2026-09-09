"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiLangchain,
  SiQdrant,
  SiDocker,
  SiLinux,
  SiMysql,
  SiOdoo,
  SiFlutter,
  SiFlask,
  SiSelenium,
} from "react-icons/si";

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  date: string;
  shortDescription: string;
  details?: string[];
  logoSrc: string;
  tech: { name: string; icon: IconType; brandColor: string }[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Python & Software Developer",
    company: "ESDI Systems",
    location: "Barcelona, Spain",
    date: "Jan 2025 — Aug 2026",
    shortDescription:
      "Developed Python-based business solutions, web applications, Odoo modules, database integrations, and automation workflows while supporting project delivery and mentoring interns.",
    logoSrc: "/img/esdi.webp",
    tech: [
      { name: "Python", icon: SiPython, brandColor: "#3776AB" },
      { name: "Odoo", icon: SiOdoo, brandColor: "#714B67" },
      { name: "Flask", icon: SiFlask, brandColor: "#000000" },
      { name: "SQL", icon: SiMysql, brandColor: "#4479A1" },
      { name: "Selenium", icon: SiSelenium, brandColor: "#43B02A" },
      { name: "Flutter", icon: SiFlutter, brandColor: "#2496ed" },
      { name: "Docker", icon: SiDocker, brandColor: "#2496ed" },
    ],
  },
  {
    id: 2,
    role: "IT Support Technician",
    company: "Fundació Pere Tarrés",
    location: "Barcelona, Spain",
    date: "Dec 2023 — Jul 2024",
    shortDescription:
      "Provided first-line IT support, equipment setup, troubleshooting, and day-to-day technical assistance for users across the organization.",
    logoSrc: "/img/pt.webp",
    tech: [
      { name: "Linux", icon: SiLinux, brandColor: "#FCC624" },
      { name: "MySQL", icon: SiMysql, brandColor: "#4479A1" },
      { name: "Docker", icon: SiDocker, brandColor: "#2496ED" },
    ],
  },
];

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="group flex items-start gap-3.5 sm:gap-4 border-b border-[#161616]/10 pb-6 last:border-0 last:pb-0">
      {/* Company Logo Container */}
      <div className="relative mt-0.5 h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-md border border-[#161616]/10 bg-white p-1 shadow-2xs">
        <Image
          src={exp.logoSrc}
          alt={exp.company}
          fill
          className="object-contain p-0.5"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Role, Company, and Mono Date */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-[15px] sm:text-[16px] font-medium tracking-tight text-[#161616]">
            <Link
              href="/experience"
              className="transition-colors hover:text-[#4f46e5]"
            >
              {exp.role}
            </Link>
          </h3>
          <span className="font-mono text-[11px] text-[#161616]/45 mt-0.5 sm:mt-0">
            {exp.date}
          </span>
        </div>

        <h4 className="text-[12.5px] font-medium tracking-tight text-[#161616]/60 mt-0.5">
          {exp.company} · {exp.location}
        </h4>

        {/* Short Summary */}
        <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.6] tracking-[-0.01em] text-[#161616]/75">
          {exp.shortDescription}
        </p>

        {/* Stack Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <ul className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.name} className="flex">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#161616]/10 bg-white/80 px-2 py-0.8 text-[11px] font-medium text-[#161616]">
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: t.brandColor }}
                      aria-hidden="true"
                    />
                    <span>{t.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-8 sm:py-10">
      <SectionHeader
        // index="02"
        // kicker="Background & Track Record"
        title="Professional Experience"
        subtitle="Software engineering, AI system deployment, and infrastructure operations."
      />

      <div className="flex flex-col gap-6 mt-1">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>

      {/* See Full Experience & Credentials CTA (Navigates to /experience) */}
      <div className="relative flex w-full items-center justify-center pt-7 sm:pt-8">
        <Link
          href="/experience"
          className="inline-flex h-8.5 items-center justify-center gap-1.5 rounded-md bg-[#161616] px-4 text-[12.5px] font-medium text-[#f3f3f1] shadow-2xs transition-all hover:bg-[#161616]/90 active:scale-95"
        >
          <span>Explore full experience &amp; credentials</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </Link>
      </div>
    </section>
  );
}