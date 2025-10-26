import { ProximityHeroFrames } from "../components/Hero/ProximityHeroFrames";
import { Hero3D } from "../components/Hero/Hero3D";
import { HeroText } from "../components/Hero/HeroText";
import { Navbar } from "../components/Overalls/Navbar";
import LaserFlow from "@/components/Hero/LaserFlow";
import BentoGrid from "@/components/About/MagicBento";
import AudioPlayer from "@/components/Overalls/Audio";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Next.js AUTOMATICALLY shows app/loading.tsx */}
      <Navbar/>
      <AudioPlayer />
      {/* Full-width Section - HERO + FRAMES */}
      <div className="relative w-full h-screen">
        
        {/* 1. PROXIMITY FRAMES - HOVER TARGET (z-10) */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <ProximityHeroFrames className="h-full w-full" />
        </div>

        {/* 2. LASERFLOW - VISUALLY FRONT BUT MOUSE PASSES THROUGH (z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <LaserFlow 
            color="#FF4444"
            fogIntensity={0.9}
            wispIntensity={5}
            flowSpeed={0.3}
          />
        </div>

        {/* 3. 3D Model Overlay (right 1/3) */}
        <div className="absolute top-0 right-0 w-1/3 h-screen z-25 pointer-events-none">
          <Hero3D />
        </div>

        {/* 4. Hero Text Overlay (left-aligned) */}
        <div className="absolute inset-0 flex items-center justify-start pl-16 z-25 pointer-events-none">
          <HeroText />
        </div>
      </div>
      <div className="relative w-full h-full">
        <BentoGrid />
      </div>
    </main>
  );
}