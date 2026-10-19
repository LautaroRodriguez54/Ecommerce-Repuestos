import styles from "../ui.module.css";
export const InteractiveButton = ({ button }) => {
  const { buttonName, type, Icon } = button;

  return (
    <button className={type === 'admin' ? styles.darkButton : styles.basicButton}>
      <div className={styles.iconNameButton}>
        <Icon />
      </div>
      {buttonName}
    </button>
  );
};
