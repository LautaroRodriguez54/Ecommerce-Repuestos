import styles from "./table.module.css";
import { Button } from "../Button/Button";
import Edit from "@/components/icon/Edit";
import Delete from "@/components/icon/Delete";
type Status = "Pendiente" | "Completado" | "Preparando" | "Enviado";
const statusClasses: Record<Status, string> = {
  Pendiente: styles.pending,
  Completado: styles.completed,
  Preparando: styles.preparing,
  Enviado: styles.sent,
};
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type TableProps = {
  title: string[];
  data: User[];
  showActions?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
};
export const Table = ({
  title,
  data,
  showActions = false,
  onEdit,
  onDelete,
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
                    {key === "estado" ? (
                      <span
                        className={`${styles.status} ${
                          typeof value === "string" && value in statusClasses
                            ? statusClasses[value as Status]
                            : ""
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
                    <Button
                      buttonText={<Edit />}
                      variant="outline"
                      rounded
                      onClick={() => onEdit?.(item)}
                    />
                    <Button buttonText={<Delete />} rounded onClick={() => onDelete?.(item)}/>
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
