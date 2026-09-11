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
  SiOdoo,
  SiFlask,
  SiSelenium,
} from "react-icons/si";

import Header from "@/app/components/Header";
import SectionHeader from "@/app/components/SectionHeader";
import Footer from "@/app/components/Footer";
import TechBadge from "@/app/components/TechBadge";

interface TechItem {
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
  technologies?: TechItem[];
  tags?: string[];
}

const workHistory: WorkExperience[] = [
  {
    company: "ESDI Systems",
    role: "Python & Software Developer",
    period: "Jan 2025 — Present",
    location: "Barcelona",
    logoSrc: "/img/esdi.webp",
    description:
      "Developed business software and automation solutions using Python, Flask, Odoo and SQL, working across web development, database integrations and Selenium-based workflows. Also supported project delivery and mentored interns.",
    achievements: [
      "Engineered custom Odoo business modules, data models, and backend workflows tailored to business requirements.",
      "Developed web scraping pipelines and automated recurrent data processes using Python and Selenium.",
      "Implemented relational database queries (SQL) and Flask services, integrating LLMs via OpenRouter for internal productivity tools.",
      "Mentored junior developers and interns, participating in code reviews, technical documentation, and project coordination.",
    ],
    technologies: [
      { name: "Python", brandColor: "#3776AB", icon: SiPython },
      { name: "Flask", brandColor: "#000000", icon: SiFlask },
      { name: "Odoo", brandColor: "#714B67", icon: SiOdoo },
      { name: "SQL", brandColor: "#4169E1", icon: SiMysql },
      { name: "Selenium", brandColor: "#43B02A", icon: SiSelenium },
    ],
    tags: ["OpenRouter"],
  },
  {
    company: "Fundació Pere Tarrés",
    role: "IT Support Technician",
    period: "Dec 2023 — Jul 2024",
    location: "Barcelona",
    logoSrc: "/img/pt.webp",
    description:
      "Provided first-line IT user support, workstation deployment, hardware diagnostics, and local network assistance across the organization.",
    achievements: [
      "Set up, imaged, and deployed user workstations and operating systems (Windows and Linux) across offices.",
      "Troubleshot hardware, peripheral, and software incidents to minimize user downtime and resolve ticket queues.",
      "Assisted with local network equipment (switches, patch panels, cabling) and user account configuration.",
    ],
    tags: ["IT Support", "Hardware", "Windows", "Linux", "Networking", "Troubleshooting"],
  },
];

const educationHistory = [
  {
    institution: "Centre Estudis Monlau",
    degree: "MSc in Artificial Intelligence & Big Data",
    period: "2025 — 2026",
    logoSrc: "/img/monlau.jpg",
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
    period: "2024 — 2025",
    logoSrc: "/img/monlau.jpg",
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
    code: "AI-900",
    description:
      "Core principles of machine learning, Azure OpenAI services, computer vision, natural language processing, and responsible AI governance.",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
    description:
      "Foundational cloud architecture concepts, Azure compute & networking services, security, compliance, identity management, and governance.",
  },
];

function TechBadgeList({ technologies }: { technologies?: TechItem[] }) {
  if (!technologies || technologies.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5 pt-1">
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <li key={tech.name} className="flex">
            <TechBadge
              name={tech.name}
              icon={<Icon className="w-4 h-4 shrink-0" style={{ color: tech.brandColor }} />}
              brandColor={tech.brandColor}
              size="sm"
            />
          </li>
        );
      })}
    </ul>
  );
}



// Definición de interfaces omitida por brevedad (usa las mismas que tenías)
// const workHistory = [...] 
// const educationHistory = [...]
// const certifications = [...]

function MinimalTechList({ technologies }: { technologies?: any[] }) {
  if (!technologies || technologies.length === 0) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <div key={tech.name} className="flex items-center gap-1.5 text-[13px] text-[#161616]/60 grayscale transition-all hover:grayscale-0 hover:text-[#161616]">
            <Icon className="w-3.5 h-3.5" />
            <span>{tech.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#161616] selection:bg-[#161616] selection:text-[#f3f3f1] font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-6 sm:px-8">
        <Header />

        {/* --- HERO SECTION --- */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-[2.2rem] sm:text-[3rem] font-medium leading-[1.1] tracking-tight text-[#161616]">
            Engineering experience. <br />
            <span className="text-[#161616]/40">Academic credentials.</span>
          </h1>

          <p className="mt-6 max-w-[500px] text-[15px] sm:text-[16px] leading-[1.7] text-[#161616]/70">
            A comprehensive overview of my professional software work, academic background in engineering, and verified cloud certifications.
          </p>

          <div className="mt-8 flex items-center gap-6 text-[14px] font-medium">
            <a href="/Xavi_Far_CV.pdf" target="_blank" className="group flex items-center gap-1.5 border-b border-[#161616] pb-0.5 hover:text-[#161616]/60 hover:border-[#161616]/30 transition-colors">
              Download Resume 
              <span className="transition-transform group-hover:translate-y-0.5 text-[10px]">↓</span>
            </a>
            <a href="https://linkedin.com/in/xavi-far" target="_blank" className="text-[#161616]/50 hover:text-[#161616] transition-colors">
              LinkedIn
            </a>
            <a href="mailto:xavifarmartinez@gmail.com" className="text-[#161616]/50 hover:text-[#161616] transition-colors">
              Contact
            </a>
          </div>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section className="py-12 sm:py-16 border-t border-black/10 animate-in fade-in duration-700 delay-150">
          <h2 className="text-[14px] font-mono uppercase tracking-widest text-[#161616]/40 mb-12">
            Experience
          </h2>

          <div className="flex flex-col gap-12 sm:gap-16">
            {workHistory.map((job) => (
              <article key={job.company} className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                {/* Columna Izquierda: Metadatos */}
                <div className="sm:w-1/4 shrink-0 flex flex-col gap-1">
                  <span className="font-mono text-[12px] text-[#161616]/50">{job.period}</span>
                  <span className="text-[14px] font-medium text-[#161616]">{job.company}</span>
                  <span className="text-[13px] text-[#161616]/50">{job.location}</span>
                </div>

                {/* Columna Derecha: Contenido */}
                <div className="sm:w-3/4">
                  <h3 className="text-[17px] font-medium tracking-tight text-[#161616]">
                    {job.role}
                  </h3>
                  
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#161616]/75">
                    {job.description}
                  </p>

                  <ul className="mt-4 flex flex-col gap-2">
                    {job.achievements.map((achievement) => (
                      <li key={achievement} className="relative pl-4 text-[14px] leading-relaxed text-[#161616]/70">
                        <span className="absolute left-0 top-[10px] h-[1px] w-2 bg-[#161616]/30" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <MinimalTechList technologies={job.technologies} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- EDUCATION SECTION --- */}
        <section className="py-12 sm:py-16 border-t border-black/10 animate-in fade-in duration-700 delay-300">
          <h2 className="text-[14px] font-mono uppercase tracking-widest text-[#161616]/40 mb-12">
            Education
          </h2>

          <div className="flex flex-col gap-10 sm:gap-12">
            {educationHistory.map((edu) => (
              <article key={edu.degree} className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                <div className="sm:w-1/4 shrink-0 flex flex-col gap-1">
                  <span className="font-mono text-[12px] text-[#161616]/50">{edu.period}</span>
                  <span className="text-[14px] font-medium text-[#161616]">{edu.institution}</span>
                </div>

                <div className="sm:w-3/4">
                  <h3 className="text-[16px] font-medium tracking-tight text-[#161616]">
                    {edu.degree}
                  </h3>
                  <MinimalTechList technologies={edu.skills} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- CERTIFICATIONS SECTION --- */}
        <section className="py-12 sm:py-16 border-t border-black/10 mb-10 animate-in fade-in duration-700 delay-500">
          <h2 className="text-[14px] font-mono uppercase tracking-widest text-[#161616]/40 mb-12">
            Certifications
          </h2>

          <div className="flex flex-col gap-10">
            {certifications.map((cert) => (
              <article key={cert.code} className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                <div className="sm:w-1/4 shrink-0 flex flex-col gap-1">
                  <span className="font-mono text-[12px] text-[#161616]/50">{cert.code}</span>
                  <span className="text-[14px] font-medium text-[#161616]">{cert.issuer}</span>
                </div>

                <div className="sm:w-3/4">
                  <h3 className="text-[16px] font-medium tracking-tight text-[#161616]">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#161616]/70">
                    {cert.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}