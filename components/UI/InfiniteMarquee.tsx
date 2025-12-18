"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  id: string;
  title: string;
  category?: string;
  color?: "primary" | "secondary" | "accent" | "default";
  icon?: ReactNode;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number; // 1-100, where 100 is fastest
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  gradientOverlay?: boolean;
  gradientColor?: "primary" | "secondary" | "accent" | "white";
  onItemClick?: (item: MarqueeItem) => void;
}

export const InfiniteMarquee = ({
  items,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
  itemClassName,
  gradientOverlay = true,
  gradientColor = "primary",
  onItemClick,
}: InfiniteMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState<MarqueeItem[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Duplicate items for seamless looping
  useEffect(() => {
    // Duplicate enough items to fill at least 2x viewport width
    const duplicateCount = Math.ceil(8); // Enough for smooth loop
    const newItems: MarqueeItem[] = [];

    for (let i = 0; i < duplicateCount; i++) {
      newItems.push(...items);
    }

    setDuplicatedItems(newItems);
  }, [items]);

  // Intersection Observer for animation start
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startAnimation();
          } else {
            setIsVisible(false);
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      stopAnimation();
    };
  }, []);

  // Calculate animation duration based on speed
  const getDuration = () => {
    // Convert speed (1-100) to duration (50ms - 5000ms per item)
    const minDuration = 50;
    const maxDuration = 5000;
    return maxDuration - (speed / 100) * (maxDuration - minDuration);
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    if (!isPaused && isVisible) {
      const elapsed = timestamp - startTimeRef.current;
      const duration = getDuration();

      // Calculate progress based on direction
      const totalProgress = (elapsed / duration) * 100;
      progressRef.current =
        direction === "left" ? totalProgress : -totalProgress;

      if (marqueeRef.current) {
        // Reset when we've scrolled one full set
        if (Math.abs(progressRef.current) >= 100) {
          startTimeRef.current = timestamp;
          progressRef.current = 0;
        }

        // Apply transform
        marqueeRef.current.style.transform = `translateX(${progressRef.current}%)`;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  };

  // Handle hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  // Get color classes
  const getColorClasses = (color?: string) => {
    switch (color) {
      case "primary":
        return "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:border-primary/40";
      case "secondary":
        return "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border-secondary/20 hover:border-secondary/40";
      case "accent":
        return "bg-gradient-to-r from-accent/10 to-accent/5 text-accent border-accent/20 hover:border-accent/40";
      default:
        return "bg-gradient-to-r from-white/5 to-white/2 text-foreground border-white/10 hover:border-white/20";
    }
  };

  const getGradientColor = () => {
    switch (gradientColor) {
      case "primary":
        return "from-primary/20";
      case "secondary":
        return "from-secondary/20";
      case "accent":
        return "from-accent/20";
      default:
        return "from-white/20";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden py-4", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Scrolling technologies marquee"
    >
      {/* Gradient masks */}
      {gradientOverlay && (
        <>
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none",
              "bg-gradient-to-r from-background via-background to-transparent",
              gradientColor === "white" && "from-background via-background"
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none",
              "bg-gradient-to-l from-background via-background to-transparent",
              gradientColor === "white" && "from-background via-background"
            )}
            aria-hidden="true"
          />
        </>
      )}

      {/* Marquee track */}
      <div
        ref={marqueeRef}
        className="flex gap-4"
        style={{
          willChange: "transform",
          transition: isPaused ? "none" : "transform 0.1s linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "group flex-shrink-0 px-6 py-3 rounded-2xl border backdrop-blur-sm",
              "transition-all duration-300 hover:scale-105 hover:shadow-lg",
              "flex items-center gap-3",
              getColorClasses(item.color),
              itemClassName
            )}
            aria-label={`Technology: ${item.title}${
              item.category ? ` (${item.category})` : ""
            }`}
          >
            {item.icon && (
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                )}
              >
                {item.icon}
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg whitespace-nowrap">
                {item.title}
              </span>

              {item.category && (
                <span
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap",
                    "transition-all duration-300 group-hover:scale-105",
                    item.color === "primary" && "bg-primary/10 text-primary",
                    item.color === "secondary" &&
                      "bg-secondary/10 text-secondary",
                    item.color === "accent" && "bg-accent/10 text-accent",
                    !item.color && "bg-white/10 text-foreground"
                  )}
                >
                  {item.category}
                </span>
              )}
            </div>

            {/* Hover indicator */}
            <div
              className={cn(
                "w-2 h-2 rounded-full opacity-0 group-hover:opacity-100",
                "transition-all duration-300 group-hover:scale-125",
                item.color === "primary" && "bg-primary",
                item.color === "secondary" && "bg-secondary",
                item.color === "accent" && "bg-accent",
                !item.color && "bg-foreground"
              )}
            />
          </button>
        ))}
      </div>

      {/* Speed indicator (visible on hover) */}
      <div className="absolute top-2 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                gradientColor === "primary" && "bg-primary",
                gradientColor === "secondary" && "bg-secondary",
                gradientColor === "accent" && "bg-accent",
                gradientColor === "white" && "bg-foreground"
              )}
            />
            <span>Speed: {speed}%</span>
          </div>

          {pauseOnHover && (
            <>
              <span className="text-muted-foreground">•</span>
              <span>Hover to pause</span>
            </>
          )}

          {isPaused && (
            <span className="text-primary font-medium animate-pulse">
              Paused
            </span>
          )}
        </div>
      </div>

      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div
          className={cn(
            "h-full w-full bg-gradient-to-r from-transparent via-current to-transparent",
            getGradientColor(),
            "animate-shimmer"
          )}
          style={{ animationDuration: `${getDuration() / 1000}s` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Vertical marquee variant
interface VerticalMarqueeProps extends Omit<InfiniteMarqueeProps, "direction"> {
  direction?: "up" | "down";
  rows?: number;
}

export const VerticalMarquee = ({
  items,
  direction = "up",
  speed = 30,
  rows = 4,
  pauseOnHover = true,
  className,
  onItemClick,
}: VerticalMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState<MarqueeItem[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Duplicate items for seamless looping
  useEffect(() => {
    const duplicateCount = Math.ceil(rows * 2);
    const newItems: MarqueeItem[] = [];

    for (let i = 0; i < duplicateCount; i++) {
      newItems.push(...items);
    }

    setDuplicatedItems(newItems);
  }, [items, rows]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      stopAnimation();
    };
  }, []);

  // Calculate animation duration
  const getDuration = () => {
    const minDuration = 1000;
    const maxDuration = 10000;
    return maxDuration - (speed / 100) * (maxDuration - minDuration);
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    if (!isPaused && isVisible) {
      const elapsed = timestamp - startTimeRef.current;
      const duration = getDuration();

      const totalProgress = (elapsed / duration) * 100;
      progressRef.current = direction === "up" ? -totalProgress : totalProgress;

      if (marqueeRef.current) {
        // Reset when we've scrolled one full set
        if (Math.abs(progressRef.current) >= 100) {
          startTimeRef.current = timestamp;
          progressRef.current = 0;
        }

        marqueeRef.current.style.transform = `translateY(${progressRef.current}%)`;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative h-64 overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Vertical scrolling marquee"
    >
      {/* Gradient masks */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div
        ref={marqueeRef}
        className="space-y-3"
        style={{
          willChange: "transform",
          transition: isPaused ? "none" : "transform 0.1s linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "group w-full px-4 py-3 rounded-xl",
              "bg-gradient-to-r from-white/5 to-white/2 border border-white/10",
              "backdrop-blur-sm transition-all duration-300",
              "hover:scale-105 hover:border-primary/30 hover:shadow-lg",
              "flex items-center justify-between"
            )}
            aria-label={`Item: ${item.title}`}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  {item.icon}
                </div>
              )}

              <span className="font-medium text-foreground">{item.title}</span>
            </div>

            {item.category && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {item.category}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-2 right-2 z-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isPaused ? "bg-amber-500" : "bg-primary",
              !isVisible && "bg-gray-500"
            )}
          />
          <span>
            {isPaused ? "Paused" : isVisible ? "Scrolling" : "Hidden"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Bounce marquee variant (ping-pong effect)
interface BounceMarqueeProps extends Omit<InfiniteMarqueeProps, "direction"> {
  bounceDelay?: number;
}

export const BounceMarquee = ({
  items,
  speed = 40,
  bounceDelay = 1000,
  pauseOnHover = true,
  className,
  onItemClick,
}: BounceMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      stopAnimation();
    };
  }, []);

  // Calculate animation duration
  const getDuration = () => {
    const minDuration = 1000;
    const maxDuration = 5000;
    return maxDuration - (speed / 100) * (maxDuration - minDuration);
  };

  // Animation loop with bounce
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    if (!isPaused && isVisible) {
      const elapsed = timestamp - startTimeRef.current;
      const duration = getDuration();

      // Calculate progress (0 to 100 and back)
      let progress = (elapsed / duration) * 100;

      if (direction === "left") {
        progressRef.current = progress;
        if (progress >= 100) {
          setDirection("right");
          startTimeRef.current = timestamp + bounceDelay;
        }
      } else {
        progressRef.current = 100 - progress;
        if (progress >= 100) {
          setDirection("left");
          startTimeRef.current = timestamp + bounceDelay;
        }
      }

      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translateX(${progressRef.current}%)`;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden py-4", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Bouncing marquee"
    >
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div
        ref={marqueeRef}
        className="flex gap-4"
        style={{
          willChange: "transform",
          transition: isPaused ? "none" : "transform 0.1s linear",
        }}
      >
        {items.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            onClick={() => onItemClick?.(item)}
            className={cn(
              "group flex-shrink-0 px-6 py-3 rounded-2xl border backdrop-blur-sm",
              "bg-gradient-to-r from-primary/10 to-secondary/5",
              "border-primary/20 text-primary",
              "transition-all duration-300 hover:scale-105 hover:shadow-lg",
              "flex items-center gap-3"
            )}
            aria-label={`Technology: ${item.title}`}
          >
            <span className="font-semibold text-lg whitespace-nowrap">
              {item.title}
            </span>

            {item.category && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {item.category}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Direction indicator */}
      <div className="absolute top-2 right-2 z-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-transform duration-300",
              direction === "left" ? "translate-x-0" : "translate-x-1",
              isPaused ? "bg-amber-500" : "bg-primary"
            )}
          />
          <span className="capitalize">{isPaused ? "Paused" : direction}</span>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
