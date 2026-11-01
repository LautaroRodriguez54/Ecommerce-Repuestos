import styles from "./table.module.css";
import { Button } from "../Button/Button";
import Edit from "@/components/icon/Edit";
import type { OrderStatus, UserStatus, TableProps } from "@/types/pagination";

const orderStatusClasses: Record<OrderStatus, string> = {
  Pendiente: styles.pending,
  Completado: styles.completed,
  Preparando: styles.preparing,
  Enviado: styles.sent,
};
const userStatusClasses: Record<UserStatus, string> = {
  Activo: styles.sent,
  Inactivo: styles.pending,
};

export const Table = ({
  title,
  data,
  showActions = false,
  onEdit,
}: TableProps) => {
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
                    {/*{key === "estado" ? (
                      <span
                        className={`${styles.status} ${
                          typeof value === "string" && value in orderStatusClasses
                            ? orderStatusClasses[value as OrderStatus ]
                            : ""
                        }`}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}*/}
                    {key === "isActive" ? (
                      <span
                        className={`${styles.status} ${
                          value
                            ? userStatusClasses["Activo"]
                            : userStatusClasses["Inactivo"]
                        }`}
                      >
                        {value ? "Activo" : "Inactivo"}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
                {showActions && (
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      buttonText={<Edit />}
                      variant="outline"
                      rounded
                      onClick={() => onEdit?.(item)}
                    />
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
