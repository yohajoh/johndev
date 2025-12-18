"use client";

import { RefObject, useState, useEffect, useRef } from "react";

interface IntersectionObserverOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  freezeOnceVisible?: boolean;
}

interface IntersectionObserverResult {
  isIntersecting: boolean;
  hasIntersected: boolean;
  entry?: IntersectionObserverEntry;
  intersectionRatio: number;
  isFullyVisible: boolean;
  isPartiallyVisible: boolean;
  visibilityPercentage: number;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): IntersectionObserverResult => {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0,
    triggerOnce = false,
    freezeOnceVisible = false,
  } = options;

  const [state, setState] = useState<IntersectionObserverResult>({
    isIntersecting: false,
    hasIntersected: false,
    intersectionRatio: 0,
    isFullyVisible: false,
    isPartiallyVisible: false,
    visibilityPercentage: 0,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const frozenRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already frozen and we should freeze once visible
    if (frozenRef.current && freezeOnceVisible) {
      return;
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry) return;

      const {
        isIntersecting,
        intersectionRatio,
        boundingClientRect,
        rootBounds,
      } = entry;

      // Calculate visibility percentage
      let visibilityPercentage = 0;
      if (rootBounds && boundingClientRect) {
        const visibleHeight =
          Math.min(boundingClientRect.bottom, rootBounds.bottom) -
          Math.max(boundingClientRect.top, rootBounds.top);
        const visibleWidth =
          Math.min(boundingClientRect.right, rootBounds.right) -
          Math.max(boundingClientRect.left, rootBounds.left);

        const elementArea =
          boundingClientRect.width * boundingClientRect.height;
        const visibleArea = visibleHeight * visibleWidth;

        visibilityPercentage =
          elementArea > 0 ? (visibleArea / elementArea) * 100 : 0;
        visibilityPercentage = Math.max(0, Math.min(100, visibilityPercentage));
      }

      const isFullyVisible = visibilityPercentage >= 95;
      const isPartiallyVisible = visibilityPercentage > 5;

      setState((prev) => {
        const newState = {
          entry,
          isIntersecting,
          hasIntersected: prev.hasIntersected || isIntersecting,
          intersectionRatio,
          isFullyVisible,
          isPartiallyVisible,
          visibilityPercentage,
        };

        // Freeze state if needed
        if (
          (triggerOnce && isIntersecting) ||
          (freezeOnceVisible && isFullyVisible)
        ) {
          frozenRef.current = true;
        }

        return newState;
      });
    };

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold: Array.isArray(threshold) ? threshold : [threshold],
    });

    // Start observing
    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [elementRef, root, rootMargin, threshold, triggerOnce, freezeOnceVisible]);

  // Reset frozen state when dependencies change
  useEffect(() => {
    frozenRef.current = false;
  }, [root, rootMargin, threshold]);

  return state;
};

// Multiple elements observer
export const useIntersectionObserverMulti = (
  elementRefs: RefObject<Element>[],
  options: IntersectionObserverOptions = {}
) => {
  const [states, setStates] = useState<
    Record<string, IntersectionObserverResult>
  >({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id =
            entry.target.id ||
            `element-${entry.target.getAttribute("data-id")}`;

          const visibilityPercentage = entry.intersectionRatio * 100;
          const isFullyVisible = visibilityPercentage >= 95;
          const isPartiallyVisible = visibilityPercentage > 5;

          setStates((prev) => ({
            ...prev,
            [id]: {
              entry,
              isIntersecting: entry.isIntersecting,
              hasIntersected: prev[id]?.hasIntersected || entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              isFullyVisible,
              isPartiallyVisible,
              visibilityPercentage,
            },
          }));
        });
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
        threshold: options.threshold || 0,
      }
    );

    // Observe all elements
    elementRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [elementRefs, options.root, options.rootMargin, options.threshold]);

  return states;
};

// Staggered reveal hook
export const useStaggeredReveal = (
  elementRef: RefObject<Element>,
  staggerDelay: number = 100,
  options: IntersectionObserverOptions = {}
) => {
  const { isIntersecting } = useIntersectionObserver(elementRef, options);
  const [childrenStates, setChildrenStates] = useState<boolean[]>([]);

  useEffect(() => {
    if (!isIntersecting || childrenStates.length > 0) return;

    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    const states = children.map(() => false);

    setChildrenStates(states);

    // Stagger reveal of children
    children.forEach((_, index) => {
      setTimeout(() => {
        setChildrenStates((prev) => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      }, index * staggerDelay);
    });
  }, [isIntersecting, elementRef, staggerDelay, childrenStates.length]);

  return childrenStates;
};

// Percentage scroll hook
export const useScrollPercentage = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {}
) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const calculatePercentage = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visible percentage
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const elementHeight = rect.height;

      let percentage = 0;
      if (elementHeight > 0) {
        percentage = (visibleHeight / elementHeight) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
      }

      setScrollPercentage(percentage);
    };

    // Initial calculation
    calculatePercentage();

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculatePercentage();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculatePercentage, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculatePercentage);
    };
  }, [elementRef, options]);

  return scrollPercentage;
};

// Viewport tracking hook
export const useViewportTracker = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    scrollX: typeof window !== "undefined" ? window.scrollX : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY,
        scrollX: window.scrollX,
      });
    };

    // Throttle updates
    let ticking = false;
    const handleUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateViewport();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", handleUpdate, { passive: true });
    window.addEventListener("scroll", handleUpdate, { passive: true });

    // Initial update
    updateViewport();

    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
    };
  }, []);

  return viewport;
};

export default useIntersectionObserver;
