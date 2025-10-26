"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

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
  enableWave?: boolean;
}

export const ProximityHeroFrames: React.FC<ProximityHeroFramesProps> = ({
  proximityRadius = 100,
  className,
  enableWave = true,
}) => {
  const [activeFrames, setActiveFrames] = useState<
    Map<number, { x: number; y: number; source: "mouse" | "wave" }>
  >(new Map());

  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const neighborsRef = useRef<Map<number, number[]>>(new Map());
  const lastBatchRef = useRef<number[]>([]);

  // wave refs
  const waveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wavePausedRef = useRef<boolean>(false);

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

  // Compute neighbors based on approximate grid positions
  useEffect(() => {
    const getPos = (id: number) => ({
      x: id % 8,
      y: Math.floor(id / 8),
    });

    for (let i = 0; i < frames.length; i++) {
      neighborsRef.current.set(i, []);
      for (let j = 0; j < frames.length; j++) {
        if (i === j) continue;
        const pi = getPos(i);
        const pj = getPos(j);
        const dist = Math.abs(pi.x - pj.x) + Math.abs(pi.y - pj.y);
        if (dist <= 1) {
          neighborsRef.current.get(i)!.push(j);
        }
      }
    }
  }, [frames.length]);

  // Mouse proximity logic (unchanged)
  useEffect(() => {
    const currentTimeouts = timeoutRefs.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newActiveFrames = new Map<number, { x: number; y: number; source: "mouse" | "wave" }>();

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
          newActiveFrames.set(frameId, { x: localX, y: localY, source: "mouse" });

          const existingTimeout = currentTimeouts.get(frameId);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }

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
        currentTimeouts.forEach((timeout) => clearTimeout(timeout));
        currentTimeouts.clear();
      };
    }
  }, [proximityRadius]);

  // Random clustered wave logic
  const startWave = useCallback(() => {
    if (!enableWave) return;
    if (waveTimerRef.current) clearTimeout(waveTimerRef.current);

    const getPos = (id: number) => ({
      x: id % 8,
      y: Math.floor(id / 8),
    });

    const getMinDist = (id: number, batch: number[]) => {
      let minD = Infinity;
      const pi = getPos(id);
      for (const b of batch) {
        const pb = getPos(b);
        const d = Math.abs(pi.x - pb.x) + Math.abs(pi.y - pb.y);
        minD = Math.min(minD, d);
      }
      return minD;
    };

    const countWaveActive = () => {
      let count = 0;
      activeFrames.forEach((data) => {
        if (data.source === "wave") count++;
      });
      return count;
    };

    const showNext = () => {
      if (wavePausedRef.current || countWaveActive() > 0) {
        waveTimerRef.current = setTimeout(showNext, 500); // retry later
        return;
      }

      // Find starting id for this batch
      const candidates: number[] = [];
      const lastBatch = lastBatchRef.current;
      for (let i = 0; i < frames.length; i++) {
        if (activeFrames.has(i)) continue;
        const dist = lastBatch.length > 0 ? getMinDist(i, lastBatch) : Infinity;
        if (lastBatch.length === 0 || dist <= 2) {
          candidates.push(i);
        }
      }
      if (candidates.length === 0) {
        // Fallback to any inactive
        for (let i = 0; i < frames.length; i++) {
          if (!activeFrames.has(i)) candidates.push(i);
        }
      }

      if (candidates.length === 0) {
        waveTimerRef.current = setTimeout(showNext, 1000);
        return;
      }

      const startId = candidates[Math.floor(Math.random() * candidates.length)];

      // Build random connected batch (1-3 frames)
      const batch: number[] = [startId];
      for (let k = 0; k < 2; k++) { // up to 2 more
        if (Math.random() < 0.5) break; // random chance to stop early

        const possible = new Set<number>();
        for (const b of batch) {
          for (const n of neighborsRef.current.get(b) || []) {
            if (!batch.includes(n) && !activeFrames.has(n)) {
              possible.add(n);
            }
          }
        }

        if (possible.size === 0) break;

        const addId = Array.from(possible)[Math.floor(Math.random() * possible.size)];
        batch.push(addId);
      }

      // Reveal the batch
      batch.forEach((frameId) => {
        const el = frameRefs.current.get(frameId);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const localX = Math.random() * rect.width;
        const localY = Math.random() * rect.height;

        setActiveFrames((prev) => {
          const copy = new Map(prev);
          copy.set(frameId, { x: localX, y: localY, source: "wave" });
          return copy;
        });

        const hideTimeout = setTimeout(() => {
          setActiveFrames((prev) => {
            const copy = new Map(prev);
            copy.delete(frameId);
            return copy;
          });
          timeoutRefs.current.delete(frameId);
        }, 2000);

        timeoutRefs.current.set(frameId, hideTimeout);
      });

      lastBatchRef.current = batch;

      // Schedule next batch (reduced speed: every ~4 seconds)
      waveTimerRef.current = setTimeout(showNext, 4000);
    };

    showNext();
  }, [enableWave, frames, activeFrames]);

  useEffect(() => {
    if (enableWave) startWave();
    return () => {
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, [enableWave, startWave]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => (wavePausedRef.current = true);
    const onLeave = () => {
      wavePausedRef.current = false;
      if (enableWave && !waveTimerRef.current) startWave();
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [enableWave, startWave]);

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