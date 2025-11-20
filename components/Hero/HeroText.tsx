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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      // Get cursor position relative to button
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Reset to center when leaving
      const rect = button.getBoundingClientRect();
      setMousePos({ x: rect.width / 2, y: rect.height / 2 });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    // Initialize at center
    const rect = button.getBoundingClientRect();
    setMousePos({ x: rect.width / 2, y: rect.height / 2 });

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main>
      <h1
        ref={textRef}
        className={`
          ${montserrat.className}
          text-4xl sm:text-4xl md:text-7xl lg:text-[6.6rem] text-[7vw] max-text-[6rem]
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
        className="cursor-pointer pointer-events-auto relative z-20 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1]
          inline-flex w-fit items-center justify-center uppercase font-bold h-10 px-8 text-black
          transition-colors duration-200 tracking-tight space-x-1
        "
      >   {/* button styling */}
        {/* Gradient "blob" container */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            className="absolute flex w-[204px] h-[121px] items-center justify-center"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
              transition: isHovering 
                ? 'left 0.2s cubic-bezier(0.17, 0.67, 0.12, 0.98), top 0.2s cubic-bezier(0.17, 0.67, 0.12, 0.98)'
                : 'left 0.4s ease, top 0.4s ease, opacity 0.3s ease',
            }}
          >
            {/* Inner radial gradient circle */}
            <div
              className="
                absolute h-[121px] w-[121px]
                bg-[radial-gradient(50%_50%_at_50%_50%,#FFFFF5_3.5%,#FFAA81_26.5%,#FFDA9F_37.5%,rgba(255,170,129,0.50)_49%,rgba(210,106,58,0.00)_92.5%)]
              "
            />
            {/* Outer blurred radial gradient */}
            <div
              className="
                absolute h-[103px] w-[204px]
                bg-[radial-gradient(43.3%_44.23%_at_50%_49.51%,#FFFFF7_29%,#FFFACD_48.5%,#F4D2BF_60.71%,rgba(214,211,210,0.00)_100%)]
                blur-[5px]
              "
            />
          </div>
        </div>

        {/* Button text */}
        <span className="relative z-10 text-[#5A250A]">See in Action</span>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 9"
          className="relative z-10 h-[9px] w-[17px] text-[#5A250A]"
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
