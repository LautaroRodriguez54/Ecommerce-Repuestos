"use client";
import styles from "./navBar.module.css";
import Bars from "../icon/Bars.jsx";
import Cart from "../icon/Cart.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";
import Image from "next/image";
import XMark from "../icon/XMark.jsx";
import { ClientActions } from "./ClientActions.jsx";
import { useState, useEffect } from "react";
import { Menu } from "./Menu.jsx";
import { motion, AnimatePresence, easeOut } from "motion/react";
import Link from "next/link";

const userName = "ALTAMIRA S.A.";
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth <= 699);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);
  return (
    <div className={styles.navBarWrapper}>
      {mobile ? (
        <button
          className={`${styles.iconBar} ${menuOpen ? styles.iconBarActive : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Bars />
        </button>
      ) : undefined}

      <Link href="/" className={styles.brand}>
        <Image
          src="/logoaltamira.webp"
          alt="Logo de Altamira S.A."
          height={651}
          width={3234}
          loading="eager"
          className={styles.altamiraLogo}
        />
      </Link>

      {isLoggedIn ? (
        <div className={styles.userSection}>
          {!mobile ? (
            <button className={styles.iconCart}>
              <Cart />
            </button>
          ) : undefined}
          <button className={styles.userButtons}>
            <p className={styles.userName}>{userName}</p>

            <div className={styles.iconChevronDown}>
              <ChevronDown />
            </div>
          </button>
        </div>
      ) : !mobile ? (
        <div className={styles.userSection}>
          <ClientActions isMobile={mobile} />
        </div>
      ) : undefined}

      {!mobile ? (
        <nav className={styles.menu}>
          <Menu />
        </nav>
      ) : (
        <AnimatePresence>
          {menuOpen && (
            <div onClick={() => setMenuOpen(false)}>
              <motion.div
                className={styles.overlay}
              />
              <motion.nav
                className={styles.menu}
                initial={{ opacity: 0, y: -1, left: 0 }}
                animate={{ opacity: 1, y: 0, left: 0 }}
                exit={{ opacity: 0, y: -1, left: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div
                  className={styles.iconXMark}
                >
                  <XMark />
                </div>
                <Menu />
                {!isLoggedIn ? <ClientActions isMobile={mobile} /> : undefined}
              </motion.nav>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
export { NavBar };
