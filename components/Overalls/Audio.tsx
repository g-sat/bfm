"use client";

import { useState, useRef, useEffect } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [previousVolume, setPreviousVolume] = useState(0.35);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false); // <-- new

  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────
  // Audio lifecycle (autoplay, volume, mute, loop)
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener(" rectangular", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // ---- Autoplay (muted first to bypass browser policy) ----
    const tryAutoplay = async () => {
      try {
        audio.muted = true;
        await audio.play();
        audio.muted = isMuted;
        audio.volume = volume;
        setIsPlaying(true);
      } catch {
        // wait for first user gesture
        const start = async () => {
          try {
            audio.muted = isMuted;
            audio.volume = volume;
            await audio.play();
            setIsPlaying(true);
          } catch {}
        };
        ["click", "keydown", "touchstart"].forEach((ev) =>
          document.addEventListener(ev, start, { once: true })
        );
      }
    };
    tryAutoplay();

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // sync volume / mute changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = isMuted;
    }
  }, [volume, isMuted]);

  // ──────────────────────────────────────────────────────────────
  // Mute / volume helpers
  // ──────────────────────────────────────────────────────────────
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0 && isMuted) setIsMuted(false);
  };

  // ──────────────────────────────────────────────────────────────
  // Mobile tap-outside close
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!showControls) return;
    const close = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [showControls]);

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/assets/music/Last_short.mp3"
        preload="metadata"
        loop
      />

      {/* ──────── ICON (always visible) ──────── */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
        onMouseEnter={() => setShowControls(true)}
        // on mobile a tap opens the panel
        onClick={(e) => {
          if (window.innerWidth < 768) {
            e.stopPropagation();
            setShowControls((v) => !v);
          }
        }}
      >
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-white/20 hover:scale-110">
          <Music className="w-6 h-6 text-orange-700" />
        </div>
      </div>

      {/* ──────── CONTROL PANEL (appears on hover) ──────── */}
      <div
        ref={panelRef}
        className={`fixed right-20 top-1/2 -translate-y-1/2 z-50 w-72
          bg-white/5 backdrop-blur-xl border border-white/20
          rounded-2xl p-5 shadow-2xl
          transition-all duration-300 ease-out
          ${showControls ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}
        `}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-red-700 to-purple-900 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Now Playing</span>
          </div>
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              isPlaying ? "bg-orange-800 animate-ping" : "bg-gray-500/50"
            }`}
          />
        </div>

        {/* Mute button + volume slider */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMute}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 active:bg-white/30
                       backdrop-blur-sm border border-white/30 rounded-xl
                       flex items-center justify-center transition-all
                       hover:scale-105 active:scale-95"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-red-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-red-600" />
            )}
          </button>

          <div className="flex-1 flex items-center space-x-2">
            <span className="text-white/70 text-xs font-mono uppercase tracking-wider">
              VOL
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                         [&::-webkit-slider-thumb]:bg-gradient-to-r
                         [&::-webkit-slider-thumb]:from-red-800 [&::-webkit-slider-thumb]:to-purple-900
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                         [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                         [&::-moz-range-thumb]:bg-gradient-to-r
                         [&::-moz-range-thumb]:from-red-800 [&::-moz-range-thumb]:to-purple-900
                         [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg"
              style={{
                background: `linear-gradient(to right,
                  rgba(0,255,255,0.6) ${volume * 100}%,
                  rgba(255,255,255,0.1) ${volume * 100}%)`,
              }}
            />

            <span className="text-orange-800 text-xs w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Mini visualiser (optional) */}
        <div className="mt-5 flex space-x-1 h-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-red-600/50 to-purple-900/50 rounded animate-bounce"
              style={{
                animationDelay: `${i * 80}ms`,
                opacity: isPlaying ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}