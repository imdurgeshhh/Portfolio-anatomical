export interface ThreeUITechItem {
  name: string;
  category: "Frontend" | "Backend" | "Data & Cloud" | "Tools";
  description: string;
  badge: string;
  svg: string;
}

export const THREEUI_TECH_ITEMS: ThreeUITechItem[] = [
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Strict typed JavaScript for robust, scalable applications.",
    badge: "Language",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#3178c6]" style="color: #3178c6;" aria-hidden="true"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12 9.5h6v2.25h-1.875V20H13.875V11.75H12V9.5zm-5.75 3.375c.966 0 1.625.466 1.875 1.125l-1.5.75c-.125-.375-.375-.625-.75-.625-.375 0-.625.25-.625.5 0 .375.375.5 1 .75 1.25.5 1.875 1 1.875 2.125 0 1.5-1.125 2.5-2.75 2.5-1.25 0-2.25-.625-2.625-1.75l1.5-.75c.25.625.625.875 1.125.875.5 0 .875-.25.875-.625 0-.375-.25-.5-1-.75-1.125-.5-1.75-1-1.75-2.125 0-1.375 1-2.25 2.625-2.25z"/></svg>`,
  },
  {
    name: "React",
    category: "Frontend",
    description: "Declarative, component-based user interfaces.",
    badge: "Library",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-12 h-12 text-[#087ea4]" style="color: #087ea4;" aria-hidden="true"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>`,
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "The React framework for the web with App Router & SSR.",
    badge: "Framework",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-black" style="color: #000000;" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 17.514l-6.84-9.378H9.36v7.716H7.998V6.148h2.645l6.837 9.387V6.148h1.36v11.366h-.004z"/></svg>`,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS framework for rapid modern UI development.",
    badge: "Styling",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#06b6d4]" style="color: #06b6d4;" aria-hidden="true"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>`,
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Asynchronous event-driven JavaScript runtime.",
    badge: "Runtime",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#539e43]" style="color: #539e43;" aria-hidden="true"><path d="M12 0L2.1 5.7v12.6L12 24l9.9-5.7V5.7L12 0zm-1.2 18.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c1.6 0 3 .9 3.7 2.2l-1.6 1c-.4-.7-1.2-1.2-2.1-1.2-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3c.9 0 1.7-.5 2.1-1.2l1.6 1c-.7 1.3-2.1 2.2-3.7 2.2z"/></svg>`,
  },
  {
    name: "PostgreSQL",
    category: "Data & Cloud",
    description: "Enterprise-grade open-source relational database.",
    badge: "Database",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#336791]" style="color: #336791;" aria-hidden="true"><path d="M11.97 0C5.358 0 0 5.358 0 11.97c0 4.75 2.768 8.85 6.772 10.76v-4.045c-1.127-.375-1.92-1.425-1.92-2.665 0-1.545 1.253-2.798 2.798-2.798h.045v-2.02h-2.02c-.93 0-1.685-.755-1.685-1.685 0-.93.755-1.685 1.685-1.685h2.02V5.812c0-1.545 1.253-2.798 2.798-2.798h2.02v2.02h-2.02c-.43 0-.778.348-.778.778v2.02h4.04v-2.02c0-1.545 1.253-2.798 2.798-2.798h2.02v2.02h-2.02c-.43 0-.778.348-.778.778v2.02h2.02c.93 0 1.685.755 1.685 1.685 0 .93-.755 1.685-1.685 1.685h-2.02v2.02h.045c1.545 0 2.798 1.253 2.798 2.798 0 1.24-.793 2.29-1.92 2.665v4.045c4.004-1.91 6.772-6.01 6.772-10.76C23.94 5.358 18.582 0 11.97 0z"/></svg>`,
  },
  {
    name: "Python",
    category: "Backend",
    description: "Versatile language for AI, data pipelines, and backend logic.",
    badge: "Language",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#3776ab]" style="color: #3776ab;" aria-hidden="true"><path d="M11.914 0C5.82 0 6.193 2.656 6.193 2.656l.007 2.75h5.82v.825H3.882S0 5.79 0 11.933c0 6.14 3.398 5.922 3.398 5.922h2.027v-2.844s-.11-3.398 3.344-3.398h5.765s3.234.053 3.234-3.125V3.125S18.17 0 11.914 0zm-3.23 1.83a.96.96 0 1 1 0 1.918.96.96 0 0 1 0-1.918zM12.086 24c6.094 0 5.72-2.656 5.72-2.656l-.007-2.75h-5.82v-.825h8.138s3.882.44 3.882-5.703c0-6.14-3.398-5.922-3.398-5.922h-2.027v2.844s.11 3.398-3.344 3.398H9.665s-3.234-.053-3.234 3.125v5.367S5.83 24 12.086 24zm3.23-1.83a.96.96 0 1 1 0-1.918.96.96 0 0 1 0 1.918z"/></svg>`,
  },
  {
    name: "Docker",
    category: "Tools",
    description: "Containerization platform for reliable deployments.",
    badge: "DevOps",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#2496ed]" style="color: #2496ed;" aria-hidden="true"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.715h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.12a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm5.908 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H2.166a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185m21.808 1.493c-.328-.216-.927-.376-1.748-.376-.195 0-.406.012-.626.037-.47-1.89-1.957-2.954-3.83-2.954h-1.572v3.714a.186.186 0 01-.186.185H.186A.186.186 0 000 13.064c.03.272.08.54.148.804.757 2.953 3.328 5.485 7.152 6.55 1.554.433 3.238.647 4.965.647 7.078 0 11.516-4.225 11.707-8.835.004-.085.004-.17-.002-.255"/></svg>`,
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Distributed version control and open-source collaboration.",
    badge: "VCS",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#f05032]" style="color: #f05032;" aria-hidden="true"><path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.83 2.564l2.673 2.673a1.777 1.777 0 0 1 2.247 2.261l2.57 2.57a1.777 1.777 0 0 1 2.26 2.25l3.966-3.966a1.503 1.503 0 0 0 0-2.122zM12.43 14.77a1.778 1.778 0 0 1-2.261-2.247L7.6 9.953a1.777 1.777 0 0 1-2.25-2.26L.452 12.59a1.5 1.5 0 0 0 0 2.124l10.478 10.478a1.502 1.502 0 0 0 2.126 0l4.3-4.3-2.674-2.673a1.777 1.777 0 0 1-2.252-3.449z"/></svg>`,
  },
  {
    name: "GraphQL",
    category: "Backend",
    description: "Precise query language and flexible runtime for APIs.",
    badge: "API",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#e10098]" style="color: #e10098;" aria-hidden="true"><path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.2l8.5 4.9v9.8L12 21.8l-8.5-4.9V7.1L12 2.2zm0 3.3L5.5 9.2v5.6L12 18.5l6.5-3.7V9.2L12 5.5z"/></svg>`,
  },
  {
    name: "Redis",
    category: "Data & Cloud",
    description: "In-memory data store for ultra-fast caching and pub/sub.",
    badge: "Cache",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-[#dc382d]" style="color: #dc382d;" aria-hidden="true"><path d="M12 0L0 6.9v10.2L12 24l12-6.9V6.9L12 0zm0 2.3l9.9 5.7L12 13.7 2.1 8 12 2.3zm-10 7.5l9 5.2v8.7l-9-5.2V9.8zm11 13.9v-8.7l9-5.2v8.7l-9 5.2z"/></svg>`,
  },
  {
    name: "Framer Motion",
    category: "Frontend",
    description: "Production-ready motion library for interactive React apps.",
    badge: "Motion",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-black" style="color: #000000;" aria-hidden="true"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>`,
  },
];
