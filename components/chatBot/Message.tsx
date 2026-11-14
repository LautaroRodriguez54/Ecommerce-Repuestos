import styles from "./chatbot.module.css";
import ProductCard from "../products/ProductCard";
import type { MessageProps } from "@/types/chatbot";

export const Message = ({ type, text, products = [] }: MessageProps) => (
  <div className={type === "user" ? styles.userMessage : styles.botMessage}>
    <p>{text}</p>
    
    {type === "bot" && products.length > 0 && (
      <div className={styles.productsContainer}>
        {products.map(({ id, name, image, price }) => (
          <ProductCard key={id} id={id} name={name} image={image} price={price} />
        ))}
      </div>
    )}
  </div>
);