"use client";

import { useEffect, useState } from "react";

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function FireflyOverlay() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const flies: Firefly[] = [];
    for (let i = 0; i < 30; i++) {
      flies.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
      });
    }
    setFireflies(flies);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {fireflies.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, #ffd700 0%, rgba(255,215,0,0.3) 60%, transparent 100%)`,
            boxShadow: `0 0 ${f.size * 3}px ${f.size}px rgba(255,215,0,0.4)`,
            animation: `firefly ${f.duration}s ${f.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
