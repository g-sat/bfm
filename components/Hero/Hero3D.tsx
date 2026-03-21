"use client";

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { Group, MathUtils } from 'three'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Model } from './Model'

// Keep the model centered inside its container
const xOffset = 0
// Place the model at the origin
const baseModelPosition: [number, number, number] = [0.4, 0.2, 0]
const modelPosition: [number, number, number] = [baseModelPosition[0] + xOffset, baseModelPosition[1], baseModelPosition[2]]
const shiftX = (pos: [number, number, number]): [number, number, number] => [pos[0] + xOffset, pos[1], pos[2]]

type MouseFollowModelProps = {
  position?: [number, number, number]
}

// Tracks whether we're in the About section - Exported for use in Model material transition
export const inAboutSection = { value: false };
// Tracks the scroll-driven rotation during Hero -> About transition
export const transitionRotation = { y: 0 };

function MouseFollowModel({ position = modelPosition }: MouseFollowModelProps) {
  const modelGroup = useRef<Group>(null)
  const followState = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetPosX: 0,
    targetPosY: 0,
  })
  const autoRotateY = useRef(0); // accumulated auto-rotation when in About section
  const scrollScale = useRef({ value: 0.35 }); // increased per user request for bigger size

  // Handle mouse-follow lean in Hero section only
  useFrame((_, delta) => {
    if (!modelGroup.current) return

    const lerp = (from: number, to: number, factor: number) => MathUtils.lerp(from, to, factor)
    const rotLerp = 1 - Math.pow(0.12, delta * 60)
    const posLerp = 1 - Math.pow(0.18, delta * 60)

    const rotation = modelGroup.current.rotation
    const positionVec = modelGroup.current.position

    if (inAboutSection.value) {
      // About state: Auto-rotate slowly around Y, ignore mouse
      autoRotateY.current += delta * 0.4;
      rotation.y = autoRotateY.current;
      rotation.x = lerp(rotation.x, 0, rotLerp); // level out X tilt
      positionVec.x = lerp(positionVec.x, position[0], posLerp);
      positionVec.y = lerp(positionVec.y, position[1], posLerp);
      // Smoothly scale to the About-section target
      modelGroup.current.scale.setScalar(
        MathUtils.lerp(modelGroup.current.scale.x, scrollScale.current.value, posLerp)
      );
    } else {
      // Hero / Transition state: mouse follow + scroll-driven spin
      // The scrollRotation.y value is updated by our GSAP scrub trigger below
      const totalY = followState.current.targetRotY + transitionRotation.y;
      
      rotation.x = lerp(rotation.x, followState.current.targetRotX, rotLerp)
      rotation.y = lerp(rotation.y, totalY, rotLerp)
      positionVec.x = lerp(positionVec.x, position[0] + followState.current.targetPosX, posLerp)
      positionVec.y = lerp(positionVec.y, position[1] + followState.current.targetPosY, posLerp)
      
      // Hero scale (0.75)
      modelGroup.current.scale.setScalar(
        MathUtils.lerp(modelGroup.current.scale.x, 0.75, posLerp)
      );
    }
  })

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (inAboutSection.value) return; // disable mouse follow in About
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      followState.current = {
        targetRotX: ny * -0.18,
        targetRotY: nx * 0.28,
        targetPosX: nx * 0.08,
        targetPosY: ny * -0.08,
      }
    }
    const resetFollow = () => {
      followState.current = { targetRotX: 0, targetRotY: 0, targetPosX: 0, targetPosY: 0 }
    }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', resetFollow)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', resetFollow)
    }
  }, [])

  return (
    <group ref={modelGroup} position={position}>
      <Model
        rotation={[0, 0, 0]}
        scale={0.75}
      />
    </group>
  )
}

const Hero3DModel = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    RectAreaLightUniformsLib.init()
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth scrub animation: model slides from Hero position into About image column
      // as the user scrolls. Starts when About begins entering viewport, ends when fully in view.
      gsap.fromTo(wrapperRef.current,
        // FROM: Hero starting position (right side)
        { left: "75%", top: "0%", yPercent: 0 },
        { 
          left: "23%",
          top: "57.5vh",
          yPercent: -50,
          opacity: 1,
          // Proxy animation for the rotation - 2 full spins (4*PI)
          onUpdate: function() {
            transitionRotation.y = this.progress() * Math.PI * 4;
          },
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#hero",
            start: "center top",   // starts when hero center crosses top — still scrolling through hero
            end: "bottom top",     // ends when hero bottom fully leaves the top — model is in place
            scrub: true,           // perfectly tracks scroll position 1:1
          },
        }
      );

      // Second animation: make it "stick" to the About section as it scrolls up
      gsap.to(wrapperRef.current, {
        scrollTrigger: {
          trigger: "#about",
          start: "top top",      // when About section starts leaving the top
          end: "bottom top",    // when About section is completely gone
          scrub: true,
          invalidateOnRefresh: true, // handle window resizing correctly
        },
        y: () => {
          const aboutHeight = document.getElementById("about")?.offsetHeight || window.innerHeight;
          return -aboutHeight;
        },
        ease: "none"
      });

      // Separate trigger to flip the 3D rendering mode (mouse-follow → auto-rotate)
      // This fires cleanly once the section is half in view
      ScrollTrigger.create({
        trigger: "#about",
        start: "top center",
        onEnter: () => { inAboutSection.value = true; },
        onLeaveBack: () => { inAboutSection.value = false; },
      });
    });

    return () => ctx.revert();
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 z-[60] pointer-events-none"
      style={{ height: "100vh", width: "45vw", left: "75%", transform: "translateX(-50%)" }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 6.2], fov: 32 }}
        dpr={[1, 2]}
        className="pointer-events-auto w-full h-full"
      >
        {/* <color attach="background" args={["#000000"]} /> */}
        <ambientLight intensity={0.12} />
        {/* Key light (warm) */}
        <directionalLight
          position={shiftX([-1.2, 3.2, -8])}
          intensity={2.4}
          color="#deb8ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Cool rim from camera-right */}
        <spotLight
          position={shiftX([2.5, 1.5, 5])}
          angle={0.38}
          penumbra={0.6}
          intensity={220}
          color="#8ec5ff"
          castShadow
        />
        {/* Boosted red fill behind model for more dramatic red tint */}
        <pointLight
          position={shiftX([0.4, 0.4, -7.5])}
          intensity={4200}
          color="#c0100a"
          decay={1}
          distance={28}
        />
        <Suspense fallback={null}>
          {/* Front rectangular light at ~45° aimed at the model */}
          <rectAreaLight
            position={shiftX([0, -10, 2])}
            lookAt={modelPosition}
            width={2.5}
            height={6.5}
            intensity={120}
            color="#ffffff"
          />

          {/* Rear rectangular light behind the model at ~45° pointing forward */}
          <rectAreaLight
            position={shiftX([0, 9, -2])}
            lookAt={modelPosition}
            width={2.5}
            height={6.5}
            intensity={120}
            color="#ffffff"
          />
          {/* Procedural env map to avoid remote HDR fetch failures */}
          <Environment background={false} resolution={256}>
            <Lightformer
              form="rect"
              intensity={4}
              position={shiftX([0, 1.5, -6])}
              scale={[6, 4, 1]}
              color="#f2e5ff"
            />
            <Lightformer
              form="ring"
              intensity={3.2}
              position={shiftX([1.4, 2.2, 4])}
              rotation={[0, Math.PI * 0.4, 0]}
              scale={3.5}
              color="#8ec5ff"
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={shiftX([-1.2, 3, 1])}
              rotation={[Math.PI / 2, 0, 0]}
              scale={2.8}
              color="#a80823"
            />
          </Environment>
          <MouseFollowModel position={modelPosition} />
          <EffectComposer enableNormalPass={false}>
            <ChromaticAberration offset={[0.006, 0.005]} radialModulation modulationOffset={0.36} />
          </EffectComposer>
          {/* Keep environment off to emphasize back light through glass */}
          <ContactShadows
            position={shiftX([0, baseModelPosition[1], 0])}
            opacity={0.4}
            width={10}
            height={10}
            blur={2.5}
            far={3}
          />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 2.3}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}

export default Hero3DModel
