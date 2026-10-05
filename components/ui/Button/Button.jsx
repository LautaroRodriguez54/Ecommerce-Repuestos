import Link from "next/link";
import styles from "../ui.module.css";
export const Button = ({
  buttonText,
  linkHref = false,
  isMobile = false,
  isButton = true,
  variant = "secundary",
  onClic = () => {},
}) => {
  const clientBtn = isMobile ? styles.clientButton : styles[variant];

  const loginBtn = isMobile ? styles.loginButton : styles[variant];

  return isButton ? (
    <button className={clientBtn} onClick={onClic}>
      {buttonText}
    </button>
  ) : buttonText === "Iniciar Sesión" ? (
    <Link href={linkHref} className={loginBtn}>
      {buttonText}
    </Link>
  ) : (
    <Link href={linkHref} className={clientBtn}>
      {buttonText}
    </Link>
  );
};
