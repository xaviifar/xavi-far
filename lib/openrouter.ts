/**
 * OpenRouter AI Client for Xavi Far's Portfolio
 *
 * Configured to act as Xavi Far's professional assistant, answering queries
 * about his background, agentic architectures, projects, and stack.
 */

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface OpenRouterResponse {
  text: string;
  model: string;
  source: "openrouter";
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

/**
 * Verified active models on OpenRouter rotated in order of speed & quality.
 * "openai/gpt-6-luna" is first so it works out-of-the-box on Vercel even if
 * OPENROUTER_MODEL is not defined in Vercel's environment variables.
 */
export const DEFAULT_FREE_MODELS = [
  "openai/gpt-6-luna",
  "nvidia/nemotron-3.5-lightning:free",
  "liquid/lfm-2.5-2.6b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
];

export { SYSTEM_PROMPT, getSystemPrompt } from "@/prompts/systemPrompt";
import { getSystemPrompt } from "@/prompts/systemPrompt";

function cleanEnvValue(val: string | undefined): string | undefined {
  if (!val) return undefined;
  return val.trim().replace(/^["']|["']$/g, "").trim() || undefined;
}

export class OpenRouterClient {
  private siteUrl: string;
  private siteTitle: string;

  constructor(options?: {
    siteUrl?: string;
    siteTitle?: string;
  }) {
    this.siteUrl = options?.siteUrl ?? "https://xavifar.vercel.app";
    this.siteTitle = options?.siteTitle ?? "Xavi Far Portfolio";
  }

  private resolveApiKey(): string | undefined {
    return (
      cleanEnvValue(process.env.OPENROUTER_API_KEY) ??
      cleanEnvValue(process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) ??
      cleanEnvValue(process.env.OPENROUTER_KEY)
    );
  }

  private resolveCandidateModels(explicitModel?: string): string[] {
    const envModel =
      cleanEnvValue(process.env.OPENROUTER_MODEL) ??
      cleanEnvValue(process.env.NEXT_PUBLIC_OPENROUTER_MODEL);

    const ordered = [
      explicitModel,
      envModel,
      ...DEFAULT_FREE_MODELS,
    ].filter((m): m is string => Boolean(m && m.length > 0));

    return Array.from(new Set(ordered));
  }

  /**
   * Check whether a valid OpenRouter API key is configured at runtime.
   */
  public isConfigured(): boolean {
    return Boolean(this.resolveApiKey());
  }

  /**
   * Perform a chat completion call with automatic model rotation across active models.
   */
  public async chat(params: {
    messages: Array<{ role: string; content: string }>;
    lang?: "es" | "en";
    options?: OpenRouterChatOptions;
  }): Promise<OpenRouterResponse | null> {
    const key = this.resolveApiKey();
    if (!key) {
      console.warn("[OpenRouter] Missing OPENROUTER_API_KEY environment variable.");
      return null;
    }

    const systemPrompt = getSystemPrompt();
    const timeoutMs = params.options?.timeoutMs ?? 15000;
    const maxTokens = params.options?.maxTokens ?? 700;
    const temperature = params.options?.temperature ?? 0.4;

    // Filter and sanitize conversation messages
    const formattedMessages: OpenRouterMessage[] = [
      { role: "system", content: systemPrompt },
      ...params.messages
        .filter((m) => m && typeof m.content === "string" && m.content.trim())
        .map((m) => ({
          role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
          content: m.content.trim(),
        })),
    ];

    const modelsToTry = this.resolveCandidateModels(params.options?.model);

    for (const model of modelsToTry) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "HTTP-Referer": this.siteUrl,
            "X-Title": this.siteTitle,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: formattedMessages,
            temperature,
            max_tokens: maxTokens,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(timeoutMs),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => "");
          console.warn(
            `[OpenRouter] Model ${model} returned HTTP ${response.status}: ${errText.slice(0, 200)}`
          );
          continue;
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content?.trim();

        if (content) {
          return {
            text: content,
            model,
            source: "openrouter",
            usage: {
              promptTokens: data.usage?.prompt_tokens,
              completionTokens: data.usage?.completion_tokens,
              totalTokens: data.usage?.total_tokens,
            },
          };
        }
      } catch (err) {
        console.warn(`[OpenRouter] Model ${model} request error:`, err);
        continue;
      }
    }

    return null;
  }
}

// Default singleton instance
export const openRouterClient = new OpenRouterClient();
