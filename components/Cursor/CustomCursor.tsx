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
  // Primary colors - larger and more prominent
  {
    colorKey: "primary",
    size: 8,
    delay: 0,
    velocity: { x: 0, y: 0 },
    shape: "circle",
  },
  {
    colorKey: "secondary",
    size: 7,
    delay: 0.01,
    velocity: { x: 0.3, y: -0.3 },
    shape: "circle",
  },
  {
    colorKey: "accent",
    size: 6,
    delay: 0.02,
    velocity: { x: -0.3, y: 0.3 },
    shape: "circle",
  },

  // Secondary colors - medium size
  {
    colorKey: "purple",
    size: 5,
    delay: 0.03,
    velocity: { x: 0.4, y: 0.4 },
    shape: "square",
  },
  {
    colorKey: "pink",
    size: 5,
    delay: 0.04,
    velocity: { x: -0.4, y: -0.4 },
    shape: "triangle",
  },
  {
    colorKey: "cyan",
    size: 6,
    delay: 0.05,
    velocity: { x: 0.2, y: -0.5 },
    shape: "circle",
  },

  // Tertiary colors - smaller trailing particles
  {
    colorKey: "orange",
    size: 4,
    delay: 0.06,
    velocity: { x: -0.5, y: 0.2 },
    shape: "diamond",
  },
  {
    colorKey: "teal",
    size: 4,
    delay: 0.07,
    velocity: { x: 0.5, y: 0.3 },
    shape: "circle",
  },
  {
    colorKey: "indigo",
    size: 5,
    delay: 0.08,
    velocity: { x: -0.3, y: -0.5 },
    shape: "square",
  },
  {
    colorKey: "rose",
    size: 4,
    delay: 0.09,
    velocity: { x: 0.3, y: 0.5 },
    shape: "triangle",
  },
  {
    colorKey: "lime",
    size: 5,
    delay: 0.1,
    velocity: { x: -0.4, y: 0.4 },
    shape: "circle",
  },
  {
    colorKey: "amber",
    size: 4,
    delay: 0.11,
    velocity: { x: 0.4, y: -0.4 },
    shape: "diamond",
  },
  {
    colorKey: "emerald",
    size: 5,
    delay: 0.12,
    velocity: { x: -0.2, y: -0.3 },
    shape: "circle",
  },
  {
    colorKey: "sky",
    size: 4,
    delay: 0.13,
    velocity: { x: 0.3, y: 0.2 },
    shape: "square",
  },
  {
    colorKey: "violet",
    size: 5,
    delay: 0.14,
    velocity: { x: -0.3, y: 0.3 },
    shape: "triangle",
  },
  {
    colorKey: "fuchsia",
    size: 4,
    delay: 0.15,
    velocity: { x: 0.2, y: -0.2 },
    shape: "circle",
  },
];

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.3,
};

const TRAIL_SPRING_CONFIG = {
  damping: 12,
  stiffness: 100,
  mass: 0.4,
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

  // Trail springs for smooth following effect
  const trailSprings = useRef(
    PARTICLE_CONFIGS.map(() => ({
      x: useSpring(cursorX, TRAIL_SPRING_CONFIG),
      y: useSpring(cursorY, TRAIL_SPRING_CONFIG),
    }))
  ).current;

  const colors = theme === "dark" ? CURSOR_COLORS.dark : CURSOR_COLORS.light;

  // Hide default cursor globally
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);

      // Re-enable cursor if mobile
      if (isTouchDevice || isSmallScreen) {
        document.body.style.cursor = "auto";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse move handler with smooth updates
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Add trail points more frequently for smoother effect
      const newTrailPoint: TrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: isHovering ? 10 : 8, // Increased size
        opacity: 1,
        color: isHovering ? colors.secondary : colors.primary,
        timestamp: Date.now(),
      };

      setTrail((prev) => [...prev.slice(-20), newTrailPoint]); // Keep more trail points

      // Create particles on movement with velocity threshold
      const velocity = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      if (velocity > 5) {
        const newParticles = PARTICLE_CONFIGS.map((config) => {
          const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;
          const randomColorKey =
            colorKeys[Math.floor(Math.random() * colorKeys.length)];

          return {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: config.size * (isHovering ? 1.2 : 1),
            color: colors[randomColorKey],
            lifetime: 1200 + Math.random() * 600,
            velocity: {
              x: config.velocity.x + (Math.random() - 0.5) * 1.5,
              y: config.velocity.y + (Math.random() - 0.5) * 1.5,
            },
            rotation: Math.random() * 360,
            scale: 1,
          };
        });
        setParticles((prev) => [...prev, ...newParticles].slice(-100)); // More particles
      }
    },
    [cursorX, cursorY, isVisible, isHovering, colors]
  );

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
    document.body.style.cursor = "none";
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);

  // Click handlers with improved particles
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);

    // Create more click particles with varied colors
    const clickParticles = Array.from({ length: 20 }).map((_, i) => {
      const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;
      const colorKey = colorKeys[i % colorKeys.length];

      return {
        id: Date.now() + i,
        x: mousePosition.x,
        y: mousePosition.y,
        size: 4 + Math.random() * 6, // Larger particles
        color: colors[colorKey],
        lifetime: 1000 + Math.random() * 500,
        velocity: {
          x: Math.cos((i * Math.PI * 2) / 20) * (3 + Math.random() * 3),
          y: Math.sin((i * Math.PI * 2) / 20) * (3 + Math.random() * 3),
        },
        rotation: Math.random() * 360,
        scale: 1,
      };
    });
    setParticles((prev) => [...prev, ...clickParticles]);
  }, [mousePosition, colors]);

  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Update cursor type based on hover
  useEffect(() => {
    if (isMobile) return;

    const updateCursorType = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.tagName === "A" || target.closest("a")) {
        setCursorType("link");
        setIsHovering(true);
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorType("link");
        setIsHovering(true);
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorType("text");
        setIsHovering(true);
      } else {
        setCursorType("default");
        setIsHovering(false);
      }
    };

    const resetCursorType = () => {
      setCursorType("default");
      setIsHovering(false);
    };

    document.addEventListener("mouseover", updateCursorType);
    document.addEventListener("mouseout", resetCursorType);

    return () => {
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener("mouseout", resetCursorType);
    };
  }, [isMobile]);

  // Update particles and trail with smoother animations
  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            lifetime: p.lifetime - 16,
            size: p.size * 0.995, // Slower decay
            rotation: p.rotation + p.velocity.x * 2,
            scale: Math.max(0.1, p.scale * 0.998),
          }))
          .filter((p) => p.lifetime > 0 && p.size > 0.5)
      );

      // Update trail with smoother fade
      setTrail((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity * 0.92, // Slower fade
            size: p.size * 0.96,
          }))
          .filter((p) => p.opacity > 0.05 && p.size > 1)
      );

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Event listeners
  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
      {/* Main Cursor - Now with colored dots */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Trail Effect - More dots with varied colors */}
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
                  }}
                  initial={{
                    opacity: point.opacity,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  animate={{
                    opacity: point.opacity * 0.3,
                    scale: 0.8,
                    filter: "blur(2px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    opacity: { duration: 0.5, ease: "easeOut" },
                    scale: { duration: 0.5, ease: "easeOut" },
                  }}
                />
              );
            })}

            {/* Primary Cursor Particles - Larger and more colorful */}
            {PARTICLE_CONFIGS.map((config, index) => {
              const color = colors[config.colorKey as keyof typeof colors];

              return (
                <motion.div
                  key={index}
                  className="fixed top-0 left-0 pointer-events-none z-[9997]"
                  style={{
                    x: trailSprings[index].x,
                    y: trailSprings[index].y,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: isHovering ? 0.9 : 0.7,
                    scale: isHovering
                      ? (config.size / 8) * 1.3
                      : config.size / 8,
                    rotate: isClicking ? 180 : 0,
                    width: config.size,
                    height: config.size,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: {
                      type: "spring",
                      damping: 20,
                      stiffness: 200,
                      delay: config.delay,
                    },
                    rotate: { duration: 0.5 },
                  }}
                >
                  <div
                    className="rounded-full relative"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: color,
                      boxShadow: `0 0 15px ${color}80`,
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${color}ff, ${color}00 70%)`,
                        opacity: 0.4,
                      }}
                    />

                    {/* Outer glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-sm"
                      style={{
                        background: color,
                        opacity: 0.3,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Floating Particles - More and larger */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="fixed top-0 left-0 pointer-events-none z-[9998]"
                  style={{
                    x: particle.x,
                    y: particle.y,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: particle.rotation,
                    scale: particle.scale,
                  }}
                  initial={{
                    opacity: 0.9,
                    scale: 1,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: [0.9, 0.6, 0],
                    scale: [1, 1.8, 0],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: particle.lifetime / 1000,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      background: particle.color,
                      boxShadow: `0 0 20px ${particle.color}`,
                      opacity: 0.8,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Main Cursor Center */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9999]"
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {/* Outer Ring - Larger and more visible */}
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  borderColor:
                    cursorType === "link" ? colors.secondary : colors.primary,
                }}
                animate={{
                  width: isHovering ? 70 : 60,
                  height: isHovering ? 70 : 60,
                  opacity: isHovering ? 1 : 0.8,
                  x: isHovering ? -35 : -30,
                  y: isHovering ? -35 : -30,
                  rotate: isHovering ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 180,
                }}
              >
                {/* Rotating accent for links */}
                {cursorType === "link" && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>

              {/* Inner Dot - Larger and glowing */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  background:
                    cursorType === "link"
                      ? `radial-gradient(circle at 30% 30%, ${colors.secondary}, ${colors.primary})`
                      : cursorType === "text"
                      ? colors.accent
                      : colors.primary,
                }}
                animate={{
                  width: isClicking ? 24 : isHovering ? 16 : 14,
                  height: isClicking ? 24 : isHovering ? 16 : 14,
                  scale: isClicking ? 0.9 : 1,
                  x: isClicking ? -12 : isHovering ? -8 : -7,
                  y: isClicking ? -12 : isHovering ? -8 : -7,
                }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 350,
                }}
              >
                {/* Glow effect - More intense */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg"
                  style={{
                    background:
                      cursorType === "link" ? colors.secondary : colors.primary,
                  }}
                  animate={{
                    scale: isHovering ? 2.5 : 2,
                    opacity: isHovering ? 0.7 : 0.4,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              {/* Text cursor indicator */}
              {cursorType === "text" && (
                <motion.div
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full"
                  style={{ background: colors.accent }}
                  animate={{
                    height: [8, 16, 8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Link cursor indicator */}
              {cursorType === "link" && (
                <motion.div
                  className="absolute -right-3 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.secondary}
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </motion.div>
              )}

              {/* Click ripple effect - More visible */}
              <AnimatePresence>
                {isClicking && (
                  <>
                    <motion.div
                      className="absolute rounded-full border-2"
                      style={{ borderColor: colors.secondary }}
                      initial={{
                        width: 14,
                        height: 14,
                        x: -7,
                        y: -7,
                        opacity: 1,
                      }}
                      animate={{
                        width: 100,
                        height: 100,
                        x: -50,
                        y: -50,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute rounded-full border-2"
                      style={{ borderColor: colors.primary }}
                      initial={{
                        width: 14,
                        height: 14,
                        x: -7,
                        y: -7,
                        opacity: 1,
                      }}
                      animate={{
                        width: 80,
                        height: 80,
                        x: -40,
                        y: -40,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.1,
                      }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Magnetic effect lines - More lines */}
              {isHovering && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => {
                    const colorKeys = Object.keys(colors) as Array<
                      keyof typeof colors
                    >;
                    const lineColor = colors[colorKeys[i % colorKeys.length]];

                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          background: lineColor,
                          left: "50%",
                          top: "50%",
                          transform: `translate(-50%, -50%) rotate(${
                            i * 30
                          }deg)`,
                          boxShadow: `0 0 8px ${lineColor}`,
                        }}
                        animate={{
                          x: [
                            0,
                            Math.cos((i * Math.PI) / 6) * 60,
                            Math.cos((i * Math.PI) / 6) * 45,
                          ],
                          y: [
                            0,
                            Math.sin((i * Math.PI) / 6) * 60,
                            Math.sin((i * Math.PI) / 6) * 45,
                          ],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2.5,
                          times: [0, 0.5, 1],
                          repeat: Infinity,
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
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

// Magnetic Effect Component - Enhanced
export const MagneticElement = ({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = Math.min(rect.width, rect.height) / 2;

    // Smooth magnetic effect with easing
    const easeFactor = 1 - Math.min(distance / maxDistance, 1);
    const magnetStrength = strength * easeFactor;

    setPosition({
      x: distanceX * magnetStrength,
      y: distanceY * magnetStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CustomCursor;
