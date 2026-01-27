"use client";

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing'
import { Group, MathUtils } from 'three'
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

function MouseFollowModel({ position = modelPosition }: MouseFollowModelProps) {
  const modelGroup = useRef<Group>(null)
  const spinState = useRef({
    active: false,
    elapsed: 0,
    duration: 3,
    rotations: 6,
    startY: 0,
  })
  const followState = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetPosX: 0,
    targetPosY: 0,
  })
  const TWO_PI = Math.PI * 2

  // Handle click spin bursts and mouse-follow lean
  useFrame((_, delta) => {
    if (!modelGroup.current) return

    // Spin animation: 6 full turns over 3s with ease in/out, starting from current yaw
    if (spinState.current.active) {
      spinState.current.elapsed = Math.min(spinState.current.elapsed + delta, spinState.current.duration)
      const t = spinState.current.elapsed / spinState.current.duration
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // easeInOutCubic

      const offset = ((spinState.current.rotations * TWO_PI) * ease) % TWO_PI
      modelGroup.current.rotation.y = spinState.current.startY + offset

      if (spinState.current.elapsed >= spinState.current.duration) {
        spinState.current.active = false
        spinState.current.elapsed = 0
      }
    }

    // Smoothly lean/shift toward mouse target when not spinning
    const lerp = (from: number, to: number, factor: number) => MathUtils.lerp(from, to, factor)
    const rotLerp = 1 - Math.pow(0.12, delta * 60) // frame-rate independent blend
    const posLerp = 1 - Math.pow(0.18, delta * 60)

    const rotation = modelGroup.current.rotation
    const positionVec = modelGroup.current.position

    rotation.x = lerp(rotation.x, followState.current.targetRotX, rotLerp)
    if (!spinState.current.active) {
      rotation.y = lerp(rotation.y, followState.current.targetRotY, rotLerp)
    }

    positionVec.x = lerp(positionVec.x, position[0] + followState.current.targetPosX, posLerp)
    positionVec.y = lerp(positionVec.y, position[1] + followState.current.targetPosY, posLerp)
  })

  const handleClick = () => {
    if (!modelGroup.current) return
    spinState.current = {
      active: true,
      elapsed: 0,
      duration: 3,
      rotations: 6.5,
      startY: modelGroup.current.rotation.y,
    }
  }

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1 // -1 to 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1

      followState.current = {
        targetRotX: ny * -0.18, // tilt back when cursor goes up
        targetRotY: nx * 0.28, // yaw toward cursor horizontally
        targetPosX: nx * 0.22, // subtle parallax slide
        targetPosY: ny * -0.12,
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
    <group
      ref={modelGroup}
      position={position}
      onClick={handleClick}
    >
      <Model
        rotation={[0, 0, 0]} // origin rotation
        scale={0.7} // slightly smaller to fit frame
      />
    </group>
  )
}

const Hero3DModel = () => {
  useEffect(() => {
    RectAreaLightUniformsLib.init()
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0.1, 6.2], fov: 32 }}
      dpr={[1, 2]}
      className="fixed top-0 z-50"
      style={{ height: "100vh", width: "33vw", left: "50%", transform: "translateX(-50%)" }}
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
      {/* Soft fill behind model */}
      <pointLight 
        position={shiftX([0.4, 0.4, -7.5])} 
        intensity={1600} 
        color="#a80823" 
        decay={1} 
        distance={22} 
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
  )
}

export default Hero3DModel
