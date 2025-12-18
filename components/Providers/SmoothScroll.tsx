"use client";

import { ReactNode, useEffect, useRef } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
  smoothness?: number;
  enabled?: boolean;
}

export const SmoothScrollProvider = ({
  children,
  smoothness = 0.1,
  enabled = true,
}: SmoothScrollProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);
  const lastTouchY = useRef(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const now = performance.now();
        if (now - lastScrollTime.current < 16) return; // Throttle to ~60fps
        lastScrollTime.current = now;

        e.preventDefault();
        targetScroll.current += e.deltaY * 0.5; // Reduced sensitivity for better UX

        // Clamp scroll position with requestAnimationFrame
        requestAnimationFrame(() => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          targetScroll.current = Math.max(
            0,
            Math.min(targetScroll.current, maxScroll)
          );
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastTouchY.current = e.touches[0].clientY;
        targetScroll.current = currentScroll.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaY = lastTouchY.current - touch.clientY;
        lastTouchY.current = touch.clientY;
        targetScroll.current += deltaY * 2;

        // Clamp scroll position
        requestAnimationFrame(() => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          targetScroll.current = Math.max(
            0,
            Math.min(targetScroll.current, maxScroll)
          );
        });
      }
    };

    const animateScroll = () => {
      const now = performance.now();
      if (now - lastScrollTime.current < 16) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
        return;
      }
      lastScrollTime.current = now;

      // Smooth interpolation with damping
      const scrollDiff = targetScroll.current - currentScroll.current;
      currentScroll.current += scrollDiff * smoothness;

      // Apply scroll with native scrollTo for better performance
      if (Math.abs(scrollDiff) > 0.1) {
        window.scrollTo({
          top: currentScroll.current,
          behavior: "auto",
        });
      }

      // Continue animation if needed
      if (Math.abs(scrollDiff) > 0.5) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      }
    };

    // Initialize with throttling
    requestAnimationFrame(() => {
      currentScroll.current = window.scrollY;
      targetScroll.current = window.scrollY;
    });

    // Event listeners with passive false for wheel
    const wheelOptions: AddEventListenerOptions & EventListenerOptions = {
      passive: false,
    };
    const touchOptions: AddEventListenerOptions & EventListenerOptions = {
      passive: false,
    };

    window.addEventListener("wheel", handleWheel, wheelOptions);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, touchOptions);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, smoothness]);

  // Handle resize with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        targetScroll.current = Math.min(targetScroll.current, maxScroll);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">{children}</div>
    </div>
  );
};

// Utility for smooth scroll to element with improved easing
export const smoothScrollTo = (
  element: HTMLElement | string,
  offset: number = 0,
  duration: number = 1000
) => {
  const target =
    typeof element === "string" ? document.querySelector(element) : element;

  if (!target) return;

  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - offset;

  if (Math.abs(distance) < 1) return; // Don't animate if already at position

  const startTime = performance.now();

  // Easing function optimized with fewer operations
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScroll = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = easeInOutCubic(progress);
    const scrollPosition = startPosition + distance * ease;

    window.scrollTo(0, scrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Utility for smooth scroll by amount with optimized easing
export const smoothScrollBy = (amount: number, duration: number = 500) => {
  const startPosition = window.pageYOffset;
  if (Math.abs(amount) < 1) return; // Don't animate tiny scrolls

  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Optimized easeOutCubic with fewer operations
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startPosition + amount * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Export scroll functions for global use
if (typeof window !== "undefined") {
  (window as any).__smoothScrollTo = smoothScrollTo;
  (window as any).__smoothScrollBy = smoothScrollBy;
}

export default SmoothScrollProvider;
