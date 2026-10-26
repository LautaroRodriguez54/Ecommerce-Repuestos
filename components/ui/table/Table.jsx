import styles from "./table.module.css";
import { Button } from "../Button/Button";
import Edit from "@/components/icon/Edit";
import Delete from "@/components/icon/Delete";
const statusClasses = {
  Pendiente: styles.pending,
  Completado: styles.completed,
  Preparando: styles.preparing,
  Enviado: styles.sent,
};
export const Table = ({ title, data, showActions = false }) => {
  return (
    <div className={styles.tableContainer}>
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {title.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>
                  {key === "estado" ? (
                    <span
                      className={`${styles.status} ${
                        statusClasses[value] ?? ""
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    value
                  )}
                </td>
              ))}
              {showActions && (
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <Button buttonText={<Edit />} variant="outline" rounded />
                  <Button buttonText={<Delete />} rounded />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
