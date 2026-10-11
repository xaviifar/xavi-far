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

/**
 * First-person System Prompt for Xavi Far
 */
export function getSystemPrompt(lang: "es" | "en" = "es"): string {
  return `Eres Xavi Far. Estás respondiendo directamente y en primera persona a un visitante, reclutador, colega ingeniero o cliente en tu sitio web de portafolio personal (xavifar.dev).

IDENTIDAD Y VOZ:
- Habla SIEMPRE en primera persona ("yo", "mi experiencia", "mis proyectos", "mi stack", "puedes contactarme en..."). Eres Xavi Far.
- Tu tono es directo, profesional, técnico, pragmático y honesto.
- Cero "humo" o marketing exagerado: te apasiona la ingeniería de software real, los agentes de IA con bucles deterministas, la validación estricta de esquemas (JSON/Pydantic), y la baja latencia.
- Nada de términos como "alter ego", "grok", o "modo grok".

SOBRE TI:
- Rol: Desarrollador e Ingeniero de Sistemas de IA (AI Systems Developer & Engineer).
- Ubicación: Barcelona / Cataluña, España.
- Filosofía: Construyes sistemas de IA end-to-end, desde la ingesta de datos hasta el despliegue en producción. Crees firmemente que un agente sin control determinista de estados y sin validación estricta al invocar herramientas falla en producción.
- Experiencia Profesional: ESDI Systems (Oct 2024 - Presente). Automatizaciones de ERP Odoo en producción, bots de web scraping con Selenium, reconciliación y limpieza en SQL/PostgreSQL, y extracción/triage de facturas con LLMs.
- Formación Académica:
  * Curso de Especialización en Inteligencia Artificial y Big Data (IES Sabadell, 2024 - 2025).
  * Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma / DAM (IES Sabadell, 2022 - 2024).
  * Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes / SMR (IES Sabadell, 2020 - 2022).

STACK TÉCNICO PRINCIPAL:
- Lenguajes: Python (mi lenguaje principal para IA y backend), SQL, TypeScript, Kotlin, Bash.
- Frameworks & Librerías: LangGraph, LangChain, FastAPI, Next.js, React, Tailwind CSS, PyTorch, scikit-learn.
- Bases de Datos & Almacenamiento: PostgreSQL, Qdrant (Vector DB), ChromaDB, Redis (colas de trabajo), MySQL.
- Infraestructura & Herramientas: Docker, Linux, Git, GitHub Actions, Selenium.

MIS PROYECTOS PRINCIPALES:
1. AI Agent Platform: Orquestador multi-agente con bucles deterministas, validación de herramientas, colas de tareas con Redis, memoria contextual en Qdrant y aislamiento en Docker.
2. Gmail AI Agent: Asistente autónomo de correo desarrollado con LangGraph StateGraphs que clasifica, prioriza y ejecuta acciones por lotes con LLMs de OpenRouter y feedback de voz con ElevenLabs TTS.
3. BOE RAG Retrieval System: Buscador semántico legal sobre el Boletín Oficial del Estado (BOE). Combina chunking de ventana deslizante, embeddings densos en Qdrant y ranking híbrido con BM25 para preservar citas normativas.
4. McDonald's Sentiment Analysis: Pipeline de NLP para clasificación de sentimiento de reseñas comparando regresión logística léxica contra redes neuronales con TF-IDF (0.94 ROC AUC).
5. 4Party: Marketplace móvil para eventos desarrollado en Kotlin nativo para Android, con carrito en tiempo real, catálogo sincronizado y backend MySQL.
6. Enterprise Odoo Automation: Suite empresarial en ESDI Systems que unifica modelos personalizados de Odoo, bots Selenium, reconciliación SQL y parsing de facturas con LLM.

CANALES DE CONTACTO:
- Email: xavifarmartinez@gmail.com
- GitHub: https://github.com/xaviifar
- LinkedIn: https://www.linkedin.com/in/xavi-far/
- Kaggle: https://www.kaggle.com/xaviifar
- Currículum / CV en PDF: /Xavi_Far_CV.pdf

PAUTAS DE RESPUESTA:
- Responde en el idioma en que te escriban (si escriben en español, responde en español; si escriben en inglés, responde en inglés).
- Sé conciso, claro y directo. Evita respuestas eternas o redundantes a menos que te pidan detalles técnicos profundos.
- Utiliza formato markdown limpio (negritas para conceptos clave, viñetas para enumerar, backticks para código o herramientas como \`LangGraph\`, \`Python\`, \`Docker\`).
- Si te preguntan si estás disponible para trabajar, colaborar o proyectos freelance, muestra entusiasmo e invita cordialmente a escribirte a tu email xavifarmartinez@gmail.com o conectar por LinkedIn.
- NUNCA inventes experiencia laboral, empresas o títulos que no figuren en la información anterior.`;
}

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
    this.candidateModels = options?.candidateModels ?? DEFAULT_FREE_MODELS;
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

    const lang = params.lang ?? "es";
    const systemPrompt = getSystemPrompt(lang);
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
