"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "../../components/Hero/Model";
import { useRef, useEffect, useState } from "react";
import { Group } from "three";
import { MathUtils } from "three";

export function Hero3D() {
  const modelRef = useRef<Group | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });

  // base rotation: ~95deg for a slightly stronger tilt (in radians)
  const baseRotationX = Math.PI / 2 + MathUtils.degToRad(5);

  useEffect(() => {
    // initial center-right "hero" position
    const computeStart = () => ({
      x: window.innerWidth * 0.78, // ~right side
      y: window.innerHeight * 0.5, // vertical center
      scale: 1,
    });

    const getDockCenter = () => {
      const dock = document.getElementById("about-3d-dock");
      if (!dock) return null;
      const r = dock.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const getAboutProgress = () => {
      const about = document.getElementById("about-section");
      if (!about) return 0;
      const r = about.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top is below viewport,
      // 1 when section top reaches mid viewport
      const start = vh;        // just below viewport
      const end = vh * 0.5;    // mid viewport
      const t = 1 - (r.top - end) / (start - end);
      return Math.min(1, Math.max(0, t));
    };

    const handle = () => {
      const start = computeStart();
      const dock = getDockCenter();
      const p = getAboutProgress();

      if (dock) {
        const x = MathUtils.lerp(start.x, dock.x, p);
        const y = MathUtils.lerp(start.y, dock.y, p);
        const scale = MathUtils.lerp(1, 0.7, p); // scale down slightly at dock
        setPos({ x, y, scale });
      } else {
        setPos(start);
      }
    };

    // ensure model starts at base rotation once the ref is available
    const setInitialRotation = () => {
      if (modelRef.current) {
        modelRef.current.rotation.set(baseRotationX, 0, 0);
      } else {
        requestAnimationFrame(setInitialRotation);
      }
    };
    setInitialRotation();

    // listeners
    handle(); // initial layout
    const onScroll = () => handle();
    const onResize = () => handle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // subtle mouse-follow rotation (kept minimal)
    const onMouseMove = (e: MouseEvent) => {
      if (!modelRef.current) return;
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;
      const targetX = baseRotationX + my * 0.15;
      const targetY = mx * 0.15;
      modelRef.current.rotation.x = MathUtils.lerp(modelRef.current.rotation.x, targetX, 0.05);
      modelRef.current.rotation.y = MathUtils.lerp(modelRef.current.rotation.y, targetY, 0.05);
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [baseRotationX]);

  return (
    // Fixed overlay following scroll to the "dock"; pointer-events-none so it never blocks UI
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        // place the canvas at (pos.x, pos.y) with translate(-50%,-50%) so it's centered
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${pos.scale})`,
        transformOrigin: "center center",
        transition: "transform 0.18s ease-out",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="pointer-events-none" >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <group ref={modelRef} position={[0, -0.5, 0]} scale={1}>
          <Model />
        </group>
      </Canvas>
    </div>
  );
}
