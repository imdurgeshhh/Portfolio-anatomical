"use client";

import { useState } from "react";

type Category = "All" | "Web Applications" | "Webpages";

interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  link: string;
  imageUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    category: "Web Applications",
    description: "A full-stack dashboard for managing online stores with real-time analytics.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Creative Agency Portfolio",
    category: "Webpages",
    description: "A visually stunning, animated portfolio for a boutique design agency.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "AI Chat Interface",
    category: "Web Applications",
    description: "A sleek conversational UI integrated with OpenAI's GPT models.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Local Cafe Website",
    category: "Webpages",
    description: "A fast, SEO-optimized landing page for a local coffee shop.",
    link: "#",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
  }
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredProjects = PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <div className="px-[max(5.6vw,2rem)] py-24 md:py-32 flex-1 w-full max-w-7xl mx-auto">
      {/* Header section */}
      <div className="mb-12">
        <h1 className="font-albert font-light uppercase text-5xl md:text-7xl mb-6 tracking-[-0.05em] leading-none">
          Work
        </h1>
        <p className="text-xl font-albert font-light text-black/80 max-w-2xl">
          A collection of projects showcasing my focus on clean design, interactive experiences, and robust architectures.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-16">
        {(["All", "Web Applications", "Webpages"] as Category[]).map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
              activeFilter === category 
                ? "bg-black text-white border-black border" 
                : "bg-transparent text-black border-black/20 border hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <a 
            key={project.id} 
            href={project.link} 
            className="group block"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 mb-6 relative border border-black/10">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('" + project.imageUrl + "')" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-albert font-medium text-xl">{project.title}</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/0 group-hover:text-black transition-colors -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 duration-300">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <span className="font-fragment text-xs text-black/50 tracking-widest uppercase mb-3 block">
              {project.category}
            </span>
            
            <p className="font-albert text-black/70 text-sm">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
