"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface MarqueeItem {
  id: string;
  title: string;
  category?: string;
  color?: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  onItemClick?: (id: string) => void;
}

export const InfiniteMarquee = ({
  items,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className = "",
  onItemClick,
}: InfiniteMarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const [duplicatedItems, setDuplicatedItems] = useState<MarqueeItem[]>([]);

  // Duplicate items for seamless looping
  useEffect(() => {
    setDuplicatedItems([...items, ...items, ...items]);
  }, [items]);

  // Calculate animation duration based on speed
  const duration = duplicatedItems.length * (100 - speed) * 0.01;

  // Start animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }, [isInView, controls, direction, duration]);

  // Pause/Resume animation on hover
  useEffect(() => {
    if (pauseOnHover) {
      if (isPaused) {
        controls.stop();
      } else {
        controls.start({
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      }
    }
  }, [isPaused, controls, direction, duration, pauseOnHover]);

  // Get color classes
  const getColorClass = (color?: string) => {
    switch (color) {
      case "primary":
        return "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20";
      case "secondary":
        return "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border-secondary/20";
      case "accent":
        return "bg-gradient-to-r from-accent/10 to-accent/5 text-accent border-accent/20";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <motion.div
        ref={marqueeRef}
        className="flex gap-4"
        animate={controls}
        style={{ willChange: "transform" }}
      >
        {duplicatedItems.map((item, index) => (
          <motion.button
            key={`${item.id}-${index}`}
            onClick={() => onItemClick?.(item.id)}
            className={`
              flex-shrink-0 px-6 py-3 rounded-2xl border backdrop-blur-sm
              transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${getColorClass(item.color)}
            `}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg">{item.title}</span>
              {item.category && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/50 dark:bg-gray-800/50">
                  {item.category}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Speed indicator */}
      <div className="absolute top-2 right-4 z-20">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Speed: {speed}%</span>
          </div>
          {pauseOnHover && (
            <div className="hidden sm:block">
              <span className="text-gray-400">•</span>
              <span className="ml-2">Hover to pause</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Vertical marquee variant
export const VerticalMarquee = ({
  items,
  direction = "up",
  speed = 30,
  className = "",
}: Omit<InfiniteMarqueeProps, "direction"> & { direction?: "up" | "down" }) => {
  const [duplicatedItems, setDuplicatedItems] = useState<MarqueeItem[]>([]);

  useEffect(() => {
    setDuplicatedItems([...items, ...items]);
  }, [items]);

  const duration = duplicatedItems.length * (100 - speed) * 0.02;

  return (
    <div className={`relative h-64 overflow-hidden ${className}`}>
      <motion.div
        className="space-y-4"
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {item.title}
              </span>
              {item.category && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Gradient masks */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default InfiniteMarquee;
