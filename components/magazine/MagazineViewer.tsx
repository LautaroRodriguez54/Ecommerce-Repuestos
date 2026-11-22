"use client";

import HTMLFlipBook, { type BookSnapshot } from "@gullabs/react-flipbook";
import {
  type ComponentRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "@/components/ui/ui.module.css";
import { ProgressBar } from "@/components/ui/pagination/ProgressBar";
import { ZoomViewer } from "@/components/ui/modal/zoom/ZoomViewer";
import { Button } from "../ui/Button/Button";
import Expand from "../icon/Expand";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface MagazineViewerProps {
  file: string;
}

interface PageSize {
  width: number;
  height: number;
}

export const MagazineViewer = ({ file }: MagazineViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<ComponentRef<typeof HTMLFlipBook>>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageSize, setPageSize] = useState<PageSize | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [],
  );

  const handleBookLoaded = useCallback((snapshot: BookSnapshot) => {
    setCurrentPage(snapshot.page);
  }, []);

  const handlePageChange = useCallback((snapshot: BookSnapshot) => {
    setCurrentPage(snapshot.page);
  }, []);

  const handleScrollbarChange = useCallback((page: number) => {
    bookRef.current?.flipToPage(page);
  }, []);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (isViewerOpen) return;

      const { width, height } = entry.contentRect;
      if (width <= 0 || height <= 0) return;

      const aspectRatio = 1.375;
      const availableWidth = width / (width < 600 ? 1 : 2);
      const pageWidth = Math.floor(
        Math.min(availableWidth, height / aspectRatio),
      );
      const pageHeight = Math.round(pageWidth * aspectRatio);

      setPageSize((previous) =>
        previous?.width === pageWidth && previous?.height === pageHeight
          ? previous
          : { width: pageWidth, height: pageHeight },
      );
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [isViewerOpen]);

  const pages = useMemo(() => {
    if (!numPages || !pageSize) return [];

    return Array.from({ length: numPages }, (_, index) => (
      <div key={`page-${index + 1}`}>
        <Page
          pageNumber={index + 1}
          width={pageSize.width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    ));
  }, [numPages, pageSize]);
  return (
    <ZoomViewer
      isOpen={isViewerOpen}
      onClose={() => setIsViewerOpen(false)}
      trigger={
        <Button
          buttonText={<Expand />}
          variant="outline"
          rounded
          onClick={() => setIsViewerOpen(true)}
        />
      }
      footer={
        <ProgressBar
          currentPage={currentPage}
          totalPages={numPages}
          onPageChange={handleScrollbarChange}
        />
      }
    >
      <div ref={containerRef} className={styles.magazineWrapper}>
        <Document
          className={styles.magazineDocument}
          file={file}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={(error) =>
            console.error("Error al cargar el PDF:", error)
          }
        >
          {pageSize && numPages > 0 && (
            <HTMLFlipBook
              ref={bookRef}
              width={pageSize.width}
              height={pageSize.height}
              usePortrait
              aria-label="Revista"
              onLoaded={handleBookLoaded}
              onPageChange={handlePageChange}
            >
              {pages}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </ZoomViewer>
  );
};
