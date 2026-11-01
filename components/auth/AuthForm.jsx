import styles from "./auth.module.css";
import stylesNB from "../navBar/navBar.module.css";
import Image from "next/image";
export const AuthForm = ({ title, subtitle, children }) => {
  return (
    <div className={styles.authForm}>
      <div className={styles.brand}>
        <Image
          src="/blacklogo.webp"
          alt="Logo de Altamira S.A."
          height={651}
          width={3234}
          priority
          className={stylesNB.altamiraLogo}
        />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formHead}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};