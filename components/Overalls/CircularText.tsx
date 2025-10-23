"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  size?: number;  // ✅ FIXED: Added size prop
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  size = 300  // ✅ Default size
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);

const handleHoverStart = () => {
  const start = rotation.get();

  if (!onHover) return;

  let transitionConfig: import('framer-motion').Transition;
  let scaleVal = 1;

  switch (onHover) {
    case 'slowDown':
      transitionConfig = getTransition(spinDuration * 2, start);
      break;
    case 'speedUp':
      transitionConfig = getTransition(spinDuration / 4, start);
      break;
    case 'pause':
      transitionConfig = {
        rotate: { type: 'spring', damping: 20, stiffness: 300 },
        scale: { type: 'spring', damping: 20, stiffness: 300 }
      };
      break;
    case 'goBonkers':
      transitionConfig = getTransition(spinDuration / 20, start);
      scaleVal = 0.8;
      break;
    default:
      transitionConfig = getTransition(spinDuration, start);
  }

  controls.start({
    rotate: start + 360,
    scale: scaleVal,
    transition: transitionConfig
  });
};

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  // ✅ PERFECT CIRCULAR MATH
  const radius = size / 3;

  return (
    <motion.div
      className={`m-0 mx-auto rounded-full relative font-black text-center pointer-events-none origin-center ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        rotate: rotation 
      }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const angle = ((360 / letters.length) * i - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <span
            key={i}
            className="absolute inline-block text-xl sm:text-2xl md:text-3xl"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: `
                translate(-50%, -50%) 
                translate(${x}px, ${y}px) 
                rotate(${-(360 / letters.length) * i}deg)
              `,
              WebkitTransform: `
                translate(-50%, -50%) 
                translate(${x}px, ${y}px) 
                rotate(${-(360 / letters.length) * i}deg)
              `
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;