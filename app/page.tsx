import { ProximityHeroFrames } from "../components/Hero/ProximityHeroFrames";
import { Hero3D } from "../components/Hero/Hero3D";
import { HeroText } from "../components/Hero/HeroText";
import { Navbar } from "../components/Overalls/Navbar";
import LaserFlow from "@/components/Hero/LaserFlow";
import BentoGrid from "@/components/About/MagicBento";
import AudioPlayer from "@/components/Overalls/Audio";
import HeroMarquee from "@/components/Overalls/Marquee";

export default function Home() {
  return (
    <main className="relative min-h-screen">

      <Navbar />
      <AudioPlayer />

      {/* ────────────────────── HERO SECTION ────────────────────── */}
      <div className="relative flex justify-center items-center min-h-screen">

          {/* 1. PROXIMITY FRAMES – hover target */}
          <div className="absolute inset-0 z-10 pointer-events-auto">
            <ProximityHeroFrames className="h-full w-full" />
          </div>
        {/* 80 % container – centered */}
        <div className="relative w-full max-w-[80vw] h-screen flex flex-col">
        {/* Content that fills vertical space */}
        <div className="flex-grow relative">
          {/* 3D Model */}
          <div className="absolute top-0 right-0 w-1/3 h-full z-25 pointer-events-none">
            <Hero3D />
          </div>
          {/* Hero Text */}
          <div className="absolute inset-0 flex items-center justify-start pl-16 z-25 pointer-events-none">
            <HeroText />
          </div>
        </div>
        
        {/* Bottom Marquee */}
        <div className="relative">
          <HeroMarquee />
          <HeroMarquee direction="right" />
        </div>
      </div>
        
      </div>

      {/* ────────────────────── BENTO GRID ────────────────────── */}
      <div className="relative w-full h-full border-r-4">
        <BentoGrid />
      </div>

    </main>
  );
}



