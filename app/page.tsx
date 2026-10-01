import GlassHero from "@/components/glass-hero";
import HeroSlider from "@/components/hero-slider";
import TechStack from "@/components/tech-stack";
import SectionBridge from "@/components/section-bridge";
import ConstellationBackground from "@/components/constellation-background";
import { ResumeDownloadButton } from "@/components/resume-download-button";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (as per screenshot: headline, subtext, button, portrait image) */}
      <GlassHero />

      {/* Animated organic transition between Hero and Tech Stack */}
      <SectionBridge />

      {/* 2. Tech stack icons block */}
      <TechStack />

      {/* 3. Slide/carousel section with summary text (Spotlight / Case Study Flip Stack) */}
      <HeroSlider />

      {/* 4. Remaining page content (Resume, What I Do) with ConstellationField animated background */}
      <section className="relative [isolation:isolate] overflow-hidden px-[max(5.6vw,2rem)] py-20 md:py-28 z-10 transition-colors duration-500">
        {/* Faint radial glow backdrop */}
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,_#e8f5fe_0%,_#dce9f7_60%,_#cee4f7_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,_#0e1428_0%,_#070914_60%,_#070914_100%)] transition-opacity duration-500"
          aria-hidden="true"
        />
        {/* Ambient luminescence glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-sky-200/50 dark:bg-amber-500/10 blur-[110px] dark:blur-[140px] pointer-events-none z-0 transition-all duration-500"
          aria-hidden="true"
        />

        {/* Constellation Field Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <ConstellationBackground background="transparent" mode="auto" />
        </div>

        {/* Soft edge blend overlays to transition seamlessly from previous section & to footer */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#dce9f7] via-[#dce9f7]/50 dark:from-[#070914] dark:via-[#070914]/60 to-transparent z-[1] pointer-events-none transition-colors duration-500"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#dce9f7] via-[#dce9f7]/50 dark:from-[#070914] dark:via-[#070914]/60 to-transparent z-[1] pointer-events-none transition-colors duration-500"
          aria-hidden="true"
        />

        {/* Section Content */}
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Intro Section */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-sans font-light text-black/90 dark:text-white/90 leading-relaxed mb-8 transition-colors max-w-3xl">
              I am a software developer obsessed with bridging the gap between clean code and stunning interfaces. 
              Currently exploring new patterns in full-stack architecture and interactive web experiences.
            </h2>
            <ResumeDownloadButton />
          </div>

          {/* What I Do Section */}
          <div>
            <h3 className="font-mono text-xs text-black/60 dark:text-[#F5C451]/75 tracking-widest uppercase mb-8 transition-colors">What I Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Web Applications", desc: "Building scalable, performant apps with Next.js and React." },
                { title: "UI/UX Development", desc: "Crafting pixel-perfect, animated interfaces." },
                { title: "Backend Systems", desc: "Designing robust APIs and database schemas." },
                { title: "Open Source", desc: "Contributing to the community and building in public." }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-black/10 dark:border-white/10 rounded-2xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md hover:border-black/25 dark:hover:border-[#F5C451]/40 transition-all shadow-xs">
                  <h4 className="font-sans font-medium text-lg mb-2 text-black/90 dark:text-white/90 transition-colors">{item.title}</h4>
                  <p className="font-sans text-black/70 dark:text-white/70 text-sm transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
