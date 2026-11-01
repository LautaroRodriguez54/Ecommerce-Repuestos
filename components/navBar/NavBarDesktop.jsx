"use client";
import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import ChevronDown from "../icon/ChevronDown.jsx";
import { Button } from "../ui/Button/Button.jsx";
import { Menu } from "./Menu.jsx";
import Link from "next/link";
import { DropDown } from "./DropDown.jsx";
import { useState } from "react";

export const NavBarDesktop = ({ user, loading }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const handleDropDownOpen=()=>{
    setDropDownOpen(!dropDownOpen);
  }
  return (
    <>
      <div className={styles.userSection}>
        {loading ? null : user ? (
          <>
            <button className={styles.iconCart}>
              <Cart />
            </button>

            <button className={styles.userButtons} onClick={handleDropDownOpen}>
              <p className={styles.userName}>{user.name}</p>

              <div className={styles.iconChevronDown}>
                <ChevronDown />
              </div>
            </button>
            <DropDown dropDownOpen={dropDownOpen} onClickDropDown={() => setDropDownOpen(false)}/>
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
