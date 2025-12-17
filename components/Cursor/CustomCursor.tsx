"use client";

import { useEffect, useState, useCallback } from "react";
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
  },
  dark: {
    primary: "#3b82f6",
    secondary: "#f59e0b",
    accent: "#10b981",
    purple: "#8b5cf6",
    pink: "#ec4899",
    cyan: "#06b6d4",
  },
};

const PARTICLE_CONFIGS = [
  { colorKey: "primary", size: 4, delay: 0, velocity: { x: 0, y: 0 } },
  {
    colorKey: "secondary",
    size: 3,
    delay: 0.02,
    velocity: { x: 0.5, y: -0.5 },
  },
  { colorKey: "accent", size: 3, delay: 0.04, velocity: { x: -0.5, y: 0.5 } },
  { colorKey: "purple", size: 2, delay: 0.06, velocity: { x: 0.7, y: 0.7 } },
  { colorKey: "pink", size: 2, delay: 0.08, velocity: { x: -0.7, y: -0.7 } },
  { colorKey: "cyan", size: 2, delay: 0.1, velocity: { x: 0.3, y: -0.8 } },
  { colorKey: "primary", size: 3, delay: 0.12, velocity: { x: -0.8, y: 0.3 } },
  { colorKey: "secondary", size: 2, delay: 0.14, velocity: { x: 0.6, y: 0.4 } },
  { colorKey: "accent", size: 2, delay: 0.16, velocity: { x: -0.4, y: -0.6 } },
  { colorKey: "purple", size: 3, delay: 0.18, velocity: { x: 0.8, y: -0.2 } },
];

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
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

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  const colors = theme === "dark" ? CURSOR_COLORS.dark : CURSOR_COLORS.light;

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

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Add trail point
      const newTrailPoint: TrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: isHovering ? 8 : 6,
        opacity: 1,
        color: isHovering ? colors.secondary : colors.primary,
        timestamp: Date.now(),
      };

      setTrail((prev) => [...prev.slice(-15), newTrailPoint]);

      // Create particles on fast movement
      const velocity = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      if (velocity > 10) {
        const newParticles = PARTICLE_CONFIGS.map((config) => ({
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: config.size,
          color: colors[config.colorKey as keyof typeof colors],
          lifetime: 1000,
          velocity: {
            x: config.velocity.x + (Math.random() - 0.5) * 2,
            y: config.velocity.y + (Math.random() - 0.5) * 2,
          },
        }));
        setParticles((prev) => [...prev, ...newParticles].slice(-50));
      }
    },
    [cursorX, cursorY, isVisible, isHovering, colors]
  );

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);

  // Click handlers
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    // Create click particles
    const clickParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: cursorX.get(),
      y: cursorY.get(),
      size: 2 + Math.random() * 3,
      color: Object.values(colors)[i % Object.values(colors).length],
      lifetime: 800,
      velocity: {
        x: Math.cos((i * Math.PI * 2) / 12) * (2 + Math.random() * 2),
        y: Math.sin((i * Math.PI * 2) / 12) * (2 + Math.random() * 2),
      },
    }));
    setParticles((prev) => [...prev, ...clickParticles]);
  }, [cursorX, cursorY, colors]);

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

  // Update particles and trail
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            lifetime: p.lifetime - 16,
            size: p.size * 0.98,
          }))
          .filter((p) => p.lifetime > 0)
      );

      // Update trail
      setTrail((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity * 0.8,
            size: p.size * 0.95,
          }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 16);

    return () => clearInterval(interval);
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
      {/* Trail Effect */}
      <AnimatePresence>
        {isVisible &&
          trail.map((point, index) => (
            <motion.div
              key={point.id}
              className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full mix-blend-screen"
              style={{
                x: point.x,
                y: point.y,
                translateX: "-50%",
                translateY: "-50%",
                width: point.size,
                height: point.size,
                background: point.color,
              }}
              initial={{ opacity: point.opacity }}
              animate={{ opacity: point.opacity * 0.5 }}
              exit={{ opacity: 0 }}
            />
          ))}
      </AnimatePresence>

      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            // eslint-disable-next-line react-hooks/purity
            key={particle.id + Math.random()}
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
            style={{
              x: particle.x,
              y: particle.y,
              translateX: "-50%",
              translateY: "-50%",
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 10px ${particle.color}80`,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: [0.8, 0.4, 0],
              scale: [1, 1.5, 0],
              x: particle.x + particle.velocity.x * 50,
              y: particle.y + particle.velocity.y * 50,
            }}
            transition={{
              duration: particle.lifetime / 1000,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor */}
      <AnimatePresence>
        {isVisible && (
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
            {/* Outer Ring - Changes based on cursor type */}
            <motion.div
              className="absolute rounded-full border-2"
              style={{
                borderColor:
                  cursorType === "link" ? colors.secondary : colors.primary,
              }}
              animate={{
                width: isHovering ? 56 : 48,
                height: isHovering ? 56 : 48,
                opacity: isHovering ? 1 : 0.7,
                x: isHovering ? -28 : -24,
                y: isHovering ? -28 : -24,
                rotate: isHovering ? 360 : 0,
              }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
            >
              {/* Rotating accent for links */}
              {cursorType === "link" && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>

            {/* Inner Dot */}
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
                width: isClicking ? 20 : isHovering ? 12 : 10,
                height: isClicking ? 20 : isHovering ? 12 : 10,
                scale: isClicking ? 0.8 : 1,
                x: isClicking ? -10 : isHovering ? -6 : -5,
                y: isClicking ? -10 : isHovering ? -6 : -5,
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 400,
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
                  opacity: isHovering ? 0.6 : 0.3,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Text cursor indicator */}
            {cursorType === "text" && (
              <motion.div
                className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                style={{ background: colors.accent }}
                animate={{
                  height: [6, 12, 6],
                  opacity: [0.5, 1, 0.5],
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
                className="absolute -right-2 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.secondary}
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </motion.div>
            )}

            {/* Click ripple effect */}
            <AnimatePresence>
              {isClicking && (
                <>
                  <motion.div
                    className="absolute rounded-full border"
                    style={{ borderColor: colors.secondary }}
                    initial={{
                      width: 12,
                      height: 12,
                      x: -6,
                      y: -6,
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
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute rounded-full border"
                    style={{ borderColor: colors.primary }}
                    initial={{
                      width: 12,
                      height: 12,
                      x: -6,
                      y: -6,
                      opacity: 1,
                    }}
                    animate={{
                      width: 60,
                      height: 60,
                      x: -30,
                      y: -30,
                      opacity: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Magnetic effect lines */}
            {isHovering && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: `conic-gradient(from ${i * 45}deg, ${
                        colors.primary
                      }, ${colors.secondary}, ${colors.accent})`,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    }}
                    animate={{
                      x: [
                        0,
                        Math.cos((i * Math.PI) / 4) * 40,
                        Math.cos((i * Math.PI) / 4) * 30,
                      ],
                      y: [
                        0,
                        Math.sin((i * Math.PI) / 4) * 40,
                        Math.sin((i * Math.PI) / 4) * 30,
                      ],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.5, 1],
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
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

// Magnetic Effect Component
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
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default CustomCursor;
