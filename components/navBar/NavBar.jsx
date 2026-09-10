"use client";
import styles from "./navBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NavBarDesktop } from "./NavBarDesktop.jsx";
import { NavBarMobile } from "./NavBarMobile.jsx";
const userName = "";
const NavBar = () => {
  const [mobile, setMobile] = useState(null);
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
  if (mobile === null) return null;

  return (
    <div className={styles.navBarWrapper}>
      <Link href="/" className={styles.brand}>
        <Image
          src="/logoaltamira.webp"
          alt="Logo de Altamira S.A."
          height={651}
          width={3234}
          priority
          className={styles.altamiraLogo}
        />
      </Link>
      {mobile ? (
        <NavBarMobile user={userName} />
      ) : (
        <NavBarDesktop user={userName} />
      )}
    </div>
  );
};
export { NavBar };
