// components/Hero3D.tsx (modified for global mouse response and transparent background)
"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "../Model";
import { useRef, useEffect } from "react";
import { Group } from "three";
import { MathUtils } from "three";

export function Hero3D() {
  const modelRef = useRef<Group | null>(null);

  // base rotation: 90deg + 5deg extra tilt => ~95deg, converted to radians (adjusted slightly for better base view)
  const baseRotationX = Math.PI / 2 + MathUtils.degToRad(5);

  useEffect(() => {
    // ensure model starts at base rotation once the ref is available
    const setInitialRotation = () => {
      if (modelRef.current) {
        modelRef.current.rotation.set(baseRotationX, 0, 0);
      } else {
        // try again on next frame until ref is ready
        requestAnimationFrame(setInitialRotation);
      }
    };
    setInitialRotation();

    const handleMouseMove = (event: MouseEvent) => {
      if (!modelRef.current) return;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // subtle rotation based on global mouse position
      const targetRotationX = mouseY * 0.2;
      const targetRotationY = mouseX * 0.2;

      modelRef.current.rotation.x = MathUtils.lerp(
        modelRef.current.rotation.x,
        baseRotationX + targetRotationX,
        0.05
      );
      modelRef.current.rotation.y = MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [baseRotationX]);

  return (
    // no ref needed since listening globally
    <div className="h-screen w-full pointer-events-auto bg-transparent">
      <Canvas
        camera={{ position: [2, 0, 6], fov: 45 }}
        className="h-full w-full pointer-events-none"
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <group ref={modelRef} position={[0, 0, 0]} scale={1}>
          <Model />
        </group>
      </Canvas>
    </div>
  );
}