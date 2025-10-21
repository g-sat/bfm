import { ProximityHeroFrames } from "./components/ProximityHeroFrames";
import { Hero3D } from "./components/Hero3D";
import { HeroText } from "./components/HeroText";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-red-900 to-black [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:24px_24px]">
      <Navbar/>
      {/* Full-width Frames */}
      <div className="w-full h-screen">
        <ProximityHeroFrames className="h-full w-full" />
      </div>

      {/* 3D Model Overlay (right 1/3) */}
      <div className="absolute top-0 right-0 w-1/3 h-screen z-10">
        <Hero3D />
      </div>

      {/* Hero Text Overlay (left-aligned) */}
      <div className="absolute inset-0 flex items-center justify-start pl-16 z-20 pointer-events-none">
        <HeroText />
      </div>
    </main>
  );
}