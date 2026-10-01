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
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased text-black relative min-h-screen flex flex-col`}>
        {/* Global Grid Overlay */}
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 opacity-10 flex items-center justify-center" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />
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
