import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 sm:gap-6 px-5 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-black/10 shadow-xs transition-all duration-300">
      <Link href="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black group-hover:opacity-70 transition-opacity" aria-hidden="true">
          <path d="M22 10L10 22M10 10L22 22" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          <path d="M16 4L4 16L16 28L28 16L16 4Z" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-sm font-medium tracking-tight font-sans">Durgesh</span>
      </Link>

      <span className="w-px h-4 bg-black/15" />

      <nav className="flex items-center gap-4 sm:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs sm:text-sm font-medium hover:text-black/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded font-sans"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <span className="w-px h-4 bg-black/15 hidden sm:block" />

      <div className="hidden sm:block">
        <Button href="/contact" size="sm" className="text-xs h-8 px-4 font-sans">
          Let&apos;s talk
        </Button>
      </div>
    </header>
  );
}
