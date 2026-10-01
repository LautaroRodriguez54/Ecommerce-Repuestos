import styles from "./auth.module.css";
import stylesNB from "../navBar/navBar.module.css";
import Image from "next/image";

const authHero = {
  title: "Bienvenido a Altamira Group S.A.",
  subtitle:
    "Más de 6.000 clientes ya confían en nosotros. Ahora es tu turno. Encontrá las piezas que necesitás y llevá tu negocio al siguiente nivel.",
};
export const Auth = ({ title, subtitle, children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
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

        <div className={styles.authHero}>
          <h1>{authHero.title}</h1>
          <p>{authHero.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
