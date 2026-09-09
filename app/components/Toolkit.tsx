
"use client";

import React from "react";
import type { IconType } from "react-icons";

import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiLangchain,
  SiQdrant,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiApachespark,
  SiDatabricks,
  SiApachekafka,
  SiApacheairflow,
  SiPandas,
  SiPolars,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiHuggingface,
  SiOllama,
  SiCelery,
  SiGithubactions,
} from "react-icons/si";

import SectionHeader from "./SectionHeader";

interface Skill {
  name: string;
  brandColor: string;
  icon: IconType;
}

const capabilities = [
  "AI Agents",
  "RAG",
  "LLM Engineering",
  "Agent Orchestration",
  "Tool Calling",
  "Semantic Search",
  "Reranking",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Data Engineering",
];

const skills: Skill[] = [
  { name: "Python", brandColor: "#3776AB", icon: SiPython },
  { name: "PyTorch", brandColor: "#EE4C2C", icon: SiPytorch },
  { name: "TensorFlow", brandColor: "#FF6F00", icon: SiTensorflow },
  { name: "scikit-learn", brandColor: "#F7931E", icon: SiScikitlearn },
  { name: "LangChain", brandColor: "#1C1C1C", icon: SiLangchain },
  { name: "Hugging Face", brandColor: "#FFD21E", icon: SiHuggingface },
  { name: "Ollama", brandColor: "#000000", icon: SiOllama },
  { name: "Qdrant", brandColor: "#DC244C", icon: SiQdrant },
  { name: "FastAPI", brandColor: "#009688", icon: SiFastapi },
  { name: "C++", brandColor: "#092E20", icon: SiDjango },
  { name: "PostgreSQL", brandColor: "#4169E1", icon: SiPostgresql },
  { name: "Redis", brandColor: "#DC382D", icon: SiRedis },
  { name: "Pandas", brandColor: "#150458", icon: SiPandas },
  { name: "Polars", brandColor: "#CD792C", icon: SiPolars },
  { name: "Spark", brandColor: "#E25A1C", icon: SiApachespark },
  { name: "Databricks", brandColor: "#FF3621", icon: SiDatabricks },
  { name: "Kafka", brandColor: "#231F20", icon: SiApachekafka },
  { name: "Apache Airflow", brandColor: "#017CEE", icon: SiApacheairflow },
  { name: "Docker", brandColor: "#2496ED", icon: SiDocker },
  { name: "Kubernetes", brandColor: "#326CE5", icon: SiKubernetes },
  { name: "Linux", brandColor: "#FCC624", icon: SiLinux },
  { name: "TypeScript", brandColor: "#3178C6", icon: SiTypescript },
  { name: "React", brandColor: "#61DAFB", icon: SiReact },
  { name: "Next.js", brandColor: "#000000", icon: SiNextdotjs },
  { name: "Tailwind", brandColor: "#06B6D4", icon: SiTailwindcss },
  { name: "Supabase", brandColor: "#3ECF8E", icon: SiSupabase },
  { name: "Celery", brandColor: "#378147", icon: SiCelery },
  { name: "GitHub Actions", brandColor: "#2088FF", icon: SiGithubactions },
];

export default function Toolkit() {
  return (
    <section
      id="skills"
      aria-labelledby="stack"
      className="relative border-b border-[#161616]/10 py-7 sm:py-9"
    >


      <SectionHeader
        // index="03"
        // kicker="AI Engineering Toolkit"
        title="What I build with."
        subtitle="AI, data and software technologies."
      />

      {/* Capabilities */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#161616]/40">
            Capabilities
          </span>

          <span className="h-px flex-1 bg-[#161616]/10" />
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {capabilities.map((capability, index) => (
            <React.Fragment key={capability}>
              <span className="text-[11px] font-medium tracking-tight text-[#161616]/70 transition-colors hover:text-[#161616]">
                {capability}
              </span>

              {index < capabilities.length - 1 && (
                <span
                  className="text-[9px] text-[#161616]/20"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#161616]/40">
            Stack
          </span>

          <span className="h-px flex-1 bg-[#161616]/10" />

          <span className="font-mono text-[9px] tabular-nums text-[#161616]/25">
            {skills.length}
          </span>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <li key={skill.name}>
                <span className="group inline-flex items-center gap-1.5 rounded-md border border-[#161616]/[0.08] bg-white px-2 py-1 transition-all duration-150 hover:-translate-y-px hover:border-[#161616]/20">
                  <Icon
                    className="h-3 w-3 shrink-0"
                    style={{ color: skill.brandColor }}
                    aria-hidden="true"
                  />

                  <span className="text-[10px] font-medium tracking-tight text-[#161616]/65 transition-colors group-hover:text-[#161616]">
                    {skill.name}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

