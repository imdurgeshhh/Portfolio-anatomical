"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

export default function GlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation loop
  const rawPos = useRef({ x: -999, y: -999 });
  const smoothedPos = useRef({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouch = useRef(false);
  const frameId = useRef<number>();
  const isReducedMotion = useRef(false);

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
      className="relative w-full h-screen overflow-hidden selection:bg-white/30"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerDown={handlePointerEnter}
    >
      {/* 1. Base Portrait */}
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover -z-20 base-portrait-anim"
        style={{ backgroundImage: "url('/images/Base_image_desktop.png')" }}
        aria-hidden="true"
      />
      
      {/* 2. Reveal Portrait with Radial Mask */}
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover -z-10 reveal-mask"
        style={{ backgroundImage: "url('/images/Reveal_image_desktop.png')" }}
        aria-hidden="true"
      />

      {/* 3. Technical Grid and Large Circle */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-5 opacity-10 flex items-center justify-center" aria-hidden="true">
        {/* Simple grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />
        {/* Large circle */}
        <div className="w-[80vmin] h-[80vmin] rounded-full border border-white/20" />
      </div>

      {/* 5. Navigation */}
      <header className="absolute top-[max(2.5rem,env(safe-area-inset-top))] left-[max(5.6vw,2rem)] right-[max(5.6vw,2rem)] z-50 flex items-center justify-between nav-anim">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white" aria-hidden="true">
            <path d="M22 10L10 22M10 10L22 22" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
            <path d="M16 4L4 16L16 28L28 16L16 4Z" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-xl font-medium tracking-tight">Durgesh</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["About", "Work", "Process", "Experiments"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center">
              {item}
            </Link>
          ))}
        </nav>

        <a 
          href="https://www.linkedin.com/in/durgesh-nandan-sahu-fullstack-developer/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black text-sm font-medium px-5 min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Let&apos;s talk
        </a>
      </header>

      {/* 4. Headline and copy */}
      <div className="absolute top-[34%] left-[max(5.6vw,2rem)] z-40">
        <h1 className="flex flex-col m-0 p-0 font-albert font-light uppercase" style={{ fontSize: "clamp(5.4rem, 6.2vw, 6.8rem)", lineHeight: 0.93, letterSpacing: "-0.085em" }}>
          <span className="overflow-hidden inline-block"><span className="block heading-line-anim delay-[100ms]">Building</span></span>
          <span className="overflow-hidden inline-block"><span className="block heading-line-anim delay-[200ms]">Beyond</span></span>
          <span className="overflow-hidden inline-block"><span className="block heading-line-anim delay-[300ms]">Possible.</span></span>
        </h1>
      </div>

      {/* Bottom left copy and CTA */}
      <div className="absolute bottom-12 md:bottom-16 left-[max(5.6vw,2rem)] max-w-sm z-40 copy-fade-anim delay-[500ms]">
        <p className="text-lg md:text-xl font-albert font-light text-white/90 leading-relaxed mb-6">
          I build useful products, experiment with emerging technology, and turn the process into stories worth sharing.
        </p>
        <a 
          href="https://github.com/imdurgeshhh" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex bg-white text-black text-sm font-medium px-6 min-h-[44px] items-center justify-center rounded-full hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Explore my work
        </a>
      </div>

      {/* Bottom right manifesto */}
      <div className="absolute bottom-12 md:bottom-16 right-[max(5.6vw,2rem)] z-40 copy-fade-anim delay-[700ms] hidden sm:block">
        <p className="font-fragment text-xs text-white/60 text-right leading-loose tracking-widest uppercase">
          Building the<br />
          next version<br />
          in public
        </p>
      </div>
    </section>
  );
}
