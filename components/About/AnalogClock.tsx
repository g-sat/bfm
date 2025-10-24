"use client";
import React, { useEffect, useRef } from 'react';

const AnalogClock: React.FC = () => {
  const clockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0') % 12;
      const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0');
      const second = parseInt(parts.find((p) => p.type === 'second')?.value || '0');

      // Update hand rotations
      const hourHand = clockRef.current?.querySelector('.hand.hour') as HTMLElement | null;
      const minuteHand = clockRef.current?.querySelector('.hand.minute') as HTMLElement | null;
      const secondHand = clockRef.current?.querySelector('.hand.second') as HTMLElement | null;

      if (hourHand) hourHand.style.transform = `rotate(${hour * 30 + minute * 0.5}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotate(${minute * 6}deg)`;
      if (secondHand) secondHand.style.transform = `rotate(${second * 6}deg)`;
    };

    updateClock(); // Initial update
    const interval = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="analog-clock-container">
      <div ref={clockRef} className="clock">
        <div className="face">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="marker" style={{ transform: `rotate(${i * 30}deg)` }}>
              <div className="marker-line"></div>
              <span className="marker-number">{i === 0 ? 12 : i}</span>
            </div>
          ))}
        </div>
        <div className="hands">
          <div className="hand hour"></div>
          <div className="hand minute"></div>
          <div className="hand second"></div>
        </div>
        <div className="center"></div>
      </div>
      <p className="timezone-label">IST (India Standard Time)</p>
    </div>
  );
};

export default AnalogClock;