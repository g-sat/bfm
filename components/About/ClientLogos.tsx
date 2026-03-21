"use client";

import Image from "next/image";

export default function ClientLogos() {
  // Array of 50 logo paths
  const logos = Array.from({ length: 50 }, (_, i) => `/client-logos/${i + 1}.png`);
  
  // Duplicate the array to create a seamless infinite loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden mt-12 pt-6 z-20">
      
      {/* Fade masks for the left and right edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05030f] to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05030f] to-transparent z-30 pointer-events-none" />

      <div className="flex w-max animate-logo-marquee group">
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={index} 
            className="relative h-20 w-48 shrink-0 mx-8 flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer brightness-0 invert"
          >
            <Image 
              src={logo} 
              alt={`Client partner logo ${index + 1}`} 
              fill 
              sizes="160px"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* Scrolls precisely one exact set of logos */
        }
        .animate-logo-marquee {
          animation: logoMarquee 150s linear infinite;
        }
        /* Optional: Pause on hover so users can see a logo */
        .group:hover .animate-logo-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
