import styles from "./table.module.css";
import type { TableProps } from "@/types/pagination";

export const Table = ({ title, data }: TableProps) => {
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
                  <td key={key}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};