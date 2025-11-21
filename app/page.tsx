// Import the interactive hero frame component that reacts to proximity input.
import { ProximityHeroFrames } from "../components/Hero/ProximityHeroFrames";
// Import the floating 3D hero model visualization.
import { Hero3D } from "../components/Hero/Hero3D";
// Import the textual hero content renderer.
import { HeroText } from "../components/Hero/HeroText";
// Import the global navigation bar component.
import { Navbar } from "../components/Overalls/Navbar";
// Import the 3D dome gallery showcase.
import DomeGallery from "@/components/Overalls/DomeGallery";
import About from "@/components/About/About";

// Define the default export for the landing page.
export default function Home() {
  // Return the rendered structure for the homepage.
  return (
    // Render the main element with relative positioning and full viewport height.
    <main className="relative min-h-screen bg-[#05030F] text-white">
      {/* Insert the top-level navigation bar. */}
      <Navbar />
      {/* Wrap the hero and gallery within a unified container. */}
      <div className="relative min-h-screen"> {/* Allow hero + gallery to size naturally without excess whitespace */}
        {/* Inject the shared atmospheric gradient background, extended to cover both sections. */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Shared atmospheric gradients bring hero + about into the same palette. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,15,0.95)0%,rgba(6,4,20,0.92)45%,rgba(7,5,24,0.88)70%,rgba(5,3,15,0.98)100%)]" />
          <div className="absolute -top-48 -left-40 h-[70vh] w-[70vw] bg-[radial-gradient(circle_at_20%_0%,rgba(108,99,255,0.32),transparent_70%)] blur-[160px]" />
          <div className="absolute top-[35%] -right-52 h-[60vh] w-[60vw] bg-[radial-gradient(circle_at_80%_30%,rgba(255,111,145,0.25),transparent_68%)] blur-[200px]" />
          <div className="absolute bottom-[-30%] left-1/3 h-[55vh] w-[55vw] bg-[radial-gradient(circle_at_50%_110%,rgba(20,241,149,0.22),transparent_70%)] blur-[180px]" />
        </div>
        {/* Lay out the hero section with centered content and overflow hidden. */}
        <div className="relative flex justify-center items-center min-h-screen h-screen overflow-hidden">
          {/* Restore the focused purple-blue hero glow. */}
          <div className="absolute -top-28 left-1/2 z-0 h-[75vh] w-[68vw] -translate-x-1/2 opacity-90 bg-[radial-gradient(circle_at_45%_-30%,rgba(108,99,255,0.42),transparent_70%)] blur-[140px] pointer-events-none" />
          {/* Draw a vertical accent beam on the left edge. */}
          {/* <div className="absolute inset-y-12 left-12 w-px z-10 bg-linear-to-b from-purple-500/40 via-white/40 to-transparent pointer-events-none" /> */}
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
              <div className="max-w-xl space-y-4 pt-4 text-balance pointer-events-none">
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
              <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 text-xs md:text-sm pointer-events-none pt-8">
                {/* Offer the primary call-to-action button with hover feedback. */}
                <button className="rounded-full border border-white/40 bg-white/5 px-7 py-3 text-[0.7rem] md:text-sm font-medium uppercase tracking-[0.4em] transition hover:border-white/80 hover:bg-white/10 pointer-events-auto">
                  Enter the Dome
                </button>
                {/* List supporting feature tags beneath the button. */}
                <div className="flex flex-col text-left md:text-right gap-1 uppercase tracking-[0.35em] text-white/55 pointer-events-none">
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(180deg,rgba(5,3,15,0)0%,rgba(12,9,32,0.32)40%,rgba(5,3,15,0)100%)] z-20 pointer-events-none" /> {/* Transition using shared deep-violet tones. */}
        {/* Render the dome gallery beneath the hero content, without overriding background. */}
        <div className="relative overflow-hidden "> {/* Added min-h-screen for consistent section height */}
          <DomeGallery />
        </div>
      </div>
      <About className="-mt-48 sm:-mt-56 lg:-mt-64" variant="embedded" />
    </main>
  );
}