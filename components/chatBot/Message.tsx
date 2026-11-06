import styles from "./chatbot.module.css";
export const Message = ({ type, text }: { type: "userMessage" | "botMessage"; text: string }) => {
    return (
        <div className={type === "userMessage" ? styles.userMessage : styles.botMessage}>
            <p>{text}</p>
        </div>
    );
}