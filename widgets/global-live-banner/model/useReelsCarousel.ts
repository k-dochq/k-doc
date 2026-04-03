'use client';

import { useRef, useEffect, useCallback } from 'react';
import { type Locale } from 'shared/config';

// px per millisecond — at 60fps (16.67ms/frame) ≈ 0.8px/frame
const SCROLL_SPEED_PX_PER_MS = 0.048;

export function useReelsCarousel(lang: Locale) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const offsetX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const isPaused = useRef(false);
  const lastTimestamp = useRef<number>(0);
  const rafId = useRef<number>(0);
  const direction = lang === 'ar' ? 1 : -1;

  const animate = useCallback(
    (timestamp: number) => {
      const inner = innerRef.current;
      if (!inner) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPaused.current && lastTimestamp.current !== 0) {
        // Cap delta to 50ms to prevent large jumps after tab switching
        const delta = Math.min(timestamp - lastTimestamp.current, 50);
        const halfWidth = inner.scrollWidth / 2;

        offsetX.current += direction * SCROLL_SPEED_PX_PER_MS * delta;

        // Seamless loop: keep offset within [-halfWidth, 0] for LTR, [0, halfWidth] for RTL
        if (direction === -1 && offsetX.current <= -halfWidth) {
          offsetX.current += halfWidth;
        } else if (direction === 1 && offsetX.current >= halfWidth) {
          offsetX.current -= halfWidth;
        }

        inner.style.transform = `translateX(${offsetX.current}px)`;
      }

      lastTimestamp.current = timestamp;
      rafId.current = requestAnimationFrame(animate);
    },
    [direction],
  );

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetX.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const delta = e.clientX - dragStartX.current;
    offsetX.current = dragStartOffset.current + delta;
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${offsetX.current}px)`;
    }
  };

  const onDragEnd = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offsetX.current;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - dragStartX.current;
    offsetX.current = dragStartOffset.current + delta;
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${offsetX.current}px)`;
    }
  };

  const onTouchEnd = () => {
    isPaused.current = false;
  };

  return {
    outerRef,
    innerRef,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: onDragEnd,
      onMouseLeave: onDragEnd,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
