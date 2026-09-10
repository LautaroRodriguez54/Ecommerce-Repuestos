"use client";
import styles from "./navBar.module.css";
import Bars from "../icon/Bars.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";

import XMark from "../icon/XMark.jsx";
import { ClientActions } from "./ClientActions.jsx";
import { useState } from "react";
import { Menu } from "./Menu.jsx";
import { motion, AnimatePresence } from "motion/react";

export const NavBarMobile = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(user);

  return (
    <>
      <button
        className={`${styles.iconBar} ${menuOpen ? styles.iconBarActive : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Bars />
      </button>
      {isLoggedIn ? (
        <div className={styles.userSection}>
          <button className={styles.userButtons}>
            <p className={styles.userName}>{user}</p>
            <div className={styles.iconChevronDown}>
              <ChevronDown />
            </div>
          </button>
        </div>
      ) : undefined}

      <AnimatePresence>
        {menuOpen && (
          <div onClick={() => setMenuOpen(false)}>
            <motion.div className={styles.overlay} />
            <motion.nav
              className={styles.menu}
              initial={{ opacity: 0, y: -1, left: 0 }}
              animate={{ opacity: 1, y: 0, left: 0 }}
              exit={{ opacity: 0, y: -1, left: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className={styles.iconXMark}>
                <XMark />
              </div>
              <Menu />
              {!isLoggedIn ? <ClientActions type={"mobile"} /> : undefined}
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export { NavBarMobile };
