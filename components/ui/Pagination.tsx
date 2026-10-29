"use client";
import { useState } from "react";
import ChevronLeft from "../icon/ChevronLeft";
import ChevronRight from "../icon/ChevronRight";
import styles from "../admin/admin.module.css";
import { Button } from "../ui/Button/Button";

type PaginationProps<T> = {
  itemsPerPage: number;
  maxPageButtons: number;
  data: T[];
  totalRecords: number;
  children: (currentData: T[]) => React.ReactNode;
};

export function Pagination<T>({
  itemsPerPage,
  maxPageButtons,
  data,
  totalRecords,
  children,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxPageButtons / 2),
      totalPages - maxPageButtons + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <>
      {children(currentData)}
      <p style={{color:'var(--color-text-muted)'}}>Registros Encontrados: {totalRecords}</p>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            buttonText={<ChevronLeft />}
            rounded={true}
            variant="outline"
            isButton={true}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          />
          {pageNumbers.map((page) => (
            <Button
              key={page}
              buttonText={String(page)}
              rounded={true}
              variant="outline"
              isButton={true}
              isSelected={currentPage === page}
              onClick={() => setCurrentPage(page)}
            />
          ))}
          <Button
            buttonText={<ChevronRight />}
            rounded={true}
            variant="outline"
            isButton={true}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          />
        </div>
      )}
    </>
  );
}
