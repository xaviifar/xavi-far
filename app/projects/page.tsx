import Image from "next/image";
import Header from "@/app/components/Header";
import SectionHeader from "@/app/components/SectionHeader";
import Footer from "@/app/components/Footer";
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
  problem: string;
  architecture: string;
  built: string;
  technologies: { name: string; icon?: React.ReactNode }[];
  result: string;
}

const allProjects: ProjectDetail[] = [
  {
    id: "01",
    title: "AI Agent Platform",
    subtitle: "Autonomous multi-agent orchestration system",
    link: "https://github.com/xaviifar",
    image: "/img/orbhi.png",
    bgImage: "/back.jpg",
    problem:
      "Legacy workflow systems failed to automate complex data extraction and multi-step reasoning in real time, causing manual backlogs.",
    architecture:
      "Event-driven microservices architecture communicating via Redis message brokers with a central LangChain LLM orchestrator and FastAPI runtime.",
    built:
      "Engineered deterministic routing loops, integrated vector memory for dynamic context recall, and containerized deployment with Docker.",
    technologies: [
      {
        name: "Python",
        icon: <SiPython className="h-3.5 w-3.5 shrink-0" style={{ color: "#3776AB" }} />,
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="h-3.5 w-3.5 shrink-0" style={{ color: "#009688" }} />,
      },
      {
        name: "Redis",
        icon: <SiRedis className="h-3.5 w-3.5 shrink-0" style={{ color: "#DC382D" }} />,
      },
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="h-3.5 w-3.5 shrink-0" style={{ color: "#4169E1" }} />,
      },
      {
        name: "Docker",
        icon: <SiDocker className="h-3.5 w-3.5 shrink-0" style={{ color: "#2496ED" }} />,
      },
      {
        name: "LangChain",
        icon: <SiLangchain className="h-3.5 w-3.5 shrink-0" style={{ color: "#1C1C1C" }} />,
      },
    ],
    result:
      "Reduced processing time by 85% and successfully automated over 10,000 weekly recurring tasks with high validation accuracy.",
  },
  {
    id: "02",
    title: "BOE RAG Retrieval System",
    subtitle: "Enterprise semantic search & knowledge retrieval over Spanish Official State Gazette",
    link: "https://github.com/xaviifar",
    image: "/portfolio.jpg",
    bgImage: "/back.jpg",
    problem:
      "Technical teams spent over 2 hours daily searching for specific architectural clauses and compliance standards across thousands of PDFs.",
    architecture:
      "Vector database cluster coupled with an asynchronous ingestion pipeline for document parsing, semantic chunking, and embedding generation.",
    built:
      "Designed sliding-window chunking algorithms, integrated hybrid BM25 + dense vector ranking, and built conversational query streams.",
    technologies: [
      {
        name: "Python",
        icon: <SiPython className="h-3.5 w-3.5 shrink-0" style={{ color: "#3776AB" }} />,
      },
      {
        name: "Qdrant",
        icon: <SiQdrant className="h-3.5 w-3.5 shrink-0" style={{ color: "#DC244C" }} />,
      },
      {
        name: "FastAPI",
        icon: <SiFastapi className="h-3.5 w-3.5 shrink-0" style={{ color: "#009688" }} />,
      },
      {
        name: "Airflow",
        icon: <SiApacheairflow className="h-3.5 w-3.5 shrink-0" style={{ color: "#017CEE" }} />,
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="h-3.5 w-3.5 shrink-0 text-[#161616]" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="h-3.5 w-3.5 shrink-0" style={{ color: "#06B6D4" }} />,
      },
    ],
    result:
      "Achieved 96% retrieval accuracy and cut document search time down to sub-second queries for active analyst teams.",
  },
];

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  logoSrc?: string;
  icon?: IconType;
  brandColor?: string;
  skills: string[];
}

const certifications: CertificationItem[] = [
  {
    id: "01",
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900 / AI-901)",
    issuer: "Microsoft",
    date: "Verified Certification",
    credentialId: "MICROSOFT-AI-901",
    icon: VscAzure,
    brandColor: "#0078D4",
    skills: ["Azure OpenAI", "Cognitive Services", "Machine Learning", "Computer Vision", "NLP"],
  },
  {
    id: "02",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Verified Certification",
    credentialId: "MICROSOFT-AZ-900",
    icon: VscAzure,
    brandColor: "#0078D4",
    skills: ["Azure Cloud", "Cloud Architecture", "Security & Compliance", "Azure Services"],
  },
  {
    id: "03",
    title: "MSc Artificial Intelligence & Big Data",
    issuer: "Centre Estudis Monlau",
    date: "2025 — 2026",
    credentialId: "MONLAU-AI-2026-XF",
    logoSrc: "/img/monlau.jpg",
    skills: ["Deep Learning", "Spark", "Kafka", "Neural Architectures"],
  },
  {
    id: "04",
    title: "Cross-Platform Application Development (DAM)",
    issuer: "Centre Estudis Monlau",
    date: "2025 — 2026",
    credentialId: "MONLAU-DAM-2026-XF",
    logoSrc: "/img/monlau.jpg",
    skills: ["Full-Stack", "Databases", "Distributed Systems"],
  },
  {
    id: "05",
    title: "BSc in Computer Engineering",
    issuer: "Universitat de Lleida",
    date: "Academic Background",
    credentialId: "UDL-ENG-XF",
    logoSrc: "/img/udl.jpg",
    skills: ["Algorithms", "Data Structures", "OS Architecture"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#161616] bg-grid-structural">
      {/* Master Container ("Prathm Structural Grid") */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[840px] flex-col border-[#161616]/10 bg-[#f3f3f1] px-5 sm:border-x sm:px-10 md:px-14 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
        <Header />

        {/* Section 01: Project Blueprints */}
        <section className="relative py-7 sm:py-9 border-b border-[#161616]/10">
          <SectionHeader
            // index="01"
            // kicker="Production Blueprints"
            title="Projects &amp; Architecture Archive"
            subtitle="A comprehensive record of backend architectures, AI agent systems, and data pipelines built for production environments."
          />

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
                    className="object-cover opacity-25 blur-[1px]  transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
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
                        className="object-cover object-top  transition-all duration-500 "
                      />
                    </div>
                  </div>
                </div>

                {/* Blueprint Metadata Table */}
                <div className="flex flex-col border-t border-[#161616]/10">
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Problem
                    </span>
                    <span className="text-[13px] leading-[1.6] text-[#161616]/80">
                      {project.problem}
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
                      {project.built}
                    </span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] border-b border-[#161616]/10 py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t.name}
                          className="inline-flex items-center gap-1.5 rounded-md bg-white border border-[#161616]/10 px-2 py-0.8 text-[11px] font-medium text-[#161616]"
                        >
                          {t.icon && (
                            <span className="flex items-center justify-center shrink-0">
                              {t.icon}
                            </span>
                          )}
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] py-3">
                    <span className="text-[9.5px] uppercase font-mono tracking-[0.1em] text-[#161616]/40 font-medium pt-0.5">
                      Result
                    </span>
                    <span className="text-[13px] font-medium leading-[1.6] text-[#161616]">
                      {project.result}
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