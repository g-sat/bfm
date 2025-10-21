import { ProximityHeroFrames } from "./components/ProximityHeroFrames";
import { Hero3D } from "./components/Hero3D";
import { HeroText } from "./components/HeroText";
import { Navbar } from "./components/Navbar";
import LaserFlow from "@/components/LaserFlow";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar/>
      
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
            fogIntensity={0.2}
            wispIntensity={2}
            flowSpeed={0.4}
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
    </main>
  );
}