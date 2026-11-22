"use client";

import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.15;

interface Position {
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
}

interface PinchState {
  distance: number;
  zoom: number;
}

interface UseZoomViewerProps {
  isOpen: boolean;
  disableZoom: boolean;
  onZoomChange?: (zoom: number) => void;
  onClose: () => void;
}

const getDistance = (touches: TouchList) =>
  Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  );

export default function useZoomViewer({
  isOpen,
  disableZoom,
  onZoomChange,
  onClose,
}: UseZoomViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(MIN_ZOOM);
  const dragRef = useRef<DragState | null>(null);
  const pinchRef = useRef<PinchState | null>(null);

  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const updateZoom = useCallback(
    (value: number) => {
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

      zoomRef.current = nextZoom;
      setZoom(nextZoom);
      onZoomChange?.(nextZoom);

      if (nextZoom === MIN_ZOOM) setPosition({ x: 0, y: 0 });
    },
    [onZoomChange],
  );

  const resetZoom = useCallback(() => {
    zoomRef.current = MIN_ZOOM;
    setZoom(MIN_ZOOM);
    setPosition({ x: 0, y: 0 });
    dragRef.current = null;
    pinchRef.current = null;
    onZoomChange?.(MIN_ZOOM);
  }, [onZoomChange]);

  // Bloqueo del scroll y cierre con Escape.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reinicio al cerrar.
  useEffect(() => {
    if (!isOpen) resetZoom();
  }, [isOpen, resetZoom]);

  // Rueda del mouse.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isOpen || disableZoom) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        updateZoom(
          zoomRef.current + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP),
        );
      } else if (zoomRef.current > MIN_ZOOM) {
        event.preventDefault();
        setPosition((previous) => ({
          x: previous.x - event.deltaX,
          y: previous.y - event.deltaY,
        }));
      }
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [isOpen, disableZoom, updateZoom]);

  // Pinza táctil.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isOpen || disableZoom) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) return;

      event.preventDefault();
      event.stopPropagation();

      pinchRef.current = {
        distance: getDistance(event.touches),
        zoom: zoomRef.current,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || !pinchRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      updateZoom(
        pinchRef.current.zoom *
          (getDistance(event.touches) / pinchRef.current.distance),
      );
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) pinchRef.current = null;
    };

    viewport.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: false,
    });
    viewport.addEventListener("touchmove", handleTouchMove, {
      capture: true,
      passive: false,
    });
    viewport.addEventListener("touchend", handleTouchEnd, true);
    viewport.addEventListener("touchcancel", handleTouchEnd, true);

    return () => {
      viewport.removeEventListener("touchstart", handleTouchStart, true);
      viewport.removeEventListener("touchmove", handleTouchMove, true);
      viewport.removeEventListener("touchend", handleTouchEnd, true);
      viewport.removeEventListener("touchcancel", handleTouchEnd, true);
    };
  }, [isOpen, disableZoom, updateZoom]);

  // Arrastre.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isOpen || zoom <= MIN_ZOOM) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.stopPropagation();

    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!isOpen || zoom <= MIN_ZOOM || drag?.pointerId !== event.pointerId)
      return;

    event.stopPropagation();

    setPosition({
      x: drag.startX + event.clientX - drag.x,
      y: drag.startY + event.clientY - drag.y,
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom > MIN_ZOOM) event.stopPropagation();
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  const handleMouseEvent = (event: MouseEvent<HTMLDivElement>) => {
    if (isOpen && zoom > MIN_ZOOM) event.stopPropagation();
  };

  const handleClose = () => {
    resetZoom();
    onClose();
  };

  return {
    viewportRef,
    zoom,
    position,
    handleClose,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEvent,
  };
}
