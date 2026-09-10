import styles from "./navBar.module.css";
import Link from "next/link";
const menuItems = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Catalogo", href: "/productos" },
  { label: "Revista", href: "/revista" },
  { label: "Contacto", href: "#" },
];
const Menu = () => {

  return (
    <ul className={styles.menuList}>
      {menuItems.map((item, index) => (
        <li className={styles.menuItem} key={index}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export { Menu };
