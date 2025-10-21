"use client";

import { useEffect, useRef } from 'react';
import { Bebas_Neue } from 'next/font/google';
import gsap from 'gsap';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });

export function HeroText() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      // Split text into individual spans for each character
      let newText = '';
      element.innerText.split('').forEach((char) => {
        newText += `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`;
      });
      element.innerHTML = newText;

      const chars = element.querySelectorAll('span');

      // GSAP animation timeline for professional, cinematic entrance
      const tl = gsap.timeline();

      tl.fromTo(
        chars,
        {
          opacity: 0,
          scale: 0.9,
          y: 20, // Subtle upward motion
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.04,
          ease: 'power3.out',
        }
      );

      // Add subtle, static red glow for cinematic effect
      tl.to(
        chars,
        {
          textShadow: '0 0 6px rgba(255, 50, 50, 0.5), 0 0 12px rgba(255, 50, 50, 0.3)',
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=1.2' // Overlap with entrance for smooth integration
      );
    }
  }, []);

  return (
    <h1
      ref={textRef}
      className={`${bebas.className} text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] text-[10vw] max-text-[10rem] font-bold text-white drop-shadow-2xl select-none pointer-events-none pl-4 sm:pl-8 md:pl-12 hero-text-responsive`}
    >
      Bolt Frame Media
    </h1>
  );
}