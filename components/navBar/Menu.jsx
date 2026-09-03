import styles from "./navBar.module.css";
const menuItems = [
  { label: "Nosotros", href: "#" },
  { label: "Catalogo", href: "#" },
  { label: "Revista", href: "#" },
  { label: "Contacto", href: "#" },
];
const Menu = () => {

  return (
    <ul className={styles.menuList}>
      {menuItems.map((item, index) => (
        <li className={styles.menuItem} key={index}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};

export { Menu };
