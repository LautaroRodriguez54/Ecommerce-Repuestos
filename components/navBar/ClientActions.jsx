import styles from "./navBar.module.css";
const ClientActions = ({isMobile}) => {
 const clientBtn = isMobile ? styles.clientButton : styles.bigClientButton;
  const loginBtn = isMobile ? styles.loginButton : styles.bigLoginButton;
  return (
    <>
      <button className={clientBtn}>Quiero ser Cliente</button>
      <button className={loginBtn}>Iniciar Sesión</button>
    </>
  );
};
export { ClientActions };
