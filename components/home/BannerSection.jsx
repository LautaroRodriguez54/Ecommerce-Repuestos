"use client";
import styles from "./home.module.css";
import { motion, AnimatePresence } from "motion/react";
import "../../app/home.css";
import { arrayMessages } from "../pageData.js";
import { Button } from "../ui/Button/Button";
import { useRouter } from "next/navigation";
import {NoticeSection} from './NoticeSection'
export const BannerSection = () => {
  const router = useRouter();
  return (
    <section className={styles.home}>
      <AnimatePresence>
        <div className={styles.banner}>
          <motion.div
            className={styles.bBottom}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className={styles.bTop}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className={styles.laptop}
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.phone} />
          </motion.div>
          <motion.div
            className={styles.catalogBtn}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button buttonText={"▶ ▶ Ver Destacados"} variant="accent" onClic={() => router.push("/productos")}/>
          </motion.div>
        </div>
      </AnimatePresence>
      <NoticeSection />
      <div className={styles.new}></div>
    </section>
  );
};
