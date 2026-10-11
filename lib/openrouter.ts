/**
 * OpenRouter AI Client for Xavi Far's Portfolio
 *
 * Configured to represent Xavi Far in the first person ("que responde por mí"),
 * answering queries about his background, agentic architectures, projects, and stack.
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
 * Free-tier OpenRouter models rotated in order of quality & latency.
 */
export const DEFAULT_FREE_MODELS = [
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "deepseek/deepseek-r1:free",
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
];

export { SYSTEM_PROMPT, getSystemPrompt } from "@/prompts/systemPrompt";
import { getSystemPrompt } from "@/prompts/systemPrompt";

export class OpenRouterClient {
  private apiKey: string | undefined;
  private siteUrl: string;
  private siteTitle: string;
  private candidateModels: string[];

  constructor(options?: {
    apiKey?: string;
    siteUrl?: string;
    siteTitle?: string;
    candidateModels?: string[];
  }) {
    this.apiKey = options?.apiKey ?? process.env.OPENROUTER_API_KEY;
    this.siteUrl = options?.siteUrl ?? "https://xavifar.dev";
    this.siteTitle = options?.siteTitle ?? "Xavi Far Portfolio";

    const customModel = process.env.OPENROUTER_MODEL?.trim();
    const baseModels = options?.candidateModels ?? DEFAULT_FREE_MODELS;
    this.candidateModels = customModel
      ? [customModel, ...baseModels.filter((m) => m !== customModel)]
      : baseModels;
  }

  /**
   * Check whether a valid OpenRouter API key is configured.
   */
  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  /**
   * Perform a chat completion call with automatic model rotation across free models.
   */
  public async chat(params: {
    messages: Array<{ role: string; content: string }>;
    lang?: "es" | "en";
    options?: OpenRouterChatOptions;
  }): Promise<OpenRouterResponse | null> {
    const key = this.apiKey ?? process.env.OPENROUTER_API_KEY;
    if (!key) {
      return null;
    }

    const systemPrompt = getSystemPrompt();
    const timeoutMs = params.options?.timeoutMs ?? 14000;
    const maxTokens = params.options?.maxTokens ?? 650;
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

    // Models to attempt: specific requested model or fallbacks
    const modelsToTry = params.options?.model
      ? [params.options.model, ...this.candidateModels.filter((m) => m !== params.options?.model)]
      : this.candidateModels;

    for (const model of modelsToTry) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${key}`,
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
          signal: AbortSignal.timeout(timeoutMs),
        });

        if (!response.ok) {
          // Log and continue to next fallback model
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
      } catch {
        // Timeout or fetch error -> attempt next model
        continue;
      }
    }

    return null;
  }
}

// Default singleton instance
export const openRouterClient = new OpenRouterClient();
