import styles from "../ui.module.css";
import { InteractiveButton } from "../Button/InteractiveButton";
export const SideNavBar = ({ page, buttons }) => {
  return (
    <div
      className={page === "admin" ? styles.adminSideBar : styles.clientSideBar}
    >
      {buttons.map((item, i) => (
        <InteractiveButton key={i} button={item} />
      ))}
    </div>
  );
};
