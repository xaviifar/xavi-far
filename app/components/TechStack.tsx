"use client";

import { useLanguage } from "../context/LanguageContext";
import {
  SiPython,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiLangchain,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiQdrant,
  SiOllama,
  SiHuggingface,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDatabricks,
  SiPandas,
  SiPolars,
  SiFastapi,
  SiFlask,
  SiOdoo,
  SiLinux,
  SiGit,
  SiGithubactions,
  SiSelenium,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const technologies: TechItem[] = [
  // Core Languages
  { name: "Python", icon: <SiPython className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#3776AB" }} /> },
  { name: "SQL", icon: <TbSql className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },

  // AI / ML & Agents
  { name: "LangGraph", icon: <SiLangchain className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },
  { name: "LangChain", icon: <SiLangchain className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },
  { name: "PyTorch", icon: <SiPytorch className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#EE4C2C" }} /> },
  { name: "TensorFlow", icon: <SiTensorflow className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#FF6F00" }} /> },
  { name: "scikit-learn", icon: <SiScikitlearn className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#F7931E" }} /> },
  { name: "Qdrant", icon: <SiQdrant className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#DC244C" }} /> },
  { name: "Ollama", icon: <SiOllama className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },
  { name: "Hugging Face", icon: <SiHuggingface className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#FFD21E" }} /> },

  // Big Data & Infrastructure
  { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#4169E1" }} /> },
  { name: "Redis", icon: <SiRedis className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#DC382D" }} /> },
  { name: "Docker", icon: <SiDocker className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#2496ED" }} /> },
  { name: "Apache Spark", icon: <SiApachespark className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#E25A1C" }} /> },
  { name: "Apache Kafka", icon: <SiApachekafka className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },
  { name: "Apache Airflow", icon: <SiApacheairflow className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#017CEE" }} /> },
  { name: "Databricks", icon: <SiDatabricks className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#FF3621" }} /> },
  { name: "Pandas", icon: <SiPandas className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#150458" }} /> },
  { name: "Polars", icon: <SiPolars className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#CD792C" }} /> },

  // Backend & Automation
  { name: "FastAPI", icon: <SiFastapi className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#009688" }} /> },
  { name: "Flask", icon: <SiFlask className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-ink" /> },
  { name: "Odoo", icon: <SiOdoo className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#714B67" }} /> },
  { name: "Selenium", icon: <SiSelenium className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#43B02A" }} /> },
  { name: "Linux", icon: <SiLinux className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#FCC624" }} /> },
  { name: "Git", icon: <SiGit className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#F05032" }} /> },
  { name: "GitHub Actions", icon: <SiGithubactions className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: "#2088FF" }} /> },
];

export default function TechStack() {
  const { lang } = useLanguage();

  return (
    <section id="tech-stack" className="w-full pb-10 sm:pb-12">
      <p className="mb-5 font-mono text-[15px] text-ink-muted">
        <span className="text-ink-faint">#</span> {lang === "es" ? "stack tecnológico" : "tech stack"}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-1.5 sm:gap-2 rounded-md border border-border py-1 px-2 sm:py-1.5 sm:pl-2 sm:pr-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-700 cursor-default bg-surface"
          >
            <span className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center">
              {tech.icon}
            </span>
            <span className="whitespace-nowrap text-[11px] sm:text-[12.5px] font-medium leading-none text-ink">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
