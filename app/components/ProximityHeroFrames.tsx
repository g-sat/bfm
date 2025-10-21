"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Frame {
  id: number;
  gridColumn: string;
  gridRow: string;
  delay: number;
  imagePath: string;
  color: string;
  title: string;
}

interface ProximityHeroFramesProps {
  proximityRadius?: number;
  className?: string;
}

export const ProximityHeroFrames: React.FC<ProximityHeroFramesProps> = ({
  proximityRadius = 100,
  className,
}) => {
  const [activeFrames, setActiveFrames] = useState<Map<number, { x: number; y: number }>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const frames: Frame[] = [
    { id: 0, gridColumn: 'span 2', gridRow: 'span 2', delay: 0, imagePath: '/assets/frames/AE 01.png', color: 'from-white to-white/80', title: 'Innovation' },
    { id: 1, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 02.png', color: 'from-white to-white/80', title: 'Speed' },
    { id: 2, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 03.png', color: 'from-white to-white/80', title: 'Design' },
    { id: 3, gridColumn: 'span 1', gridRow: 'span 2', delay: 0.15, imagePath: '/assets/frames/AE 04.png', color: 'from-white to-white/80', title: 'Structure' },
    { id: 4, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 05.png', color: 'from-white to-white/80', title: 'Launch' },
    { id: 5, gridColumn: 'span 2', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 06.png', color: 'from-white to-white/80', title: 'Cloud Platform' },
    { id: 6, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 07.png', color: 'from-white to-white/80', title: 'Data' },
    { id: 7, gridColumn: 'span 1', gridRow: 'span 2', delay: 0.15, imagePath: '/assets/frames/AE 08.png', color: 'from-white to-white/80', title: 'Security' },
    { id: 8, gridColumn: 'span 2', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 09.png', color: 'from-white to-white/80', title: 'Global Scale' },
    { id: 9, gridColumn: 'span 1', gridRow: 'span 1', delay: 0, imagePath: '/assets/frames/PR 10.png', color: 'from-white to-white/80', title: 'Code' },
    { id: 10, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/PR 11.png', color: 'from-white to-white/80', title: 'AI' },
    { id: 11, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/PR 12.png', color: 'from-white to-white/80', title: 'Network' },
    { id: 12, gridColumn: 'span 2', gridRow: 'span 2', delay: 0, imagePath: '/assets/frames/AE 01.png', color: 'from-white to-white/80', title: 'Narrative' },
    { id: 13, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 02.png', color: 'from-white to-white/80', title: 'Mise-en-scène' },
    { id: 14, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 03.png', color: 'from-white to-white/80', title: 'Aspect Ratio' },
    { id: 15, gridColumn: 'span 1', gridRow: 'span 2', delay: 0.15, imagePath: '/assets/frames/AE 04.png', color: 'from-white to-white/80', title: 'B-Roll' },
    { id: 16, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 05.png', color: 'from-white to-white/80', title: 'Auteur' },
    { id: 17, gridColumn: 'span 2', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 06.png', color: 'from-white to-white/80', title: 'Cutaway' },
    { id: 18, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 07.png', color: 'from-white to-white/80', title: 'Slate' },
    { id: 19, gridColumn: 'span 1', gridRow: 'span 2', delay: 0.15, imagePath: '/assets/frames/AE 08.png', color: 'from-white to-white/80', title: 'Producer' },
    { id: 20, gridColumn: 'span 2', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 09.png', color: 'from-white to-white/80', title: 'High Concept' },
    { id: 21, gridColumn: 'span 1', gridRow: 'span 1', delay: 0, imagePath: '/assets/frames/PR 10.png', color: 'from-white to-white/80', title: 'Establishing Shot' },
    { id: 22, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/PR 11.png', color: 'from-white to-white/80', title: 'Cinematic Language' },
    { id: 23, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/PR 12.png', color: 'from-white to-white/80', title: 'Agenda Setting' },
    { id: 24, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 01.png', color: 'from-white to-white/80', title: 'Storyboard' },
    { id: 25, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 02.png', color: 'from-white to-white/80', title: 'VFX' },
    { id: 26, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.15, imagePath: '/assets/frames/AE 03.png', color: 'from-white to-white/80', title: 'Montage' },
    { id: 27, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 04.png', color: 'from-white to-white/80', title: 'Cinematography' },
    { id: 28, gridColumn: 'span 1', gridRow: 'span 1', delay: 0, imagePath: '/assets/frames/AE 05.png', color: 'from-white to-white/80', title: 'Editing' },
    { id: 29, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/AE 06.png', color: 'from-white to-white/80', title: 'Sound Design' },
    { id: 30, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/AE 07.png', color: 'from-white to-white/80', title: 'Color Grading' },
    { id: 31, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.15, imagePath: '/assets/frames/AE 08.png', color: 'from-white to-white/80', title: 'Foley' },
    { id: 32, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.2, imagePath: '/assets/frames/AE 09.png', color: 'from-white to-white/80', title: 'Key Grip' },
    { id: 33, gridColumn: 'span 1', gridRow: 'span 1', delay: 0, imagePath: '/assets/frames/PR 10.png', color: 'from-white to-white/80', title: 'Dolly Shot' },
    { id: 34, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.05, imagePath: '/assets/frames/PR 11.png', color: 'from-white to-white/80', title: 'Frame Rate' },
    { id: 35, gridColumn: 'span 1', gridRow: 'span 1', delay: 0.1, imagePath: '/assets/frames/PR 12.png', color: 'from-white to-white/80', title: 'Screenplay' },
  ];

  useEffect(() => {
    // Copy timeoutRefs.current to a local variable
    const currentTimeouts = timeoutRefs.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newActiveFrames = new Map<number, { x: number; y: number }>();

      frameRefs.current.forEach((frameElement, frameId) => {
        const frameRect = frameElement.getBoundingClientRect();
        const frameLeft = frameRect.left - rect.left;
        const frameTop = frameRect.top - rect.top;
        const frameRight = frameLeft + frameRect.width;
        const frameBottom = frameTop + frameRect.height;

        const closestX = Math.max(frameLeft, Math.min(mouseX, frameRight));
        const closestY = Math.max(frameTop, Math.min(mouseY, frameBottom));

        const distance = Math.sqrt(
          Math.pow(mouseX - closestX, 2) + Math.pow(mouseY - closestY, 2)
        );

        if (distance <= proximityRadius) {
          const localX = mouseX - frameLeft;
          const localY = mouseY - frameTop;
          newActiveFrames.set(frameId, { x: localX, y: localY });

          // Clear existing timeout for this frame
          const existingTimeout = currentTimeouts.get(frameId);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }

          // Set new timeout to clear this frame after 3 seconds
          const timeout = setTimeout(() => {
            setActiveFrames((prev) => {
              const updated = new Map(prev);
              updated.delete(frameId);
              return updated;
            });
            currentTimeouts.delete(frameId);
          }, 3000);

          currentTimeouts.set(frameId, timeout);
        }
      });

      setActiveFrames(newActiveFrames);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        // Clear all timeouts using the local variable
        currentTimeouts.forEach((timeout) => clearTimeout(timeout));
        currentTimeouts.clear();
      };
    }
  }, [proximityRadius]);

  const setFrameRef = (id: number) => (element: HTMLDivElement | null) => {
    if (element) {
      frameRefs.current.set(id, element);
    } else {
      frameRefs.current.delete(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen ${className}`}
    >
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-2 p-8">
        {frames.map((frame) => {
          const frameData = activeFrames.get(frame.id);
          const isActive = frameData !== undefined;

          return (
            <div
              key={frame.id}
              ref={setFrameRef(frame.id)}
              style={{
                gridColumn: frame.gridColumn,
                gridRow: frame.gridRow,
              }}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="h-full w-full rounded-xl">
                <div className="relative h-full flex flex-col items-center justify-center p-4 space-y-2">
                  <div className={`relative w-full h-full transition-all duration-300 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
                    <Image
                      src={frame.imagePath}
                      alt={frame.title}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  </div>

                  <h3 className={`absolute bottom-4 text-sm font-bold text-center transition-all duration-300 ${isActive ? 'text-white/40' : 'opacity-0'}`}>
                    {frame.title}
                  </h3>
                </div>
              </div>

              {isActive && frameData && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                >
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      maskImage: `radial-gradient(circle ${proximityRadius}px at ${frameData.x}px ${frameData.y}px, black 0%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(circle ${proximityRadius}px at ${frameData.x}px ${frameData.y}px, black 0%, transparent 100%)`,
                      background: 'rgba(255,255,255,0.12)',
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};