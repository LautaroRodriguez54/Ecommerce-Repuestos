"use client";
import styles from "../ui.module.css";
interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProgressBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProgressBarProps) => {
  return (
    <div className={styles.progressContainer}>
      <p className={styles.progressText}>
        Página <strong>{totalPages > 0 ? currentPage + 1 : 0}</strong> de{" "}
        {totalPages}
      </p>

      <input
        className={styles.progressBar}
        type="range"
        min={0}
        max={Math.max(totalPages - 1, 0)}
        value={currentPage}
        disabled={totalPages <= 1}
        onChange={(event) => onPageChange(Number(event.target.value))}
        aria-label="Progreso de lectura"
        style={{
          background: `linear-gradient(to right, var(--color-navigation) ${
            totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 0
          }%, var(--color-border) 0%)`,
        }}
      />
    </div>
  );
};
