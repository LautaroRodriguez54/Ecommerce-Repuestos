export interface VehicleRequest {
  brand: string | null;
  model: string | null;
  year: number | null;
  part: string | null;
  partKeywords: string[];
  position: string | null;
  positions: string[];
  engineDisplacement: string | null;
  driveType: string | null;
  version: string | null;
}

export interface CompatibleVehicle {
  brand: string;
  model: string;
  yearFrom: number;
  yearTo: number | null;
  engineDisplacement?: string;
  notes?: string;
}

export interface AutomotiveKnowledge {
  sku: string;
  manufacturer: string;
  partNumber: string;
  category: string;
  name: string;
  position?: string;
  technicalDetails?: Record<string, unknown>;
  compatibleVehicles: CompatibleVehicle[];
}

export interface ChatbotProduct {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: string | number;
  stock: number;
  image: string;
  isActive: boolean;
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  text: string;
  createdAt: number;
  products?: ChatbotProduct[];
}

export interface MessageProps {
  type: "user" | "bot";
  text: string;
  products?: ChatbotProduct[];
}
export type StoredChat = {
  messages: ChatMessage[];
  expiresAt: number;
};

export type ChatbotResponse = {
  reply: string;
  products?: ChatbotProduct[];
};
export type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type VariantOption = {
  label: string;
  type: "driveType" | "engineDisplacement" | "version";
  value: string;
};