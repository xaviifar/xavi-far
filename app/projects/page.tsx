import Image from "next/image";
import Header from "@/app/components/Header";
import SectionHeader from "@/app/components/SectionHeader";
import Footer from "@/app/components/Footer";
import TechBadge from "@/app/components/TechBadge";
import { IconType } from "react-icons";
import { VscAzure } from "react-icons/vsc";
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
  SiTailwindcss,
} from "react-icons/si";

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  image: string;
  bgImage?: string;
  overview: string;
  architecture: string;
  engineering: string;
  technologies: { name: string; brandColor?: string; icon?: React.ReactNode }[];
  demonstrates: string;
}

const allProjects: ProjectDetail[] = [
  {
    id: "01",
    title: "AI Agent Platform",
    subtitle: "Multi-Agent Orchestration & Execution System",
    link: "https://github.com/xaviifar",
    image: "/img/orbhi.png",
    bgImage: "/back.jpg",
    overview:
      "Autonomous multi-agent execution environment designed to coordinate specialized Python agents via deterministic routing loops, tool calling, and persistent session state.",
    architecture:
      "Event-driven microservices architecture communicating via Redis message brokers and task queues, orchestrating agent execution state and tool dispatch.",
    engineering:
      "Built deterministic tool-calling loops, integrated vector memory for context recall, structured output validation, and containerized deployment with Docker.",
    technologies: [
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
      {
        name: "LangChain",
        brandColor: "#1C1C1C",
        icon: <SiLangchain className="h-3.5 w-3.5 shrink-0" style={{ color: "#1C1C1C" }} />,
      },
    ],
    demonstrates:
      "Multi-agent orchestration, tool execution, state persistence, structured LLM outputs, containerized microservices.",
  },
  {
    id: "02",
    title: "BOE RAG Retrieval System",
    subtitle: "Semantic search & knowledge retrieval over Spanish Official State Gazette",
    link: "https://github.com/xaviifar",
    image: "/img/rag.jpg",
    bgImage: "/back.jpg",
    overview:
      "Semantic search and knowledge retrieval pipeline indexing Spanish Official State Gazette (BOE) legal documents, combining sliding-window chunking, dense vector embeddings, and hybrid BM25 retrieval.",
    architecture:
      "Asynchronous document ingestion pipeline with Qdrant vector database storage, dense vector search, and BM25 sparse keyword ranking.",
    engineering:
      "Designed custom sliding-window document chunking algorithms, integrated cross-encoder reranking, and implemented conversational query streaming.",
    technologies: [
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
        name: "FastAPI",
        brandColor: "#009688",
        icon: <SiFastapi className="h-3.5 w-3.5 shrink-0" style={{ color: "#009688" }} />,
      },
      {
        name: "Airflow",
        brandColor: "#017CEE",
        icon: <SiApacheairflow className="h-3.5 w-3.5 shrink-0" style={{ color: "#017CEE" }} />,
      },
      {
        name: "Next.js",
        brandColor: "#000000",
        icon: <SiNextdotjs className="h-3.5 w-3.5 shrink-0 text-[#161616]" />,
      },
      {
        name: "Tailwind CSS",
        brandColor: "#06B6D4",
        icon: <SiTailwindcss className="h-3.5 w-3.5 shrink-0" style={{ color: "#06B6D4" }} />,
      },
    ],
    demonstrates:
      "Hybrid retrieval (dense + sparse BM25), semantic search, vector indexing, document chunking pipelines.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#161616]">
      {/* Master Container */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[840px] flex-col px-5 sm:px-10 md:px-14">
        <Header />

        {/* Section 01: Projects */}
        <section className="relative py-7 sm:py-9">
          <SectionHeader title="Projects" />

          <div className="flex flex-col gap-12 sm:gap-14">
            {allProjects.map((project) => (
              <article key={project.id} className="group flex flex-col gap-4">
                {/* Project Title & Status */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 border-b border-[#161616]/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10.5px] text-[#161616]/40 font-medium">
                      {project.id}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-medium tracking-tight text-[#161616]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-[12px] text-[#161616]/60 font-mono">
                    {project.subtitle}
                  </span>
                </div>

                {/* Media Container with Background Image & Foreground Screenshot Layer */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-[#161616]/10 bg-zinc-100 sm:aspect-[21/9] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  {/* Background Stage Image */}
                  <Image
                    src={project.bgImage || "/back.jpg"}
                    alt=""
                    fill
                    sizes="(max-width: 840px) 100vw, 840px"
                    className="object-cover opacity-25 blur-[1px] transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />

                  {/* Foreground Project Capture */}
                  <div className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6">
                    <div className="relative h-full w-full overflow-hidden rounded-md border border-[#161616]/15 bg-white shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 840px) 100vw, 840px"
                        className="object-cover object-top transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Metadata Table */}
                <div className="flex flex-col border-t border-[#161616]/10">
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Overview
                    </span>
                    <span className="text-[13px] leading-[1.6] text-[#161616]/80">
                      {project.overview}
                    </span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Architecture
                    </span>
                    <span className="text-[13px] leading-[1.6] text-[#161616]/80">
                      {project.architecture}
                    </span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Engineering
                    </span>
                    <span className="text-[13px] leading-[1.6] text-[#161616]/80">
                      {project.engineering}
                    </span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <TechBadge
                          key={t.name}
                          name={t.name}
                          icon={t.icon}
                          brandColor={t.brandColor}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Demonstrates
                    </span>
                    <span className="text-[13px] font-medium leading-[1.6] text-[#161616]">
                      {project.demonstrates}
                    </span>
                  </div>
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