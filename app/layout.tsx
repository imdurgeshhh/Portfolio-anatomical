import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Durgesh - Portfolio",
  description: "I build useful products, experiment with emerging technology, and turn the process into stories worth sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  try {
    var stored = sessionStorage.getItem('theme');
    // When opening the project first, always default to dark mode
    var isDark = stored ? stored === 'dark' : true;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {
    document.documentElement.classList.add('dark');
  }
})();`,
          }}
        />
        {/* Preload hero images to eliminate toggle delay */}
        <link rel="preload" as="image" href="/images/Base_image_desktop.png" />
        <link rel="preload" as="image" href="/images/Reveal_image_desktop.png" />
        <link rel="preload" as="image" href="/images/Base_image_dark.png" />
        <link rel="preload" as="image" href="/images/Reveal_image_dark.png" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased text-black dark:text-white relative min-h-screen flex flex-col selection:bg-[#F5C451]/30 selection:text-[#F5C451]`}>
        {/* Global Grid Overlay */}
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 opacity-10 dark:opacity-5 flex items-center justify-center text-black dark:text-white" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
            }}
          />
        </div>
        
        <Navbar />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
