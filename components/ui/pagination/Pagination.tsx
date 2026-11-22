"use client";
import { useState } from "react";
import ChevronLeft from "../../icon/ChevronLeft";
import ChevronRight from "../../icon/ChevronRight";
import ChevronLeftDouble from "../../icon/ChevronLeftDouble";
import ChevronRightDouble from "../../icon/ChevronRightDouble";
import styles from "../../admin/admin.module.css";
import { Button } from "../Button/Button";

type PaginationProps<T> = {
  itemsPerPage: number;
  maxPageButtons: number;
  data: T[];
  totalRecords?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showOddPagesOnly?: boolean;
  children: (currentData: T[]) => React.ReactNode;
};

export function Pagination<T>({
  itemsPerPage,
  maxPageButtons,
  data,
  totalRecords,
  currentPage: externalPage,
  onPageChange,
  showOddPagesOnly = false,
  children,
}: PaginationProps<T>) {
  const [internalPage, setInternalPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const controlled = externalPage !== undefined;

  const availablePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).filter((page) => !showOddPagesOnly || page % 2 !== 0);

  const requestedPage = controlled ? externalPage : internalPage;
  const currentPage = availablePages.reduce(
    (closest, page) =>
      Math.abs(page - requestedPage) < Math.abs(closest - requestedPage)
        ? page
        : closest,
    availablePages[0] ?? 1,
  );

  const currentIndex = availablePages.indexOf(currentPage);

  const changePage = (page: number) => {
    if (!availablePages.length) return;

    const nextPage = availablePages.reduce(
      (closest, item) =>
        Math.abs(item - page) < Math.abs(closest - page) ? item : closest,
      availablePages[0],
    );

    if (!controlled) setInternalPage(nextPage);
    onPageChange?.(nextPage);
  };

  const startPage = Math.max(
    0,
    Math.min(
      currentIndex - Math.floor(maxPageButtons / 2),
      availablePages.length - maxPageButtons,
    ),
  );

  const pageNumbers = availablePages.slice(
    startPage,
    startPage + maxPageButtons,
  );

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginationButtons = [
    {
      id: "first",
      buttonText: <ChevronLeftDouble />,
      onClick: () => changePage(availablePages[0] ?? 1),
      isSelected: false,
    },
    {
      id: "previous",
      buttonText: <ChevronLeft />,
      onClick: () => changePage(availablePages[currentIndex - 1] ?? 1),
      variant: "outline" as const,
      isSelected: false,
    },
    ...pageNumbers.map((page) => ({
      id: `page-${page}`,
      buttonText: String(page),
      onClick: () => changePage(page),
      variant: "outline" as const,
      isSelected: currentPage === page,
    })),
    {
      id: "next",
      buttonText: <ChevronRight />,
      onClick: () => changePage(availablePages[currentIndex + 1] ?? 1),
      variant: "outline" as const,
      isSelected: false,
    },
    {
      id: "last",
      buttonText: <ChevronRightDouble />,
      onClick: () => changePage(availablePages[availablePages.length - 1] ?? 1),
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