"use client";

import React from "react";
import type { IconType } from "react-icons";
import TechBadge from "./TechBadge";
import SectionHeader from "./SectionHeader";

import {
  SiPython,
  SiFastapi,
  SiLangchain,
  SiQdrant,
  SiPytorch,
  SiHuggingface,
  SiOllama,
  SiScikitlearn,
  SiTensorflow,
  SiPostgresql,
  SiRedis,
  SiDjango,
  SiCelery,
  SiCplusplus,
  SiSupabase,
  SiApachespark,
  SiApachekafka,
  SiApacheairflow,
  SiDatabricks,
  SiPolars,
  SiPandas,
  SiDocker,
  SiLinux,
  SiKubernetes,
  SiGithubactions,
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";

interface SkillItem {
  name: string;
  brandColor: string;
  icon: IconType;
}

const skills: SkillItem[] = [
  { name: "Python", brandColor: "#3776AB", icon: SiPython },
  { name: "FastAPI", brandColor: "#009688", icon: SiFastapi },
  { name: "LangChain", brandColor: "#1C1C1C", icon: SiLangchain },
  { name: "Qdrant", brandColor: "#DC244C", icon: SiQdrant },
  { name: "PyTorch", brandColor: "#EE4C2C", icon: SiPytorch },
  { name: "Hugging Face", brandColor: "#FFD21E", icon: SiHuggingface },
  { name: "Ollama", brandColor: "#000000", icon: SiOllama },
  { name: "scikit-learn", brandColor: "#F7931E", icon: SiScikitlearn },
  { name: "TensorFlow", brandColor: "#FF6F00", icon: SiTensorflow },
  { name: "PostgreSQL", brandColor: "#4169E1", icon: SiPostgresql },
  { name: "Redis", brandColor: "#DC382D", icon: SiRedis },
  { name: "Docker", brandColor: "#2496ED", icon: SiDocker },
  { name: "Linux", brandColor: "#FCC624", icon: SiLinux },
  { name: "Apache Spark", brandColor: "#E25A1C", icon: SiApachespark },
  { name: "Apache Kafka", brandColor: "#231F20", icon: SiApachekafka },
  { name: "Apache Airflow", brandColor: "#017CEE", icon: SiApacheairflow },
  { name: "Databricks", brandColor: "#FF3621", icon: SiDatabricks },
  { name: "Polars", brandColor: "#CD792C", icon: SiPolars },
  { name: "Pandas", brandColor: "#150458", icon: SiPandas },
  { name: "TypeScript", brandColor: "#3178C6", icon: SiTypescript },
  { name: "Next.js", brandColor: "#000000", icon: SiNextdotjs },
  { name: "React", brandColor: "#61DAFB", icon: SiReact },
  { name: "Tailwind CSS", brandColor: "#06B6D4", icon: SiTailwindcss },
  { name: "C++", brandColor: "#00599C", icon: SiCplusplus },
  { name: "Django", brandColor: "#092E20", icon: SiDjango },
  { name: "Celery", brandColor: "#378147", icon: SiCelery },
  { name: "Supabase", brandColor: "#3ECF8E", icon: SiSupabase },
  { name: "Kubernetes", brandColor: "#326CEE", icon: SiKubernetes },
  { name: "GitHub Actions", brandColor: "#2088FF", icon: SiGithubactions },
  { name: "Git", brandColor: "#F05032", icon: SiGit },
  { name: "GitHub", brandColor: "#181717", icon: SiGithub },
  { name: "Postman", brandColor: "#FF6C37", icon: SiPostman },
];

export default function Toolkit() {
  return (
    <section id="skills" className="relative border-b border-[#161616]/10 py-8 sm:py-10 scroll-mt-24">
      <SectionHeader
        title="Skills"
        subtitle="Core tools, frameworks, and technologies I build with across AI, backend, and distributed systems."
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <TechBadge
              key={skill.name}
              name={skill.name}
              icon={<Icon className="w-4 h-4 shrink-0" style={{ color: skill.brandColor }} />}
              brandColor={skill.brandColor}
            />
          );
        })}
      </div>
    </section>
  );
}