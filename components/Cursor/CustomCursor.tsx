"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifetime: number;
  velocity: { x: number; y: number };
  rotation: number;
  scale: number;
  delay: number;
  type: "trail" | "floating";
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  timestamp: number;
}

const CURSOR_COLORS = {
  light: {
    primary: "#2563eb",
    secondary: "#d97706",
    accent: "#059669",
    purple: "#7c3aed",
    pink: "#db2777",
    cyan: "#0891b2",
    orange: "#ea580c",
    teal: "#0d9488",
    indigo: "#4f46e5",
    rose: "#e11d48",
    lime: "#65a30d",
    amber: "#d97706",
    emerald: "#10b981",
    sky: "#0284c7",
    violet: "#7c3aed",
    fuchsia: "#c026d3",
  },
  dark: {
    primary: "#3b82f6",
    secondary: "#f59e0b",
    accent: "#10b981",
    purple: "#8b5cf6",
    pink: "#ec4899",
    cyan: "#06b6d4",
    orange: "#fb923c",
    teal: "#14b8a6",
    indigo: "#6366f1",
    rose: "#f43f5e",
    lime: "#84cc16",
    amber: "#f59e0b",
    emerald: "#34d399",
    sky: "#0ea5e9",
    violet: "#8b5cf6",
    fuchsia: "#d946ef",
  },
};

const PARTICLE_CONFIGS = [
  // Primary particles - larger and more prominent
  {
    colorKey: "primary",
    size: 6,
    delay: 0,
    velocity: { x: 0, y: 0 },
    type: "main" as const,
  },
  {
    colorKey: "secondary",
    size: 5,
    delay: 0.02,
    velocity: { x: 0.1, y: -0.1 },
    type: "trail" as const,
  },
  {
    colorKey: "accent",
    size: 4.5,
    delay: 0.04,
    velocity: { x: -0.1, y: 0.1 },
    type: "trail" as const,
  },

  // Trail particles
  {
    colorKey: "purple",
    size: 4,
    delay: 0.06,
    velocity: { x: 0.08, y: 0.08 },
    type: "trail" as const,
  },
  {
    colorKey: "pink",
    size: 4,
    delay: 0.08,
    velocity: { x: -0.08, y: -0.08 },
    type: "trail" as const,
  },
  {
    colorKey: "cyan",
    size: 4.5,
    delay: 0.1,
    velocity: { x: 0.05, y: -0.12 },
    type: "trail" as const,
  },
  {
    colorKey: "orange",
    size: 3.5,
    delay: 0.12,
    velocity: { x: -0.12, y: 0.05 },
    type: "trail" as const,
  },
  {
    colorKey: "teal",
    size: 3.5,
    delay: 0.14,
    velocity: { x: 0.1, y: 0.06 },
    type: "trail" as const,
  },
  {
    colorKey: "indigo",
    size: 4,
    delay: 0.16,
    velocity: { x: -0.06, y: -0.1 },
    type: "trail" as const,
  },
  {
    colorKey: "rose",
    size: 3.5,
    delay: 0.18,
    velocity: { x: 0.06, y: 0.1 },
    type: "trail" as const,
  },
  {
    colorKey: "lime",
    size: 4,
    delay: 0.2,
    velocity: { x: -0.1, y: 0.08 },
    type: "trail" as const,
  },
  {
    colorKey: "amber",
    size: 3.5,
    delay: 0.22,
    velocity: { x: 0.1, y: -0.08 },
    type: "trail" as const,
  },
  {
    colorKey: "emerald",
    size: 4,
    delay: 0.24,
    velocity: { x: -0.05, y: -0.06 },
    type: "trail" as const,
  },
  {
    colorKey: "sky",
    size: 3.5,
    delay: 0.26,
    velocity: { x: 0.06, y: 0.05 },
    type: "trail" as const,
  },
  {
    colorKey: "violet",
    size: 4,
    delay: 0.28,
    velocity: { x: -0.06, y: 0.06 },
    type: "trail" as const,
  },
  {
    colorKey: "fuchsia",
    size: 3.5,
    delay: 0.3,
    velocity: { x: 0.05, y: -0.05 },
    type: "trail" as const,
  },
];

// Faster spring configuration
const SPRING_CONFIG = {
  damping: 10, // Reduced from 15
  stiffness: 300, // Increased from 150
  mass: 0.1, // Reduced from 0.3
};

const TRAIL_SPRING_CONFIG = {
  damping: 8, // Reduced from 12
  stiffness: 200, // Increased from 100
  mass: 0.2, // Reduced from 0.4
};

export const CustomCursor = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [cursorType, setCursorType] = useState<"default" | "link" | "text">(
    "default"
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  // Create separate springs for each particle with varying delays
  const trailSprings = useRef(
    PARTICLE_CONFIGS.map((_, index) => ({
      x: useSpring(cursorX, {
        ...TRAIL_SPRING_CONFIG,
        restDelta: 0.001,
      }),
      y: useSpring(cursorY, {
        ...TRAIL_SPRING_CONFIG,
        restDelta: 0.001,
      }),
    }))
  ).current;

  const colors = theme === "dark" ? CURSOR_COLORS.dark : CURSOR_COLORS.light;
  const animationFrameRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // Hide default cursor globally and on links
  useEffect(() => {
    const hideDefaultCursor = () => {
      document.body.style.cursor = "none";

      // Also hide cursor on all interactive elements
      const interactiveSelectors =
        'a, button, input, textarea, select, [role="button"]';
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
      });
    };

    hideDefaultCursor();

    // Re-hide cursor on dynamic content changes
    const observer = new MutationObserver(hideDefaultCursor);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.cursor = "auto";
      observer.disconnect();

      // Restore cursor on interactive elements
      const interactiveSelectors =
        'a, button, input, textarea, select, [role="button"]';
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const now = Date.now();
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        // Calculate velocity
        velocityRef.current = {
          x: deltaX * 0.5,
          y: deltaY * 0.5,
        };

        setMousePosition({ x: e.clientX, y: e.clientY });
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        if (!isVisible) setIsVisible(true);

        // Update last position
        lastMousePos.current = { x: e.clientX, y: e.clientY };

        // Create trail points with dispersion
        const speed = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const trailCount = Math.min(Math.floor(speed / 2), 8);

        if (speed > 1) {
          const newTrailPoints: TrailPoint[] = [];
          const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;

          for (let i = 0; i < trailCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 15 * (speed / 10);
            const dispersionX = Math.cos(angle) * distance;
            const dispersionY = Math.sin(angle) * distance;
            const randomColorKey =
              colorKeys[Math.floor(Math.random() * colorKeys.length)];

            newTrailPoints.push({
              id: now + i,
              x: e.clientX + dispersionX,
              y: e.clientY + dispersionY,
              size: 3 + Math.random() * 5,
              opacity: 0.8 + Math.random() * 0.2,
              color: colors[randomColorKey],
              timestamp: now,
            });
          }

          setTrail((prev) => [...prev, ...newTrailPoints].slice(-40)); // Keep more trail points
        }

        // Create floating particles with velocity-based dispersion
        if (speed > 8) {
          const velocityAngle = Math.atan2(deltaY, deltaX);
          const newParticles: CursorParticle[] = [];
          const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;
          const particleCount = Math.min(Math.floor(speed / 3), 12);

          for (let i = 0; i < particleCount; i++) {
            const randomColorKey =
              colorKeys[Math.floor(Math.random() * colorKeys.length)];
            const angle = velocityAngle + (Math.random() - 0.5) * Math.PI;
            const speedFactor = 0.5 + Math.random() * 1.5;

            newParticles.push({
              id: now + Math.random(),
              x: e.clientX,
              y: e.clientY,
              size: 2 + Math.random() * 4,
              color: colors[randomColorKey],
              lifetime: 400 + Math.random() * 400, // Shorter lifetime
              velocity: {
                x: Math.cos(angle) * speedFactor + (Math.random() - 0.5) * 0.5,
                y: Math.sin(angle) * speedFactor + (Math.random() - 0.5) * 0.5,
              },
              rotation: Math.random() * 360,
              scale: 1,
              delay: Math.random() * 0.1,
              type: Math.random() > 0.5 ? "trail" : "floating",
            });
          }

          setParticles((prev) => [...prev, ...newParticles].slice(-80));
        }
      });
    },
    [cursorX, cursorY, isVisible, colors]
  );

  // Optimized mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);

  // Click handlers
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);

    // Create click particles with radial dispersion
    const clickParticles: CursorParticle[] = [];
    const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;

    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const speed = 1 + Math.random() * 2;
      const colorKey = colorKeys[i % colorKeys.length];

      clickParticles.push({
        id: Date.now() + i,
        x: mousePosition.x,
        y: mousePosition.y,
        size: 2 + Math.random() * 5,
        color: colors[colorKey],
        lifetime: 600 + Math.random() * 400,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        rotation: Math.random() * 360,
        scale: 1,
        delay: Math.random() * 0.1,
        type: "floating",
      });
    }

    setParticles((prev) => [...prev, ...clickParticles]);
  }, [mousePosition, colors]);

  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Update cursor type based on hover - optimized
  useEffect(() => {
    if (isMobile) return;

    let hoverTimeout: NodeJS.Timeout;

    const updateCursorType = (e: Event) => {
      const target = e.target as HTMLElement;

      clearTimeout(hoverTimeout);

      if (target.tagName === "A" || target.closest("a")) {
        hoverTimeout = setTimeout(() => {
          setCursorType("link");
          setIsHovering(true);
        }, 50);
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        hoverTimeout = setTimeout(() => {
          setCursorType("link");
          setIsHovering(true);
        }, 50);
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        hoverTimeout = setTimeout(() => {
          setCursorType("text");
          setIsHovering(true);
        }, 50);
      } else {
        hoverTimeout = setTimeout(() => {
          setCursorType("default");
          setIsHovering(false);
        }, 50);
      }
    };

    document.addEventListener("mouseover", updateCursorType);
    return () => {
      document.removeEventListener("mouseover", updateCursorType);
      clearTimeout(hoverTimeout);
    };
  }, [isMobile]);

  // Optimized particle update loop
  useEffect(() => {
    if (isMobile) return;

    const updateParticlesAndTrail = () => {
      const now = Date.now();

      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => {
            const age = now - p.id;
            const progress = age / p.lifetime;

            // Apply different physics based on particle type
            if (p.type === "floating") {
              // Floating particles drift and fade
              return {
                ...p,
                x: p.x + p.velocity.x,
                y: p.y + p.velocity.y,
                lifetime: p.lifetime - 16,
                size: p.size * (1 - progress * 0.1),
                rotation: p.rotation + p.velocity.x * 3,
                scale: Math.max(0.1, 1 - progress),
              };
            } else {
              // Trail particles fade quickly
              return {
                ...p,
                x: p.x + p.velocity.x * 0.5,
                y: p.y + p.velocity.y * 0.5,
                lifetime: p.lifetime - 32,
                size: p.size * 0.9,
                scale: Math.max(0.1, p.scale * 0.85),
              };
            }
          })
          .filter((p) => p.lifetime > 0 && p.size > 0.5)
      );

      // Update trail - faster fade
      setTrail((prev) =>
        prev
          .map((p) => {
            const age = now - p.timestamp;
            const opacity = Math.max(0, 1 - age / 500); // Faster fade (500ms)

            return {
              ...p,
              opacity,
              size: p.size * 0.85,
            };
          })
          .filter((p) => p.opacity > 0.01 && p.size > 0.5)
      );

      animationFrameRef.current = requestAnimationFrame(
        updateParticlesAndTrail
      );
    };

    animationFrameRef.current = requestAnimationFrame(updateParticlesAndTrail);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  // Event listeners
  useEffect(() => {
    if (isMobile) return;

    // Throttle mousemove events
    let lastCall = 0;
    const throttleTime = 1000 / 144; // 144 FPS

    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall >= throttleTime) {
        handleMouseMove(e);
        lastCall = now;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isMobile,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
  ]);

  if (isMobile) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Trail Effect - Disperse dots */}
            {trail.map((point, index) => {
              const colorKeys = Object.keys(colors) as Array<
                keyof typeof colors
              >;
              const trailColor = colors[colorKeys[index % colorKeys.length]];

              return (
                <motion.div
                  key={point.id}
                  className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
                  style={{
                    x: point.x,
                    y: point.y,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: point.size,
                    height: point.size,
                    background: trailColor,
                    filter: "blur(1px)",
                  }}
                  initial={{
                    opacity: point.opacity,
                    scale: 1,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Primary Cursor Particles with dispersion */}
            {PARTICLE_CONFIGS.map((config, index) => {
              const color = colors[config.colorKey as keyof typeof colors];
              const dispersion = isHovering ? 15 : 8;
              const angle = (index / PARTICLE_CONFIGS.length) * Math.PI * 2;
              const offsetX = Math.cos(angle) * dispersion;
              const offsetY = Math.sin(angle) * dispersion;

              return (
                <motion.div
                  key={index}
                  className="fixed top-0 left-0 pointer-events-none z-[9997]"
                  style={{
                    x: trailSprings[index].x.get() + offsetX,
                    y: trailSprings[index].y.get() + offsetY,
                  }}
                  animate={{
                    scale: isHovering ? 1.2 : 1,
                    opacity: isHovering ? 0.9 : 0.7,
                    rotate: [0, 360],
                  }}
                  transition={{
                    x: {
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      delay: config.delay * 2,
                    },
                    y: {
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      delay: config.delay * 2,
                    },
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.2 },
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: config.size,
                      height: config.size,
                      background: `radial-gradient(circle at 30% 30%, ${color}, ${color}80)`,
                      boxShadow: `0 0 10px ${color}80`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Floating Particles */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                  style={{
                    x: particle.x,
                    y: particle.y,
                    width: particle.size,
                    height: particle.size,
                    background: particle.color,
                    boxShadow: `0 0 8px ${particle.color}`,
                  }}
                  initial={{
                    opacity: 0.9,
                    scale: 1,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    x: particle.x + particle.velocity.x * 50,
                    y: particle.y + particle.velocity.y * 50,
                    rotate: particle.rotation + 180,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: particle.lifetime / 1000,
                    ease: "easeOut",
                    delay: particle.delay,
                  }}
                />
              ))}
            </AnimatePresence>

            {/* Main Cursor Center - Faster and more responsive */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9999]"
              style={{
                x: springX,
                y: springY,
              }}
              animate={{
                scale: isClicking ? 0.9 : 1,
              }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 400,
                mass: 0.1,
              }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  borderColor:
                    cursorType === "link" ? colors.secondary : colors.primary,
                  width: 50,
                  height: 50,
                  x: -25,
                  y: -25,
                }}
                animate={{
                  scale: isHovering ? 1.2 : 1,
                  rotate: isHovering ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 300,
                }}
              />

              {/* Inner Dot */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  background:
                    cursorType === "link"
                      ? colors.secondary
                      : cursorType === "text"
                      ? colors.accent
                      : colors.primary,
                  width: 12,
                  height: 12,
                  x: -6,
                  y: -6,
                }}
                animate={{
                  scale: isClicking ? 1.5 : isHovering ? 1.3 : 1,
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 500,
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{
                    background:
                      cursorType === "link" ? colors.secondary : colors.primary,
                  }}
                  animate={{
                    scale: isHovering ? 2 : 1.5,
                    opacity: isHovering ? 0.6 : 0.4,
                  }}
                />
              </motion.div>

              {/* Text cursor indicator */}
              {cursorType === "text" && (
                <motion.div
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                  style={{ background: colors.accent }}
                  animate={{
                    height: [12, 24, 12],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Link cursor indicator */}
              {cursorType === "link" && (
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2"
                  animate={{ x: [0, 2, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.secondary}
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </motion.div>
              )}

              {/* Click ripple effect */}
              <AnimatePresence>
                {isClicking && (
                  <motion.div
                    className="absolute rounded-full border-2"
                    style={{
                      borderColor: colors.secondary,
                      width: 12,
                      height: 12,
                      x: -6,
                      y: -6,
                    }}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Cursor Context Provider
export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
};

export default CustomCursor;
