"use client";
import styles from "./chatbot.module.css";
import { Button } from "../ui/Button/Button";
import { motion, AnimatePresence } from "motion/react";
import Minus from "../icon/Minus";
import Bot from "../icon/Bot";
import Send from "../icon/Send";
import { FormField } from "../ui/form/FormField";
import { Message } from "./Message";
import { useChatBot } from "./chatbot.hooks";
import { useAuth } from "../auth/AuthContext";

export const ChatBot = () => {
  const { user, loading } = useAuth();
  const {
    isOpen,
    setIsOpen,
    inputMessage,
    setInputMessage,
    messages,
    chatContentRef,
    isReady,
    handleSendMessage,
    handleScroll,
  } = useChatBot(user?.id ?? null, loading);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatBot}
            initial={{ opacity: 0, scale: 0, transformOrigin: "bottom right" }}
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
              <div className={styles.chatNotice}>
                <p style={{ textAlign: "center" }}>
                  Consulta la compatibilidad de tu vehículo con nuestro
                  catálogo.
                  <br />
                  <strong>Tené en cuenta:</strong> esta conversación se guardará
                  durante <strong>24 horas</strong>.
                </p>
              </div>

              {!isReady ? (
                <p>Cargando conversación...</p>
              ) : (
                messages.map(({ id, type, text, products }) => (
                  <Message
                    key={id}
                    type={type}
                    text={text}
                    products={products}
                  />
                ))
              )}
            </div>

            <div className={styles.chatBotFooter}>
              <FormField
                placeHolder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  e.preventDefault();
                  handleSendMessage();
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
