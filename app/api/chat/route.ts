import { NextRequest, NextResponse } from "next/server";
import { openRouterClient } from "@/lib/openrouter";
import { generateBotResponse } from "@/app/components/aiBotKnowledge";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const PER_MINUTE_LIMIT = Number(process.env.CHAT_RATE_LIMIT_PER_MIN) || 8;
const PER_HOUR_LIMIT = Number(process.env.CHAT_RATE_LIMIT_PER_HOUR) || 30;
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY_MESSAGES = 12;

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);

  // 1. Short-window burst rate limit (default: 8 messages / minute)
  const minuteCheck = checkRateLimit({
    namespace: "chat-minute",
    key: clientIp,
    limit: PER_MINUTE_LIMIT,
    windowMs: 60 * 1000,
  });

  if (!minuteCheck.allowed) {
    return NextResponse.json(
      {
        error: "rate_limit_exceeded",
        retryAfter: minuteCheck.retryAfterSeconds,
        text: `Has enviado demasiados mensajes seguidos. Por favor, espera ${minuteCheck.retryAfterSeconds}s antes de volver a preguntar.`,
        textEn: `You've sent too many messages in a row. Please wait ${minuteCheck.retryAfterSeconds}s before asking again.`,
        source: "rate_limit",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(minuteCheck.retryAfterSeconds),
          "X-RateLimit-Limit": String(minuteCheck.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(minuteCheck.resetAt / 1000)),
        },
      }
    );
  }

  // 2. Hourly quota rate limit (default: 30 messages / hour)
  const hourCheck = checkRateLimit({
    namespace: "chat-hour",
    key: clientIp,
    limit: PER_HOUR_LIMIT,
    windowMs: 60 * 60 * 1000,
  });

  if (!hourCheck.allowed) {
    return NextResponse.json(
      {
        error: "rate_limit_exceeded",
        retryAfter: hourCheck.retryAfterSeconds,
        text: "Has alcanzado el límite de consultas por hora. Si deseas hablar directamente con Xavi, puedes escribirle desde la sección de contacto.",
        textEn: "You have reached the hourly query limit. If you'd like to speak directly with Xavi, feel free to reach out via the contact section.",
        source: "rate_limit",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(hourCheck.retryAfterSeconds),
          "X-RateLimit-Limit": String(hourCheck.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(hourCheck.resetAt / 1000)),
        },
      }
    );
  }

  const rateHeaders = {
    "X-RateLimit-Limit": String(minuteCheck.limit),
    "X-RateLimit-Remaining": String(minuteCheck.remaining),
    "X-RateLimit-Reset": String(Math.ceil(minuteCheck.resetAt / 1000)),
  };

  try {
    const body = await req.json();
    const { messages, lang = "es" } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400, headers: rateHeaders }
      );
    }

    // Sanitize and cap message length + conversation history to prevent token abuse
    const sanitizedMessages = messages
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m: { role?: string; content?: unknown }) => ({
        role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: String(m.content || "").slice(0, MAX_MESSAGE_CHARS).trim(),
      }))
      .filter((m) => m.content.length > 0);

    const lastUserMessage =
      sanitizedMessages[sanitizedMessages.length - 1]?.content || "";

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "Empty message" },
        { status: 400, headers: rateHeaders }
      );
    }

    const openRouterResult = await openRouterClient.chat({
      messages: sanitizedMessages,
      lang: lang === "es" ? "es" : "en",
    });

    if (openRouterResult && openRouterResult.text) {
      return NextResponse.json(
        {
          text: openRouterResult.text,
          source: "openrouter",
          model: openRouterResult.model,
          remaining: minuteCheck.remaining,
        },
        { headers: rateHeaders }
      );
    }

    // High-performance deterministic fallback if OpenRouter is unreachable or unconfigured
    const localResult = generateBotResponse(
      lastUserMessage,
      lang === "es" ? "es" : "en"
    );
    return NextResponse.json(
      {
        text: localResult.text,
        suggestions: localResult.suggestions,
        source: "local",
        remaining: minuteCheck.remaining,
      },
      { headers: rateHeaders }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        text: "Lo siento, ha ocurrido un error al procesar tu consulta.",
        source: "error",
      },
      { status: 500, headers: rateHeaders }
    );
  }
}
