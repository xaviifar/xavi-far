import { NextRequest, NextResponse } from "next/server";
import { openRouterClient } from "@/lib/openrouter";
import { generateBotResponse } from "@/app/components/aiBotKnowledge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, lang = "es" } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const openRouterResult = await openRouterClient.chat({
      messages,
      lang: lang === "es" ? "es" : "en",
    });

    if (openRouterResult && openRouterResult.text) {
      return NextResponse.json({
        text: openRouterResult.text,
        source: "openrouter",
        model: openRouterResult.model,
      });
    }

    // High-performance deterministic fallback if OpenRouter is unreachable or unconfigured
    const localResult = generateBotResponse(lastUserMessage, lang);
    return NextResponse.json({
      text: localResult.text,
      suggestions: localResult.suggestions,
      source: "local",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { text: "Lo siento, ha ocurrido un error al procesar tu consulta.", source: "error" },
      { status: 500 }
    );
  }
}
