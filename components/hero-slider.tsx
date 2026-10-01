"use client";

import { CaseStudyFlipStack, type CaseStudyFlipItem } from "@/components/ui/case-study-flip-stack";

const SPOTLIGHT_ITEMS: CaseStudyFlipItem[] = [
  {
    eyebrow: "Healthcare",
    title: "Pharmacy Management & POS Billing System",
    description:
      "Full-stack pharmacy operations platform with inventory tracking, POS billing, and supplier management. Built with React, Node.js, Express, PostgreSQL, and Clerk.",
    image: "/images/projects/pharmacy.png",
    imageAlt:
      "Pharma sign-in screen with green theme, Welcome Back message, and Clerk authentication",
    background: "#0c1929",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Marketplace",
    title: "CarMax — Full-Stack Car Marketplace",
    description:
      "Web marketplace for browsing and listing vehicles with real-time buyer-seller chat and image uploads. Built with React 19, Neon PostgreSQL, Drizzle ORM, and Sendbird.",
    image: "/images/projects/carmax.png",
    imageAlt:
      "CarMax vehicle listing interface with car search filters over a dark backdrop",
    background: "#1e40af",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Landing Page",
    title: "JBL Tune 720BT Product Landing Page",
    description:
      "Responsive product marketing landing page showcasing audio features, battery specs, and hero visuals. Built with React 19 and Vite.",
    image: "/images/projects/jbl.png",
    imageAlt:
      "JBL Tune 720BT hero showcase featuring high-contrast headphone visuals and product navigation",
    background: "#083344",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Real-Time App",
    title: "Real-Time Technical Interview Platform",
    description:
      "Collaborative technical interview platform featuring WebRTC video calling and Monaco code editing. Built with Java Spring Boot, WebSockets, React, and Vite.",
    image: "/images/projects/interview-platform.svg",
    imageAlt:
      "Real-Time Interview Platform architectural blueprint showcasing Monaco editor, video call feeds, and WebRTC status",
    background: "#1e1b4b",
    foreground: "#ffffff",
  },
  {
    eyebrow: "E-Commerce",
    title: "Responsive Phone & Gadget Shopping Store",
    description:
      "Responsive electronics shopping store with dynamic product catalog, category filters, and cart workflows. Built with HTML5, CSS3, and JavaScript.",
    image: "/images/projects/phone-shopping.svg",
    imageAlt:
      "Phone Shopping Website storefront blueprint illustrating smartphone device mockup, product catalog grid, and shopping cart workflow",
    background: "#075985",
    foreground: "#ffffff",
  },
  {
    eyebrow: "Utility Billing",
    title: "WaterMeter — Usage & Invoice Management",
    description:
      "Utility billing application for logging meter readings, tracking unit charges, and generating PDF invoices. Built with React 19, Redux Toolkit, and Tailwind CSS.",
    image: "/images/projects/watermeter.png",
    imageAlt:
      "WaterMeter Invoices management screen displaying pending invoice records, unit calculations, and PDF download action",
    background: "#0f172a",
    foreground: "#ffffff",
  },
];

export default function HeroSlider() {
  return (
    <section id="slide-section" className="w-full relative z-20 scroll-mt-12">
      <CaseStudyFlipStack
        items={SPOTLIGHT_ITEMS}
        hint="Scroll to Explore"
        heading="Projects I've Shipped."
        endLabel="More Soon"
      />
    </section>
  );
}
