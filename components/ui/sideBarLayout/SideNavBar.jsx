import styles from "./sideBarLayout.module.css";
import { Button } from "../Button/Button";

export const SideNavBar = ({
  page,
  buttons,
  onButtonClick,
  selectedButton,
}) => {
  return (
    <div
      className={page === "admin" ? styles.adminSideBar : styles.clientSideBar}
    >
      {buttons.map((item, i) => (
        <Button
          key={i}
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
