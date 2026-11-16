import styles from "./sideBarLayout.module.css";
import { Button } from "../Button/Button";

export const SideNavBar = ({
  page,
  buttons,
  children,
  onButtonClick,
  selectedButton,
}) => {
  return (
    <div
      className={page === "admin" ? styles.adminSideBar : styles.clientSideBar}
    >
      {children ?? buttons?.map((item) => (
        <Button
          key={item.id}
          buttonText={item.buttonName}
          Icon={item.Icon}
          type={item.type}
          onClick={() => onButtonClick(item.id)}
          isSelected={selectedButton === item.id}
          squared
        />
      ))}
    </div>
  );
};