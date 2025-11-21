"use client";

import About from "@/components/About/About";
import { Navbar } from "@/components/Overalls/Navbar";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#05030F] text-white">
      <Navbar />
      <About />
    </main>
  );
}
