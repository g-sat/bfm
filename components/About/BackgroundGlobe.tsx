"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh } from "three";

const Globe = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.12;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Sphere ref={meshRef} args={[1.6, 36, 36]}>
                <meshBasicMaterial
                    wireframe
                    color="#aaaaaa"
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </group>
    );
};

export const BackgroundGlobe = () => {
    return (
        <div className="absolute bottom-[-15%] right-[-15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 pointer-events-none opacity-30 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Globe />
            </Canvas>
        </div>
    );
};
