"use client";

import { useState, useMemo } from "react";
import { CharacterCarousel } from "@/components/threeui/CharacterCarousel";
import "@/components/threeui/threeui.css";
import { THREEUI_TECH_ITEMS, type ThreeUITechItem } from "@/components/threeui/tech-data";

type Category = "All" | "Frontend" | "Backend" | "Data & Cloud" | "Tools";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Frontend", "Backend", "Data & Cloud", "Tools"];

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return THREEUI_TECH_ITEMS;
    }
    const matched = THREEUI_TECH_ITEMS.filter((item) => item.category === activeCategory);
    // For 3D perspective looping rail, ensure at least 6 cards for smooth spatial continuity
    if (matched.length > 0 && matched.length < 6) {
      const repeated: ThreeUITechItem[] = [];
      while (repeated.length < 6) {
        repeated.push(...matched);
      }
      return repeated;
    }
    return matched;
  }, [activeCategory]);

  return (
    <section id="tech-stack" className="w-full px-[max(5.6vw,2rem)] py-16 md:py-24 z-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header with Title and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-black/10 dark:border-white/10 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-black/80 dark:bg-[#F5C451] transition-colors" />
              <h2 className="font-mono text-xs text-black/60 dark:text-[#F5C451]/80 tracking-widest uppercase transition-colors">
                Technical Capabilities
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-black dark:text-white transition-colors">
              Tech Stack & Tooling
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ease-out-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-[#F5C451] ${
                    isActive
                      ? "bg-black text-white dark:bg-[#F5C451] dark:text-black shadow-sm"
                      : "bg-white/60 text-black/70 hover:bg-white hover:text-black border border-black/10 dark:bg-white/[0.05] dark:text-white/70 dark:border-white/10 dark:hover:bg-white/15 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ThreeUI Filmstrip Carousel with Glass Aesthetics */}
        <div className="tech-carousel-frame tech-carousel-glass rounded-3xl relative overflow-hidden">
          <CharacterCarousel
            variant="filmstrip"
            speed={1.0}
            scale={1.0}
            opacity={1.0}
            hue={0}
            saturation={1.0}
            brightness={1.0}
            items={filteredItems}
          />
        </div>

        {/* Tactile Control & Perspective Rail Hint */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-black/5 dark:border-white/10 text-[10px] sm:text-[11px] font-mono text-black/50 dark:text-white/50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-[#F5C451] animate-pulse" />
            <span>3D Looping Perspective Rail · Drag, scroll, or use ← → keys</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{THREEUI_TECH_ITEMS.length} Technologies Indexed</span>
            <span className="hidden sm:inline">Click any card to center focus</span>
          </div>
        </div>
      </div>
    </section>
  );
}
