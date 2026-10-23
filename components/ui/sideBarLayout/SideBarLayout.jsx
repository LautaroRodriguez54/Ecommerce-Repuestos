import { SideNavBar } from "./SideNavBar.jsx";
import styles from "./sideBarLayout.module.css";

export const SideBarLayout = ({
  page,
  buttons,
  children,
  onButtonClick,
  selectedButton
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <SideNavBar
          page={page}
          buttons={buttons}
          onButtonClick={onButtonClick}
          selectedButton={selectedButton}
        />

        <div className={styles.contentLayout}>
          {children}
        </div>
      </div>
    </div>
  );
};