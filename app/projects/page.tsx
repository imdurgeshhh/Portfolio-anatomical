import Image from "next/image";

interface ProjectItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  link?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "1",
    eyebrow: "Healthcare",
    title: "Pharmacy Management & POS Billing System",
    description:
      "Full-stack pharmacy operations platform with inventory tracking, POS billing, and supplier management. Built with React, Node.js, Express, PostgreSQL, and Clerk.",
    image: "/images/projects/pharmacy.png",
    imageAlt: "Pharmacy Management & POS Billing System",
    tags: ["React", "Node.js", "PostgreSQL", "Clerk"],
  },
  {
    id: "2",
    eyebrow: "Marketplace",
    title: "CarMax — Full-Stack Car Marketplace",
    description:
      "Web marketplace for browsing and listing vehicles with real-time buyer-seller chat and image uploads. Built with React 19, Neon PostgreSQL, Drizzle ORM, and Sendbird.",
    image: "/images/projects/carmax.png",
    imageAlt: "CarMax vehicle marketplace interface",
    tags: ["React 19", "Neon PostgreSQL", "Drizzle", "Sendbird"],
  },
  {
    id: "3",
    eyebrow: "Landing Page",
    title: "JBL Tune 720BT Product Landing Page",
    description:
      "Responsive product marketing landing page showcasing audio features, battery specs, and hero visuals. Built with React 19 and Vite.",
    image: "/images/projects/jbl.png",
    imageAlt: "JBL Tune 720BT product showcase",
    tags: ["React 19", "Vite", "Tailwind CSS"],
  },
  {
    id: "4",
    eyebrow: "Real-Time App",
    title: "Real-Time Technical Interview Platform",
    description:
      "Collaborative technical interview platform featuring WebRTC video calling and Monaco code editing. Built with Java Spring Boot, WebSockets, React, and Vite.",
    image: "/images/projects/interview-platform.svg",
    imageAlt: "Real-Time Interview Platform architecture",
    tags: ["Spring Boot", "WebRTC", "WebSockets", "Monaco Editor"],
  },
  {
    id: "5",
    eyebrow: "E-Commerce",
    title: "Responsive Phone & Gadget Shopping Store",
    description:
      "Responsive electronics shopping store with dynamic product catalog, category filters, and cart workflows. Built with HTML5, CSS3, and JavaScript.",
    image: "/images/projects/phone-shopping.svg",
    imageAlt: "Phone & Gadget Shopping Store",
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "6",
    eyebrow: "Utility Billing",
    title: "WaterMeter — Usage & Invoice Management",
    description:
      "Utility billing application for logging meter readings, tracking unit charges, and generating PDF invoices. Built with React 19, Redux Toolkit, and Tailwind CSS.",
    image: "/images/projects/watermeter.png",
    imageAlt: "WaterMeter invoice and billing dashboard",
    tags: ["React 19", "Redux Toolkit", "Tailwind CSS"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-[max(5.6vw,2rem)] pt-28 pb-20 md:pt-32 md:pb-28 flex-1 w-full max-w-6xl mx-auto">
      {/* Header section */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-[#F5C451] animate-pulse" />
          <span className="font-mono text-xs text-black/60 dark:text-[#F5C451]/80 tracking-widest uppercase">
            Shipped Applications & Experiments
          </span>
        </div>
        <h1 className="font-sans font-light uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight mb-4 text-black dark:text-white transition-colors">
          Featured Projects
        </h1>
        <p className="text-base sm:text-lg text-black/70 dark:text-neutral-300 max-w-2xl transition-colors">
          A showcase of full-stack web platforms, design systems, and real-time interactive tools built with modern technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {PROJECTS_DATA.map((project, idx) => (
          <article
            key={project.id}
            className="group flex flex-col justify-between rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md hover:border-black/30 dark:hover:border-[#F5C451]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            {/* Card Visual / Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 dark:bg-black/30 border-b border-black/5 dark:border-white/10">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/60 dark:bg-black/80 text-white backdrop-blur-md border border-white/20">
                  {project.eyebrow}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/40 text-white/90 backdrop-blur-md">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-[#F5C451] transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm font-sans text-black/70 dark:text-white/70 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/5 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
