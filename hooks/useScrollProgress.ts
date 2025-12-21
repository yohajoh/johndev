/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { throttle } from "@/lib/utils";

export interface ScrollProgress {
  progress: number;
  isScrolled: boolean;
  scrollDirection: "up" | "down";
  scrollY: number;
  scrollHeight: number;
  windowHeight: number;
}

export const useScrollProgress = (throttleDelay: number = 16) => {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    isScrolled: false,
    scrollDirection: "down",
    scrollY: 0,
    scrollHeight: 0,
    windowHeight: 0,
  });

  const [lastScrollY, setLastScrollY] = useState(0);

  const updateScrollProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollProgress((prev) => ({
      progress: Math.min(100, Math.max(0, scrollPercent)),
      isScrolled: scrollTop > 50,
      scrollDirection: scrollTop > lastScrollY ? "down" : "up",
      scrollY: scrollTop,
      scrollHeight: docHeight,
      windowHeight: window.innerHeight,
    }));

    setLastScrollY(scrollTop);
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const throttledUpdate = throttle(updateScrollProgress, throttleDelay);

    // Initial update
    throttledUpdate();

    // Event listeners
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledUpdate);
      window.removeEventListener("resize", throttledUpdate);
    };
  }, [updateScrollProgress, throttleDelay]);

  // Smooth scroll function
  const scrollTo = useCallback(
    (target: HTMLElement | string, offset: number = 0) => {
      if (typeof window === "undefined") return;

      let element: HTMLElement | null;

      if (typeof target === "string") {
        element = document.querySelector(target);
      } else {
        element = target;
      }

      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
    []
  );

  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  // Check if element is in viewport
  const isInViewport = useCallback(
    (element: HTMLElement, offset: number = 0) => {
      if (typeof window === "undefined") return false;

      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight - offset && rect.bottom >= offset;
    },
    []
  );

  // Get current section
  const getCurrentSection = useCallback((sections: string[]) => {
    if (typeof window === "undefined") return null;

    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          return sectionId;
        }
      }
    }

    return null;
  }, []);

  // Parallax effect helper
  const getParallaxOffset = useCallback(
    (speed: number = 0.5, baseOffset: number = 0) => {
      if (typeof window === "undefined") return baseOffset;
      return scrollProgress.scrollY * speed + baseOffset;
    },
    [scrollProgress.scrollY]
  );

  // Progress for specific element
  const getElementProgress = useCallback((element: HTMLElement) => {
    if (typeof window === "undefined") return 0;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate progress based on visibility
    if (elementTop > windowHeight) {
      return 0; // Element below viewport
    } else if (elementTop + elementHeight < 0) {
      return 100; // Element above viewport
    } else {
      const visibleHeight = Math.min(
        windowHeight - Math.max(0, elementTop),
        elementHeight - Math.max(0, -elementTop)
      );
      return (visibleHeight / elementHeight) * 100;
    }
  }, []);

  return {
    ...scrollProgress,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    isInViewport,
    getCurrentSection,
    getParallaxOffset,
    getElementProgress,
  };
};

// Hook for scroll-based animations
export const useScrollAnimation = (
  threshold: number = 0.1,
  rootMargin: string = "0px"
) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  return { ref, isInView, hasAnimated };
};

// Hook for scroll velocity
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;
      const deltaY = window.scrollY - lastScrollY.current;

      // Calculate velocity (pixels per second)
      const currentVelocity = Math.abs((deltaY / deltaTime) * 1000);

      setVelocity(currentVelocity);

      lastScrollY.current = window.scrollY;
      lastTime.current = currentTime;
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return velocity;
};

// Hook for scroll direction with hysteresis
export const useScrollDirection = (threshold: number = 10) => {
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) > threshold) {
        setDirection(diff > 0 ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [threshold]);

  return direction;
};

// Hook for scroll snapping
export const useScrollSnap = (snapPoints: number[], tolerance: number = 50) => {
  const [activeSnapPoint, setActiveSnapPoint] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Find the closest snap point
      let closestIndex = 0;
      let minDistance = Infinity;

      snapPoints.forEach((point, index) => {
        const distance = Math.abs(scrollY - point);
        if (distance < minDistance && distance <= tolerance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveSnapPoint(closestIndex);
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [snapPoints, tolerance]);

  const scrollToSnapPoint = useCallback(
    (index: number) => {
      if (index >= 0 && index < snapPoints.length) {
        window.scrollTo({
          top: snapPoints[index],
          behavior: "smooth",
        });
      }
    },
    [snapPoints]
  );

  return { activeSnapPoint, scrollToSnapPoint };
};

// Hook for scroll-based transforms
export const useScrollTransform = (
  inputRange: [number, number],
  outputRange: [number, number],
  clamp: boolean = true
) => {
  const [transformValue, setTransformValue] = useState(outputRange[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const [startInput, endInput] = inputRange;
      const [startOutput, endOutput] = outputRange;

      let value: number;

      if (scrollY <= startInput) {
        value = startOutput;
      } else if (scrollY >= endInput) {
        value = endOutput;
      } else {
        // Linear interpolation
        const progress = (scrollY - startInput) / (endInput - startInput);
        value = startOutput + progress * (endOutput - startOutput);
      }

      setTransformValue(
        clamp ? Math.max(startOutput, Math.min(endOutput, value)) : value
      );
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [inputRange, outputRange, clamp]);

  return transformValue;
};

export default useScrollProgress;
