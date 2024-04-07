import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Source from "@/components/Source";
import Footer from "@/components/Footer";

const baskervville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Muhaddith",
  description:
    "Discover the Wisdom of Ages Your Gateway to Precise Hadith Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={baskervville.className}>
        <Navbar />
        {children}
        <Source />
        <Footer />
      </body>
    </html>
  );
}
