"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";
import { Button } from "../ui/Button/Button";
import { motion, AnimatePresence } from "motion/react";
import Minus from "../icon/Minus";
import Bot from "../icon/Bot";
import Send from "../icon/Send";
import { FormField } from "../ui/form/FormField";
import { Message } from "./Message";
import type { ChatMessage } from "@/types/forms.ts";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "botMessage",
      text: "¡Hola! ¿En qué puedo ayudarte?",
      createdAt: Date.now(),
    },
  ]);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "userMessage",
      text: inputMessage.trim(),
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleScroll = () => {
    const container = chatContentRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      40;
    setAutoScroll(isAtBottom);
  };

  useEffect(() => {
    if (autoScroll && chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, autoScroll]);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatBot}
            initial={{
              opacity: 0,
              scale: 0,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className={styles.chatBotHeader}>
              <p>Chat Bot</p>
              <button
                className={styles.chatBotCloseButton}
                onClick={() => setIsOpen(false)}
              >
                <Minus />
              </button>
            </div>

            <div
              className={styles.chatBotContent}
              ref={chatContentRef}
              onScroll={handleScroll}
            >
              {messages.map((message) => (
                <Message
                  key={message.id}
                  type={message.type}
                  text={message.text}
                />
              ))}
            </div>

            <div className={styles.chatBotFooter}>
              <FormField
                placeHolder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              <Button
                buttonText={<Send />}
                rounded
                isButton
                onClick={handleSendMessage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.chatBotContainer}>
        {!isOpen && (
          <Button
            buttonText={<Bot />}
            variant="primary"
            rounded
            isButton
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </>
  );
};
