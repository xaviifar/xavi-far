"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import SectionHeader from "@/app/components/SectionHeader";
// import Footer from "@/app/components/Footer"; // Si lo necesitas, lo puedes añadir al final

interface Message {
  id: number;
  role: "ai" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hi, I'm Xavi's AI. Ask me anything about his experience, projects, or technical background.",
  },
];

const suggestions = [
  "What can Xavi build?",
  "Tell me about his AI Agents",
  "What is his tech stack?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const message = (text ?? inputValue).trim();

    if (!message || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "This is currently a UI demo. The AI will be connected to Xavi's knowledge base and RAG system here.",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <main className="relative min-h-screen bg-[#f3f3f1] text-[#161616]">
      <div className="mx-auto flex min-h-screen w-full max-w-[840px] flex-col px-5 sm:px-10 md:px-14">
        <Header />

        {/* Header Section */}
        <div className="pt-12 pb-6">
          <SectionHeader title="Ask my AI" />
        </div>

        {/* Chat Area */}
        <div className="flex-1 pb-32 pt-6"> {/* pb-32 da espacio para que el input no tape el último mensaje */}
          <div className="mx-auto flex w-full max-w-[680px] flex-col">
            
            {/* Messages */}
            <div className="flex flex-col gap-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "ai" ? (
                    <div className="flex max-w-[90%] items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="relative mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
                        <Image
                          src="/portfolio.jpg"
                          alt="Xavi AI"
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <p className="text-[15px] leading-relaxed text-[#161616]/85">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#161616] px-5 py-3 text-[15px] leading-relaxed text-[#f3f3f1] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {message.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-4 animate-in fade-in duration-300">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
                    <Image
                      src="/portfolio.jpg"
                      alt="Xavi AI"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="flex gap-1.5 rounded-2xl bg-black/5 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#161616]/40" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#161616]/40 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#161616]/40 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="mb-4 pl-1 font-mono text-[10px] uppercase tracking-widest text-[#161616]/40">
                  Suggested queries
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSend(suggestion)}
                      className="rounded-full border border-black/10 bg-white/50 px-4 py-2 text-[12px] font-medium text-[#161616]/70 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:text-[#161616] hover:shadow-sm active:translate-y-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Input */}
        <div className="sticky bottom-6 mx-auto w-full max-w-[680px] px-2 sm:px-0 z-10">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center rounded-full border border-black/5 bg-white/80 p-1.5 shadow-sm backdrop-blur-xl transition-shadow focus-within:shadow-md"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Xavi..."
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-[15px] outline-none placeholder:text-[#161616]/40"
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                inputValue.trim() && !isTyping
                  ? "bg-[#161616] text-white shadow-md hover:bg-black"
                  : "bg-transparent text-[#161616]/20"
              }`}
            >
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
                className={inputValue.trim() && !isTyping ? "translate-x-0.5" : ""}
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          <p className="mt-3 text-center font-mono text-[10px] text-[#161616]/30">
            AI responses may not be perfectly accurate.
          </p>
        </div>

      </div>
    </main>
  );
}