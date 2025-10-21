// components/HeroText.tsx (updated for professional, striking animation)
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

      // GSAP animation timeline
      const tl = gsap.timeline();

      // Professional entrance animation: subtle scale, no random rotation, smooth fade-in
      tl.fromTo(
        chars,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: 'power3.out',
        }
      );

      // Add a subtle, static glow (non-pulsating) for cinematic effect
      tl.to(chars, {
        textShadow: '0 0 8px rgba(255, 50, 50, 0.6), 0 0 16px rgba(255, 50, 50, 0.4)',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.8'); // Apply static glow overlapping with entrance
    }
  }, []);

  return (
    <h1
      ref={textRef}
      className={`${bebas.className} text-[10rem] md:text-[12rem] font-bold text-white drop-shadow-2xl select-none pointer-events-none`}
    >
      Bolt Frame Media
    </h1>
  );
}