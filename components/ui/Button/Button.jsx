import Link from "next/link";
import styles from '../ui.module.css'
export default function Button({
  buttonText,
  linkHref = false,
  isMobile = false,
  isButton = true,
  variant ='blackButton',
  onClic = ()=>{}
}) {
  const clientBtn = isMobile ? styles.clientButton : styles[variant];

  const loginBtn = isMobile ? styles.loginButton : styles[variant];

  return isButton ? (
    <button className={clientBtn} onClick={onClic}>{buttonText}</button>
  ) : (
    <Link href={linkHref} className={loginBtn}>
      {buttonText}
    </Link>
  );
}
