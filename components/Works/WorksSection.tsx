"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ShowcaseItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

type ShowcaseRowProps = {
  items: ShowcaseItem[];
  direction?: "forward" | "reverse";
  speed?: number;
};

const buildMediaSet = (items: ShowcaseItem[], total: number): ShowcaseItem[] =>
  Array.from({ length: total }, (_, index) => {
    const base = items[index % items.length];
    const altSuffix = ` ${index + 1}`;

    if (base.type === "image") {
      return {
        ...base,
        alt: `${base.alt}${altSuffix}`,
      } satisfies ShowcaseItem;
    }

    const videoItem: ShowcaseItem = {
      ...base,
      alt: `${base.alt}${altSuffix}`,
    };

    videoItem.poster = base.poster;

    return videoItem;
  });

const unsplashImage = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const primaryBase: ShowcaseItem[] = [
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    poster: unsplashImage("photo-1498050108023-c5249f4df085"),
    alt: "Immersive mountain projection",
  },
  {
    type: "image",
    src: unsplashImage("photo-1526481280695-3c469bca60a5"),
    alt: "Chromatic fog tunnel",
  },
  {
    type: "image",
    src: unsplashImage("photo-1518895949257-7621c3c786d4"),
    alt: "Interactive dome experience",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    poster: unsplashImage("photo-1514525253161-7a46d19cd819"),
    alt: "Spatial audio runway",
  },
  {
    type: "image",
    src: unsplashImage("photo-1498050108023-c5249f4df085"),
    alt: "Volumetric light installation",
  },
  {
    type: "image",
    src: unsplashImage("photo-1500530855697-b586d89ba3ee"),
    alt: "Sensorial halo stage",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Santorini.mp4",
    poster: unsplashImage("photo-1469474968028-56623f02e42e"),
    alt: "Immersive holographic archive",
  },
  {
    type: "image",
    src: unsplashImage("photo-1531297484001-80022131f5a1"),
    alt: "Aurora volumetric bloom",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Sunder.mp4",
    poster: unsplashImage("photo-1526378722484-cc5c7100c02d"),
    alt: "Pulse arena walkthrough",
  },
  {
    type: "image",
    src: unsplashImage("photo-1478720568477-152d0b37d9d0"),
    alt: "Immersion field canopy",
  },
];

const secondaryBase: ShowcaseItem[] = [
  {
    type: "image",
    src: unsplashImage("photo-1530023367847-a683933f4177"),
    alt: "360 capture stage",
  },
  {
    type: "image",
    src: unsplashImage("photo-1489515217757-5fd1be406fef"),
    alt: "Light sculpture desert bloom",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Nature-Love.mp4",
    poster: unsplashImage("photo-1482192597420-4817fdd7e8b0"),
    alt: "Vapor tunnel sequence",
  },
  {
    type: "image",
    src: unsplashImage("photo-1563089145-599997674d42"),
    alt: "Mobile studio interior",
  },
  {
    type: "image",
    src: unsplashImage("photo-1504384308090-c894fdcc538d"),
    alt: "Immersive capsule bay",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Palm_Trees.mp4",
    poster: unsplashImage("photo-1518770660439-4636190af475"),
    alt: "Ambient data canopy",
  },
  {
    type: "image",
    src: unsplashImage("photo-1521737604893-d14cc237f11d"),
    alt: "Immersive projection atrium",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    poster: unsplashImage("photo-1520052205864-92d242b3a76b"),
    alt: "Kinetic tunnel drift",
  },
  {
    type: "image",
    src: unsplashImage("photo-1481277542470-605612bd2d61"),
    alt: "Neon archive vault",
  },
];

const tertiaryBase: ShowcaseItem[] = [
  {
    type: "image",
    src: unsplashImage("photo-1514525253161-7a46d19cd819"),
    alt: "Adaptive stage lighting",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Santorini.mp4",
    poster: unsplashImage("photo-1526045478516-99145907023c"),
    alt: "Orbiting waveform scene",
  },
  {
    type: "image",
    src: unsplashImage("photo-1573166331073-5dff3304065c"),
    alt: "Immersion capsule",
  },
  {
    type: "image",
    src: unsplashImage("photo-1516927846708-3f5926c05c1b"),
    alt: "Geodesic arena exterior",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Sunder.mp4",
    poster: unsplashImage("photo-1515169067865-5387ec356754"),
    alt: "Spectral fountain drift",
  },
  {
    type: "image",
    src: unsplashImage("photo-1526378722484-cc5c7100c02d"),
    alt: "Flux canopy walkway",
  },
  {
    type: "image",
    src: unsplashImage("photo-1469334031218-e382a71b716b"),
    alt: "Data bloom columns",
  },
  {
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Nature-Love.mp4",
    poster: unsplashImage("photo-1470229722913-7c0e2dbbafd3"),
    alt: "Subliminal tide gallery",
  },
  {
    type: "image",
    src: unsplashImage("photo-1471577490405-79a4b2448300"),
    alt: "Sonar horizon chamber",
  },
];

const primaryMedia = buildMediaSet(primaryBase, 30);
const secondaryMedia = buildMediaSet(secondaryBase, 30);
const tertiaryMedia = buildMediaSet(tertiaryBase, 30);

const ShowcaseRow = ({ items, direction = "forward", speed = 42 }: ShowcaseRowProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);

  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateLoopWidth = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    updateLoopWidth();

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateLoopWidth();
      });
      resizeObserver.observe(track);
    }

    let lastTimestamp = performance.now();

    const step = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const directionMultiplier = direction === "forward" ? -1 : 1;
      const distance = ((speed * delta) / 1000) * directionMultiplier;
      offsetRef.current += distance;

      const loopWidth = loopWidthRef.current || track.scrollWidth / 2;

      if (!loopWidth) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      if (direction === "forward" && offsetRef.current <= -loopWidth) {
        offsetRef.current += loopWidth;
      } else if (direction === "reverse" && offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver?.disconnect();
    };
  }, [direction, speed, items.length]);

  useEffect(() => {
    offsetRef.current = 0;
    const track = trackRef.current;
    if (track) {
      track.style.transform = "translate3d(0, 0, 0)";
    }
    loopWidthRef.current = track ? track.scrollWidth / 2 : 0;
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mediaElements = Array.from(track.querySelectorAll("img, video"));

    if (!mediaElements.length) return;

    const handleMediaReady = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    mediaElements.forEach((node) => {
      if (node instanceof HTMLImageElement) {
        if (node.complete) {
          handleMediaReady();
        } else {
          node.addEventListener("load", handleMediaReady, { once: true });
        }
      } else if (node instanceof HTMLVideoElement) {
        if (node.readyState >= 2) {
          handleMediaReady();
        } else {
          node.addEventListener("loadeddata", handleMediaReady, { once: true });
        }
      }
    });

    return () => {
      mediaElements.forEach((node) => {
        if (node instanceof HTMLImageElement) {
          node.removeEventListener("load", handleMediaReady);
        } else if (node instanceof HTMLVideoElement) {
          node.removeEventListener("loadeddata", handleMediaReady);
        }
      });
    };
  }, [duplicatedItems]);

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className={cn("flex w-max items-center gap-8 whitespace-nowrap will-change-transform")}
      >
        {duplicatedItems.map((item, index) => (
          <figure
            key={`${item.alt}-${index}`}
            className="group relative h-[260px] w-[420px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_60px_rgba(8,7,23,0.45)] backdrop-blur-xl"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.08]"
              />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,24,0)_0%,rgba(12,12,24,0.55)_100%)] opacity-80 transition-opacity duration-700 group-hover:opacity-60" />
          </figure>
        ))}
      </div>
    </div>
  );
};

const WorksSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#080710] py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_bottom,rgba(239,68,68,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,12,24,0.9),rgba(5,5,12,0.95))]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_72%)] opacity-60" />
          <div className="absolute inset-0 mask-[radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_65%,transparent_90%)]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[90px_90px] opacity-[0.12]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[90px_90px] opacity-[0.12]" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-[80vw] max-w-[1400px] flex-col gap-14 px-6 md:px-10 lg:px-12">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">Selected works</p>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95]">
              Installations that reshape atmosphere
            </h2>
          </div>
          <p className="max-w-xl text-sm uppercase tracking-[0.35em] text-white/50">
            Large scale domes, touring capsules and responsive galleries crafted for global brands and cultural labs.
          </p>
        </header>

        <div className="space-y-8">
          <ShowcaseRow items={primaryMedia} speed={50} />
          <ShowcaseRow items={secondaryMedia} speed={38} />
          <ShowcaseRow items={tertiaryMedia} speed={25} />
        </div>
      </div>

      <style jsx>{`
        div :global(video)::-webkit-media-controls {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default WorksSection;
