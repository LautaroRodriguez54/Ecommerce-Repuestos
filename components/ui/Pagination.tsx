"use client";

import { useEffect, useState } from "react";
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
  resetKey?: string | number;
  children: (currentData: T[]) => React.ReactNode;
};

export function Pagination<T>({
  itemsPerPage,
  maxPageButtons,
  data,
  totalRecords,
  resetKey,
  children,
}: PaginationProps<T>) {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const safeMaxPageButtons = Math.max(1, maxPageButtons);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / safeItemsPerPage);
  const validCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (validCurrentPage - 1) * safeItemsPerPage;
  const currentData = data.slice(
    startIndex,
    startIndex + safeItemsPerPage,
  );

  const startPage = Math.max(
    1,
    Math.min(
      validCurrentPage - Math.floor(safeMaxPageButtons / 2),
      totalPages - safeMaxPageButtons + 1,
    ),
  );

  const endPage = Math.min(
    totalPages,
    startPage + safeMaxPageButtons - 1,
  );

  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );

  const isFirstPage = validCurrentPage <= 1;
  const isLastPage = validCurrentPage >= totalPages;

  const paginationButtons = [
    {
      id: "first",
      buttonText: <ChevronLeftDouble />,
      onClick: () => setCurrentPage(1),
      isSelected: false,
      disabled: isFirstPage,
    },
    {
      id: "previous",
      buttonText: <ChevronLeft />,
      onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
      variant: "outline" as const,
      isSelected: false,
      disabled: isFirstPage,
    },
    ...pageNumbers.map((page) => ({
      id: `page-${page}`,
      buttonText: String(page),
      onClick: () => setCurrentPage(page),
      variant: "outline" as const,
      isSelected: validCurrentPage === page,
      disabled: false,
    })),
    {
      id: "next",
      buttonText: <ChevronRight />,
      onClick: () =>
        setCurrentPage((page) => Math.min(totalPages, page + 1)),
      variant: "outline" as const,
      isSelected: false,
      disabled: isLastPage,
    },
    {
      id: "last",
      buttonText: <ChevronRightDouble />,
      onClick: () => setCurrentPage(totalPages),
      isSelected: false,
      disabled: isLastPage,
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
              disabled={button.disabled}
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
