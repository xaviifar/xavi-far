import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiLangchain,
  SiDocker,
  SiNextdotjs,
  SiLinux,
  SiMysql,
  SiRedis,
  SiTailwindcss,
  SiApachespark,
  SiApachekafka,
  SiDatabricks,
  SiPytorch,
  SiQdrant,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

import Header from "@/app/components/Header";
import SectionHeader from "@/app/components/SectionHeader";
import Toolkit from "@/app/components/Toolkit";
import Footer from "@/app/components/Footer";

interface TechBadge {
  name: string;
  brandColor: string;
  icon: IconType;
}

interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  logoSrc: string;
  description: string;
  achievements: string[];
  previousRole?: {
    role: string;
    period: string;
    description: string;
  };
  technologies: TechBadge[];
}

const workHistory: WorkExperience[] = [
  {
    company: "ESDI Systems",
    role: "Full-stack & AI Developer",
    period: "Jan 2026 — Present",
    location: "Barcelona, Spain",
    logoSrc: "/img/esdi.webp",
    description:
      "Architecting AI-powered backend systems, automated data workflows, and resilient cloud services for production environments.",
    achievements: [
      "Designed asynchronous Python and FastAPI microservices, reducing manual business process latency by over 80%.",
      "Built production RAG pipelines combining dense vector search (Qdrant) with hybrid BM25 retrieval and reranking.",
      "Engineered multi-agent LLM execution loops with state persistence and deterministic tool routing.",
      "Delivered robust, accessible user interfaces using Next.js and Tailwind CSS with strict UX constraints.",
    ],
    previousRole: {
      role: "Python Developer",
      period: "Jan 2026 — Jun 2026",
      description:
        "Developed ETL data ingestion pipelines, database schemas, and RESTful APIs in Python.",
    },
    technologies: [
      { name: "Python", brandColor: "#3776AB", icon: SiPython },
      { name: "FastAPI", brandColor: "#009688", icon: SiFastapi },
      { name: "PostgreSQL", brandColor: "#4169E1", icon: SiPostgresql },
      { name: "LangChain", brandColor: "#1C1C1C", icon: SiLangchain },
      { name: "Qdrant", brandColor: "#DC244C", icon: SiQdrant },
      { name: "Redis", brandColor: "#DC382D", icon: SiRedis },
      { name: "Docker", brandColor: "#2496ED", icon: SiDocker },
      { name: "Next.js", brandColor: "#000000", icon: SiNextdotjs },
      { name: "Tailwind", brandColor: "#06B6D4", icon: SiTailwindcss },
    ],
  },
  {
    company: "Fundació Pere Tarrés",
    role: "Systems Technician",
    period: "Dec 2023 — Jul 2024",
    location: "Barcelona, Spain",
    logoSrc: "/img/pt.webp",
    description:
      "Administered multi-node system infrastructure, server availability, operational automation, and network reliability.",
    achievements: [
      "Automated recurrent server health diagnostics, backup validations, and incident alerts using Python and Bash.",
      "Administered MySQL databases, user access policies, and enterprise network infrastructure.",
      "Troubleshot and resolved critical production infrastructure incidents to ensure uninterrupted SLA uptime.",
    ],
    technologies: [
      { name: "Python", brandColor: "#3776AB", icon: SiPython },
      { name: "Linux", brandColor: "#FCC624", icon: SiLinux },
      { name: "MySQL", brandColor: "#4479A1", icon: SiMysql },
      { name: "Docker", brandColor: "#2496ED", icon: SiDocker },
    ],
  },
];

const educationHistory = [
  {
    institution: "Centre Estudis Monlau",
    degree: "MSc in Artificial Intelligence & Big Data",
    period: "2025 — 2026",
    logoSrc: "/img/monlau.jpg",
    details:
      "Specialized in deep learning architectures, vector similarity search, neural networks, and distributed data computing systems.",
    skills: [
      { name: "PyTorch", brandColor: "#EE4C2C", icon: SiPytorch },
      { name: "Spark", brandColor: "#E25A1C", icon: SiApachespark },
      { name: "Kafka", brandColor: "#231F20", icon: SiApachekafka },
      { name: "Databricks", brandColor: "#FF3621", icon: SiDatabricks },
    ],
  },
  {
    institution: "Centre Estudis Monlau",
    degree: "Cross-platform Application Development (DAM)",
    period: "2025 — 2026",
    logoSrc: "/img/monlau.jpg",
    details:
      "Comprehensive software engineering curriculum covering relational databases, distributed systems, API design, and multi-platform development.",
    skills: [
      { name: "Python", brandColor: "#3776AB", icon: SiPython },
      { name: "PostgreSQL", brandColor: "#4169E1", icon: SiPostgresql },
      { name: "Docker", brandColor: "#2496ED", icon: SiDocker },
    ],
  },
  {
    institution: "Universitat de Lleida",
    degree: "BSc in Computer Engineering",
    period: "Academic Background",
    logoSrc: "/img/udl.jpg",
    details:
      "Core computer engineering foundations: algorithm complexity, memory management, operating system internals, computer architecture, and discrete mathematics.",
    skills: [
      { name: "Algorithms", brandColor: "#161616", icon: SiPython },
      { name: "Linux", brandColor: "#FCC624", icon: SiLinux },
      { name: "SQL", brandColor: "#4169E1", icon: SiPostgresql },
    ],
  },
];

const certifications = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    code: "AI-900 / AI-901",
    description:
      "Core principles of machine learning, Azure OpenAI services, computer vision, natural language processing, and responsible AI governance.",
    icon: VscAzure,
    color: "#0078D4",
    skills: ["Azure OpenAI", "Cognitive Services", "Machine Learning", "Computer Vision", "NLP"],
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
    description:
      "Foundational cloud architecture concepts, Azure compute & networking services, security, compliance, identity management, and governance.",
    icon: VscAzure,
    color: "#0078D4",
    skills: ["Azure Cloud", "Cloud Architecture", "Security & Governance", "Networking"],
  },
];

function TechBadgeList({ technologies }: { technologies: TechBadge[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 pt-1">
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <li key={tech.name} className="flex">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#161616]/10 bg-white/80 px-2 py-0.8 text-[11px] font-medium text-[#161616] transition-colors hover:border-[#161616]/30">
              <Icon
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: tech.brandColor }}
                aria-hidden="true"
              />
              <span>{tech.name}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#161616] bg-grid-structural">
      {/* Master Container ("Prathm Structural Blueprint Grid") */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[840px] flex-col border-[#161616]/10 bg-[#f3f3f1] px-5 sm:border-x sm:px-10 md:px-14 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
        {/* Navigation Header */}
        <Header />

        {/* Page Hero Section */}
        <section className="relative pt-7 pb-8 sm:pt-9 sm:pb-10 border-b border-[#161616]/10">
          {/* Structural Corner Wireframe Markers */}
          <span className="absolute -left-[5px] -top-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
            +
          </span>
          <span className="absolute -right-[5px] -top-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
            +
          </span>

          {/* Editorial Headline matching Hero typography */}
          <h1 className="text-[clamp(2.1rem,4.5vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.05em] text-[#161616]">
            Engineering experience <br className="hidden sm:block" />
            <span className="text-[#161616]/40">&amp; academic credentials.</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[620px] text-[14px] sm:text-[15px] leading-[1.65] tracking-[-0.015em] text-[#161616]/70">
            A comprehensive overview of my professional work in AI and backend systems, formal engineering degrees, and verified cloud certifications.
          </p>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a
              href="/Xavi_Far_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Xavi_Far_CV.pdf"
              className="group inline-flex items-center gap-2 rounded-md border border-[#161616] bg-[#161616] px-3.5 py-2 text-[12.5px] font-medium text-[#f3f3f1] transition-all hover:bg-[#161616]/90 shadow-2xs cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 shrink-0"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
              <span>Download CV (PDF)</span>
              <span className="transition-transform duration-200 group-hover:translate-y-0.5 text-[10px]">
                ↓
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/xavi-far/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#161616]/10 bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#161616] transition-all hover:border-[#161616]/30 hover:bg-[#161616]/5"
            >
              <span>LinkedIn Profile</span>
              <span className="text-[10px] text-[#161616]/40">↗</span>
            </a>

            <a
              href="mailto:xavifarmartinez@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border border-[#161616]/10 bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#161616] transition-all hover:border-[#161616]/30 hover:bg-[#161616]/5"
            >
              <span>Contact Directly</span>
              <span className="text-[10px] text-[#161616]/40">↗</span>
            </a>
          </div>
        </section>

        {/* SECTION 01: PROFESSIONAL EXPERIENCE */}
        <section className="relative py-8 sm:py-10 border-b border-[#161616]/10">
          <SectionHeader
            // index="01"
            // kicker="Track Record"
            title="Professional Experience"
            subtitle="Production engineering roles across AI systems, backend microservices, and reliable infrastructure."
          />

          <div className="flex flex-col gap-8 sm:gap-10 mt-2">
            {workHistory.map((job, index) => (
              <article
                key={job.company}
                className={`group flex flex-col gap-4 ${
                  index !== workHistory.length - 1 ? "border-b border-[#161616]/10 pb-8 sm:pb-10" : ""
                }`}
              >
                {/* Header row with logo, role & company */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Logo Container */}
                  <div className="relative mt-0.5 h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-md border border-[#161616]/10 bg-white p-1 shadow-2xs">
                    <Image
                      src={job.logoSrc}
                      alt={job.company}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <div>
                        <h3 className="text-[16px] sm:text-[17px] font-medium tracking-tight text-[#161616]">
                          {job.role}
                        </h3>
                        <p className="text-[12.5px] font-medium text-[#161616]/60">
                          {job.company} · {job.location}
                        </p>
                      </div>

                      <span className="font-mono text-[11px] text-[#161616]/45 shrink-0">
                        {job.period}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="mt-3 text-[13.5px] leading-[1.65] tracking-[-0.01em] text-[#161616]/75 max-w-[660px]">
                      {job.description}
                    </p>

                    {/* Bullet Achievements */}
                    <ul className="mt-3.5 flex flex-col gap-2">
                      {job.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="relative pl-4 text-[12.5px] sm:text-[13px] leading-[1.6] text-[#161616]/70"
                        >
                          <span className="absolute left-0 top-[8px] h-1 w-1 rounded-full bg-[#161616]/35" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Previous internal promotion role */}
                    {job.previousRole && (
                      <div className="mt-4 rounded-md border-l-2 border-[#161616]/20 bg-white/40 p-3 pl-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                          <span className="text-[12.5px] font-medium text-[#161616]">
                            {job.previousRole.role}
                          </span>
                          <span className="font-mono text-[10.5px] text-[#161616]/40">
                            {job.previousRole.period}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-[1.55] text-[#161616]/60">
                          {job.previousRole.description}
                        </p>
                      </div>
                    )}

                    {/* Stack Badges */}
                    <div className="mt-4">
                      <TechBadgeList technologies={job.technologies} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 02: ACADEMIC BACKGROUND */}
        <section className="relative py-8 sm:py-10 border-b border-[#161616]/10">
          <SectionHeader
            // index="02"
            // kicker="Education"
            title="Education"
            subtitle="Formal engineering education, advanced postgraduate specialization, and foundational computer science."
          />

          <div className="flex flex-col gap-6 sm:gap-7 mt-2">
            {educationHistory.map((edu, index) => (
              <article
                key={edu.degree}
                className={`group flex items-start gap-3.5 sm:gap-4 ${
                  index !== educationHistory.length - 1 ? "border-b border-[#161616]/10 pb-6 sm:pb-7" : ""
                }`}
              >
                <div className="relative mt-0.5 h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-md border border-[#161616]/10 bg-white p-1 shadow-2xs">
                  <Image
                    src={edu.logoSrc}
                    alt={edu.institution}
                    fill
                    className="object-contain p-0.5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-medium tracking-tight text-[#161616]">
                        {edu.degree}
                      </h3>
                      <p className="text-[12px] font-medium text-[#161616]/55">
                        {edu.institution}
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-[#161616]/45 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-[1.6] text-[#161616]/70 max-w-[640px]">
                    {edu.details}
                  </p>

                  <div className="mt-3">
                    <TechBadgeList technologies={edu.skills} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 03: CERTIFICATIONS */}
        <section className="relative py-8 sm:py-10 border-b border-[#161616]/10">
          <SectionHeader
            index="03"
            kicker="Credentials"
            title="Certifications"
            subtitle="Verified technical credentials in Microsoft Azure AI services, machine learning foundations, and cloud architecture."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <article
                  key={cert.code}
                  className="group flex flex-col justify-between rounded-lg border border-[#161616]/10 bg-white/70 p-4 sm:p-5 transition-all hover:border-[#161616]/30 hover:bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#161616]/10 bg-white shadow-2xs">
                        <Icon
                          className="h-5 w-5"
                          style={{ color: cert.color }}
                          aria-hidden="true"
                        />
                      </div>

                      <span className="rounded-full border border-[#161616]/10 bg-[#161616]/5 px-2.5 py-0.8 font-mono text-[9.5px] font-medium text-[#161616]/65">
                        {cert.code}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#161616]/40 font-semibold">
                        {cert.issuer}
                      </span>
                      <h3 className="text-[15px] font-medium tracking-tight text-[#161616] mt-0.5">
                        {cert.title}
                      </h3>
                    </div>

                    <p className="text-[12.5px] leading-[1.6] text-[#161616]/65">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3.5 border-t border-[#161616]/10 mt-3.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#161616]/10 bg-white px-2 py-0.5 font-mono text-[10px] text-[#161616]/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 04: TOOLKIT */}
        <Toolkit />

        {/* Page Footer */}
        <Footer />
      </div>
    </main>
  );
}