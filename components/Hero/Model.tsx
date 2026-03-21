
"use client";
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { MathUtils, Mesh, MeshStandardMaterial } from 'three'
import type { GLTF } from 'three-stdlib'
import { inAboutSection } from './Hero3D'

interface GLTFResult extends GLTF {
  nodes: {
    bfm: Mesh
  }
  materials: {
    'Glass Shader.001': MeshStandardMaterial
    Dispepsia: MeshStandardMaterial
  }
}

type ModelProps = ThreeElements['group']

export function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF('/assets/Model/bfm.glb') as unknown as GLTFResult
  const meshRef = useRef<Mesh>(null)

  // Initial material setup
  useEffect(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as MeshStandardMaterial
      mat.transparent = true
      mat.color.set('#000000') // solid-black base
      mat.emissive.set('#000000')
      mat.roughness = 0.08
      mat.metalness = 0.0
      mat.needsUpdate = true
    }
  }, [materials])

  // Real-time material updates for transition
  useFrame((_, delta) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as MeshStandardMaterial
    
    // Lerp opacity: 1.0 in About section, 0.6 in Hero (glass-like)
    const targetOpacity = inAboutSection.value ? 1.0 : 0.6;
    mat.opacity = MathUtils.lerp(mat.opacity, targetOpacity, 1 - Math.pow(0.12, delta * 60))
    mat.needsUpdate = true;
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.bfm.geometry}
        material={materials.Dispepsia}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.975, 1.8, 0.975]}
      />
    </group>
  )
}

useGLTF.preload('/assets/Model/bfm.glb')
