/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useRef } from "react";
import { throttle } from "@/lib/utils";

export interface MousePosition {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
  velocity: number;
  isMoving: boolean;
  isClicking: boolean;
  isOverClickable: boolean;
  normalizedX: number;
  normalizedY: number;
}

export const useMousePosition = (throttleDelay: number = 16) => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    movementX: 0,
    movementY: 0,
    velocity: 0,
    isMoving: false,
    isClicking: false,
    isOverClickable: false,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;

      const movementX = e.clientX - lastPosition.current.x;
      const movementY = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(movementX * movementX + movementY * movementY);
      const velocity = distance / deltaTime;

      // Normalize coordinates (0 to 1)
      const normalizedX = e.clientX / window.innerWidth;
      const normalizedY = e.clientY / window.innerHeight;

      setPosition({
        x: e.clientX,
        y: e.clientY,
        movementX,
        movementY,
        velocity,
        isMoving: velocity > 0.1,
        isClicking: false,
        isOverClickable: isElementClickable(e.target as HTMLElement),
        normalizedX,
        normalizedY,
      });

      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = currentTime;

      // Reset inactivity timer
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }

      inactivityTimer.current = setTimeout(() => {
        setPosition((prev) => ({
          ...prev,
          isMoving: false,
          velocity: 0,
        }));
      }, 100);
    };

    const handleMouseDown = () => {
      setPosition((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setPosition((prev) => ({ ...prev, isClicking: false }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const isClickable = isElementClickable(e.target as HTMLElement);
      setPosition((prev) => ({ ...prev, isOverClickable: isClickable }));
    };

    const throttledUpdate = throttle(updatePosition, throttleDelay);

    window.addEventListener("mousemove", throttledUpdate, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", throttledUpdate);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [throttleDelay]);

  // Helper function to check if element is clickable
  const isElementClickable = (element: HTMLElement | null): boolean => {
    if (!element) return false;

    const tagName = element.tagName.toLowerCase();
    const hasOnClick = element.onclick !== null;
    const isButtonLike = element.getAttribute("role") === "button";
    const isLink = tagName === "a" && element.hasAttribute("href"); // Changed to hasAttribute
    const isButton = tagName === "button";
    const isClickableCursor = element.style.cursor === "pointer";
    const parentIsClickable =
      element.closest("button, a, [role='button']") !== null;

    return (
      isButton ||
      isLink ||
      hasOnClick ||
      isButtonLike ||
      isClickableCursor ||
      parentIsClickable
    );
  };
  // Get distance from element
  const getDistanceFromElement = (element: HTMLElement | null): number => {
    if (!element) return Infinity;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return Math.sqrt(
      Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)
    );
  };

  // Check if mouse is near element
  const isNearElement = (
    element: HTMLElement | null,
    threshold: number = 100
  ): boolean => {
    return getDistanceFromElement(element) <= threshold;
  };

  // Get angle from element
  const getAngleFromElement = (element: HTMLElement | null): number => {
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
      Math.atan2(position.y - centerY, position.x - centerX) * (180 / Math.PI)
    );
  };

  // Get normalized distance (0 to 1)
  const getNormalizedDistance = (
    element: HTMLElement | null,
    maxDistance: number = 300
  ): number => {
    const distance = getDistanceFromElement(element);
    return Math.max(0, Math.min(1, 1 - distance / maxDistance));
  };

  // Calculate parallax offset based on mouse position
  const getParallaxOffset = (
    intensity: number = 0.5,
    element?: HTMLElement | null
  ): { x: number; y: number } => {
    if (element) {
      const normalizedDistance = getNormalizedDistance(element);
      return {
        x: (position.normalizedX - 0.5) * intensity * normalizedDistance,
        y: (position.normalizedY - 0.5) * intensity * normalizedDistance,
      };
    }

    return {
      x: (position.normalizedX - 0.5) * intensity,
      y: (position.normalizedY - 0.5) * intensity,
    };
  };

  // Smooth interpolation for animations
  const getSmoothPosition = (
    smoothing: number = 0.1,
    prevPosition?: MousePosition
  ): MousePosition => {
    if (!prevPosition) return position;

    return {
      ...position,
      x: prevPosition.x + (position.x - prevPosition.x) * smoothing,
      y: prevPosition.y + (position.y - prevPosition.y) * smoothing,
      movementX:
        prevPosition.movementX +
        (position.movementX - prevPosition.movementX) * smoothing,
      movementY:
        prevPosition.movementY +
        (position.movementY - prevPosition.movementY) * smoothing,
      velocity:
        prevPosition.velocity +
        (position.velocity - prevPosition.velocity) * smoothing,
    };
  };

  // Get mouse trail positions
  const getTrailPositions = (
    length: number = 10,
    smoothing: number = 0.3
  ): Array<{ x: number; y: number }> => {
    const positions: Array<{ x: number; y: number }> = [];
    let currentPosition = { ...position };

    for (let i = 0; i < length; i++) {
      positions.push({ x: currentPosition.x, y: currentPosition.y });
      // Simulate smoothing for trail
      currentPosition = {
        ...currentPosition,
        x: currentPosition.x - currentPosition.movementX * smoothing * i,
        y: currentPosition.y - currentPosition.movementY * smoothing * i,
      };
    }

    return positions;
  };

  // Check if mouse is in viewport
  const isInViewport = (): boolean => {
    return (
      position.x >= 0 &&
      position.x <= window.innerWidth &&
      position.y >= 0 &&
      position.y <= window.innerHeight
    );
  };

  // Get velocity-based effects
  const getVelocityEffects = (): {
    scale: number;
    opacity: number;
    blur: number;
  } => {
    const maxVelocity = 10; // pixels per ms
    const velocityRatio = Math.min(position.velocity / maxVelocity, 1);

    return {
      scale: 1 + velocityRatio * 0.2,
      opacity: 1 - velocityRatio * 0.5,
      blur: velocityRatio * 10,
    };
  };

  return {
    ...position,
    getDistanceFromElement,
    isNearElement,
    getAngleFromElement,
    getNormalizedDistance,
    getParallaxOffset,
    getSmoothPosition,
    getTrailPositions,
    isInViewport,
    getVelocityEffects,
  };
};

// Hook for mouse wheel
export const useMouseWheel = () => {
  const [wheelDelta, setWheelDelta] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setWheelDelta(e.deltaY);
      setIsScrolling(true);

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      scrollTimer.current = setTimeout(() => {
        setIsScrolling(false);
        setWheelDelta(0);
      }, 100);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  return { wheelDelta, isScrolling };
};

// Hook for mouse drag
export const useMouseDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
      setCurrentPosition({ x: e.clientX, y: e.clientY });
      setDelta({ x: 0, y: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setCurrentPosition({ x: e.clientX, y: e.clientY });
      setDelta({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPosition]);

  return {
    isDragging,
    startPosition,
    currentPosition,
    delta,
    distance: Math.sqrt(delta.x * delta.x + delta.y * delta.y),
  };
};

// Hook for mouse hover with debounce
export const useMouseHover = (
  elementRef: React.RefObject<HTMLElement>,
  delay: number = 100
) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
      hoverTimer.current = setTimeout(() => {
        setIsHovered(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
      hoverTimer.current = setTimeout(() => {
        setIsHovered(false);
      }, delay);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
    };
  }, [elementRef, delay]);

  return isHovered;
};

export default useMousePosition;
