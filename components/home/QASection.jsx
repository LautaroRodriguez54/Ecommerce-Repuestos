"use client";

import styles from "./home.module.css";
import stylesQ from "../ui/QA/qa.module.css";
import { useState } from "react";
import "../../app/home.css";
import { QAItems, Banks } from "../pageData.js";
import { ContentSection } from "../ui/ContentSection.jsx";
import { QAItem } from "../ui/QA/QAItem";

export const QASection = () => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className={`${styles.client} ${styles.QASection}`}>
      <ContentSection title={"PREGUNTAS FRECUENTES"}>
        <div className={stylesQ.QAItemContainer}>
          <div className={stylesQ.QAItemWrap}>
            {QAItems.map((item, i) => (
              <QAItem
                key={i}
                question={item.question}
                answer={item.answer}
                banks={i === QAItems.length - 1 ? Banks : []}
                isOpen={openItem === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </ContentSection>
    </section>
  );
};
