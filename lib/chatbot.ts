import type {
  ChatMessage,
  ChatHistoryMessage,
  ChatbotResponse,
} from "@/types/chatbot";

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[],
): Promise<ChatbotResponse> => {
  const formattedHistory: ChatHistoryMessage[] = history.map(
    ({ type, text }) => ({
      role: type === "bot" ? "assistant" : "user",
      content: text,
    }),
  );

  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history: formattedHistory }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al enviar el mensaje.");
  }

  return {
    reply: data.reply,
    products: data.products ?? [],
  };
};