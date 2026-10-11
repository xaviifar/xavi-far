"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { SiKaggle } from "react-icons/si";

export default function Hero() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("xavifarmartinez@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isEs = lang === "es";

  return (
    <section className="w-full flex flex-col pt-4 pb-4">
      {/* Title row with doodle arrow & avatar inside h1 */}
      <div className="relative">
        <svg
          viewBox="0 0 90 56"
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-1/2 hidden w-[90px] -translate-y-[calc(50%+8px)] text-neutral-300 dark:text-neutral-700 lg:block select-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 9c18-6 30 5 25 17-4 10-19 10-17 0 2-11 22-8 36 2 8 6 16 10 26 11" />
          <path d="M74 32c2 3 4 5 8 7-4 2-6 4-8 8" />
        </svg>

        <h1 className="text-[38px] sm:text-[48px] md:text-[54px] font-semibold text-ink leading-[1.2] tracking-[-0.03em] flex flex-wrap items-center gap-x-3 sm:gap-x-4">
          <span>{isEs ? "Hola, soy" : "Hey, I'm"}</span>
          <span className="inline-flex items-center align-middle my-1">
            <span
              className="relative inline-block w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-[18px] overflow-hidden border border-border dark:border-white/10 -rotate-6 hover:rotate-0 transition-transform duration-300 ease-out cursor-pointer group shadow-xs"
              title="Xavi Far"
            >
              <Image
                src="/portfolio.jpg"
                alt="Xavi Far"
                width={80}
                height={80}
                priority
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </span>
          </span>
          <span>Xavi</span>
        </h1>
      </div>

      {/* About Description Block */}
      <div
        id="about"
        className="scroll-mt-24 sm:scroll-mt-28 mt-8 text-[15px] sm:text-[16px] text-neutral-500 dark:text-neutral-400 leading-[1.7] font-normal space-y-3"
      >
        <div>
          <p>
            {isEs ? "Soy " : "I'm an "}
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              {isEs ? "Desarrollador e Ingeniero de Sistemas de IA" : "AI Systems Developer & Engineer"}
            </span>
            .
          </p>
          <p className="mt-1">
            {isEs
              ? "Construyo sistemas de IA y arquitecturas de datos end-to-end, desde la ingesta de datos hasta el "
              : "I build end-to-end AI systems and data architectures, from data ingestion up to "}
            <span className="cursor-pointer inline-flex items-baseline group">
              <span className="text-neutral-900 dark:text-neutral-100 font-normal transition-colors duration-150">
                {isEs ? "despliegue en producción" : "production deployment"}
              </span>
              <span className="inline-flex items-center align-middle ml-1.5 self-center text-ink-muted opacity-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
                  <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
                </svg>
              </span>
            </span>
            {isEs ? ". Cuido al detalle las " : ". I care deeply about the "}
            <span className="cursor-pointer inline-flex items-baseline group">
              <span className="text-neutral-900 dark:text-neutral-100 font-normal transition-colors duration-150">
                {isEs ? "cosas pequeñas" : "small stuff"}
              </span>
              <span className="inline-flex items-center align-middle ml-1.5 self-center text-ink-muted opacity-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" />
                  <path d="M22 4h-4" />
                  <circle cx="4" cy="20" r="2" />
                </svg>
              </span>
            </span>
            {isEs
              ? ": Llamadas a herramientas deterministas, vectores de baja latencia y flujos de trabajo que realmente "
              : ". Deterministic tool calling, low-latency vectors, and workflows that actually "}
            <span className="cursor-pointer inline-flex items-baseline group">
              <span className="text-neutral-900 dark:text-neutral-100 font-normal transition-colors duration-150">
                {isEs ? "resuelven problemas" : "solve problems"}
              </span>
              <span className="inline-flex items-center align-middle ml-1.5 self-center text-ink-muted opacity-45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </span>
            </span>
            .
          </p>
        </div>

        <p>
          {isEs ? "Trabajo principalmente con " : "I mostly work with "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">Python</span>,{" "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">SQL</span>,{" "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">LangGraph / LangChain</span>,{" "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">PostgreSQL</span>{" "}
          {isEs ? "y " : "and "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">Docker</span>.
        </p>

        <p>
          {isEs ? "¿Quieres contratarme o colaborar conmigo? " : "Want to hire or collaborate with me? "}
          <a
            href="#contact"
            className="text-neutral-900 dark:text-neutral-100 font-normal underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
          >
            {isEs ? "Hablemos" : "Let's talk"}
          </a>
          . {isEs ? "Ubicado en Barcelona, España." : "Based in Barcelona, Spain."}
        </p>
      </div>

      {/* Social Links Row */}
      <div className="mt-8 flex flex-wrap items-center gap-5">
        {/* GitHub */}
        <a
          href="https://github.com/xaviifar"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-ink hover:opacity-80"
        >
          <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256"
            />
          </svg>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 z-30 shadow-xs">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/xavi-far/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:opacity-85"
        >
          <svg viewBox="0 0 512 512" aria-hidden="true" className="h-[18px] w-[18px]">
            <path d="M56.9 512h398.2c31.4 0 56.9-25.5 56.9-56.9V56.9C512 25.5 486.5 0 455.1 0H56.9C25.5 0 0 25.5 0 56.9v398.2C0 486.5 25.5 512 56.9 512" fill="#007ebb" />
            <path d="M440.9 440.9h-76V311.5c0-35.5-13.5-55.3-41.6-55.3-30.5 0-46.5 20.6-46.5 55.3v129.4h-73.2V194.4h73.2v33.2s22-40.7 74.3-40.7 89.7 31.9 89.7 98v156zM116.3 162.1c-24.9 0-45.2-20.4-45.2-45.5s20.2-45.5 45.2-45.5 45.1 20.4 45.1 45.5-20.2 45.5-45.1 45.5M78.5 440.9h76.4V194.4H78.5z" fill="#ffffff" />
          </svg>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 z-30 shadow-xs">
            LinkedIn
          </span>
        </a>

        {/* Kaggle */}
        <a
          href="https://www.kaggle.com/xaviifar"
          target="_blank"
          rel="noreferrer"
          aria-label="Kaggle"
          className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-[#20BEFF] hover:opacity-85"
        >
          <SiKaggle className="h-[18px] w-[18px]" />
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 z-30 shadow-xs">
            Kaggle
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:xavifarmartinez@gmail.com"
          onClick={handleCopyEmail}
          aria-label="Email"
          className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-ink hover:opacity-80 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 z-30 shadow-xs">
            {copied ? (isEs ? "¡Email copiado!" : "Email copied!") : (isEs ? "Copiar email" : "Email")}
          </span>
        </a>

        {/* Resume CV */}
        <a
          href="/Xavi_Far_CV.pdf"
          download="Xavi_Far_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
          className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-ink hover:opacity-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[17px] w-[17px]"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[12px] font-medium text-bg opacity-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 z-30 shadow-xs">
            {isEs ? "Currículum (CV)" : "Resume (CV)"}
          </span>
        </a>
      </div>
    </section>
  );
}