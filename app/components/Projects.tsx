"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import {
  SiPython,
  SiFastapi,
  SiRedis,
  SiPostgresql,
  SiDocker,
  SiLangchain,
  SiQdrant,
  SiApacheairflow,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiKotlin,
  SiMysql,
  SiOdoo,
  SiFlask,
  SiSelenium,
  SiFlutter,
  SiSupabase,
} from "react-icons/si";

interface ProjectItem {
  id: string;
  title: string;
  description: { en: string; es: string };
  image: string;
  githubUrl: string;
  repoName?: string;
  stars: number;
  tech: { name: string; icon: React.ReactNode }[];
}

const projects: ProjectItem[] = [
  {
    id: "01",
    title: "AI Agent Platform",
    description: {
      en: "Autonomous multi-agent orchestration system exploring deterministic tool-calling loops, Redis task queues, vector session memory, and containerized deployment with Docker.",
      es: "Sistema de orquestación multi-agente autónomo explorando bucles deterministas de tool-calling, colas Redis, memoria vectorial de sesión y despliegue en contenedores Docker.",
    },
    image: "/img/ai_agent_platform.webp",
    githubUrl: "https://github.com/xaviifar",
    stars: 0,
    tech: [
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "FastAPI", icon: <SiFastapi className="w-[18px] h-[18px]" style={{ color: "#009688" }} /> },
      { name: "Redis", icon: <SiRedis className="w-[18px] h-[18px]" style={{ color: "#DC382D" }} /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-[18px] h-[18px]" style={{ color: "#4169E1" }} /> },
      { name: "Docker", icon: <SiDocker className="w-[18px] h-[18px]" style={{ color: "#2496ED" }} /> },
      { name: "LangChain", icon: <SiLangchain className="w-[18px] h-[18px] text-ink" /> },
    ],
  },
  {
    id: "02",
    title: "Gmail AI Agent",
    description: {
      en: "AI-powered email assistant designed on LangGraph StateGraphs to understand, search, classify, and batch-triage messages with tool execution, OpenRouter LLMs, and ElevenLabs voice TTS.",
      es: "Asistente de correo con IA basado en StateGraphs de LangGraph para clasificar, buscar y organizar emails mediante ejecución de herramientas, LLMs de OpenRouter y síntesis por voz.",
    },
    image: "/img/gmail_agent.webp",
    githubUrl: "https://github.com/xaviifar/email_agent",
    repoName: "email_agent",
    stars: 0,
    tech: [
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "LangChain", icon: <SiLangchain className="w-[18px] h-[18px] text-ink" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-[18px] h-[18px]" style={{ color: "#4169E1" }} /> },
      { name: "Docker", icon: <SiDocker className="w-[18px] h-[18px]" style={{ color: "#2496ED" }} /> },
    ],
  },
  {
    id: "03",
    title: "BOE RAG Retrieval System",
    description: {
      en: "Semantic search & legal document knowledge retrieval pipeline over Spanish Official State Gazette records combining sliding-window chunking, Qdrant vector database, and BM25 hybrid reranking.",
      es: "Pipeline de búsqueda semántica y recuperación documental sobre el Boletín Oficial del Estado combinando chunking por ventana deslizante, base vectorial Qdrant y reordenamiento híbrido BM25.",
    },
    image: "/img/boe_rag.webp",
    githubUrl: "https://github.com/xaviifar/boe-rag",
    repoName: "boe-rag",
    stars: 0,
    tech: [
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "Qdrant", icon: <SiQdrant className="w-[18px] h-[18px]" style={{ color: "#DC244C" }} /> },
      { name: "Apache Airflow", icon: <SiApacheairflow className="w-[18px] h-[18px]" style={{ color: "#017CEE" }} /> },
      { name: "FastAPI", icon: <SiFastapi className="w-[18px] h-[18px]" style={{ color: "#009688" }} /> },
      { name: "Docker", icon: <SiDocker className="w-[18px] h-[18px]" style={{ color: "#2496ED" }} /> },
    ],
  },
  {
    id: "04",
    title: "McDonald's Sentiment Analysis",
    description: {
      en: "NLP classification and customer sentiment analysis on Barcelona reviews, comparing custom lexicon-based logistic regression against Deep Learning TF-IDF Neural Networks with ROC curve evaluation.",
      es: "Clasificación NLP y análisis de sentimiento de clientes en reseñas de Barcelona, comparando regresión logística léxica frente a redes neuronales TF-IDF evaluadas con curvas ROC.",
    },
    image: "/img/mcdonalds_sentiment.webp",
    githubUrl: "https://github.com/xaviifar/mcdonalds-review-sentiment-analysis",
    repoName: "mcdonalds-review-sentiment-analysis",
    stars: 0,
    tech: [
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "TensorFlow", icon: <SiTensorflow className="w-[18px] h-[18px]" style={{ color: "#FF6F00" }} /> },
      { name: "scikit-learn", icon: <SiScikitlearn className="w-[18px] h-[18px]" style={{ color: "#F7931E" }} /> },
      { name: "Pandas", icon: <SiPandas className="w-[18px] h-[18px]" style={{ color: "#150458" }} /> },
    ],
  },
  {
    id: "05",
    title: "4Party",
    description: {
      en: "Social event & nightlife discovery mobile app recognized as Best DAM Project. Helps users see where friends go in real-time, explore venues like Razzmatazz, and browse live maps.",
      es: "Aplicación móvil social de ocio nocturno premiada como Mejor Proyecto de DAM. Permite descubrir a qué fiestas van tus amigos en tiempo real, explorar salas y consultar eventos.",
    },
    image: "/img/fourparty_app.webp",
    githubUrl: "https://github.com/xaviifar",
    stars: 0,
    tech: [
      { name: "Flutter", icon: <SiFlutter className="w-[18px] h-[18px]" style={{ color: "#02569B" }} /> },
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "Supabase", icon: <SiSupabase className="w-[18px] h-[18px]" style={{ color: "#3ECF8E" }} /> },
    ],
  },
  {
    id: "06",
    title: "Enterprise Odoo Automation",
    description: {
      en: "Production business automation suite engineered at ESDI Systems, uniting custom Odoo ERP models, Selenium scraping bots, SQL reconciliation, and OpenRouter LLM parsing.",
      es: "Suite de automatización empresarial desarrollada en ESDI Systems que integra módulos Odoo ERP personalizados, bots de scraping con Selenium, conciliación SQL y análisis con LLMs.",
    },
    image: "/img/odoo_automation.webp",
    githubUrl: "https://github.com/xaviifar",
    stars: 0,
    tech: [
      { name: "Python", icon: <SiPython className="w-[18px] h-[18px]" style={{ color: "#3776AB" }} /> },
      { name: "Odoo", icon: <SiOdoo className="w-[18px] h-[18px]" style={{ color: "#714B67" }} /> },
      { name: "Flask", icon: <SiFlask className="w-[18px] h-[18px]" style={{ color: "#000000" }} /> },
      { name: "Selenium", icon: <SiSelenium className="w-[18px] h-[18px]" style={{ color: "#43B02A" }} /> },
      { name: "Docker", icon: <SiDocker className="w-[18px] h-[18px]" style={{ color: "#2496ED" }} /> },
    ],
  },
];

export default function Projects() {
  const { lang } = useLanguage();
  const [liveStars, setLiveStars] = useState<Record<string, number>>({});

  useEffect(() => {
    let isCancelled = false;

    async function fetchStars() {
      try {
        const res = await fetch("https://api.github.com/users/xaviifar/repos");
        if (!res.ok) return;
        const data = await res.json();
        if (!isCancelled && Array.isArray(data)) {
          const map: Record<string, number> = {};
          data.forEach((repo: { name: string; stargazers_count: number }) => {
            projects.forEach((p) => {
              if (p.repoName && p.repoName === repo.name) {
                map[p.id] = repo.stargazers_count;
              }
            });
          });
          setLiveStars(map);
        }
      } catch {
        // network fallback
      }
    }

    fetchStars();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-14 sm:scroll-mt-16 w-full pt-6 pb-10 sm:pt-8 sm:pb-12">
      <p className="mb-8 font-mono text-[15px] text-ink-muted">
        <span className="text-ink-faint">#</span> {lang === "es" ? "proyectos" : "projects"}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const stars = liveStars[project.id] ?? project.stars ?? 0;
          return (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border transition-colors duration-300 hover:border-neutral-400 dark:hover:border-neutral-700 bg-surface"
            >
              {/* Top Media aspect-[16/10] */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-neutral-100 dark:bg-neutral-900">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  className="block h-full w-full cursor-pointer relative"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                  />
                </a>
              </div>

              {/* Content Body */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[16px] font-medium tracking-[-0.01em] text-ink">
                    {project.title}
                  </h3>

                  {/* GitHub link with realistic star count matching vinitpatil */}
                  <div className="flex shrink-0 items-center">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      title={stars > 0 ? `${stars} star${stars === 1 ? "" : "s"} on GitHub` : `View ${project.title} on GitHub`}
                      className="group/repo inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-200 hover:text-ink cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className="h-[15px] w-[15px] transition-transform duration-200 ease-out group-hover/repo:scale-110"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256"
                        />
                      </svg>
                      {stars > 0 && (
                        <span className="inline-flex items-center gap-1 font-mono text-[12px] text-ink-muted transition-colors duration-200 group-hover/repo:text-ink">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 fill-current opacity-70 transition-opacity duration-200 group-hover/repo:opacity-100"
                          >
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                          </svg>
                          <span className="tabular-nums font-mono font-medium opacity-70">
                            {stars}
                          </span>
                        </span>
                      )}
                    </a>
                  </div>
                </div>

                <p className="text-[14px] leading-[1.6] text-ink-muted">
                  {project.description[lang]}
                </p>

                {/* Tech Icons Footer */}
                <div className="mt-auto flex items-center gap-2.5 pt-3">
                  {project.tech.map((t) => (
                    <span
                      key={t.name}
                      title={t.name}
                      className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:-translate-y-0.5 cursor-default"
                    >
                      {t.icon}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
