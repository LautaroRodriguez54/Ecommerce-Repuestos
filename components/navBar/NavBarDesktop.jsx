"use client";
import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";
import { Button } from "../ui/Button/Button.jsx";
import { useState } from "react";
import { Menu } from "./Menu.jsx";
import Link from "next/link";

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
          <>
            <Link href="/#cliente">
              <Button buttonText="Quiero ser Cliente" variant="accent" />
            </Link>
            <Button
              buttonText={"Iniciar Sesión"}
              variant={"outline"}
              isButton={false}
              linkHref={"/login"}
            />
          </>
        )}
      </div>

      <nav className={styles.menu}>
        <Menu />
      </nav>
    </>
  );
};
