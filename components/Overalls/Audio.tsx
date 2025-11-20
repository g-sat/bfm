"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Headphones, Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.08);
  const [previousVolume, setPreviousVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const setAudioState = (nextVolume: number, nextMuted: boolean) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = Math.min(Math.max(nextVolume, 0), 1);
    audio.muted = nextMuted;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const tryAutoplay = async () => {
      try {
        audio.muted = true;
        await audio.play();
        setAudioState(volume, isMuted);
        setIsPlaying(true);
      } catch {
        const start = async () => {
          try {
            setAudioState(volume, isMuted);
            await audio.play();
            setIsPlaying(true);
          } catch {
            /* noop */
          }
        };
        ["click", "keydown", "touchstart"].forEach((eventName) => {
          document.addEventListener(eventName, start, { once: true });
        });
      }
    };

    void tryAutoplay();
  }, [volume, isMuted]);

  useEffect(() => {
    setAudioState(volume, isMuted);
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isPanelOpen) {
      return;
    }

    const handleClickAway = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [isPanelOpen]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
      setAudioState(previousVolume, false);
      return;
    }
    setPreviousVolume(volume);
    setIsMuted(true);
    setVolume(0);
    setAudioState(0, true);
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseFloat(event.target.value);
    if (nextVolume > 0 && isMuted) {
      setIsMuted(false);
      setAudioState(nextVolume, false);
      setVolume(nextVolume);
      return;
    }
    if (nextVolume === 0) {
      setIsMuted(true);
      setAudioState(0, true);
      setVolume(0);
      return;
    }
    setAudioState(nextVolume, isMuted);
    setVolume(nextVolume);
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/music/Last_short.mp3" preload="metadata" loop />

      <div
        className="fixed bottom-10 right-6 z-40 flex flex-col items-end"
        onMouseEnter={() => setIsPanelOpen(true)}
        onMouseLeave={() => setIsPanelOpen(false)}
      >
        <button
          type="button"
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#0B0916]/85 text-white backdrop-blur transition-all duration-300 hover:border-white/30 hover:text-white"
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-expanded={isPanelOpen}
          aria-label="Toggle audio controls"
        >
          <Headphones className="h-4 w-4" />
          <span
            className={`absolute -right-1 -top-1 h-2 w-2 rounded-full transition-opacity ${
              isPlaying ? "bg-[#14F195]/80" : "bg-white/30"
            }`}
          />
        </button>

        <AnimatePresence>
          {isPanelOpen ? (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.24, ease: [0.25, 0.8, 0.25, 1] }}
              className="mt-3 w-72 rounded-3xl border border-white/12 bg-[#0F0C1E]/88 p-6 text-sm text-white/70 shadow-[0_24px_60px_rgba(10,7,24,0.55)] backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Now playing</span>
                  <p className="text-sm font-medium text-white/85">Resonant Dawn — Ambient Cut</p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isPlaying ? "bg-[#14F195]" : "bg-white/30"
                  }`}
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-white/30 hover:text-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.4em] text-white/45">
                    <span>Level</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                    className="h-1 rounded-full bg-white/10 accent-white"
                    style={{
                      background: `linear-gradient(to right, rgba(255,255,255,0.7) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
                <span>status</span>
                <span>{isPlaying ? "Playing" : "Paused"}</span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}