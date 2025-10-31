"use client";

import { useEffect, useRef, useState } from 'react';
import { Montserrat, Poppins } from 'next/font/google';
import gsap from 'gsap';

const montserrat = Montserrat({ subsets: ['latin'], weight: '800' });
const montserrat_2 = Poppins({ subsets: ['latin'], weight: '300' });

export function HeroText() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;

      // Manually split into two lines
      const line1 = 'BOLD FRAME';
      const line2 = 'Media';

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
          // Example for glow effect, can uncomment and adjust
          // textShadow: '0 0 6px rgba(255, 50, 50, 0.5), 0 0 12px rgba(255, 50, 50, 1)',
          // duration: 1,
          // ease: 'power2.inOut',
        },
        '-=1.2'
      );
    }
  }, []);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: -60 }); // Start centered vertically

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left; // x inside button
      const y = e.clientY - rect.top;  // y inside button

      // Center the 204px-wide blob under cursor (204 / 2)
      const blobX = x - 102;
      const blobY = y - 60;

      setMousePos({ x: blobX, y: blobY });
    };

    const handleMouseLeave = () => {
      // Animate blob back to center vertically above button text
      setMousePos({ x: 0, y: -60 });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main>
      <h1
        ref={textRef}
        className={`
          ${montserrat.className}
          text-4xl sm:text-4xl md:text-5xl lg:text-[5.5rem] text-[6vw] max-text-[6rem]
          font-bold text-white drop-shadow-2xl select-none pointer-events-none
          hero-text-responsive leading-none
        `}
      >
        {/* Text injected by useEffect */}
      </h1>
      <h3 className={`${montserrat_2.className} md:text-lg py-5 tracking-wide`}>
        Bold your BRAND, Bold your STORY, with&nbsp;us!
      </h3>

      <a
        ref={buttonRef}
        href="https://front.hc.engineering/workbench/platform"
        className=" cursor-pointer
          relative z-10 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1]
          flex items-center justify-center uppercase font-bold h-10 px-16 text-black
          transition-colors transition-all duration-200 tracking-tight
          space-x-1 sm:pl-[59px] sm:pr-[52px]
        "
      >
        {/* Gradient “blob” container */}
        <div
          className="absolute -z-10 flex w-[204px] items-center justify-center"
          style={{
            top: '50%',
            left: 0,
            transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px) translateZ(0)`,
            transition: 'transform 0.4s cubic-bezier(0.17, 0.67, 0.12, 0.98)',
          }}
        >
          {/* Inner radial gradient circle */}
          <div
            className="
              absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2
              bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]
            "
          />
          {/* Outer blurred radial gradient */}
          <div
            className="
              absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2
              bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,#FFFFF7_29%,#FFFACD_48.5%,#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)]
              blur-[5px]
            "
          />
        </div>

        {/* Button text */}
        <span className="text-[#5A250A]">See in Action</span>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 9"
          className="h-[9px] w-[17px] text-[#5A250A]"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </main>
  );
}
