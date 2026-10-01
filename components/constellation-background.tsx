"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ConstellationFieldProps } from "@/components/threeui/constellation-field/ConstellationField";

// Dynamic import with SSR disabled to prevent hydration mismatch from Canvas/WebGL runtime
const DynamicConstellationField = dynamic(
  () =>
    import("@/components/threeui/constellation-field/ConstellationField").then(
      (mod) => mod.ConstellationField
    ),
  { ssr: false }
);

export interface ConstellationBackgroundProps {
  className?: string;
  opacity?: number;
  density?: number;
  strokeWidth?: number;
  speed?: number;
  size?: number;
  length?: number;
  mode?: "dark" | "light" | "auto";
  background?: string;
}

export default function ConstellationBackground({
  className = "",
  opacity = 0.8,
  density = 0.9,
  strokeWidth = 1.25,
  speed = 0.65,
  size = 1.15,
  length = 1.0,
  mode = "auto",
  background = "transparent",
}: ConstellationBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasCanvas, setHasCanvas] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setIsMounted(true);

    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setSystemTheme(isDark ? "dark" : "light");
    };
    updateTheme();

    const observer = new MutationObserver(() => updateTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("theme-change", updateTheme);

    // 1. Check Canvas 2D availability gracefully
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setHasCanvas(false);
      }
    } catch {
      setHasCanvas(false);
    }

    // 2. Reduced motion detection
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 3. Tab visibility detection (pause animation when tab is inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inView =
            rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(inView);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. IntersectionObserver: pause / freeze when section is off-screen
    let ioObserver: IntersectionObserver | null = null;
    if (containerRef.current && "IntersectionObserver" in window) {
      ioObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry) {
            setIsVisible(entry.isIntersecting && !document.hidden);
          }
        },
        { rootMargin: "100px" } // Pre-warm slightly before coming into view
      );
      ioObserver.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-change", updateTheme);
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (ioObserver) {
        ioObserver.disconnect();
      }
    };
  }, []);

  // Graceful fallback if Canvas is unavailable or SSR
  if (!isMounted || !hasCanvas) {
    return null;
  }

  const resolvedMode = mode === "auto" ? systemTheme : mode;
  const isLight = resolvedMode === "light";
  const targetHue = isLight ? 0 : 0;
  const targetSaturation = isLight ? 1.0 : 1.1;
  const targetBrightness = isLight ? 1.0 : 1.05;

  // Effective animation speed: 0 when off-screen or reduced-motion requested, else tuned smooth 0.65
  const activeSpeed = !isVisible ? 0 : isReducedMotion ? 0 : speed;

  return (
    <div
      ref={containerRef}
      className={`constellation-blue pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <DynamicConstellationField
        mode={resolvedMode}
        speed={activeSpeed}
        size={size}
        strokeWidth={strokeWidth}
        length={length}
        density={density}
        opacity={opacity}
        hue={targetHue}
        saturation={targetSaturation}
        brightness={targetBrightness}
        className="w-full h-full pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          background,
        }}
      />
    </div>
  );
}
