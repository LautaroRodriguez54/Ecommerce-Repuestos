import styles from "./form.module.css";
export const ComponentData = ({dataArea,areaName, children}) => {
  return (
    <div className={dataArea}>
      <p className={styles.areaName}>{areaName}</p>
      <div className={styles.formFieldWrap}>
        {children}
      </div>
    </div>
  );
};
