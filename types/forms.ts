export type ChatMessage = {
  id: string;
  type: "userMessage" | "botMessage";
  text: string;
  createdAt: number;
};