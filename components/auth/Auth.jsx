import styles from "./auth.module.css";
import { AuthForm } from "./AuthForm.jsx";
const authHero = {
  title: "Bienvenido a Altamira Group S.A.",
  subtitle:
    "Más de 6.000 clientes ya confían en nosotros. Ahora es tu turno. Encontrá las piezas que necesitás y llevá tu negocio al siguiente nivel.",
};
export const Auth = ({ title, subtitle, children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <AuthForm title={title} subtitle={subtitle}>
          {children}
        </AuthForm>
        <div className={styles.authHero}>
          <h1>{authHero.title}</h1>
          <p>{authHero.subtitle}</p>
        </div>
      </div>
    </div>
  );
};
