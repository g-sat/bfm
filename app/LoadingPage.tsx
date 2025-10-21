"use client";

import { useEffect, useRef } from 'react';
//import { Montserrat } from 'next/font/google';
import gsap from 'gsap';
import LaserFlow from '../components/LaserFlow';
import CircularText from './components/CircularText';

//const montserrat = Montserrat({ subsets: ['latin'], weight: '800' });

export default function LoadingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (containerRef.current) {
    // ✅ FORCE MINIMUM 4 SECONDS
    const MINIMUM_TIME = 7000; // 4 seconds
    const startTime = Date.now();
    
    const fadeOut = () => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MINIMUM_TIME - elapsed);
      
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: delay / 1000,
        onComplete: () => {
          containerRef.current!.style.display = 'none';
        }
      });
    };
    
    // Start fade out after minimum time
    setTimeout(fadeOut, MINIMUM_TIME);
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

      {/* PERFECT CIRCULAR "BOLD FRAME MEDIA" */}
      <CircularText
        text="BOLD*FRAME*MEDIA"
        spinDuration={12}
        size={280}
        className="text-[#6846b3]"
      />
    </div>
  );
}