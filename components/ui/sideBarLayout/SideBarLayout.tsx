import { ReactNode } from "react";
import { SideNavBar } from "./SideNavBar";
import styles from "./sideBarLayout.module.css";

interface SideBarLayoutProps {
  page?: string;
  buttons?: any[];
  sidebarChildren?: ReactNode;
  children?: ReactNode;
  onButtonClick?: (id: string) => void;
  selectedButton?: string;
}

export const SideBarLayout = ({
  page = "",
  buttons,
  sidebarChildren,
  children,
  onButtonClick,
  selectedButton,
}: SideBarLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <SideNavBar
          page={page}
          buttons={buttons}
          onButtonClick={onButtonClick}
          selectedButton={selectedButton}
        >
          {sidebarChildren}
        </SideNavBar>

        <div className={styles.contentLayout}>{children}</div>
      </div>
    </div>
  );
};
