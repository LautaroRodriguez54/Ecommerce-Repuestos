import { InfoBlock } from "../footer/InfoBlock";
import styles from "./panel.module.css";
import { Banks } from "../pageData";

export const PanelFooter = () => {
  return (
    <div className={styles.footer}>
      {Banks.map((item, index) => (
        <InfoBlock
          key={index}
          title={item.bank}
          texts={[
            `Sucursal: ${item.branch}`,
            item.accountType,
            `Número de cuenta: ${item.accountNumber}`,
            `CBU: ${item.cbu}`,
          ]}
        />
      ))}
    </div>
  );
};
