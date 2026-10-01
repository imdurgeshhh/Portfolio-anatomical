import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-5 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/80 dark:bg-[#0c1024]/85 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xs dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 max-w-[calc(100vw-1rem)]">
      <Link href="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-[#F5C451] rounded">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white group-hover:opacity-70 transition-opacity" aria-hidden="true">
          <path d="M22 10L10 22M10 10L22 22" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          <path d="M16 4L4 16L16 28L28 16L16 4Z" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-sm font-medium tracking-tight font-sans text-black dark:text-white">Durgesh</span>
      </Link>

      <span className="w-px h-4 bg-black/15 dark:bg-white/15" />

      <nav className="flex items-center gap-3 sm:gap-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs sm:text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-[#F5C451] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-[#F5C451] rounded font-sans"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <span className="w-px h-4 bg-black/15 dark:bg-white/15" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <div className="hidden sm:block">
          <Button href="/contact" size="sm" className="text-xs h-8 px-4 font-sans dark:bg-[#F5C451] dark:text-black dark:border-[#F5C451] dark:hover:bg-[#e0b038]">
            Let&apos;s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
