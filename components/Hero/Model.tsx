
"use client";
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'
import type { GLTF } from 'three-stdlib'

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

  useEffect(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as MeshStandardMaterial
      mat.transparent = true
      mat.opacity = 0.3
      mat.color.set('#000000') // vivid red tint
      mat.emissive.set('#000000')
      mat.emissiveIntensity = 0.35
      mat.roughness = 0.08
      mat.metalness = 0.0
      mat.needsUpdate = true
    }
  }, [materials])

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
