"use client";

import styles from "./qa.module.css";
import { motion, AnimatePresence } from "motion/react";
import Plus from "../../icon/Plus";
import Minus from "../../icon/Minus";
export const QAItem = ({ question, answer, banks = [], isOpen, onToggle }) => {
  return (
    <>
      <div
        className={`${styles.question} ${isOpen ? styles.isActive : ""}`}
        onClick={onToggle}
      >
        <p>{question}</p>
         <button className={styles.icon}>
             {isOpen ? <Minus /> : <Plus />}
          </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.answer} ${styles.isActive}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>

            {banks.length > 0 && (
              <div className={styles.banksContainer}>
                {banks.map((bank, i) => (
                  <div key={i}>
                    <p>{bank.bank}</p>
                    <p>Sucursal: {bank.branch}</p>
                    <p>{bank.accountType}</p>
                    <p>Cuenta: {bank.accountNumber}</p>
                    <p>CBU: {bank.cbu}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
