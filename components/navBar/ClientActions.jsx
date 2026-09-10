import styles from "./navBar.module.css";
import Link from "next/link";
const ClientActions = ({isMobile}) => {
 const clientBtn = isMobile ? styles.clientButton : styles.bigClientButton;
  const loginBtn = isMobile ? styles.loginButton : styles.bigLoginButton;
  return (
    <>
      <button className={clientBtn}>Quiero ser Cliente</button>
      <Link href="/login" className={loginBtn}>Iniciar Sesión</Link>
    </>
  );
};
export { ClientActions };
