"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    movementX: 0,
    movementY: 0,
  });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        movementX: e.clientX - lastX,
        movementY: e.clientY - lastY,
      });
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
};
