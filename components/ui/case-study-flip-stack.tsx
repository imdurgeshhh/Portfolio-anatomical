"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

export interface CaseStudyFlipItem {
  number?: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  background: string;
  foreground?: string;
}

interface CaseStudyFlipStackProps {
  items?: CaseStudyFlipItem[];
  className?: string;
  hint?: string;
  heading?: string;
  endLabel?: string;
}

const DEFAULT_ITEMS: CaseStudyFlipItem[] = [
  {
    eyebrow: "Full-Stack Web App",
    title: "E-Commerce Analytics & Operations Dashboard",
    description:
      "Engineered a real-time analytics platform with Next.js App Router and PostgreSQL, streamlining multi-store inventory and checkout workflows.",
    image: "/images/Base_image_desktop.png",
    imageAlt: "Full-stack analytics interface visualization",
    background: "#0c1929",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Interactive Experience",
    title: "Tactile Creative Portfolio & Micro-Interactions",
    description:
      "Crafted compositor-accelerated spring animations, custom shaders, and tactile feedback layers that elevate narrative storytelling.",
    image: "/images/Reveal_image_desktop.png",
    imageAlt: "Interactive creative portfolio showcase",
    background: "#1e3a8a",
    foreground: "#ffffff",
  },
  {
    eyebrow: "AI & Emerging Tech",
    title: "Autonomous Agentic Systems & Multimodal Pipelines",
    description:
      "Integrated cutting-edge LLMs and streaming interfaces into intuitive products, bridging complex generative AI with accessible user experiences.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%231e1b4b'/><stop offset='50%25' stop-color='%23172554'/><stop offset='100%25' stop-color='%230f172a'/></linearGradient><radialGradient id='glow' cx='50%25' cy='50%25' r='50%25'><stop offset='0%25' stop-color='%2338bdf8' stop-opacity='0.4'/><stop offset='100%25' stop-color='%2338bdf8' stop-opacity='0'/></radialGradient></defs><rect width='800' height='600' fill='url(%23bg)'/><circle cx='400' cy='300' r='250' fill='url(%23glow)'/><circle cx='400' cy='300' r='180' fill='none' stroke='%2338bdf8' stroke-width='1.5' stroke-dasharray='6 6' opacity='0.6'/><circle cx='400' cy='300' r='120' fill='none' stroke='%2393c5fd' stroke-width='2' opacity='0.8'/><circle cx='400' cy='300' r='60' fill='%2360a5fa' opacity='0.25'/><path d='M360 300 L440 300 M400 260 L400 340' stroke='%23ffffff' stroke-width='3' stroke-linecap='round'/></svg>",
    imageAlt: "AI Agentic Workflows diagrammatic preview",
    background: "#1e1b4b",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Design Engineering",
    title: "Accessible Design Systems & Token Architecture",
    description:
      "Architected responsive design token libraries and reusable headless components, standardizing brand coherence and sub-second rendering performance.",
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='bg2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23083344'/><stop offset='50%25' stop-color='%230e7490'/><stop offset='100%25' stop-color='%23042f2e'/></linearGradient><radialGradient id='glow2' cx='50%25' cy='50%25' r='50%25'><stop offset='0%25' stop-color='%2322d3ee' stop-opacity='0.35'/><stop offset='100%25' stop-color='%2322d3ee' stop-opacity='0'/></radialGradient></defs><rect width='800' height='600' fill='url(%23bg2)'/><circle cx='400' cy='300' r='240' fill='url(%23glow2)'/><rect x='280' y='200' width='240' height='200' rx='20' fill='none' stroke='%23a5f3fc' stroke-width='2' opacity='0.7'/><rect x='320' y='240' width='160' height='120' rx='14' fill='%2322d3ee' fill-opacity='0.15' stroke='%2367e8f9' stroke-width='1.5'/><circle cx='400' cy='300' r='24' fill='%23ffffff' opacity='0.9'/></svg>",
    imageAlt: "Design Token Architecture preview",
    background: "#083344",
    foreground: "#ffffff",
  },
];

function FlipCard({
  item,
  index,
  total,
  progress,
  reduceMotion,
}: {
  item: CaseStudyFlipItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd =
    index === 0
      ? 0.0001
      : Math.min(start, entryStart + segment * 0.7);
  const exitStart = start;
  const exitEnd = end;
  const stackedCardGap = Math.min(24, 72 / Math.max(total - 1, 1));
  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 12, 34);
  const restingScale = 1 - Math.min(index * 0.012, 0.035);

  const isLast = index === total - 1;
  const exitYPercent = useTransform(
    progress,
    [exitStart, exitEnd],
    isLast || reduceMotion ? [0, 0] : [0, -135],
  );
  const exitStackOffset = useTransform(
    progress,
    [exitStart, exitEnd],
    isLast || reduceMotion ? [0, 0] : [0, -20],
  );
  const exitY = useMotionTemplate`calc(${exitYPercent}% + ${exitStackOffset}px)`;
  const rotateX = useTransform(
    progress,
    [exitStart, exitEnd],
    isLast || reduceMotion ? [0, 0] : [0, 22],
  );
  const opacity = useTransform(
    progress,
    isLast
      ? [exitStart, exitEnd]
      : reduceMotion
      ? [exitStart, exitEnd]
      : [exitStart, exitStart + segment * 0.65, exitEnd],
    isLast ? [1, 1] : reduceMotion ? [1, 0] : [1, 0.7, 0],
  );
  const pointerEvents = useTransform(progress, (p) =>
    !isLast && p >= exitEnd ? "none" : "auto",
  );
  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1],
  );
  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0],
  );

  return (
    <motion.article
      className="absolute inset-x-0 top-0 w-full h-[480px] sm:h-auto sm:aspect-[1.8/1] will-change-transform"
      style={{
        y: exitY,
        rotateX,
        opacity,
        pointerEvents,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="flex flex-col justify-between h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.25)] border border-white/20 sm:grid sm:grid-cols-[0.85fr_1.15fr] sm:items-center transition-shadow"
        style={{
          backgroundColor: item.background,
          color: item.foreground ?? "white",
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        <div className="flex min-w-0 flex-col justify-between h-full p-5 sm:p-7 md:p-8">
          {/* Header row with Eyebrow and Number */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15">
              {item.eyebrow}
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium opacity-60">
              {item.number ?? String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Text block */}
          <div className="my-auto py-2 sm:py-3">
            <h2 className="text-balance text-lg sm:text-2xl font-sans font-semibold leading-snug tracking-tight">
              {item.title}
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-sans leading-relaxed opacity-85 line-clamp-3 sm:line-clamp-4">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Shipped & Deployed</span>
          </div>
        </div>

        {/* Project Preview Image */}
        <div className="relative m-3 sm:m-4 sm:ml-0 aspect-[16/10] overflow-hidden rounded-xl bg-black/40 backdrop-blur-xs border border-white/10 flex items-center justify-center shadow-inner self-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-cover object-center"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function CaseStudyFlipStack({
  items = DEFAULT_ITEMS,
  className,
  hint = "Scroll to Explore",
  heading = "Featured Spotlight.",
  endLabel = "More Soon",
}: CaseStudyFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const safeItems = items.length > 0 ? items : DEFAULT_ITEMS;
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
    restDelta: 0.0005,
  });
  const cardProgress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <section
      className={cn("relative bg-transparent font-sans text-black dark:text-white w-full", className)}
    >
      {/* Intro Heading Section */}
      <div className="relative py-16 sm:py-24 px-5 sm:px-10 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-black/60 dark:text-[#F5C451]/80 mb-3 transition-colors">
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>{hint}</span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={{
              duration: 1.4,
              delay: 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-black dark:text-white transition-colors">
          {heading}
        </h2>
      </div>

      {/* Pinned Card Flip Stack */}
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${safeItems.length * 85 + 40}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-4 sm:px-8 py-8 pt-16 sm:pt-20">
          <div className="relative mx-auto w-full max-w-[760px] h-[480px] sm:h-auto sm:aspect-[1.8/1] [perspective:1000px]">
            {[...safeItems].reverse().map((item, reverseIndex) => {
              const index = safeItems.length - reverseIndex - 1;
              return (
                <FlipCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  total={safeItems.length}
                  progress={cardProgress}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* End Buffer Section */}
      <div className="py-20 sm:py-28 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-black/70 dark:text-white/70 transition-colors">
          {endLabel}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#F5C451] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-black/50 dark:text-white/50">
            More Case Studies In Progress
          </span>
        </div>
      </div>
    </section>
  );
}
