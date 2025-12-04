"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tube from "./Tube";

gsap.registerPlugin(ScrollTrigger);

const heroLines = ["WE SCULPT", "SENSORIAL", "EXPERIENCES"];
const evolutionLines = ["WE REIMAGINE", "IMMERSIVE", "FUTURES"];
const resonanceLines = ["WE PROTOTYPE", "MULTI-SENSORY", "MEMORIES"];
const horizonLines = ["WE INVITE", "COLLECTIVE", "ASCENT"];

// const stats = [
//   { value: "42", label: "Immersive builds", detail: "Activated across 6 countries" },
//   { value: "360°", label: "Spatial mastering", detail: "Full-spectrum Dolby & ambisonic" },
//   { value: "18", label: "Bio artists", detail: "Light, botanics and kinetic teams" },
//   { value: "72h", label: "Deployment sprint", detail: "Pop-up domes ready worldwide" },
// ];

// const journeyPanels = [
//   {
//     title: "Bio-responsive architecture",
//     copy:
//       "We choreograph ventilation, chlorophyll lighting and scent plumes around live biometric data, so every guest imprints their own atmosphere.",
//     tags: ["Lightfield", "Scent", "Pulse data"],
//   },
//   {
//     title: "Cinematic sonic domes",
//     copy:
//       "Our spatial compositions bend between analog warmth and pixel-perfect FM synthesis, bending walls into instruments that breathe with you.",
//     tags: ["Spatial audio", "Holo-mix"],
//   },
//   {
//     title: "Tactile storytelling",
//     copy:
//       "Kinetic textiles, reactive fog, laser lattices and volumetric projections fuse into living chapters that morph as crowds migrate.",
//     tags: ["Kinetic", "Volumetric"],
//   },
//   {
//     title: "Conscious production",
//     copy:
//       "Modular rigs, recycled alloys and solar staging keep every installation featherweight on the planet yet colossal in sensation.",
//     tags: ["Circular", "Lightweight"],
//   },
// ];

// const manifesto = [
//   {
//     title: "Design ritual",
//     copy:
//       "We prototype rituals, not booths. Each layer tunes to circadian rhythm, tapping intuition before intellect.",
//   },
//   {
//     title: "Sonic empathy",
//     copy:
//       "Audio is sculpted as an organism — swelling, resting and inviting guests to slow-breathe inside the mix.",
//   },
//   {
//     title: "Tactile futurism",
//     copy:
//       "Surfaces glow with microtextures and holographic chrome, blending the softness of biophilia with aerospace precision.",
//   },
//   {
//     title: "Collective flow",
//     copy:
//       "Crowd movements redirect particles, lasers and narration; the audience completes the installation.",
//   },
// ];

const marqueeWords = [
  "Immersion",
  "Sensory design",
  "Photon bloom",
  "Spatial audio",
  "Biomorphic light",
  "Reactive fog",
  "Pulse mapping",
];

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroAreaRef = useRef<HTMLDivElement | null>(null);
  const heroPrimaryGroupRef = useRef<HTMLDivElement | null>(null);
  const heroSecondaryGroupRef = useRef<HTMLDivElement | null>(null);
  const heroTertiaryGroupRef = useRef<HTMLDivElement | null>(null);
  const heroQuaternaryGroupRef = useRef<HTMLDivElement | null>(null);
  const heroRefs = useRef<HTMLParagraphElement[]>([]);
  const evolutionRefs = useRef<HTMLParagraphElement[]>([]);
  const resonanceRefs = useRef<HTMLParagraphElement[]>([]);
  const horizonRefs = useRef<HTMLParagraphElement[]>([]);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const overlayGroups = [
        heroSecondaryGroupRef.current,
        heroTertiaryGroupRef.current,
        heroQuaternaryGroupRef.current,
      ].filter(Boolean) as HTMLDivElement[];

      if (overlayGroups.length) {
        gsap.set(overlayGroups, { opacity: 0, pointerEvents: "none" });
      }

      const overlayLines = [
        ...evolutionRefs.current,
        ...resonanceRefs.current,
        ...horizonRefs.current,
      ].filter(Boolean) as HTMLParagraphElement[];

      if (overlayLines.length) {
        gsap.set(overlayLines, { opacity: 0, y: 32 });
      }

      const introTimeline = gsap.timeline({ defaults: { ease: "power1.out" } });
      heroRefs.current.forEach((line, index) => {
        if (!line) return;
        introTimeline.from(
          line,
          {
            yPercent: 40,
            opacity: 0,
            duration: 0.35,
          },
          index * 0.12
        );
      });

      if (heroAreaRef.current && heroPrimaryGroupRef.current) {
        const swapTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroAreaRef.current,
            start: "top top",
            end: "+=200%",
            scrub: true,
          },
          defaults: { ease: "power1.out" },
        });

        const sequenceLinesIn = (
          refs: HTMLParagraphElement[],
          start: number,
          duration: number,
          spacing: number,
          toVars: gsap.TweenVars
        ) => {
          refs.forEach((line, index) => {
            if (!line) return;
            swapTimeline.fromTo(
              line,
              { opacity: 0, y: 24 },
              { ...toVars, opacity: 1, y: 0, duration },
              start + index * spacing
            );
          });
        };

        const sequenceLinesOut = (
          refs: HTMLParagraphElement[],
          start: number,
          duration: number,
          spacing: number,
          toVars: gsap.TweenVars
        ) => {
          refs.forEach((line, index) => {
            if (!line) return;
            swapTimeline.to(
              line,
              { ...toVars, duration },
              start + index * spacing
            );
          });
        };

        swapTimeline.to(
          heroPrimaryGroupRef.current,
          {
            opacity: 0,
            yPercent: -20,
            duration: 0.25,
          },
          0.25
        );

        if (heroSecondaryGroupRef.current) {
          swapTimeline
            .fromTo(
              heroSecondaryGroupRef.current,
              { opacity: 0, yPercent: 12 },
              { opacity: 1, yPercent: 0, duration: 0.25 },
              0.27
            )
            .to(
              heroSecondaryGroupRef.current,
              { opacity: 0, yPercent: -12, duration: 0.15 },
              0.55
            );

          sequenceLinesIn(evolutionRefs.current, 0.27, 0.25, 0.05, {});
          sequenceLinesOut(evolutionRefs.current, 0.55, 0.12, 0.05, { opacity: 0, y: -18 });
        }

        if (heroTertiaryGroupRef.current) {
          swapTimeline
            .fromTo(
              heroTertiaryGroupRef.current,
              { opacity: 0, yPercent: 12 },
              { opacity: 1, yPercent: 0, duration: 0.25 },
              0.6
            )
            .to(
              heroTertiaryGroupRef.current,
              { opacity: 0, yPercent: -12, duration: 0.15 },
              0.75
            );

          sequenceLinesIn(resonanceRefs.current, 0.6, 0.25, 0.05, {});
          sequenceLinesOut(resonanceRefs.current, 0.75, 0.12, 0.05, { opacity: 0, y: -18 });
        }

        if (heroQuaternaryGroupRef.current) {
          swapTimeline
            .fromTo(
              heroQuaternaryGroupRef.current,
              { opacity: 0, scale: 0.96 },
              { opacity: 1, scale: 1, duration: 0.3 },
              0.8
            );

          sequenceLinesIn(horizonRefs.current, 0.8, 0.25, 0.05, {});
        }
      }

      const statsTimeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      statRefs.current.forEach((card, index) => {
        if (!card) return;
        statsTimeline.from(
          card,
          {
            y: 60,
            opacity: 0,
          },
          index * 0.08
        );
      });

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.fromTo(
          panel,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#05030F] text-white"
    >
      <div ref={heroAreaRef} className="relative isolate min-h-screen w-full overflow-hidden">
        <Tube sectionRef={heroAreaRef} />
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-20 md:px-12 lg:px-20">
          <div className="relative">
            <div ref={heroPrimaryGroupRef} className="space-y-10">
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">About Bold Frame Media</p>
              <div className="flex flex-col gap-4">
                {heroLines.map((line, index) => (
                  <p
                    key={line}
                    ref={(el) => {
                      if (el) heroRefs.current[index] = el;
                    }}
                    className="text-[clamp(3rem,9vw,11rem)] font-semibold leading-[0.85] tracking-tight"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="max-w-4xl text-lg text-white/70 md:text-xl">
                We are a sensory studio building dome galleries, sound temples and roving light sculptures that move with the frequency of living systems.
              </p>
              <div className="space-y-2 pt-6 text-sm uppercase tracking-[0.4em] text-white/60">
                <p>Spatial audio • Volumetric bloom • Reactive fog</p>
                <p>Immersive research studio — Los Angeles / Mumbai / Lisbon</p>
              </div>
            </div>

            <div
              ref={heroSecondaryGroupRef}
              className="pointer-events-none absolute inset-0 flex flex-col items-end space-y-10 text-right"
            >
              <p className="text-xs uppercase tracking-[0.6em] text-red-200/70">Evolution in Motion</p>
              <div className="flex flex-col gap-4">
                {evolutionLines.map((line, index) => (
                  <p
                    key={`evolution-${line}`}
                    ref={(el) => {
                      if (el) evolutionRefs.current[index] = el;
                    }}
                    className="text-[clamp(3rem,9vw,11rem)] font-semibold leading-[0.85] tracking-tight text-red-100"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="max-w-4xl text-lg text-red-100/85 md:text-xl">
                As you move, the tube remembers — rebalancing color spectrums, shifting bass gradients and bending volumetric haze so every pass carves a new sensorial story.
              </p>
              <div className="space-y-2 pt-6 text-sm uppercase tracking-[0.4em] text-red-200/70">
                <p>Biometric routing • Chromatic breath • Pulse reactive visuals</p>
                <p>Collective immersion network — São Paulo / Kyoto / Berlin</p>
              </div>
            </div>

            <div
              ref={heroTertiaryGroupRef}
              className="pointer-events-none absolute inset-0 flex flex-col space-y-10"
            >
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">Memory Architecture</p>
              <div className="flex flex-col gap-4">
                {resonanceLines.map((line, index) => (
                  <p
                    key={`resonance-${line}`}
                    ref={(el) => {
                      if (el) resonanceRefs.current[index] = el;
                    }}
                    className="text-[clamp(3rem,9vw,11rem)] font-semibold leading-[0.85] tracking-tight text-white"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="max-w-4xl text-lg text-white/75 md:text-xl">
                Kinetic textiles and spatial scent layers phase-shift around guests, imprinting living memories that can be replayed in future activations.
              </p>
              <div className="space-y-2 pt-6 text-sm uppercase tracking-[0.4em] text-white/60">
                <p>Adaptive choreography • Scent lattices • Time-loop capture</p>
                <p>Immersion archives — London / Seoul / Vancouver</p>
              </div>
            </div>

            <div
              ref={heroQuaternaryGroupRef}
              className="pointer-events-none absolute inset-0 flex flex-col items-center space-y-10 text-center"
            >
              <p className="text-xs uppercase tracking-[0.6em] text-red-200/70">Ascend Together</p>
              <div className="flex flex-col gap-4">
                {horizonLines.map((line, index) => (
                  <p
                    key={`horizon-${line}`}
                    ref={(el) => {
                      if (el) horizonRefs.current[index] = el;
                    }}
                    className="text-[clamp(3rem,9vw,11rem)] font-semibold leading-[0.85] tracking-tight text-red-100"
                  >
                    {line}
                  </p>
                ))}
              </div>
              <p className="max-w-3xl text-lg text-red-100/85 md:text-xl">
                We culminate in collective ascent — harmonising biometrics, lightfields and polyphonic resonance into a single, luminous finale.
              </p>
              <div className="space-y-2 pt-6 text-sm uppercase tracking-[0.45em] text-red-200/70">
                <p>Synced heartlines • Photon bloom crescendo • Harmonic release</p>
                <p>Destination horizons — Reykjavik / Mexico City / Melbourne</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-24 px-6 pb-20 pt-16 md:px-12 lg:px-20">
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) statRefs.current[index] = el;
              }}
              className="rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-2xl"
            >
              <p className="text-5xl font-semibold tracking-tight">{stat.value}</p>
              <p className="pt-2 text-sm uppercase tracking-[0.4em] text-white/60">{stat.label}</p>
              <p className="pt-4 text-sm text-white/70">{stat.detail}</p>
            </div>
          ))}
        </div> */}

        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* <div className="sticky top-24 h-fit rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl">
            <p className="text-xs uppercase tracking-[0.65em] text-white/60">Immersion lab</p>
            <h3 className="text-4xl font-semibold leading-tight md:text-5xl">
              Atmospheres that pulse with collective energy, choreographed by light, fog and polyphonic bass.
            </h3>
            <p className="pt-4 text-base text-white/70">
              Every install ships with telemetry that listens to guests, bending audio stems, chromatic beams and kinetic textiles in real time.
            </p>
            <div className="pt-6 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
              {['Spatial', 'Biophilic', 'Volumetric', 'Carbon-light'].map((token) => (
                <span key={token} className="rounded-full border border-white/20 px-4 py-2">
                  {token}
                </span>
              ))}
            </div>
          </div> */}

          {/* <div className="space-y-10">
            {journeyPanels.map((panel, index) => (
              <div
                key={panel.title}
                ref={(el) => {
                  if (el) panelRefs.current[index] = el;
                }}
                className="rounded-[32px] border border-white/10 bg-black/40 p-8 shadow-[0_0_60px_rgba(15,10,35,0.6)]"
              >
                <div className="flex items-center justify-between pb-6 text-xs uppercase tracking-[0.4em] text-white/50">
                  <span>Chapter {index + 1}</span>
                  <span className="text-white/40">Scroll trigger</span>
                </div>
                <h4 className="text-3xl font-semibold leading-tight">{panel.title}</h4>
                <p className="pt-4 text-base text-white/70">{panel.copy}</p>
                <div className="pt-6 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                  {panel.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 py-6">
          <div
            className="flex items-center gap-10 whitespace-nowrap text-3xl font-semibold uppercase tracking-[0.35em] opacity-80 md:text-5xl"
            style={{ animation: "about-marquee 18s linear infinite" }}
          >
            {[...marqueeWords, ...marqueeWords].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
        </div>

        {/* <div className="grid gap-10 md:grid-cols-2">
          {manifesto.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.5em] text-white/50">{item.title}</p>
              <p className="text-2xl font-semibold leading-snug">{item.copy}</p>
            </div>
          ))}
        </div> */}

        {/* <div className="space-y-6 pb-12">
          <p className="text-xs uppercase tracking-[0.65em] text-white/60">Ready for resonance?</p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full border border-white/30 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-black transition hover:scale-105">
              Book immersion
            </button>
            <button className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-white/10">
              Download spec
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes about-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
