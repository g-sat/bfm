"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import AnalogClock from "@/components/About/AnalogClock";

const stats = [
  { label: "Immersive launches", value: "120+" },
  { label: "Cities activated", value: "18" },
  { label: "Avg dwell uplift", value: "92%" },
  { label: "Prototype sprint", value: "48 hrs" },
];

const capabilityCards = [
  {
    title: "Spatial storytelling",
    description:
      "Volumetric cinematography, projection mapped worlds, and interactive scenography engineered to move audiences in physical and virtual venues.",
    gradient: "from-[#6C63FF]/35 via-transparent to-[#362C6F]/70",
  },
  {
    title: "Adaptive sonic design",
    description:
      "Responsive soundtracks and audio dramaturgy that reshape in real time based on crowd density, biometric cues, and narrative beats.",
    gradient: "from-[#FF6F91]/40 via-transparent to-[#401B33]/65",
  },
  {
    title: "Experience intelligence",
    description:
      "Sensor arrays, realtime data orchestration, and insight dashboards that keep every activation measurable and alive long after opening night.",
    gradient: "from-[#14F195]/35 via-transparent to-[#103628]/70",
  },
];

const processSteps = [
  {
    title: "01. Listen & immerse",
    detail:
      "We embed with your teams, absorbing brand mythologies, audience rituals, and cultural context before sketching a single frame.",
  },
  {
    title: "02. Translate & choreograph",
    detail:
      "Narrative strategists, directors, and technologists co-design a multisensory score that aligns message, motion, light, and sound.",
  },
  {
    title: "03. Prototype & rehearse",
    detail:
      "We build playable simulations, invite audiences into the space, and iterate on every beat with live data and emotional feedback.",
  },
  {
    title: "04. Launch & evolve",
    detail:
      "Deployment crews orchestrate the opening sequence, while analytics loops keep the experience learning and adapting post-launch.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface AboutProps {
  className?: string;
  variant?: "default" | "embedded";
}

let scrollTriggerRegistered = false;

export function About({ className, variant = "default" }: AboutProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) {
      return;
    }

    if (!scrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }

    const ctx = gsap.context(() => {
      if (!sectionRef.current) {
        return;
      }

      const section = sectionRef.current;
      const overlay = overlayRef.current;

      gsap.set(section, { opacity: 0.45, yPercent: 14 });

      gsap.to(section, {
        opacity: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      if (overlay) {
        gsap.set(overlay, { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(overlay, { opacity: 1, ease: "none" }, 0)
          .to(overlay, { opacity: 0, ease: "none" }, 0.65);
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={cn("relative isolate z-30 overflow-hidden bg-[#05030F] text-white scroll-mt-32", className)}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(16,10,38,0.88),transparent_72%)] opacity-0 transition-opacity"
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(108,99,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(20,241,149,0.08),transparent_70%)]" />
        <motion.div
          className="absolute inset-x-0 h-[30vh] bg-[radial-gradient(circle_at_50%_-10%,rgba(108,99,255,0.18),transparent_60%)]"
          style={variant === "embedded" ? { top: "-12vh" } : { top: 0 }}
          animate={{ opacity: [0.35, 0.55, 0.35], y: [0, -12, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 sm:px-10 lg:px-16",
          variant === "embedded" ? "pt-16 sm:pt-20" : "pt-36",
        )}
      >
        <motion.p
          className="text-sm uppercase tracking-[0.6em] text-white/60"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Bold Frame Media
        </motion.p>

        <motion.div
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h2 className="text-4xl font-semibold leading-tight text-white/95 sm:text-5xl lg:text-[3.6rem]">
              We architect immersive storytelling ecosystems that feel cinematic, tactile, and irresistibly human.
            </h2>
            <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
              Originating in Mumbai&apos;s midnight film labs, the studio now activates cities worldwide. We orchestrate volumetric imagery, adaptive audio, and narrative architecture into cohesive experiences tuned to every audience heartbeat.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#6C63FF]" /> Cinematic environments
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#FF6F91]" /> Adaptive soundscapes
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#14F195]" /> Realtime analytics
              </span>
            </div>
          </div>

          <motion.div
            className="relative mt-6 flex h-full items-center justify-center rounded-[44px] border border-white/10 bg-[#09061A]/70 p-8 lg:mt-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-[44px] bg-linear-to-br from-[#6C63FF]/25 via-transparent to-[#14F195]/20 blur-[2px]" />
            <div className="relative flex w-full flex-col items-center justify-center gap-6 text-center">
              <AnalogClock />
              <p className="max-w-sm text-sm text-white/70">
                Our control room runs on Mumbai midnight energy. Every activation syncs to that pulse so global launches resonate with the studio&apos;s signature tempo.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-6 rounded-[48px] border border-white/10 bg-[#09061A]/80 p-6 text-white/75 shadow-[0_40px_120px_rgba(15,10,40,0.45)] sm:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          {stats.map((item, index) => (
            <motion.div key={item.label} className="flex flex-col gap-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={fadeUp} custom={index}>
              <span className="text-3xl font-semibold text-white">{item.value}</span>
              <span className="text-xs uppercase tracking-[0.45em] text-white/55">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.section
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          custom={0}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">What we build</h3>
            <p className="max-w-xl text-sm text-white/70 sm:text-base">
              Cross-disciplinary squads layer narrative, technology, and architecture into signature experiences. Every discipline carries equal weight so the worlds we craft remain coherent and immersive.
            </p>
          </div>
          {/* <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {capabilityCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-[#080515]/80 p-8"
                variants={fadeUp}
                custom={index + 1}
              >
                <div className={`absolute inset-px rounded-4xl bg-linear-to-br ${card.gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10 flex h-full flex-col">
                  <h4 className="text-2xl font-semibold text-white/95">{card.title}</h4>
                  <p className="mt-4 text-sm text-white/75 sm:text-base">{card.description}</p>
                  <motion.div
                    className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.38em] text-white/60"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  >
                    Ready made for launch
                    <motion.span
                      className="h-px w-10 bg-white/50"
                      animate={{ scaleX: [0.2, 1, 0.6, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div> */}
        </motion.section>

        {/* <section className="mt-28 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <motion.div
            className="sticky top-32 flex flex-col gap-6 rounded-[40px] border border-white/10 bg-[#0A071A]/80 p-10 backdrop-blur"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">How we work</span>
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">A measured path from spark to spectacle</h3>
            <p className="text-sm text-white/70 sm:text-base">
              We combine cinematic intuition with technical rigor. Each phase has a clear output, a rehearsal moment with stakeholders, and an intelligence loop that guides the next move.
            </p>
          </motion.div>
          <div className="flex flex-col gap-6">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#080515]/80 p-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={index}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(108,99,255,0.35),transparent_72%)] opacity-60" />
                <div className="relative z-10 flex flex-col gap-3">
                  <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                  <p className="text-sm text-white/70 sm:text-base">{step.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          className="mt-28 rounded-[48px] border border-white/10 bg-[#09061A]/85 p-10 text-center shadow-[0_30px_90px_rgba(15,10,40,0.4)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">Let&apos;s collaborate</span>
          <h3 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Ready to stage a living, breathing brand world?</h3>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/70 sm:text-base">
            Schedule a private walk-through of the Resonant Dome or join our weekly concept salon to prototype side by side with directors, technologists, and sound designers.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:hello@boldframemedia.com"
              className="rounded-full border border-white/30 bg-white/5 px-8 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
            >
              Email the studio
            </Link>
            <Link
              href="/#work"
              className="rounded-full border border-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6F91] to-[#14F195] px-8 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-[#05030F] transition-transform duration-300 hover:scale-[1.05]"
            >
              Explore the work
            </Link>
          </div>
        </motion.section> */}
      </div>
    </section>
  );
}

export default About;
