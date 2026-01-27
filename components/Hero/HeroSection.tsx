"use client";

import Hero3DModel from "./Hero3D";
import { HeroText } from "./HeroText";
import { ProximityHeroFrames } from "./ProximityHeroFrames";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,15,0.95)0%,rgba(6,4,20,0.92)45%,rgba(7,5,24,0.88)70%,rgba(5,3,15,0.98)100%)]" />
        <div className="absolute -top-48 -left-40 h-[70vh] w-[70vw] bg-[radial-gradient(circle_at_20%_0%,rgba(108,99,255,0.32),transparent_70%)] blur-[160px]" />
        <div className="absolute top-[35%] -right-52 h-[60vh] w-[60vw] bg-[radial-gradient(circle_at_80%_30%,rgba(255,111,145,0.25),transparent_68%)] blur-[200px]" />
        <div className="absolute bottom-[-30%] left-1/3 h-[55vh] w-[55vw] bg-[radial-gradient(circle_at_50%_110%,rgba(20,241,149,0.22),transparent_70%)] blur-[180px]" />
      </div>

      <div className="relative flex items-center justify-center min-h-screen h-screen overflow-hidden">
        <div className="absolute -top-28 left-1/2 z-0 h-[75vh] w-[68vw] -translate-x-1/2 opacity-90 bg-[radial-gradient(circle_at_45%_-30%,rgba(108,99,255,0.42),transparent_70%)] blur-[140px] pointer-events-none" />

        <div className="absolute inset-0 z-10 pointer-events-auto">
          <ProximityHeroFrames className="h-full w-full" />
        </div>

        <div className="relative w-full max-w-[80vw] h-screen flex flex-col">
          <div className="grow relative">
            <div className="absolute top-0 right-0 w-1/3 h-full z-25 pointer-events-none">
              <Hero3DModel />
            </div>

            <div className="absolute inset-0 flex items-center justify-start pl-16 z-25 pointer-events-none">
              <HeroText />
            </div>
          </div>

          <div className="relative z-15 pointer-events-none flex flex-col md:flex-row md:items-end justify-between gap-8 pl-16 pb-12 text-white">
            <div className="max-w-xl space-y-4 pt-4 text-balance pointer-events-none">
              <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/60">Immersive Futures</p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight md:leading-snug text-white/95">
                Experience biophilic soundscapes that adapt in realtime to your presence.
              </h2>
              <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-md">
                Step inside the resonant dome where spatial audio, light, and organic systems weave together into living architecture.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 text-xs md:text-sm pointer-events-none pt-8">
              <button className="rounded-full border border-white/40 bg-white/5 px-7 py-3 text-[0.7rem] md:text-sm font-medium uppercase tracking-[0.4em] transition hover:border-white/80 hover:bg-white/10 pointer-events-auto">
                Enter the Dome
              </button>
              <div className="flex flex-col text-left md:text-right gap-1 uppercase tracking-[0.35em] text-white/55 pointer-events-none">
                <span className="text-[0.65rem] md:text-xs">Spatial Audio</span>
                <span className="text-[0.65rem] md:text-xs">Volumetric Light</span>
                <span className="text-[0.65rem] md:text-xs">Reactive Installations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(180deg,rgba(5,3,15,0)0%,rgba(12,9,32,0.32)40%,rgba(5,3,15,0)100%)] z-20 pointer-events-none" />
    </section>
  );
};