"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import {
  ChatMessage,
  getGreeting,
  generateBotResponse,
  INITIAL_SUGGESTIONS_EN,
  INITIAL_SUGGESTIONS_ES,
} from "./aiBotKnowledge";

let msgIdCounter = 0;
function getNextMsgId(prefix: string): string {
  msgIdCounter += 1;
  return `${prefix}-${msgIdCounter}`;
}

export default function AiChatbot() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Countdown timer when rate-limited
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Initial greeting derived from current language (first person persona)
  const greetingMsg: ChatMessage = useMemo(
    () => ({
      id: "initial-greeting",
      sender: "bot",
      text: getGreeting(lang),
      timestamp: "",
      suggestions: lang === "es" ? INITIAL_SUGGESTIONS_ES : INITIAL_SUGGESTIONS_EN,
      source: "local",
    }),
    [lang]
  );

  const messages = useMemo(
    () => [greetingMsg, ...conversationHistory],
    [greetingMsg, conversationHistory]
  );

  // Global listener for "open-ai-chat" custom event and Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            setTimeout(() => inputRef.current?.focus(), 150);
          }
          return next;
        });
      }

      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-ai-chat", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-ai-chat", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto-scroll when messages update or typing indicator triggers
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim().slice(0, 500);
    if (!query || isTyping || cooldownSeconds > 0) return;

    const userMsg: ChatMessage = {
      id: getNextMsgId("user"),
      sender: "user",
      text: query,
      timestamp: "",
    };

    const nextHistory = [...conversationHistory, userMsg];
    setConversationHistory(nextHistory);
    setInput("");
    setIsTyping(true);

    try {
      // Conversation payload for OpenRouter API endpoint
      const apiPayload = [
        { role: "assistant", content: greetingMsg.text },
        ...nextHistory.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload, lang }),
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        const retrySec = Number(data.retryAfter) || 15;
        setCooldownSeconds(retrySec);
        const rateLimitMsg: ChatMessage = {
          id: getNextMsgId("bot"),
          sender: "bot",
          text:
            lang === "es"
              ? data.text ||
                `Has enviado demasiados mensajes seguidos. Espera ${retrySec}s antes de volver a preguntar.`
              : data.textEn ||
                `You've sent too many messages in a row. Please wait ${retrySec}s before asking again.`,
          timestamp: "",
          source: "local",
        };
        setConversationHistory((prev) => [...prev, rateLimitMsg]);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: getNextMsgId("bot"),
          sender: "bot",
          text: data.text || "",
          timestamp: "",
          suggestions: data.suggestions,
          source: data.source,
        };
        setConversationHistory((prev) => [...prev, botMsg]);
      } else {
        throw new Error("API non-200 status");
      }
    } catch {
      // Deterministic offline fallback engine
      const localResult = generateBotResponse(query, lang);
      const botMsg: ChatMessage = {
        id: getNextMsgId("bot"),
        sender: "bot",
        text: localResult.text,
        timestamp: "",
        suggestions: localResult.suggestions,
        source: "local",
      };
      setConversationHistory((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setConversationHistory([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Helper for markdown-like text rendering (bold, inline code, links, bullet points)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

      const parseSegments = (str: string) => {
        const parts: React.ReactNode[] = [];
        let cur = str;
        let key = 0;

        while (cur.length > 0) {
          // Links: [label](url)
          const linkMatch = cur.match(/^\[([^\]]+)\]\(([^)]+)\)/);
          if (linkMatch) {
            const [, label, url] = linkMatch;
            const isDownload = url.endsWith(".pdf");
            parts.push(
              <a
                key={key++}
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                download={isDownload ? "Xavi_Far_CV.pdf" : undefined}
                className="text-ink font-semibold underline underline-offset-2 decoration-neutral-400 hover:decoration-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {label}
              </a>
            );
            cur = cur.slice(linkMatch[0].length);
            continue;
          }

          // Bold: **text**
          const boldMatch = cur.match(/^\*\*([^*]+)\*\*/);
          if (boldMatch) {
            parts.push(
              <strong key={key++} className="font-semibold text-ink">
                {boldMatch[1]}
              </strong>
            );
            cur = cur.slice(boldMatch[0].length);
            continue;
          }

          // Inline Code: `text`
          const codeMatch = cur.match(/^`([^`]+)`/);
          if (codeMatch) {
            parts.push(
              <code
                key={key++}
                className="rounded bg-neutral-200/70 dark:bg-neutral-800/90 px-1.5 py-0.5 font-mono text-[12px] sm:text-[11.5px] text-ink border border-neutral-300/60 dark:border-neutral-700/60"
              >
                {codeMatch[1]}
              </code>
            );
            cur = cur.slice(codeMatch[0].length);
            continue;
          }

          // Plain text until next token
          const nextSpecial = cur.search(/(\[|\*\*|`)/);
          if (nextSpecial === -1) {
            parts.push(cur);
            break;
          } else if (nextSpecial > 0) {
            parts.push(cur.slice(0, nextSpecial));
            cur = cur.slice(nextSpecial);
          } else {
            parts.push(cur[0]);
            cur = cur.slice(1);
          }
        }

        return parts;
      };

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1">
            <span className="text-emerald-500 dark:text-emerald-400 text-xs select-none mt-0.5 font-bold">›</span>
            <div className="flex-1">{parseSegments(cleanLine)}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {parseSegments(line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating launcher trigger - prominent and optimized for mobile & desktop */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => inputRef.current?.focus(), 150);
            }}
            aria-label="Open AI Assistant"
            className="group relative flex items-center gap-2.5 px-4 py-2.5 sm:px-4.5 sm:py-2.5 min-h-[44px] rounded-full bg-surface/98 dark:bg-neutral-900/98 backdrop-blur-xl border border-neutral-300 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-neutral-500 text-ink shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
          >
            {/* Avatar thumbnail */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 overflow-hidden flex items-center justify-center p-0.5 shadow-2xs">
                <Image
                  src="/avatar.svg"
                  alt="Xavi Far"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Button label */}
            <span className="text-[13px] sm:text-[13.5px] font-medium tracking-tight whitespace-nowrap">
              {lang === "es" ? "Preguntar a la IA" : "Ask Portfolio AI"}
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal / Popover - optimized for mobile bottom-sheet & desktop popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Assistant"
          className="fixed inset-x-2 bottom-2 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[430px] h-[84dvh] sm:h-[580px] max-h-[92dvh] sm:max-h-[85vh] flex flex-col rounded-2xl bg-surface/98 dark:bg-neutral-900/98 border border-neutral-200/90 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Mobile Sheet Handle */}
          <div className="sm:hidden flex justify-center pt-2 pb-0.5 bg-neutral-50/70 dark:bg-neutral-900/70 select-none">
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:py-3.5 border-b border-border bg-neutral-50/70 dark:bg-neutral-900/70 select-none">
            <div className="flex items-center gap-2.5">
              {/* Vector avatar with AI online status node */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="h-8.5 w-8.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-xs overflow-hidden flex items-center justify-center p-0.5">
                  <Image
                    src="/avatar.svg"
                    alt="Xavi Far"
                    width={34}
                    height={34}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-50 dark:ring-neutral-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[13.5px] font-semibold text-ink leading-tight flex items-center gap-1.5">
                  <span>Xavi AI Assistant</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-medium border border-emerald-500/20">
                    online
                  </span>
                </span>
                <span className="font-mono text-[10.5px] text-ink-muted mt-0.5">
                  {lang === "es" ? "arquitectura · proyectos · stack" : "systems · projects · stack"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-ink-muted">
              {/* Reset button */}
              <button
                type="button"
                onClick={handleReset}
                title={lang === "es" ? "Reiniciar conversación" : "Reset conversation"}
                className="p-2 sm:p-1.5 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-ink transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                aria-label="Reset chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-ink transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center active:scale-95"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 text-[14px] sm:text-[13px] leading-relaxed no-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[88%] rounded-2xl px-3.5 py-2.5 transition-colors ${
                      isUser
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-tr-xs shadow-xs"
                        : "bg-neutral-100/90 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-700/60 text-ink rounded-tl-xs"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[96%]">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSend(sug)}
                          disabled={isTyping || cooldownSeconds > 0}
                          className="font-mono text-[12px] sm:text-[11px] px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full bg-surface hover:bg-neutral-100 dark:hover:bg-neutral-800 text-ink-muted hover:text-ink hover:border-neutral-400 dark:hover:border-neutral-600 border border-border transition-all cursor-pointer text-left flex items-center gap-1 active:scale-95 disabled:opacity-45 disabled:pointer-events-none"
                        >
                          <span className="text-emerald-500">✦</span>
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl rounded-tl-xs bg-neutral-100/90 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-700/60 w-fit text-ink-muted text-xs">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.3s]" />
                </div>
                <span className="text-[11px] font-mono ml-1 text-ink-muted">
                  {lang === "es" ? "pensando..." : "thinking..."}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Area */}
          <div className="p-3 sm:p-3.5 border-t border-border bg-neutral-50/70 dark:bg-neutral-900/70">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* text-[16px] on mobile avoids unwanted iOS Safari viewport auto-zoom */}
              <input
                ref={inputRef}
                type="text"
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  cooldownSeconds > 0
                    ? lang === "es"
                      ? `Límite alcanzado · espera ${cooldownSeconds}s...`
                      : `Rate limit reached · wait ${cooldownSeconds}s...`
                    : lang === "es"
                    ? "Pregunta sobre Xavi, sus proyectos o stack..."
                    : "Ask about Xavi, his projects, or stack..."
                }
                className="flex-1 bg-surface border border-border rounded-xl px-3.5 py-2.5 sm:py-2 text-[16px] sm:text-[13px] text-ink placeholder:text-ink-faint focus:outline-hidden focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors font-sans disabled:opacity-50"
                disabled={isTyping || cooldownSeconds > 0}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping || cooldownSeconds > 0}
                aria-label="Send message"
                className="shrink-0 p-2.5 sm:p-2 rounded-xl bg-ink text-bg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all cursor-pointer flex items-center justify-center active:scale-95 shadow-xs min-h-[40px] min-w-[40px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 font-mono text-[10px] text-ink-faint">
              <span className="flex items-center gap-1">
                <span
                  className={`h-1 w-1 rounded-full ${
                    cooldownSeconds > 0 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                />
                <span>
                  {cooldownSeconds > 0
                    ? lang === "es"
                      ? `Rate limit activo (${cooldownSeconds}s)`
                      : `Rate limit active (${cooldownSeconds}s)`
                    : "OpenRouter AI · Multi-model"}
                </span>
              </span>
              <span className="hidden sm:inline">Enter ↵</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
