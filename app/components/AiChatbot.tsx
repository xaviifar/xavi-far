"use client";

import React, { useState, useEffect, useRef, useTransition, useMemo } from "react";
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
  const [showTooltip, setShowTooltip] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [, startTransition] = useTransition();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derived greeting message matching current language
  const greetingMsg: ChatMessage = useMemo(
    () => ({
      id: "initial-greeting",
      sender: "bot",
      text: getGreeting(lang),
      timestamp: "",
      suggestions: lang === "es" ? INITIAL_SUGGESTIONS_ES : INITIAL_SUGGESTIONS_EN,
    }),
    [lang]
  );

  const messages = useMemo(
    () => [greetingMsg, ...conversationHistory],
    [greetingMsg, conversationHistory]
  );

  // Listen for navigation trigger event ("open-ai-chat")
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Hide tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Handle closing modal with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: getNextMsgId("user"),
      sender: "user",
      text: query,
      timestamp: "",
    };

    setConversationHistory((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Realistic Grok typing response delay (350ms - 550ms)
    setTimeout(() => {
      startTransition(() => {
        const botResult = generateBotResponse(query, lang);
        const botMsg: ChatMessage = {
          id: getNextMsgId("bot"),
          sender: "bot",
          text: botResult.text,
          timestamp: "",
          suggestions: botResult.suggestions,
        };
        setConversationHistory((prev) => [...prev, botMsg]);
        setIsTyping(false);
      });
    }, 450);
  };

  const handleReset = () => {
    setConversationHistory([]);
  };

  // Helper to render markdown-like text (bold, links, code, bullet points)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Format bullet lines
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

      // Parse markdown bold **text**, code `text`, and links [text](url)
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
                className="text-ink font-medium underline underline-offset-2 decoration-neutral-400 hover:decoration-ink transition-colors"
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
                className="rounded bg-neutral-100 dark:bg-neutral-800/80 px-1 py-0.5 font-mono text-[11.5px] text-ink border border-border"
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
          <div key={idx} className="flex items-start gap-2 my-0.5">
            <span className="text-ink-muted text-xs select-none mt-1">▪</span>
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
      {/* Floating launcher button in the bottom right corner */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
        {/* Subtle greeting tooltip on first visit when closed */}
        {!isOpen && showTooltip && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center gap-2 bg-card/95 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 px-3.5 py-1.5 rounded-full shadow-lg shadow-black/5 dark:shadow-black/25 text-xs font-mono text-ink">
            <span>✦ {lang === "es" ? "Pregúntame sobre Xavi" : "Ask me anything about Xavi"}</span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-ink-faint hover:text-ink transition-colors ml-1 cursor-pointer font-bold leading-none"
              aria-label="Dismiss tooltip"
            >
              ×
            </button>
          </div>
        )}

        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
              setTimeout(() => inputRef.current?.focus(), 150);
            }}
            aria-label="Open AI Assistant"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur-md border border-neutral-300 dark:border-neutral-700/80 hover:border-ink dark:hover:border-neutral-400 text-ink shadow-xl shadow-black/10 dark:shadow-black/40 transition-all duration-200 group cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
          >
            {/* Crisp ✦ Spark icon with subtle live indicator */}
            <div className="relative flex items-center justify-center w-5 h-5">
              <span className="text-[13px] text-ink group-hover:scale-110 transition-transform select-none">✦</span>
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
            </div>
            <span className="text-[13px] font-mono font-medium tracking-tight">
              {lang === "es" ? "Preguntar a la IA" : "Ask AI"}
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-ink-muted border border-border">
              grok
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal / Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Assistant"
          className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[420px] h-[550px] max-h-[82dvh] sm:max-h-[85vh] flex flex-col rounded-2xl bg-card border border-neutral-300 dark:border-neutral-700/90 shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-neutral-50/70 dark:bg-neutral-900/70 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-neutral-200/80 dark:bg-neutral-800 text-ink text-sm font-mono border border-border shadow-xs">
                ✦
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-ink">xavi.ai</span>
                  <span className="font-mono text-[9.5px] px-1 py-0.2 rounded bg-neutral-200/70 dark:bg-neutral-800 text-ink-muted">
                    grok-mode
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink-muted">
                  {lang === "es" ? "Alter-ego IA de Xavi Far" : "Xavi Far's AI Alter-Ego"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-ink-muted">
              {/* Reset chat button */}
              <button
                type="button"
                onClick={handleReset}
                title={lang === "es" ? "Reiniciar conversación" : "Reset conversation"}
                className="p-1.5 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-ink transition-colors cursor-pointer"
                aria-label="Reset chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
                className="p-1.5 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-800 hover:text-ink transition-colors cursor-pointer text-base leading-none"
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
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 text-[13px] leading-relaxed no-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 transition-colors ${
                      isUser
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs"
                        : "bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 text-ink"
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {/* Suggestion Chips attached to bot message */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSend(sug)}
                          disabled={isTyping}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-ink-muted hover:text-ink border border-border transition-colors cursor-pointer text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-900/90 border border-border w-fit text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-muted animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-muted animate-bounce [animation-delay:0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-muted animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form */}
          <div className="p-3 border-t border-border bg-neutral-50/50 dark:bg-neutral-900/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "es"
                    ? "Pregúntame lo que sea sobre Xavi..."
                    : "Ask me anything about Xavi..."
                }
                className="flex-1 bg-card border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-[13px] text-ink placeholder:text-ink-faint focus:outline-hidden focus:border-ink transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="shrink-0 p-2 rounded-xl bg-ink text-bg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center"
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
              <span>Grok-style AI Assistant</span>
              <span>Enter ↵ to send</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
