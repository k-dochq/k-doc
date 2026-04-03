'use client';

import { useRef, useEffect, useCallback } from 'react';
import { type Locale } from 'shared/config';

// px per millisecond — at 60fps (16.67ms/frame) ≈ 0.8px/frame
const SCROLL_SPEED_PX_PER_MS = 0.048;

export function useReelsCarousel(lang: Locale) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const rafId = useRef<number>(0);
  const isPaused = useRef(false);
  const lastTimestamp = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      const el = scrollRef.current;
      if (!el) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPaused.current && lastTimestamp.current !== 0) {
        // Cap delta to 50ms to prevent large jumps after tab switching
        const delta = Math.min(timestamp - lastTimestamp.current, 50);
        const halfWidth = el.scrollWidth / 2;

        if (lang === 'ar') {
          // Arabic: scroll backward; loop when reaching the start
          if (el.scrollLeft <= 0) {
            el.scrollLeft += halfWidth;
          }
          el.scrollLeft -= SCROLL_SPEED_PX_PER_MS * delta;
        } else {
          // LTR: scroll forward; loop when reaching the second half
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
          el.scrollLeft += SCROLL_SPEED_PX_PER_MS * delta;
        }
      }

      lastTimestamp.current = timestamp;
      rafId.current = requestAnimationFrame(animate);
    },
    [lang],
  );

  useEffect(() => {
    // Arabic starts at the midpoint so there's room to scroll backward
    const el = scrollRef.current;
    if (el && lang === 'ar') {
      el.scrollLeft = el.scrollWidth / 2;
    }
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate, lang]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const delta = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeftStart.current - delta;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const delta = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeftStart.current - delta;
  };

  const onTouchEnd = () => {
    isPaused.current = false;
  };

  return {
    scrollRef,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
