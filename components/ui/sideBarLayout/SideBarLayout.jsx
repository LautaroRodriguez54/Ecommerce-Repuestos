import { SideNavBar } from "./SideNavBar.jsx";
import styles from "./sideBar.module.css";
export const SideBarLayout = ({ page, buttons, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <SideNavBar page={page} buttons={buttons} />
        <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      </div>
      
    </div>
  );
};
