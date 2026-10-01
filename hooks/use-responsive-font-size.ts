"use client";

import { useEffect, useState } from "react";

/**
 * Computes responsive font size based on viewport width breakpoints:
 *  - < 480px (small mobile):  40
 *  - 480 to 767px (mobile):   52
 *  - 768 to 1023px (tablet):  72
 *  - 1024 to 1439px (laptop): 96
 *  - >= 1440px (large screen): 120
 */
function getFontSize(width: number): number {
  if (width < 480) return 40;
  if (width < 768) return 52;
  if (width < 1024) return 72;
  if (width < 1440) return 96;
  return 120;
}

export function useResponsiveFontSize(defaultSize: number = 64): number {
  // SSR-safe: start with default value (e.g. 64) to avoid hydration mismatch
  const [fontSize, setFontSize] = useState<number>(defaultSize);

  useEffect(() => {
    // Update immediately on mount for accurate initial size
    setFontSize(getFontSize(window.innerWidth));

    let timer: ReturnType<typeof setTimeout> | undefined;

    // Debounce resize handler by 150ms to prevent animation restart while resizing
    const handleResize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setFontSize(getFontSize(window.innerWidth));
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return fontSize;
}
