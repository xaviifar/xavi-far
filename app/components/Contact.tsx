"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusFeedback, setStatusFeedback] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("xavifarmartinez@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || status === "sending") return;

    setStatus("sending");
    setStatusFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: handle.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("sent");
        setStatusFeedback(
          lang === "es"
            ? "¡Mensaje enviado directamente a Xavi!"
            : "Message sent directly to Xavi!"
        );
        setMessage("");
        setHandle("");
        setTimeout(() => {
          setStatus("idle");
          setStatusFeedback("");
        }, 4500);
      } else if (res.status === 429) {
        setStatus("error");
        setStatusFeedback(
          lang === "es"
            ? data.messageEs || "Demasiados intentos. Espera un momento."
            : data.messageEn || "Too many attempts. Please wait a moment."
        );
      } else {
        // Fallback to mailto if no external provider could deliver
        const subject = encodeURIComponent(
          `Message from Portfolio: ${handle || "Contact"}`
        );
        const body = encodeURIComponent(message);
        window.location.href = `mailto:xavifarmartinez@gmail.com?subject=${subject}&body=${body}`;
        setStatus("sent");
        setStatusFeedback(
          lang === "es"
            ? "¡Abriendo cliente de correo para enviar!"
            : "Opening mail client to send!"
        );
        setTimeout(() => {
          setStatus("idle");
          setStatusFeedback("");
        }, 4000);
      }
    } catch {
      setStatus("error");
      setStatusFeedback(
        lang === "es"
          ? "Error de red al enviar. Inténtalo de nuevo."
          : "Network error while sending. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-14 sm:scroll-mt-16 relative z-10 w-full pt-4 pb-2 sm:pb-3">
      <p className="mb-6 font-mono text-[15px] text-ink-muted">
        <span className="text-ink-faint">#</span> {lang === "es" ? "contacto" : "contact"}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
        {/* Left Side: Action Icon Buttons */}
        <div className="w-full grid grid-cols-4 gap-2 sm:w-auto sm:flex sm:flex-col sm:gap-2 shrink-0">
          {/* Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={lang === "es" ? "Copiar email" : "Copy email"}
            className="group relative w-full h-10 sm:h-9 sm:w-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-bg flex items-center justify-center text-ink-muted hover:text-ink hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
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
                className="lucide lucide-mail h-4 w-4 stroke-[1.8] text-ink-muted group-hover:text-ink transition-colors"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            )}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-mono text-[11px] text-bg opacity-0 group-hover:opacity-100 transition-all duration-150 z-30 shadow-xs">
              {copied
                ? lang === "es"
                  ? "¡Copiado!"
                  : "Copied!"
                : lang === "es"
                ? "Copiar email"
                : "Copy email"}
            </span>
          </button>

          {/* Send Email Directly */}
          <a
            href="mailto:xavifarmartinez@gmail.com"
            aria-label={lang === "es" ? "Abrir cliente de correo" : "Open email client"}
            className="group relative w-full h-10 sm:h-9 sm:w-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-bg flex items-center justify-center text-ink-muted hover:text-ink hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
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
              className="lucide lucide-send h-4 w-4 stroke-[1.8] text-ink-muted group-hover:text-ink transition-colors"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-mono text-[11px] text-bg opacity-0 group-hover:opacity-100 transition-all duration-150 z-30 shadow-xs">
              {lang === "es" ? "Enviar email" : "Send email"}
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/xavi-far/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group relative w-full h-10 sm:h-9 sm:w-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-bg flex items-center justify-center hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            <svg viewBox="0 0 512 512" aria-hidden="true" className="h-4 w-4">
              <path d="M56.9 512h398.2c31.4 0 56.9-25.5 56.9-56.9V56.9C512 25.5 486.5 0 455.1 0H56.9C25.5 0 0 25.5 0 56.9v398.2C0 486.5 25.5 512 56.9 512" fill="#007ebb" />
              <path d="M440.9 440.9h-76V311.5c0-35.5-13.5-55.3-41.6-55.3-30.5 0-46.5 20.6-46.5 55.3v129.4h-73.2V194.4h73.2v33.2s22-40.7 74.3-40.7 89.7 31.9 89.7 98v156zM116.3 162.1c-24.9 0-45.2-20.4-45.2-45.5s20.2-45.5 45.2-45.5 45.1 20.4 45.1 45.5-20.2 45.5-45.1 45.5M78.5 440.9h76.4V194.4H78.5z" fill="#ffffff" />
            </svg>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-mono text-[11px] text-bg opacity-0 group-hover:opacity-100 transition-all duration-150 z-30 shadow-xs">
              LinkedIn
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/xaviifar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group relative w-full h-10 sm:h-9 sm:w-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-bg flex items-center justify-center text-ink-muted hover:text-ink hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            <svg viewBox="0 0 512 512" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256"
              />
            </svg>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-0.5 font-mono text-[11px] text-bg opacity-0 group-hover:opacity-100 transition-all duration-150 z-30 shadow-xs">
              GitHub
            </span>
          </a>
        </div>

        {/* Right Side: Message Card Form */}
        <div className="w-full flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 p-3.5 sm:p-4 bg-bg/90 backdrop-blur-xs">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            {/* Hidden honeypot for anti-spam */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              disabled={status === "sending"}
              placeholder={lang === "es" ? "Tu email o @usuario" : "Your email or @handle"}
              className="w-full bg-transparent border border-neutral-200/60 dark:border-neutral-800/60 rounded-md px-3 py-1.5 text-[13px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors font-mono disabled:opacity-50"
            />
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "sending"}
              placeholder={lang === "es" ? "Escribe un mensaje breve..." : "Write a quick message..."}
              required
              className="w-full bg-transparent border border-neutral-200/60 dark:border-neutral-800/60 rounded-md px-3 py-1.5 text-[13px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none leading-relaxed disabled:opacity-50"
            />
            <div className="flex items-center justify-between pt-0.5 min-h-[28px] gap-2">
              <span
                className={`font-mono text-[10.5px] transition-colors ${
                  status === "sent"
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : status === "error"
                    ? "text-red-500 dark:text-red-400"
                    : "text-ink-muted/70"
                }`}
              >
                {statusFeedback
                  ? statusFeedback
                  : status === "sending"
                  ? lang === "es"
                    ? "Enviando mensaje..."
                    : "Sending message..."
                  : lang === "es"
                  ? "Mensaje directo"
                  : "Direct message"}
              </span>
              <button
                type="submit"
                disabled={status === "sending" || !message.trim()}
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 px-3 py-1 font-mono text-[11.5px] text-ink transition-all duration-150 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 cursor-pointer group disabled:opacity-50 disabled:pointer-events-none"
              >
                <span>
                  {status === "sending"
                    ? lang === "es"
                      ? "Enviando..."
                      : "Sending..."
                    : status === "sent"
                    ? lang === "es"
                      ? "Enviado ✓"
                      : "Sent ✓"
                    : lang === "es"
                    ? "Enviar"
                    : "Send"}
                </span>
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
                  className="lucide lucide-send h-2.5 w-2.5 text-emerald-500 group-hover:text-white transition-colors"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
