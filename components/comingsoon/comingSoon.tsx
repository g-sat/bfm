"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Model } from '../Hero/Model';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import Image from 'next/image';
import { Group, Mesh, MeshStandardMaterial } from 'three';

// ─── Constants ───────────────────────────────────────────────────────────────

const MODEL_POS: [number, number, number] = [0, 0.35, 0];
const LAUNCH_DATE = new Date('2026-09-01T00:00:00');

// Pre-computed particle values to avoid hydration mismatch
const PARTICLES = [
  { left: '8%',  size: 1.8, delay: 0,   dur: 14, op: 0.35 },
  { left: '17%', size: 1.2, delay: 2.5, dur: 11, op: 0.22 },
  { left: '26%', size: 2.2, delay: 5,   dur: 16, op: 0.4  },
  { left: '34%', size: 1.0, delay: 1,   dur: 9,  op: 0.18 },
  { left: '42%', size: 1.6, delay: 7,   dur: 13, op: 0.3  },
  { left: '51%', size: 2.4, delay: 3,   dur: 18, op: 0.45 },
  { left: '59%', size: 1.1, delay: 6,   dur: 10, op: 0.2  },
  { left: '67%', size: 1.9, delay: 0.5, dur: 15, op: 0.38 },
  { left: '74%', size: 1.3, delay: 4,   dur: 12, op: 0.25 },
  { left: '82%', size: 2.0, delay: 8,   dur: 17, op: 0.42 },
  { left: '90%', size: 1.5, delay: 2,   dur: 11, op: 0.28 },
  { left: '4%',  size: 2.6, delay: 9,   dur: 19, op: 0.32 },
  { left: '22%', size: 1.0, delay: 1.5, dur: 8,  op: 0.16 },
  { left: '48%', size: 1.7, delay: 3.5, dur: 14, op: 0.36 },
  { left: '70%', size: 1.2, delay: 6.5, dur: 10, op: 0.21 },
  { left: '88%', size: 2.3, delay: 0.8, dur: 16, op: 0.4  },
];



// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function HorizonLine() {
  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[32, 0.005]} />
      <meshBasicMaterial color="#c41010" transparent opacity={0.38} depthWrite={false} />
    </mesh>
  );
}

function SceneModel() {
  const groupRef = useRef<Group>(null);
  const materialOverridden = useRef(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Override material once the model has loaded — makes rim lights actually pop
    if (!materialOverridden.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof Mesh) {
          const mat = child.material as MeshStandardMaterial;
          mat.metalness = 0.92;
          mat.roughness = 0.03;
          mat.needsUpdate = true;
          materialOverridden.current = true;
        }
      });
    }

    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef} position={MODEL_POS}>
      <Model rotation={[0, 0, 0]} scale={1.6} />
    </group>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(target.getTime() - Date.now(), 0);
      setT({
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          position: 'relative',
          width: 92,
          height: 92,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, rgba(10,3,3,0.97) 0%, rgba(5,2,12,0.97) 100%)',
          borderRadius: 14,
          border: '1px solid rgba(200,20,20,0.45)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.04)',
            '0 0 32px rgba(200,10,10,0.2)',
            '0 16px 48px rgba(0,0,0,0.92)',
            'inset 0 1px 0 rgba(255,255,255,0.09)',
            'inset 0 -1px 0 rgba(0,0,0,0.6)',
          ].join(', '),
        }}
      >
        {/* top glow stripe */}
        <div style={{
          position: 'absolute', inset: '0 0 auto 0', height: 1, borderRadius: '14px 14px 0 0',
          background: 'linear-gradient(to right, transparent, rgba(255,50,50,0.5), transparent)',
        }} />
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.75rem',
          fontWeight: 700,
          lineHeight: 1,
          color: '#fff',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 32px rgba(255,40,40,0.75), 0 2px 0 #000',
        } as React.CSSProperties}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{
        fontSize: 8,
        fontWeight: 700,
        letterSpacing: '0.44em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.26)',
      }}>
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span style={{
      marginBottom: 32,
      fontSize: '2rem',
      fontWeight: 200,
      color: 'rgba(200,10,10,0.6)',
      textShadow: '0 0 18px rgba(200,10,10,0.55)',
    }}>:</span>
  );
}


// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [playing, setPlaying]   = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    RectAreaLightUniformsLib.init();
    const t = setTimeout(() => setMounted(true), 120);
    return () => { clearTimeout(t); };
  }, []);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.volume = 0.3; a.play(); setPlaying(true); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  // Shared fade-up transition helper
  const fadeUp = (delay: number, extra = '') => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 1.8s ease ${delay}s, transform 1.8s ease ${delay}s${extra ? `, ${extra}` : ''}`,
  });

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#03040a', color: '#fff', userSelect: 'none' }}>

      {/* Ambient audio */}
      <audio ref={audioRef} src="/assets/music/Last_short.mp3" loop />

      {/* ── Background atmosphere orbs ──────────────────────────────────── */}
      <div className="cs-orb cs-orb-1" aria-hidden />
      <div className="cs-orb cs-orb-2" aria-hidden />
      <div className="cs-orb cs-orb-3" aria-hidden />

      {/* ── Floating ember particles ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="cs-particle"
            style={{
              position: 'absolute',
              bottom: 0,
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#ff2020',
              opacity: p.op,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      {/* ── 3D Canvas ────────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0.6, 4.8], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <color attach="background" args={['#03040a']} />
          <Stars radius={150} depth={75} count={7000} factor={3.8} saturation={0.18} fade speed={0.3} />

          <ambientLight intensity={0.14} />
          <directionalLight position={[-2, 4, -8]} intensity={0.35} color="#c084fc" />
          <spotLight position={[3, 2, 5]} angle={0.36} penumbra={0.95} intensity={120} color="#c084fc" />
          {/* Gold rim backlights — directly behind model, creates neon-edge lining */}
          <pointLight position={[0, 0.5, -3.6]} intensity={125} color="#ffc844" decay={2} distance={9} />
          <pointLight position={[0, 2.8, -3.2]} intensity={70} color="#ffaa00" decay={2} distance={8} />
          {/* Red & purple fill */}
          <pointLight position={[-2.5, -1, 3.5]} intensity={60} color="#ff1818" decay={1.5} distance={16} />
          <pointLight position={[2.5, 1, 3]}     intensity={50} color="#a855f7" decay={1.5} distance={16} />

          <Suspense fallback={null}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <rectAreaLight position={[0, -10, 2]} lookAt={MODEL_POS as any} width={4} height={9} intensity={5} color="#ffeedd" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <rectAreaLight position={[0, 9, -2]}  lookAt={MODEL_POS as any} width={4} height={9} intensity={30} color="#a855f7" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <rectAreaLight position={[4, 0, 5]}  lookAt={MODEL_POS as any} width={2} height={10} intensity={16} color="#ff1a1a" />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <rectAreaLight position={[-4, 0, 5]}   lookAt={MODEL_POS as any} width={2} height={10} intensity={16} color="#9333ea" />

            <HorizonLine />
            <SceneModel />

            <EffectComposer enableNormalPass={false}>
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0022, 0.0016]}
                radialModulation
                modulationOffset={0.26}
              />
              <Bloom intensity={3.2} luminanceThreshold={0.15} luminanceSmoothing={0.85} mipmapBlur />
              <Vignette eskil={false} offset={0.25} darkness={0.90} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* ── Scanlines ───────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none', opacity: 0.022,
        backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)',
      }} aria-hidden />

      {/* ── Film grain ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none', opacity: 0.042,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        mixBlendMode: 'overlay',
      }} aria-hidden />

      {/* ── Radial vignette ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 82% 72% at 50% 42%, transparent 22%, rgba(0,0,0,0.93) 100%)',
      }} aria-hidden />

      {/* ── Bottom stage gradient (lifts text off model) ─────────────────── */}
      <div style={{
        position: 'absolute', inset: 'auto 0 0 0', zIndex: 12, height: '52%', pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.72) 45%, transparent 100%)',
      }} aria-hidden />

      {/* ── One-shot sweep reveal line ───────────────────────────────────── */}
      {mounted && (
        <div
          className="cs-sweep-line"
          style={{
            position: 'absolute', top: 0, zIndex: 18, height: '100%', width: 2, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.22) 20%, rgba(230,30,30,0.9) 50%, rgba(255,255,255,0.22) 80%, transparent 100%)',
          }}
          aria-hidden
        />
      )}

      {/* ── Corner brackets ─────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }} aria-hidden>
        <div className="cs-corner cs-corner-tl" />
        <div className="cs-corner cs-corner-tr" />
        <div className="cs-corner cs-corner-bl" />
        <div className="cs-corner cs-corner-br" />
      </div>

      {/* ── Audio toggle ─────────────────────────────────────────────────── */}
      <button
        onClick={toggleAudio}
        aria-label="Toggle ambient sound"
        style={{
          position: 'absolute', top: 24, right: 24, zIndex: 55,
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          border: `1px solid ${playing ? 'rgba(220,30,30,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: playing ? 'rgba(255,90,90,0.95)' : 'rgba(255,255,255,0.32)',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {playing && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
          {playing && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
        </svg>
        {playing ? 'Sound On' : 'Sound Off'}
      </button>

      {/* ── UI Layer ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>

        {/* ── TOP: Logo + brand ───────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          paddingTop: 36,
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? 'translateY(0)' : 'translateY(-28px)',
          transition: 'opacity 1.8s ease 0.2s, transform 1.8s ease 0.2s',
        }}>
          {/* Logo */}
          <div style={{ filter: 'drop-shadow(0 0 20px rgba(220,30,30,0.7)) drop-shadow(0 0 52px rgba(220,30,30,0.28))' }}>
            <Image
              src="/BFM_Main_RB.svg"
              alt="Bold Frame Media"
              width={48}
              height={18}
              className="object-contain"
              priority
            />
          </div>
          {/* Brand rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ height: 1, width: 52, background: 'linear-gradient(to right, transparent, rgba(200,20,20,0.65))' }} />
            <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' }}>
              Visual Media Studio
            </span>
            <div style={{ height: 1, width: 52, background: 'linear-gradient(to left, transparent, rgba(200,20,20,0.65))' }} />
          </div>
        </div>

        {/* ── MIDDLE: breathe room for 3D model ───────────────────────────── */}
        <div style={{ flex: 1 }} />

        {/* ── BOTTOM: all the text content ────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingBottom: 18 }}>

          {/* Live status badge */}
          <div style={{
            ...fadeUp(0.45),
            transform: `${mounted ? 'translateY(0)' : 'translateY(22px)'} rotate(-1.2deg)`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 16px', borderRadius: 4,
              border: '1.5px solid rgba(220,20,20,0.5)',
              color: 'rgba(220,20,20,0.75)',
              fontSize: 8, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
            }}>
              <span className="cs-blink" style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(230,30,30,0.85)', display: 'inline-block' }} />
              Transmission Incoming
            </div>
          </div>

          {/* Tagline */}
          <div style={fadeUp(0.7)}>
            <p style={{
              textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.55em',
              fontSize: 'clamp(0.58rem, 1vw, 0.74rem)',
              color: 'rgba(255,255,255,0.3)',
            }}>
              A New Era in Visual Media
            </p>
          </div>

          {/* Main headline — LAUNCHING / SOON */}
          <div style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'scaleX(1)' : 'scaleX(0.5)',
            transition: 'opacity 1.6s ease 0.9s, transform 2s cubic-bezier(0.16,1,0.3,1) 0.9s',
          }}>
            <h1 style={{
              textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700,
              lineHeight: 0.92, letterSpacing: '-0.04em',
              fontSize: 'clamp(4.2rem, 12vw, 10rem)',
              margin: 0,
            }}>
              <span style={{
                display: 'block', color: '#fff',
                textShadow: '0 4px 0 #000, 0 8px 24px rgba(0,0,0,0.95), 0 0 70px rgba(255,255,255,0.52), 0 0 140px rgba(255,255,255,0.2)',
              }}>
                LAUNCHING
              </span>
              <span style={{ display: 'block', position: 'relative' }}>
                {/* blur glow layer */}
                <span aria-hidden style={{
                  position: 'absolute', inset: 0, display: 'block',
                  color: '#ff1a1a', filter: 'blur(40px)', opacity: 0.78,
                }}>
                  SOON
                </span>
                <span style={{
                  display: 'block', position: 'relative',
                  background: 'linear-gradient(112deg, #ff1212 0%, #ff5555 28%, #ffffff 50%, #ff2a2a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  SOON
                </span>
              </span>
            </h1>
          </div>

          {/* Glowing separator */}
          <div style={{ position: 'relative', height: 1, width: 320, ...fadeUp(1.35) }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(220,30,30,0.95), transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, filter: 'blur(3px)', background: 'linear-gradient(to right, transparent, rgba(220,30,30,0.6), transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, filter: 'blur(8px)', background: 'linear-gradient(to right, transparent, rgba(220,30,30,0.3), transparent)' }} />
          </div>

          {/* Countdown */}
          <div style={fadeUp(1.55)}>
            <p style={{
              textAlign: 'center', fontSize: 8, fontWeight: 800,
              letterSpacing: '0.5em', textTransform: 'uppercase',
              color: 'rgba(220,20,20,0.78)',
              marginBottom: 14,
              animation: 'cs-pulse-red 3s ease-in-out infinite',
            }}>
              Days Until Launch
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <CountdownUnit value={days}    label="Days"  />
              <Colon />
              <CountdownUnit value={hours}   label="Hours" />
              <Colon />
              <CountdownUnit value={minutes} label="Mins"  />
              <Colon />
              <CountdownUnit value={seconds} label="Secs"  />
            </div>
          </div>

          {/* Email capture */}
          <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...fadeUp(1.9) }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 340 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1, borderRadius: 999, padding: '10px 18px',
                    fontSize: 12, color: 'rgba(255,255,255,0.82)',
                    background: 'rgba(0,0,0,0.78)',
                    border: '1px solid rgba(200,20,20,0.32)',
                    outline: 'none', backdropFilter: 'blur(12px)',
                  }}
                />
                <button type="submit" className="cs-btn-notify" style={{
                  whiteSpace: 'nowrap', borderRadius: 999,
                  padding: '10px 20px', fontSize: 12, fontWeight: 600, color: '#fff',
                }}>
                  Notify Me
                </button>
              </form>
            ) : (
              <p style={{ fontSize: 13, letterSpacing: '0.04em', color: 'rgba(255,100,100,0.92)' }}>
                You&apos;re on the list — brace yourself.
              </p>
            )}
          </div>

          {/* Copyright */}
          <p style={{
            fontSize: 7.5, fontWeight: 600, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.11)',
            ...fadeUp(2.5),
          }}>
            © 2026 Bold Frame Media · All rights reserved
          </p>

        </div>
      </div>

      {/* ── Inline keyframes & utility classes ──────────────────────────── */}
      <style>{`
        /* Atmosphere orbs */
        .cs-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .cs-orb-1 {
          width: 1100px; height: 1100px; left: 18%; top: -22%;
          background: radial-gradient(circle, rgba(70,15,180,0.18) 0%, transparent 62%);
          animation: cs-drift 19s ease-in-out infinite alternate;
          z-index: 1;
        }
        .cs-orb-2 {
          width: 700px; height: 700px; right: 1%; bottom: -12%;
          background: radial-gradient(circle, rgba(160,70,230,0.13) 0%, transparent 62%);
          animation: cs-drift 25s ease-in-out infinite alternate-reverse;
          z-index: 1;
        }
        .cs-orb-3 {
          width: 550px; height: 550px; left: -10%; bottom: 18%;
          background: radial-gradient(circle, rgba(210,15,15,0.11) 0%, transparent 62%);
          animation: cs-drift 21s ease-in-out infinite alternate;
          z-index: 1;
        }
        @keyframes cs-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(38px, -30px) scale(1.09); }
        }

        /* Sweep reveal */
        .cs-sweep-line {
          animation: cs-sweep 2.6s cubic-bezier(0.4, 0, 0.15, 1) 0.15s 1 forwards;
        }
        @keyframes cs-sweep {
          0%   { left: -2px;  opacity: 0; }
          4%   { left: 2%;    opacity: 1; }
          96%  { left: 98%;   opacity: 1; }
          100% { left: 100%;  opacity: 0; }
        }

        /* Corner brackets */
        .cs-corner {
          position: absolute;
          width: 44px; height: 44px;
          border-color: rgba(255,255,255,0.13);
          border-style: solid;
        }
        .cs-corner-tl { top: 18px; left: 18px; border-width: 2px 0 0 2px; }
        .cs-corner-tr { top: 18px; right: 18px; border-width: 2px 2px 0 0; }
        .cs-corner-bl { bottom: 18px; left: 18px; border-width: 0 0 2px 2px; }
        .cs-corner-br { bottom: 18px; right: 18px; border-width: 0 2px 2px 0; }

        /* Floating ember particles */
        .cs-particle {
          animation: cs-ember linear infinite;
        }
        @keyframes cs-ember {
          0%   { transform: translateY(0) translateX(0) scale(1);    opacity: 0; }
          8%   { opacity: 0.7; }
          88%  { opacity: 0.25; }
          100% { transform: translateY(-100vh) translateX(48px) scale(0.3); opacity: 0; }
        }

        /* Blinking dot */
        .cs-blink {
          animation: cs-blink-anim 1.6s ease-in-out infinite;
        }
        @keyframes cs-blink-anim {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }

        /* Notify button */
        .cs-btn-notify {
          background: linear-gradient(135deg, #a80000 0%, #e01616 50%, #a80000 100%);
          box-shadow: 0 4px 22px rgba(180,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.15);
          border: 1px solid rgba(255,70,70,0.32);
          cursor: pointer;
          transition: box-shadow 0.22s, transform 0.14s;
        }
        .cs-btn-notify:hover {
          box-shadow: 0 6px 36px rgba(230,0,0,0.85), 0 0 30px rgba(255,40,40,0.45);
          transform: translateY(-2px) scale(1.03);
        }
        .cs-btn-notify:active {
          transform: scale(0.97);
        }

        /* Countdown label pulse */
        @keyframes cs-pulse-red {
          0%, 100% { opacity: 0.62; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
