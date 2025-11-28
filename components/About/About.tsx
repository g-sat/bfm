"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tube from "./Tube";

gsap.registerPlugin(ScrollTrigger);

const heroLines = ["WE SCULPT", "SENSORIAL", "EXPERIENCES"];

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroAreaRef = useRef<HTMLElement | null>(null);
  const heroRefs = useRef<HTMLParagraphElement[]>([]);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(heroRefs.current, {
        yPercent: 40,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(statRefs.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
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

  const setHeroRef = (node: HTMLDivElement | null) => {
    heroAreaRef.current = node;
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#05030F] text-white"
    >
      <div ref={setHeroRef} className="relative isolate min-h-screen w-full overflow-hidden">
        <Tube sectionRef={heroAreaRef} />
        <div className="relative z-10 flex min-h-screen flex-col justify-between gap-12 px-6 py-20 md:px-12 lg:px-20">
          <div className="space-y-10">
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
              We are a sensory studio building dome galleries, sound temples and roving light sculptures that move with the
              frequency of living systems.
            </p>
          </div>

          <div className="space-y-4 text-sm uppercase tracking-[0.4em] text-white/60">
            <p>Spatial audio • Volumetric bloom • Reactive fog</p>
            <p>Immersive research studio — Los Angeles / Mumbai / Lisbon</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
