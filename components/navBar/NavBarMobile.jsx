"use client";
import styles from "./navBar.module.css";
import Bars from "../icon/Bars.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";
import XMark from "../icon/XMark.jsx";
import { Button } from "../ui/Button/Button.jsx";
import { useState } from "react";
import { Menu } from "./Menu.jsx";
import { motion, AnimatePresence } from "motion/react";
import { DropDown } from "./DropDown.jsx";
export const NavBarMobile = ({ user, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const handleDropDownOpen=()=>{
    setDropDownOpen((prev) => !prev);
  }
  return (
    <>
      <button
        className={`${styles.iconBar} ${menuOpen ? styles.iconBarActive : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Bars />
      </button>
      {!loading && user && (
        <div className={styles.userSection}>
          <button className={styles.userButtons} onClick={handleDropDownOpen}>
            <p className={styles.userName}>{user.name}</p>
            <div className={styles.iconChevronDown}>
              <ChevronDown />
            </div>
          </button>
          <DropDown carrito={true} dropDownOpen={dropDownOpen}  onClickDropDown={() => setDropDownOpen(false)}/>
        </div>
      )}

      <AnimatePresence>
        {menuOpen && (
          <div className={styles.mobileMenuContainer} onClick={() => setMenuOpen(false)}>
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
              {!loading && !user && (
                <>
                  <Button
                    buttonText={"Quiero ser Cliente"}
                    isMobile={true}
                    isButton={false}
                    linkHref="/#cliente"
                  />
                  <Button
                    buttonText={"Iniciar Sesión"}
                    isMobile={true}
                    isButton={false}
                    linkHref={"/login"}
                  />
                </>
              )}
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
