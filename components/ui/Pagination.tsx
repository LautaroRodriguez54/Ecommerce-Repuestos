"use client";
import { useState } from "react";
import ChevronLeft from "../icon/ChevronLeft";
import ChevronRight from "../icon/ChevronRight";
import ChevronLeftDouble from "../icon/ChevronLeftDouble";
import ChevronRightDouble from "../icon/ChevronRightDouble";
import styles from "../admin/admin.module.css";
import { Button } from "../ui/Button/Button";

type PaginationProps<T> = {
  itemsPerPage: number;
  maxPageButtons: number;
  data: T[];
  totalRecords?: number;
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
  const paginationButtons = [
    {
      id: "first",
      buttonText: <ChevronLeftDouble />,
      onClick: () => setCurrentPage(1),
      isSelected: false,
    },
    {
      id: "previous",
      buttonText: <ChevronLeft />,
      onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
      variant: "outline" as const,
      isSelected: false,
    },
    ...pageNumbers.map((page) => ({
      id: `page-${page}`,
      buttonText: String(page),
      onClick: () => setCurrentPage(page),
      variant: "outline" as const,
      isSelected: currentPage === page,
    })),
    {
      id: "next",
      buttonText: <ChevronRight />,
      onClick: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
      variant: "outline" as const,
      isSelected: false,
    },
    {
      id: "last",
      buttonText: <ChevronRightDouble />,
      onClick: () => setCurrentPage(totalPages),
      isSelected: false,
    },
  ];
  return (
    <>
      {children(currentData)}
      {totalRecords !== undefined && (
        <p style={{ color: "var(--color-text-muted)" }}>
          Registros Encontrados: {totalRecords}
        </p>
      )}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {paginationButtons.map((button) => (
            <Button
              key={button.id}
              buttonText={button.buttonText}
              rounded
              isButton
              variant={button.variant}
              isSelected={button.isSelected}
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </>
  );
}