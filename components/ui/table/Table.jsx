import styles from "./table.module.css";
const statusClasses = {
  Pendiente: styles.pending,
  Completado: styles.completed,
  Preparando: styles.preparing,
  Enviado: styles.sent,
  Cancelado: styles.cancelled,
};
export const Table = ({ title, data, showActions = false }) => {
  return (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
