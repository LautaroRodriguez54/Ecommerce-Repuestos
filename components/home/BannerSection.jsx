"use client";
import styles from "../../app/home.module.css";
import { motion } from "motion/react";
import "../../app/home.css";
import { arrayMessages} from "../pageData.js";

export const BannerSection = () => {
  return (
    <section className={styles.home}>
      <div className={styles.banner}></div>
      <div className={styles.notice}>
        <motion.div
          className={styles.track}
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[1, 2].map((group) => (
            <div className={styles.group} aria-hidden={group === 2} key={group}>
              {[...arrayMessages, ...arrayMessages].map((message, index) => (
                <p key={`${group}-${index}`}>{message}</p>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <div className={styles.new}></div>
    </section>
  );
};
