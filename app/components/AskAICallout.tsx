import Link from "next/link";
import Image from "next/image";

const promptSuggestions = [
  "What can Xavi build?",
  "Tell me about his AI Agents",
  "What is his tech stack?",
];

export default function AskAICallout() {
  return (
    <section className="relative py-8 sm:py-10">
      <div className="relative overflow-hidden rounded-xl border border-[#161616]/12 bg-white/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-[480px]">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-[#161616]/10">
                <Image
                  src="/portfolio.jpg"
                  alt="Xavi AI"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <span className="font-mono text-[11px] font-medium tracking-wide uppercase text-[#161616]/50">
                AI Interactive Agent
              </span>
            </div>

            <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-[#161616]">
              Want to know more?
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[#161616]/70">
              Ask my AI assistant about my projects, professional background, or technical stack in real time.
            </p>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {promptSuggestions.map((prompt) => (
                <Link
                  key={prompt}
                  href="/chat"
                  className="rounded-full border border-[#161616]/10 bg-[#161616]/5 px-3 py-1 text-[11.5px] font-medium text-[#161616]/75 transition-colors hover:border-[#161616]/30 hover:bg-[#161616]/10 hover:text-[#161616]"
                >
                  &ldquo;{prompt}&rdquo;
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Action */}
          <div className="flex shrink-0 sm:self-center">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#161616] px-4.5 py-2.5 text-[13px] font-medium text-[#f3f3f1] shadow-2xs transition-all hover:bg-[#161616]/90 active:scale-95 cursor-pointer"
            >
              <span>Ask Xavi&apos;s AI</span>
              <span className="text-[12px]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
