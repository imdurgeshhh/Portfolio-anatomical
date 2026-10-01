import Link from "next/link";
import { ResumeDownloadButton } from "@/components/resume-download-button";

export default function AboutPage() {
  return (
    <div className="px-[max(5.6vw,2rem)] pt-28 pb-20 md:pt-32 md:pb-28 flex-1 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#F5C451]" />
          <span className="font-mono text-xs text-black/60 dark:text-[#F5C451]/80 tracking-widest uppercase">
            Background & Philosophy
          </span>
        </div>
        <h1 className="font-sans font-light uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight mb-6 text-black dark:text-white transition-colors">
          About Me
        </h1>
        <p className="text-lg sm:text-xl font-sans font-light text-black/80 dark:text-neutral-300 max-w-2xl leading-relaxed transition-colors">
          I build useful products, experiment with emerging technology, and turn the process into stories worth sharing.
        </p>
      </div>

      {/* Main Bio Card */}
      <div className="p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md mb-12 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-sans font-semibold text-black dark:text-white mb-4">
          Software Developer & Creative Technologist
        </h2>
        <div className="space-y-4 text-base font-sans text-black/75 dark:text-neutral-300 leading-relaxed">
          <p>
            I focus on bridging the divide between high-performance systems and tactile, responsive user interfaces.
            From database schemas and distributed web apps to real-time WebSockets, WebRTC, and custom Three.js canvas shaders,
            I love crafting complete software experiences.
          </p>
          <p>
            When I&apos;m not writing code, I&apos;m exploring new visual interaction paradigms, prototyping emerging browser APIs,
            and contributing to open source ecosystems.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-4">
          <ResumeDownloadButton />
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full text-sm font-medium border border-black/20 dark:border-white/20 text-black dark:text-white hover:border-black dark:hover:border-[#F5C451] transition-all"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.02]">
          <span className="font-mono text-xs uppercase tracking-wider text-black/50 dark:text-[#F5C451]/80 block mb-2">Focus</span>
          <h3 className="font-sans font-semibold text-base text-black dark:text-white mb-1">Full-Stack Architecture</h3>
          <p className="font-sans text-xs text-black/60 dark:text-neutral-400">Next.js, TypeScript, PostgreSQL, REST & WebSockets</p>
        </div>
        <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.02]">
          <span className="font-mono text-xs uppercase tracking-wider text-black/50 dark:text-[#F5C451]/80 block mb-2">Design</span>
          <h3 className="font-sans font-semibold text-base text-black dark:text-white mb-1">Micro-Interactions</h3>
          <p className="font-sans text-xs text-black/60 dark:text-neutral-400">Framer Motion, CSS Houdini, WebGL Shaders, Spring Physics</p>
        </div>
        <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.02]">
          <span className="font-mono text-xs uppercase tracking-wider text-black/50 dark:text-[#F5C451]/80 block mb-2">Values</span>
          <h3 className="font-sans font-semibold text-base text-black dark:text-white mb-1">Pixel Precision</h3>
          <p className="font-sans text-xs text-black/60 dark:text-neutral-400">Sub-second render speeds, accessibility, fluid responsive bounds</p>
        </div>
      </div>
    </div>
  );
}
