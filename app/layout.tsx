import type { Metadata } from "next";
import { Albert_Sans, Fragment_Mono } from "next/font/google";
import "./globals.css";

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  weight: ["300", "400", "500"],
});

const fragment = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment",
  weight: ["400"],
});

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
      <body className={`${albert.variable} ${fragment.variable} font-albert antialiased bg-[#0a0a0a]`}>
        {children}
      </body>
    </html>
  );
}
