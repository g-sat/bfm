// Import the interactive hero frame component that reacts to proximity input.
import { ProximityHeroFrames } from "../components/Hero/ProximityHeroFrames";
// Import the floating 3D hero model visualization.
import { Hero3D } from "../components/Hero/Hero3D";
// Import the textual hero content renderer.
import { HeroText } from "../components/Hero/HeroText";
// Import the global navigation bar component.
import { Navbar } from "../components/Overalls/Navbar";
// Import the ambient audio player overlay.
import AudioPlayer from "@/components/Overalls/Audio";
// Import the 3D dome gallery showcase.
import DomeGallery from "@/components/Overalls/DomeGallery";

// Define the default export for the landing page.
export default function Home() {
  // Return the rendered structure for the homepage.
  return (
    // Render the main element with relative positioning and full viewport height.
    <main className="relative min-h-screen">
      {/* Insert the top-level navigation bar. */}
      <Navbar />
      {/* Mount the background audio controller. */}
      <AudioPlayer />
      {/* Wrap the hero and gallery within a unified container. */}
      <div className="relative min-h-[200vh]"> {/* Extend min-height to ensure full coverage for hero + gallery */}
        {/* Inject the shared atmospheric gradient background, extended to cover both sections. */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Add a blue-violet radial glow anchored near the top-left, extended downward. */}
          <div className="absolute -inset-[120px] bg-[radial-gradient(circle_at_20%_-10%,rgba(129,140,248,0.35),transparent_65%)] blur-3xl" /> {/* Increased from -inset-32 to -inset-[120px] for gallery coverage */}
          {/* Add a pink radial glow anchored near the right side, extended downward. */}
          <div className="absolute -inset-[150px] bg-[radial-gradient(circle_at_80%_30%,rgba(244,114,182,0.18),transparent_70%)] blur-3xl" /> Increased from -inset-40 to -inset-[150px] for gallery coverage
          {/* Overlay a subtle vertical gradient for depth across the entire page. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,12,0.95)0%,rgba(5,6,11,0.85)45%,rgba(4,5,9,0.92)65%,rgba(2,3,6,0.98)100%)]" />
        </div>
        {/* Lay out the hero section with centered content and overflow hidden. */}
        <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
          {/* Restore the focused purple-blue hero glow. */}
          <div className="absolute -inset-24 z-0 opacity-85 bg-[radial-gradient(circle_at_45%_-25%,rgba(99,102,241,0.45),transparent_70%)] blur-3xl pointer-events-none" />
          {/* Draw a vertical accent beam on the left edge. */}
          <div className="absolute inset-y-12 left-12 w-px z-10 bg-linear-to-b from-purple-500/40 via-white/40 to-transparent pointer-events-none" />
          {/* Place the proximity-sensitive frame grid overlay. */}
          <div className="absolute inset-0 z-10 pointer-events-auto">
            <ProximityHeroFrames className="h-full w-full" />
          </div>
          {/* Constrain hero content within an 80% viewport width column. */}
          <div className="relative w-full max-w-[80vw] h-screen flex flex-col">
            {/* Allow the hero content to fill vertical space. */}
            <div className="grow relative">
              {/* Pin the 3D model to the top-right while ignoring pointer events. */}
              <div className="absolute top-0 right-0 w-1/3 h-full z-25 pointer-events-none">
                <Hero3D />
              </div>
              {/* Position the hero copy on the left half. */}
              <div className="absolute inset-0 flex items-center justify-start pl-16 z-25 pointer-events-none">
                <HeroText />
              </div>
            </div>
            {/* Render the CTA band with descriptive text and actions. */}
            <div className="relative z-15 pointer-events-none flex flex-col md:flex-row md:items-end justify-between gap-8 pl-16 pb-12 text-white">
              {/* Provide the headline, subheadline, and supporting copy. */}
              <div className="max-w-xl space-y-4 text-balance pointer-events-none">
                {/* Label the section with a stylized kicker. */}
                <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/60">Immersive Futures</p>
                {/* Deliver the primary hero headline. */}
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight md:leading-snug text-white/95">
                  Experience biophilic soundscapes that adapt in realtime to your presence.
                </h2>
                {/* Add supporting descriptive text beneath the headline. */}
                <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-md">
                  Step inside the resonant dome where spatial audio, light, and organic systems weave together into living architecture.
                </p>
              </div>
              {/* Present the CTA button and feature list. */}
              <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 text-xs md:text-sm pointer-events-none">
                {/* Offer the primary call-to-action button with hover feedback. */}
                <button className="rounded-full border border-white/40 bg-white/5 px-7 py-3 text-[0.7rem] md:text-sm font-medium uppercase tracking-[0.4em] transition hover:border-white/80 hover:bg-white/10 pointer-events-auto">
                  Enter the Dome
                </button>
                {/* List supporting feature tags beneath the button. */}
                <div className="flex flex-col text-left md:text-right gap-1 uppercase tracking-[0.35em] text-white/50 pointer-events-none">
                  {/* Highlight the spatial audio capability. */}
                  <span className="text-[0.65rem] md:text-xs">Spatial Audio</span>
                  {/* Highlight the volumetric lighting feature. */}
                  <span className="text-[0.65rem] md:text-xs">Volumetric Light</span>
                  {/* Highlight the reactive installation component. */}
                  <span className="text-[0.65rem] md:text-xs">Reactive Installations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blend the hero and gallery sections with a transitional gradient. */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent via-black/20 to-transparent z-20 pointer-events-none" /> {/* Softened via-black/35 to /20 for subtler transition */}
        {/* Render the dome gallery beneath the hero content, without overriding background. */}
        <div className="relative overflow-hidden "> {/* Added min-h-screen for consistent section height */}
         
          <DomeGallery />
        </div>
      </div>
    </main>
  );
}