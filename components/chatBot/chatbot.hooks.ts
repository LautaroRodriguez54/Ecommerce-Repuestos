"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage, StoredChat } from "@/types/chatbot";
import { sendChatMessage } from "@/lib/chatbot";

const CHAT_DURATION = 24 * 60 * 60 * 1000;

const getWelcomeMessage = (): ChatMessage => ({
  id: "welcome",
  type: "bot",
  text: "¡Hola! ¿En qué puedo ayudarte?",
  createdAt: Date.now(),
});

export const useChatBot = (userId: string | null, authLoading: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    getWelcomeMessage(),
  ]);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const expiresAtRef = useRef<number | null>(null);
  const currentUserIdRef = useRef(userId);

  currentUserIdRef.current = userId;

  const storageKey = userId ? `chatbot-history-${userId}` : null;

  // Cargar conversación
  useEffect(() => {
    if (authLoading) return;

    setIsReady(false);
    setLoadedUserId(null);
    setMessages([getWelcomeMessage()]);
    setExpiresAt(null);
    expiresAtRef.current = null;
    setAutoScroll(true);

    if (!userId) {
      setIsReady(true);
      return;
    }

    const key = `chatbot-history-${userId}`;

    try {
      const stored = localStorage.getItem(key);

      if (stored) {
        const chat: StoredChat = JSON.parse(stored);

        if (
          Array.isArray(chat.messages) &&
          typeof chat.expiresAt === "number" &&
          chat.expiresAt > Date.now()
        ) {
          setMessages(chat.messages);
          setExpiresAt(chat.expiresAt);
          expiresAtRef.current = chat.expiresAt;
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {
      localStorage.removeItem(key);
    }

    setLoadedUserId(userId);
    setIsReady(true);
  }, [userId, authLoading]);

  // Guardar conversación
  useEffect(() => {
    if (!isReady || !userId || loadedUserId !== userId) return;

    if (expiresAt === null) {
      localStorage.removeItem(`chatbot-history-${userId}`);
      return;
    }

    localStorage.setItem(
      `chatbot-history-${userId}`,
      JSON.stringify({ messages, expiresAt }),
    );
  }, [messages, expiresAt, isReady, userId, loadedUserId]);

  // Limpiar conversación
  const clearChat = useCallback(() => {
    setMessages([getWelcomeMessage()]);
    setExpiresAt(null);
    expiresAtRef.current = null;

    if (storageKey) localStorage.removeItem(storageKey);
  }, [storageKey]);

  // Controlar expiración
  useEffect(() => {
    if (expiresAt === null || loadedUserId !== userId) return;
    const remainingTime = expiresAt - Date.now();
    if (remainingTime <= 0) {
      clearChat();
      return;
    }

    const timer = setTimeout(clearChat, remainingTime);
    return () => clearTimeout(timer);
  }, [expiresAt, clearChat, loadedUserId, userId]);

  // Agregar mensaje
  const addMessage = (message: ChatMessage) => {
    if (expiresAtRef.current === null) {
      const expiration = Date.now() + CHAT_DURATION;
      expiresAtRef.current = expiration;
      setExpiresAt(expiration);
    }
    setMessages((prev) => [...prev, message]);
  };

  // Enviar mensaje
  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || !isReady) return;
    const requestUserId = userId;
    const history = messages.filter((item) => item.id !== "welcome");
    setInputMessage("");
    addMessage({
      id: crypto.randomUUID(),
      type: "user",
      text: message,
      createdAt: Date.now(),
    });

    try {
      const data = await sendChatMessage(message, history);
      if (currentUserIdRef.current !== requestUserId) return;
      addMessage({
        id: crypto.randomUUID(),
        type: "bot",
        text: data.reply,
        products: data.products ?? [],
        createdAt: Date.now(),
      });
    } catch (error) {
      if (currentUserIdRef.current !== requestUserId) return;
      console.error("Error al comunicarse con el chatbot:", error);
      addMessage({
        id: crypto.randomUUID(),
        type: "bot",
        text: "Lo siento, ocurrió un error al procesar tu consulta. Intentá nuevamente.",
        createdAt: Date.now(),
      });
    }
  };

  // Detectar posición del scroll
  const handleScroll = () => {
    const container = chatContentRef.current;
    if (!container) return;
    setAutoScroll(
      container.scrollHeight - container.scrollTop - container.clientHeight <
        40,
    );
  };

  // Scroll automático
  useEffect(() => {
    if (!isOpen || !autoScroll || !isReady) return;
    const frame = requestAnimationFrame(() => {
      const container = chatContentRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, autoScroll, isOpen, isReady]);

  return {
    isOpen,
    setIsOpen,
    inputMessage,
    setInputMessage,
    messages,
    chatContentRef,
    isReady,
    handleSendMessage,
    handleScroll,
  };
};
