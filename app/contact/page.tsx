export default function ContactPage() {
  return (
    <div className="px-[max(5.6vw,2rem)] pt-28 pb-20 md:pt-32 md:pb-28 flex-1 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#F5C451]" />
          <span className="font-mono text-xs text-black/60 dark:text-[#F5C451]/80 tracking-widest uppercase">
            Let&apos;s Build Together
          </span>
        </div>
        <h1 className="font-sans font-light uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight mb-6 text-black dark:text-white transition-colors">
          Contact
        </h1>
        <p className="text-lg sm:text-xl font-sans font-light text-black/80 dark:text-neutral-300 max-w-2xl leading-relaxed transition-colors">
          Have an idea, project, or role you&apos;d like to discuss? Reach out and let&apos;s start a conversation.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Direct Email Card */}
        <div className="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md shadow-sm">
          <span className="font-mono text-xs text-black/50 dark:text-[#F5C451]/80 tracking-wider uppercase block mb-3">
            Direct Email
          </span>
          <h2 className="text-2xl font-sans font-semibold text-black dark:text-white mb-2">
            durgesh@example.com
          </h2>
          <p className="text-sm text-black/70 dark:text-neutral-400 mb-6">
            Feel free to send a message directly. I typically respond within 24-48 hours.
          </p>
          <a
            href="mailto:durgesh@example.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-black text-white dark:bg-[#F5C451] dark:text-black hover:opacity-90 transition-opacity"
          >
            Send Email
          </a>
        </div>

        {/* Social / Professional Profiles Card */}
        <div className="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-black/50 dark:text-[#F5C451]/80 tracking-wider uppercase block mb-3">
              Connect Online
            </span>
            <h2 className="text-2xl font-sans font-semibold text-black dark:text-white mb-2">
              Profiles & Code
            </h2>
            <p className="text-sm text-black/70 dark:text-neutral-400 mb-6">
              Check out my code repositories, public projects, and network updates.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/imdurgeshhh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-[#F5C451]/50 bg-white/40 dark:bg-white/[0.02] transition-colors"
            >
              <span className="font-sans text-sm font-medium text-black dark:text-white">GitHub</span>
              <span className="font-mono text-xs text-black/50 dark:text-white/50">@imdurgeshhh →</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-[#F5C451]/50 bg-white/40 dark:bg-white/[0.02] transition-colors"
            >
              <span className="font-sans text-sm font-medium text-black dark:text-white">LinkedIn</span>
              <span className="font-mono text-xs text-black/50 dark:text-white/50">Connect →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
