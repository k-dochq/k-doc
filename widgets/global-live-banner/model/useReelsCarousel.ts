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

  // LTR scrolls left (direction -1): offsetX 0 → -halfWidth → reset to 0
  // AR  scrolls right (direction +1): offsetX -halfWidth → 0 → reset to -halfWidth
  // Both operate within [-halfWidth, 0]
  const direction = lang === 'ar' ? 1 : -1;

  const animate = useCallback(
    (timestamp: number) => {
      const inner = innerRef.current;
      if (!inner) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPaused.current && lastTimestamp.current !== 0) {
        const delta = Math.min(timestamp - lastTimestamp.current, 50);
        const halfWidth = inner.scrollWidth / 2;

        offsetX.current += direction * SCROLL_SPEED_PX_PER_MS * delta;

        // Seamless loop: both LTR and AR stay within [-halfWidth, 0]
        if (offsetX.current <= -halfWidth) {
          offsetX.current += halfWidth; // LTR: hit bottom → reset toward 0
        } else if (offsetX.current >= 0) {
          offsetX.current -= halfWidth; // AR: hit top → reset toward -halfWidth
        }

        inner.style.transform = `translateX(${offsetX.current}px)`;
      }

      lastTimestamp.current = timestamp;
      rafId.current = requestAnimationFrame(animate);
    },
    [direction],
  );

  useEffect(() => {
    // AR starts at -halfWidth so the duplicate set is shown first,
    // then scrolls rightward toward 0 for a seamless loop
    const inner = innerRef.current;
    if (inner && lang === 'ar') {
      offsetX.current = -(inner.scrollWidth / 2);
      inner.style.transform = `translateX(${offsetX.current}px)`;
    }
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate, lang]);

  // Both LTR and AR: clamp to ≤ 0 (can't drag past the visible start)
  const clampOffset = (value: number) => Math.min(0, value);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetX.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const raw = dragStartOffset.current + (e.clientX - dragStartX.current);
    offsetX.current = clampOffset(raw);
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
    const raw = dragStartOffset.current + (e.touches[0].clientX - dragStartX.current);
    offsetX.current = clampOffset(raw);
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
