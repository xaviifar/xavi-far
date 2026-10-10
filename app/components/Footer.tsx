"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
        timeZone: "Europe/Madrid",
        hour: "numeric",
        minute: "2-digit",
        hour12: lang !== "es",
      });
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-8 sm:pt-12 pb-14 sm:pb-20 mt-12 sm:mt-16">
      {/* Hairline Divider Line */}
      <div className="relative z-10 w-full border-t border-neutral-200/50 dark:border-neutral-800/50 mb-8 sm:mb-10" />

      {/* Connect & Details Row */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left justify-between gap-6">
        {/* Connect Social Row */}
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-mono text-[11px] tracking-widest text-ink-muted uppercase select-none mb-3">
            {lang === "es" ? "CONECTAR" : "CONNECT"}
          </span>
          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            {/* GitHub */}
            <a
              href="https://github.com/xaviifar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group relative flex items-center justify-center hover:-translate-y-0.5 transition-all duration-150 cursor-pointer text-ink hover:opacity-80"
            >
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 512 512" fill="currentColor" className="h-[16.5px] w-[16.5px]">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256"
                  />
                </svg>
              </span>
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-bg opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-xs">
                GitHub
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/xavi-far/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative flex items-center justify-center hover:-translate-y-0.5 transition-all duration-150 cursor-pointer hover:opacity-85"
            >
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 512 512" aria-hidden="true" className="h-[16.5px] w-[16.5px]">
                  <path d="M56.9 512h398.2c31.4 0 56.9-25.5 56.9-56.9V56.9C512 25.5 486.5 0 455.1 0H56.9C25.5 0 0 25.5 0 56.9v398.2C0 486.5 25.5 512 56.9 512" fill="#007ebb" />
                  <path d="M440.9 440.9h-76V311.5c0-35.5-13.5-55.3-41.6-55.3-30.5 0-46.5 20.6-46.5 55.3v129.4h-73.2V194.4h73.2v33.2s22-40.7 74.3-40.7 89.7 31.9 89.7 98v156zM116.3 162.1c-24.9 0-45.2-20.4-45.2-45.5s20.2-45.5 45.2-45.5 45.1 20.4 45.1 45.5-20.2 45.5-45.1 45.5M78.5 440.9h76.4V194.4H78.5z" fill="#ffffff" />
                </svg>
              </span>
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-bg opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-xs">
                LinkedIn
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:xavifarmartinez@gmail.com"
              aria-label="Email"
              className="group relative flex items-center justify-center hover:-translate-y-0.5 transition-all duration-150 cursor-pointer text-ink-muted hover:text-ink"
            >
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
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
                  className="lucide lucide-mail h-[16.5px] w-[16.5px] stroke-[1.8]"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-bg opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-xs">
                Email
              </span>
            </a>

            {/* CV */}
            <a
              href="/Xavi_Far_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CV"
              className="group relative flex items-center justify-center hover:-translate-y-0.5 transition-all duration-150 cursor-pointer text-ink-muted hover:text-ink"
            >
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
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
                  className="h-[16.5px] w-[16.5px] stroke-[1.8]"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </span>
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-bg opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-xs">
                CV
              </span>
            </a>
          </div>
        </div>

        {/* Location & Real-time Clock + Visitor */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-end gap-2 font-mono text-[12px] text-ink-muted">
            <span className="text-ink">{lang === "es" ? "Barcelona, España" : "Barcelona, Spain"}</span>
            <span className="text-ink-faint">·</span>
            <span>{localTime || "11:45 AM"}</span>
          </div>
          <div className="mt-1 font-mono text-[12px] text-ink-muted/75">
            <span className="text-ink font-medium">{lang === "es" ? "1er" : "1st"}</span>{" "}
            {lang === "es" ? "visitante" : "visitor"}
          </div>
        </div>
      </div>

      {/* Copyright & Back To Top */}
      <div className="mt-10 sm:mt-12 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[12px] text-ink-muted text-center sm:text-left">
        <div className="order-2 sm:order-1">
          {lang === "es" ? (
            <>
              Diseñado y desarrollado por{" "}
              <span className="text-ink font-medium">Xavi</span> · © 2026
            </>
          ) : (
            <>
              Designed &amp; developed by{" "}
              <span className="text-ink font-medium">Xavi</span> · © 2026
            </>
          )}
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="order-1 sm:order-2 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 px-3.5 py-1 text-[11.5px] font-mono text-ink-muted hover:text-ink hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all cursor-pointer select-none"
        >
          <span>{lang === "es" ? "Volver arriba" : "Back to top"}</span>
          <span className="text-[11px]">↑</span>
        </button>
      </div>
    </footer>
  );
}