import { NextResponse } from "next/server";
import { sendMessageToGemini } from "@/services/chatBot/chatbot.service";
import type { ChatHistoryMessage } from "@/types/chatbot";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio." },
        { status: 400 },
      );
    }

    const validHistory: ChatHistoryMessage[] = Array.isArray(history)
      ? history
          .filter(
            (item): item is ChatHistoryMessage =>
              item !== null &&
              typeof item === "object" &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string",
          )
          .slice(-12)
      : [];

    const result = await sendMessageToGemini(message.trim(), validHistory);

    return NextResponse.json({
      reply: result.reply,
      products: result.products,
    });
  } catch (error) {
    console.error(
      "Error en el endpoint del chatbot:",
      error instanceof Error ? error.message : error,
    );

    return NextResponse.json(
      { error: "No se pudo procesar el mensaje." },
      { status: 500 },
    );
  }
}
