"use client";
import { type ReactNode } from "react";
import styles from "../modal.module.css";
import useZoomViewer from "./zoom.hooks";
import XMark from "@/components/icon/XMark";
import { Button } from "../../Button/Button";

interface ZoomViewerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onZoomChange?: (zoom: number) => void;
  footer?: ReactNode;
  trigger?: ReactNode;
  disableZoom?: boolean;
}

export const ZoomViewer = ({
  children,
  isOpen,
  onClose,
  onZoomChange,
  footer,
  trigger,
  disableZoom = false,
}: ZoomViewerProps) => {
  const {
    viewportRef,
    zoom,
    position,
    handleClose,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEvent,
  } = useZoomViewer({
    isOpen,
    disableZoom,
    onZoomChange,
    onClose,
  });

  return (
    <div className={isOpen ? styles.overlay : styles.root}>
      {!isOpen && <div className={styles.button}>{trigger}</div>}
      {isOpen && (
        <div className={styles.button}>
          <Button
            buttonText={<XMark />}
            rounded
            onClick={handleClose}
            variant="outline"
          />
        </div>
      )}
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${
          isOpen && zoom > 1 ? styles.zoomed : ""
        }`}
        onPointerDownCapture={handlePointerDown}
        onPointerMoveCapture={handlePointerMove}
        onPointerUpCapture={handlePointerUp}
        onPointerCancelCapture={handlePointerUp}
        onMouseDownCapture={handleMouseEvent}
        onMouseMoveCapture={handleMouseEvent}
        onMouseUpCapture={handleMouseEvent}
        onClickCapture={handleMouseEvent}
        onContextMenuCapture={handleMouseEvent}
      >
        <div
          className={styles.content}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        >
          {children}
        </div>
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
