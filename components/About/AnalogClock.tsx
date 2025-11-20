"use client";
import React, { useEffect, useRef } from "react";

const AnalogClock: React.FC = () => {
  const clockRef = useRef<HTMLDivElement | null>(null);
  const rotationStateRef = useRef({
    hourBase: 0,
    minuteBase: 0,
    secondBase: 0,
    prevHourValue: 0,
    prevMinuteValue: 0,
    prevSecondValue: 0,
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 330 * 60000);

      const rawHour = istDate.getHours() % 12;
      const minute = istDate.getMinutes();
      const second = istDate.getSeconds();
      const millisecond = istDate.getMilliseconds();

      const secondValue = second + millisecond / 1000;
      const minuteValue = minute + secondValue / 60;
      const hourValue = rawHour + minuteValue / 60;

      const rotationState = rotationStateRef.current;

      if (secondValue < rotationState.prevSecondValue) {
        rotationState.secondBase += 360;
      }
      const secondAngle = rotationState.secondBase + secondValue * 6;
      rotationState.prevSecondValue = secondValue;

      if (minuteValue < rotationState.prevMinuteValue) {
        rotationState.minuteBase += 360;
      }
      const minuteAngle = rotationState.minuteBase + minuteValue * 6;
      rotationState.prevMinuteValue = minuteValue;

      if (hourValue < rotationState.prevHourValue) {
        rotationState.hourBase += 360;
      }
      const hourAngle = rotationState.hourBase + hourValue * 30;
      rotationState.prevHourValue = hourValue;

      // Update hand rotations
      const hourHand = clockRef.current?.querySelector(".hand.hour") as HTMLElement | null;
      const minuteHand = clockRef.current?.querySelector(".hand.minute") as HTMLElement | null;
      const secondHand = clockRef.current?.querySelector(".hand.second") as HTMLElement | null;

      if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
      if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
    };

    updateClock(); // Initial update
    const interval = setInterval(updateClock, 150); // Update regularly for smoother motion

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