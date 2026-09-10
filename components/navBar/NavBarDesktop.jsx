"use client";
import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";
import { ClientActions } from "./ClientActions.jsx";
import { useState } from "react";
import { Menu } from "./Menu.jsx";

export const NavBarDesktop = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(user);
  return (
    <>
      <div className={styles.userSection}>
        {isLoggedIn ? (
          <>
            <button className={styles.iconCart}>
              <Cart />
            </button>

            <button className={styles.userButtons}>
              <p className={styles.userName}>{user}</p>

              <div className={styles.iconChevronDown}>
                <ChevronDown />
              </div>
            </button>
          </>
        ) : (
          <ClientActions type={"desktop"} />
        )}
      </div>

      <nav className={styles.menu}>
        <Menu />
      </nav>
    </>
  );
};
export { NavBarDesktop };
