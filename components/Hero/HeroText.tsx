"use client";

import { useEffect, useRef } from 'react';
import { Montserrat } from 'next/font/google';
import gsap from 'gsap';

const montserrat = Montserrat({ subsets: ['latin'], weight: '800' });

export function HeroText() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      
      // Manually split into two lines
      const line1 = 'BOLD FRAME';
      const line2 = 'MEDIA';
      
      // Create character spans for each line
      const createSpans = (text: string) => {
        return text.split('').map(char => 
          char === ' ' 
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block">${char}</span>`
        ).join('');
      };
      
      // Set HTML: line1 + <br> + line2
      element.innerHTML = `${createSpans(line1)}<br />${createSpans(line2)}`;

      // Get all character spans
      const chars = element.querySelectorAll('span');

      // GSAP animation timeline for professional, cinematic entrance
      const tl = gsap.timeline();

      tl.fromTo(
        chars,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
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
          // textShadow: '0 0 6px rgba(255, 50, 50, 0.5), 0 0 12px rgba(255, 50, 50, 1)',
          // duration: 1,
          // ease: 'power2.inOut',
        },
        '-=1.2'
      );
    }
  }, []);

  return (
    <main>
      <h1
        ref={textRef}
        className={`${montserrat.className} text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] text-[10vw] max-text-[10rem] font-bold text-white drop-shadow-2xl select-none pointer-events-none pl-4 sm:pl-8 md:pl-12 hero-text-responsive leading-tight`}
      >
        Bold Frame Media
      </h1>
    </main>
    
  );
}