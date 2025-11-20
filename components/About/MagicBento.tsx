"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnalogClock from './AnalogClock';
import { BentoItem } from './BentoItem';
import DomeGallery from '../Overalls/DomeGallery';

const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      ref={containerRef}
      id="about-section"
      className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-white p-4 md:p-8"
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Mouse-following spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_420px_at_var(--mouse-x)_var(--mouse-y),rgba(168,85,247,0.06),transparent_72%)]" />

      {/* 3D Dock Anchor: where the hero logo should land on scroll */}
      <div
        id="about-3d-dock"
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 w-[260px] h-[260px] pointer-events-none"
        aria-hidden
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <BentoItem
          className="lg:col-span-2 lg:row-span-2"
          title="A New Era of Digital Interaction"
          description="We craft cutting-edge solutions that redefine user experience and drive growth."
          header={
            <div className="mb-4 h-40 rounded-xl bg-linear-to-br from-fuchsia-500 via-violet-500 to-indigo-600" />
          }
        />

        <BentoItem
          className="lg:col-span-1 lg:row-span-1"
          title="Real-Time Analytics"
          description="Instant insights."
          header={
            <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-3xl font-bold">
              99%
            </div>
          }
        />

        <BentoItem
          className="lg:col-span-1 lg:row-span-2"
          title="Always On"
          description="Reliability and performance, 24/7."
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AnalogClock />
          </div>
        </BentoItem>

        <BentoItem
          className="lg:col-span-1 lg:row-span-1"
          title="Global Reach"
          description="Connect anywhere."
          header={
            <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-3xl font-bold">
              50K+
            </div>
          }
        />

        <BentoItem
          className="lg:col-span-2 lg:row-span-1"
          title="Ready to Elevate Your Business?"
          description="Let's build something amazing together."
        >
          <button className="mt-4 px-6 py-2 rounded-lg bg-slate-900 text-white font-semibold shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-slate-800">
            Get In Touch
          </button>
        </BentoItem>
        <BentoItem
          className="lg:col-span-2 lg:row-span-1"
          title="Ready to Elevate Your Business?"
          description="Let's build something amazing together."
        >
          <div>
            <DomeGallery />
          </div>
        </BentoItem>
      </motion.div>
    </section>
  );
};

export default BentoGrid;