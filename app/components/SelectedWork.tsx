import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import TechBadge from "./TechBadge";
import {
  SiPython,
  SiFastapi,
  SiRedis,
  SiPostgresql,
  SiDocker,
  SiQdrant,
  SiApacheairflow,
  SiNextdotjs,
  SiLangchain,
} from "react-icons/si";

interface TechItem {
  name: string;
  brandColor?: string;
  icon?: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  bgImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  tech: TechItem[];
}

export const selectedProjects: Project[] = [
  {
    id: "01",
    title: "AI Agent Platform",
    description:
      "Agent platform built in Python for orchestrating autonomous workflows, tool execution, persistent context and real-time decision making across specialized AI agents.",
    image: "/img/orbhi.png",
    bgImage: "/back.jpg",
    liveUrl: "/projects",
    githubUrl: "https://github.com/xaviifar",
    tech: [
      {
        name: "Python",
        brandColor: "#3776AB",
        icon: <SiPython className="h-3.5 w-3.5 shrink-0" style={{ color: "#3776AB" }} />,
      },
      {
        name: "FastAPI",
        brandColor: "#009688",
        icon: <SiFastapi className="h-3.5 w-3.5 shrink-0" style={{ color: "#009688" }} />,
      },
      {
        name: "Redis",
        brandColor: "#DC382D",
        icon: <SiRedis className="h-3.5 w-3.5 shrink-0" style={{ color: "#DC382D" }} />,
      },
      {
        name: "PostgreSQL",
        brandColor: "#4169E1",
        icon: <SiPostgresql className="h-3.5 w-3.5 shrink-0" style={{ color: "#4169E1" }} />,
      },
      {
        name: "Docker",
        brandColor: "#2496ED",
        icon: <SiDocker className="h-3.5 w-3.5 shrink-0" style={{ color: "#2496ED" }} />,
      },
    ],
  },
  {
    id: "02",
    title: "BOE RAG Retrieval System",
    description:
      "Retrieval pipeline over Spanish Official State Gazette documents, combining automated ingestion, semantic chunking, vector search, BM25 retrieval and cross-encoder reranking.",
    image: "/img/rag.jpg",
    bgImage: "/back.jpg",
    liveUrl: "/projects",
    githubUrl: "https://github.com/xaviifar",
    tech: [
      {
        name: "Python",
        brandColor: "#3776AB",
        icon: <SiPython className="h-3.5 w-3.5 shrink-0" style={{ color: "#3776AB" }} />,
      },
      {
        name: "Qdrant",
        brandColor: "#DC244C",
        icon: <SiQdrant className="h-3.5 w-3.5 shrink-0" style={{ color: "#DC244C" }} />,
      },
      {
        name: "Airflow",
        brandColor: "#017CEE",
        icon: <SiApacheairflow className="h-3.5 w-3.5 shrink-0" style={{ color: "#017CEE" }} />,
      },
      {
        name: "Docker",
        brandColor: "#2496ED",
        icon: <SiDocker className="h-3.5 w-3.5 shrink-0" style={{ color: "#2496ED" }} />,
      },
    ],
  },
];

export default function SelectedWork() {
  return (
    <section aria-labelledby="projects" className="relative py-8 sm:py-10">
      {/* Structural Corner Wireframe Markers */}
      {/* <span className="absolute -left-[5px] -top-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
        +
      </span>
      <span className="absolute -right-[5px] -top-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
        +
      </span>
      <span className="absolute -left-[5px] -bottom-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
        +
      </span> */}
      {/* <span className="absolute -right-[5px] -bottom-[5px] font-mono text-[10px] text-[#161616]/30 select-none pointer-events-none hidden sm:inline-block">
        +
      </span> */}

      <SectionHeader
        // index="01"
        // kicker="Featured Work"
        title="Selected Projects"
        subtitle="AI systems, RAG pipelines, and distributed architectures built for production."
      />

      {/* Prathm-Style 2-Column Grid (Enlarged Cards) */}
      <div className="relative mt-5">
        {/* Center hairline dividing line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 hidden w-px bg-[#161616]/10 sm:block"
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-0">
          {selectedProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`relative flex flex-col p-3 sm:p-5 ${
                idx === 0 ? "sm:pr-6" : "sm:pl-6"
              }`}
            >
              <div className="group/card relative flex flex-1 flex-col gap-3">
                {/* Enlarged Media Container with Background Stage & Foreground Screenshot */}
                <Link
                  href={project.liveUrl || "/projects"}
                  className="group/media relative block overflow-hidden rounded-lg border border-[#161616]/12 bg-zinc-100 outline-none transition-all hover:border-[#161616]/35 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    {/* Background Stage Image Layer */}
                    <Image
                      src={project.bgImage || "/back.jpg"}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 450px"
                      className="object-cover opacity-25 blur-[1px] transition-all duration-500 group-hover/media:scale-105 group-hover/media:opacity-35"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />

                    {/* Foreground Project Capture Layer */}
                    <div className="relative z-10 flex h-full w-full items-center justify-center p-3.5 sm:p-4.5">
                      <div className="relative h-full w-full overflow-hidden rounded-md border border-[#161616]/15 bg-white shadow-md transition-transform duration-500 ease-out group-hover/media:scale-[1.03]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 450px"
                          className="object-cover object-top grayscale transition-all duration-500 group-hover/media:grayscale-0"
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Title and Action Buttons Row */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <h3 className="min-w-0 truncate text-[15px] sm:text-[16px] font-semibold leading-snug tracking-tight text-[#161616]">
                    <Link
                      href={project.liveUrl || "/projects"}
                      className="transition-colors hover:text-[#4f46e5]"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* Micro Actions (Live & Code) */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-[#161616]/10 bg-white/80 px-2.5 py-0.8 text-[11.5px] font-medium text-[#161616] transition-colors hover:border-[#161616]/30 hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <svg viewBox="0 0 496 512" fill="currentColor" className="size-2.5 shrink-0">
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                        </svg>
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="line-clamp-2 text-[13px] leading-relaxed text-[#161616]/75">
                  {project.description}
                </p>

                {/* Micro Tech Badges */}
                <ul className="flex flex-wrap gap-1.5 pt-0.5">
                  {project.tech.map((t) => (
                    <li key={t.name} className="flex">
                      <TechBadge
                        name={t.name}
                        icon={t.icon}
                        brandColor={t.brandColor}
                        size="sm"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* See All Projects CTA */}
      <div className="relative flex w-full items-center justify-center pt-6 sm:pt-7">
        <Link
          href="/projects"
          className="inline-flex h-8.5 items-center justify-center gap-1.5 rounded-md bg-[#161616] px-4 text-[12.5px] font-medium text-[#f3f3f1] shadow-2xs transition-all hover:bg-[#161616]/90 active:scale-95"
        >
          <span>See all projects</span>
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