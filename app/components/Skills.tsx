import React from "react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiCplusplus,
  SiR,
  SiFlask,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiApachespark,
  SiDatabricks,
  SiPandas,
  SiPolars,
  SiQdrant,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import SectionHeader from "./SectionHeader";

type Tool = {
  label: string;
  icon?: IconType;
  color?: string;
};

const tools: Tool[] = [
  { label: "Python", icon: SiPython, color: "#3776AB" },
  { label: "Java", icon: DiJava, color: "#ED8B00" },
  { label: "C++", icon: SiCplusplus, color: "#00599C" },
  { label: "R", icon: SiR, color: "#276DC3" },
  { label: "SQL" },
  { label: "Flask", icon: SiFlask, color: "#161616" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { label: "MySQL", icon: SiMysql, color: "#4479A1" },
  { label: "Redis", icon: SiRedis, color: "#DC382D" },
  { label: "Qdrant", icon: SiQdrant, color: "#161616" },
  { label: "pgvector" },
  { label: "Apache Spark", icon: SiApachespark, color: "#E25A1C" },
  { label: "Databricks", icon: SiDatabricks, color: "#FF3621" },
  { label: "Pandas", icon: SiPandas, color: "#150458" },
  { label: "Polars", icon: SiPolars, color: "#CD792C" },
  { label: "Power BI" },
];

const focusAreas = [
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "LLMs",
  "Fine-tuning",
  "Local Models",
  "RAG Pipelines",
  "Autonomous Agents",
];

import TechBadge from "./TechBadge";

function ToolChip({ label, icon: Icon, color }: Tool) {
  return (
    <li>
      <TechBadge
        name={label}
        icon={Icon ? <Icon className="w-4 h-4 shrink-0" style={{ color }} /> : undefined}
        brandColor={color}
        size="md"
      />
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pt-6 pb-8">
      <SectionHeader
        index="05"
        title="Technical Stack &amp; Focus"
      />

      <div className="mt-4">
        <h3 className="text-[10.5px] font-mono font-medium uppercase tracking-[0.08em] text-[#161616]/40">
          Tools &amp; Technologies
        </h3>
        <ul className="mt-2.5 flex flex-wrap gap-1.5 p-0">
          {tools.map((tool) => (
            <ToolChip key={tool.label} {...tool} />
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="text-[10.5px] font-mono font-medium uppercase tracking-[0.08em] text-[#161616]/40">
          Core Focus Areas
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#161616]/75">
          {focusAreas.map((area, idx) => (
            <React.Fragment key={area}>
              <span className="font-normal hover:text-[#161616] transition-colors cursor-default select-none">
                {area}
              </span>
              {idx < focusAreas.length - 1 && (
                <span className="text-[#161616]/25 select-none font-mono text-[10px]">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}