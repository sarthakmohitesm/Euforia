"use client";

import { useEffect, useState } from "react";

interface Pollen {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function FireflyOverlay() {
  const [pollens, setPollens] = useState<Pollen[]>([]);

  useEffect(() => {
    const list: Pollen[] = [];
    const colors = [
      "rgba(255, 235, 59, 0.45)",  // Golden relics dust
      "rgba(245, 124, 0, 0.35)",   // Warm sunburst orange
      "rgba(255, 255, 255, 0.6)",  // White cotton spores
    ];

    for (let i = 0; i < 40; i++) {
      const size = 3 + Math.random() * 6;
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setPollens(list);
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
      {pollens.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            filter: "blur(1px)",
            boxShadow: `0 0 ${p.size * 2.5}px rgba(255, 255, 255, 0.5)`,
            animation: `pollen-drift ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
