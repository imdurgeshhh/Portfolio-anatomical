"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Signature } from "@/components/ui/signature";
import { useResponsiveFontSize } from "@/hooks/use-responsive-font-size";
import { ShaderButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

export default function GlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fontSize = useResponsiveFontSize(64);

  // Refs for animation loop
  const rawPos = useRef({ x: -999, y: -999 });
  const smoothedPos = useRef({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouch = useRef(false);
  const frameId = useRef<number>(0);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data?.type === "threeui-shader-button-click" ||
        e.data?.type === "shader-button-click"
      ) {
        document.getElementById("slide-section")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateLoop = () => {
      const posFactor = isReducedMotion.current ? 1 : 0.14;
      const radFactor = isReducedMotion.current ? 1 : 0.12;

      // Interpolate position
      if (rawPos.current.x !== -999 && rawPos.current.y !== -999) {
        if (smoothedPos.current.x === -999) {
          smoothedPos.current.x = rawPos.current.x;
          smoothedPos.current.y = rawPos.current.y;
        } else {
          smoothedPos.current.x += (rawPos.current.x - smoothedPos.current.x) * posFactor;
          smoothedPos.current.y += (rawPos.current.y - smoothedPos.current.y) * posFactor;
        }
      }

      // Interpolate radius
      currentRadius.current += (targetRadius.current - currentRadius.current) * radFactor;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--reveal-x", `${smoothedPos.current.x}px`);
        containerRef.current.style.setProperty("--reveal-y", `${smoothedPos.current.y}px`);
        containerRef.current.style.setProperty("--reveal-radius", `${currentRadius.current}px`);
      }

      frameId.current = requestAnimationFrame(updateLoop);
    };

    frameId.current = requestAnimationFrame(updateLoop);

    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      isTouch.current = true;
      targetRadius.current = MOBILE_RADIUS;
    } else {
      isTouch.current = false;
      targetRadius.current = DESKTOP_RADIUS;
    }
    rawPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    rawPos.current = { x: e.clientX, y: e.clientY };
    if (e.pointerType !== "touch") {
      targetRadius.current = DESKTOP_RADIUS;
    } else if (isTouch.current) {
      targetRadius.current = MOBILE_RADIUS;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    targetRadius.current = 0;
    if (e.pointerType === "touch") {
      isTouch.current = false;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] overflow-hidden selection:bg-[#F5C451]/30 flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-10 z-10"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerDown={handlePointerEnter}
    >
      {/* 1. Base Portrait Layer (Smooth crossfade between light & dark) */}
      <div className="absolute inset-0 w-full h-full -z-20 base-portrait-anim pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Light Base */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0">
          <Image
            src="/images/Base_image_desktop.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
          />
        </div>
        {/* Dark Base */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100">
          <Image
            src="/images/Base_image_dark.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
          />
        </div>
      </div>

      {/* 2. Reveal Portrait with Radial Mask (Smooth crossfade between light & dark) */}
      <div className="absolute inset-0 w-full h-full -z-10 reveal-mask pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Light Reveal */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0">
          <Image
            src="/images/Reveal_image_desktop.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
          />
        </div>
        {/* Dark Reveal */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100">
          <Image
            src="/images/Reveal_image_dark.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Ambient Golden Rim Light Glow in Dark Mode */}
      <div
        className="absolute top-1/3 right-[5%] w-[550px] h-[550px] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none -z-15 opacity-0 dark:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* 3. Technical Aesthetic Circle */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-5 opacity-10 dark:opacity-20 flex items-center justify-center transition-opacity"
        aria-hidden="true"
      >
        <div className="w-[80vmin] h-[80vmin] rounded-full border border-black/10 dark:border-[#F5C451]/30 dark:shadow-[0_0_80px_rgba(245,196,81,0.08)] transition-colors duration-500" />
      </div>

      {/* 4. Top-Left and Top-Right Micro Labels */}
      <div className="relative z-30 px-[max(5.6vw,2rem)] flex items-center justify-between pointer-events-none mb-auto">
        <span className="font-mono text-[10px] sm:text-xs text-black/50 dark:text-[#F5C451]/80 tracking-widest uppercase transition-colors">
          INTERACTIVE DIMENSION · HOVER TO REVEAL
        </span>
        <span className="font-mono text-[10px] sm:text-xs text-black/40 dark:text-amber-200/50 tracking-wider hidden sm:inline transition-colors">
          Curated Visual Experience
        </span>
      </div>

      {/* 5. Left Column Content: Heading, Subtext, Button */}
      <div className="relative z-30 px-[max(5.6vw,2rem)] my-auto max-w-2xl py-6">
        {/* Animated handwritten SVG signature with accessible text */}
        <div
          className="w-full overflow-visible relative select-none flex items-center"
          style={{ minHeight: `${fontSize * 3}px` }}
        >
          <h1 className="sr-only">Durgesh</h1>
          <Signature
            text="Durgesh"
            fontSize={fontSize}
            duration={1.5}
            delay={0.3}
            className="max-w-full h-auto"
          />
        </div>

        {/* Short paragraph text */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base font-sans font-normal text-black/80 dark:text-neutral-300 leading-relaxed max-w-md copy-fade-anim delay-[450ms] transition-colors">
          I build useful products, experiment with emerging technology, and turn the process into stories worth sharing.
        </p>

        {/* ThreeUI ShaderButtons (Star Portal) replacing 'Explore my work' button */}
        <div className="mt-6 sm:mt-8 copy-fade-anim delay-[600ms]">
          <div
            className="w-full max-w-[320px] sm:max-w-[360px] h-[90px] sm:h-[105px] relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-[#F5C451]/30 dark:shadow-[0_0_35px_rgba(245,196,81,0.2)] transition-all active:scale-[0.98] cursor-pointer"
            onClick={() => {
              document.getElementById("slide-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="sr-only">Explore my work</span>
            <ShaderButtons
              mode="dark"
              hue={0}
              saturation={1.00}
              brightness={1.00}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom spacing buffer */}
      <div className="h-4 sm:h-6 pointer-events-none mt-auto" />
    </section>
  );
}
