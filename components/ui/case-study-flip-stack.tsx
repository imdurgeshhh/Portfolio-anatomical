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
      className="absolute inset-x-0 top-0 aspect-[3/4] w-full will-change-transform sm:aspect-[1.76/1]"
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
        className="flex flex-col justify-between h-full overflow-hidden rounded-[clamp(14px,1.6vw,24px)] shadow-[0_16px_50px_rgba(30,80,140,0.18),0_0_30px_rgba(147,197,253,0.25)] border border-white/20 sm:grid sm:grid-cols-[0.7fr_1.3fr] sm:items-center"
        style={{
          backgroundColor: item.background,
          color: item.foreground ?? "white",
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        <div className="flex min-w-0 flex-col justify-between h-full p-[clamp(16px,2vw,32px)] md:pr-[clamp(12px,1.6vw,24px)]">
          <div className="flex items-start">
            <span className="text-[clamp(19px,2vw,28px)] font-mono font-medium leading-none tracking-[-0.06em]">
              {item.number ?? String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-auto max-w-[34rem] pt-3 sm:pt-4">
            <p className="mb-[clamp(6px,1vw,14px)] text-[9px] font-mono font-semibold uppercase tracking-[0.16em] opacity-75 sm:text-[11px]">
              {item.eyebrow}
            </p>
            <h2 className="text-balance text-[clamp(17px,2vw,26px)] font-sans font-semibold leading-[1.02] tracking-[-0.04em]">
              {item.title}
            </h2>
            <p className="mt-[clamp(8px,1vw,14px)] max-w-[32rem] text-[clamp(11px,0.9vw,13px)] font-sans leading-[1.4] opacity-85 line-clamp-3 sm:line-clamp-none">
              {item.description}
            </p>
          </div>
        </div>

        <div className="relative m-[clamp(8px,1vw,14px)] aspect-[2/1] overflow-hidden rounded-[clamp(10px,1.2vw,18px)] sm:ml-0 bg-black/40 backdrop-blur-xs border border-white/10 flex items-center justify-center shadow-inner self-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-contain p-1.5 sm:p-2"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
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
      className={cn("relative bg-transparent font-sans text-black", className)}
    >
      <div className="relative h-[82vh] min-h-[640px] overflow-hidden px-5 sm:px-10 flex flex-col justify-center items-center">
        <div className="absolute inset-x-0 top-[clamp(110px,16vh,165px)] flex items-center justify-center gap-[clamp(14px,2.5vw,32px)] text-[clamp(26px,3.5vw,52px)] font-sans font-light tracking-[-0.055em] text-black/70">
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>{hint}</span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
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

        <div className="absolute inset-x-5 top-[clamp(330px,43vh,440px)] flex justify-center sm:inset-x-10">
          <h1 className="max-w-[18ch] text-center text-[clamp(42px,5.5vw,82px)] font-sans font-semibold leading-[0.92] tracking-[-0.06em] text-black">
            {heading}
          </h1>
        </div>
      </div>

      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${(Math.max(safeItems.length, 1) + 1) * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[clamp(14px,4vw,64px)] py-8 pt-16">
          <div className="relative mx-auto aspect-[3/4] w-[80%] max-w-[688px] [perspective:800px] sm:w-full sm:aspect-[1.76/1]">
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

      <div className="flex min-h-[120vh] items-center justify-center px-5 sm:px-10">
        <p className="text-center text-[clamp(54px,9vw,144px)] font-sans font-semibold leading-none tracking-[-0.07em] text-black/80">
          {endLabel}
        </p>
      </div>
    </section>
  );
}
