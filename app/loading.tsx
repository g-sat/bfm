"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LaserFlow from '@/components/LaserFlow';
import CircularText from './components/CircularText';

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // ✅ EXACTLY 4.5 SECONDS
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 4.5,
        ease: 'power2.inOut',
        onComplete: () => {
          containerRef.current!.style.display = 'none';
        }
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* Fullscreen Purple Laser */}
      <div className="absolute inset-0">
        <LaserFlow 
          color="#6846b3"
          fogIntensity={0.3}
          wispIntensity={1}
          flowSpeed={0.3}
          verticalSizing={3}
          horizontalSizing={1.5}
        />
      </div>

      {/* Spinning Circular Text */}
      <CircularText
        text="BOLD*FRAME*MEDIA"
        spinDuration={12}
        size={280}
        className="text-[#6846b3]"
      />
    </div>
  );
}