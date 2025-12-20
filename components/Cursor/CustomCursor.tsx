"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  enabled?: boolean;
  size?: number;
  color?: string;
  trailColor?: string;
  trailSize?: number;
  trailLength?: number;
  smoothness?: number;
}

import { useTheme } from "next-themes";

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifetime: number;
  velocity: { x: number; y: number };
  type: "trail" | "float" | "ring";
  rotation: number;
  opacity: number;
  delay: number;
}

const CURSOR_COLORS = {
  light: {
    primary: "#2563eb",
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
    amber: "#fbbf24",
    emerald: "#34d399",
    sky: "#0ea5e9",
    violet: "#8b5cf6",
    fuchsia: "#d946ef",
    blue: "#0ea5e9",
    yellow: "#fbbf24",
    green: "#10b981",
    red: "#ef4444",
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
    amber: "#fbbf24",
    emerald: "#34d399",
    sky: "#0ea5e9",
    violet: "#8b5cf6",
    fuchsia: "#d946ef",
    blue: "#0ea5e9",
    yellow: "#fbbf24",
    green: "#10b981",
    red: "#ef4444",
  },
};

export const CustomCursor = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "link" | "text">(
    "default"
  );

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Real-time cursor position (instant, no delay)
  const cursorPos = useRef({ x: 0, y: 0 });

  // Trail particle positions (follow behind with delay)
  const trailParticles = useRef<
    Array<{ x: number; y: number; delay: number; color: string }>
  >([]);
  const floatingParticles = useRef<
    Array<{ x: number; y: number; color: string; size: number }>
  >([]);

  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const colors = theme === "dark" ? CURSOR_COLORS.dark : CURSOR_COLORS.light;
  const colorKeys = Object.keys(colors);

  const animationFrameRef = useRef<number>(0);
  const mousePosHistory = useRef<
    Array<{ x: number; y: number; timestamp: number }>
  >([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // Hide default cursor globally
  useEffect(() => {
    const hideDefaultCursor = () => {
      document.body.style.cursor = "none";

      // Hide cursor on all interactive elements
      document
        .querySelectorAll('a, button, input, textarea, select, [role="button"]')
        .forEach((el) => {
          (el as HTMLElement).style.cursor = "none";
        });
    };

    hideDefaultCursor();

    // Handle dynamic content
    const observer = new MutationObserver(hideDefaultCursor);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "auto";
      observer.disconnect();

      document
        .querySelectorAll('a, button, input, textarea, select, [role="button"]')
        .forEach((el) => {
          (el as HTMLElement).style.cursor = "";
        });
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouchDevice || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ultra-fast mouse move handler - immediate response
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();

      // Update cursor position IMMEDIATELY (no delay)
      cursorPos.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      velocityRef.current = { x: dx, y: dy };
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Store mouse position history for trail
      mousePosHistory.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      });
      if (mousePosHistory.current.length > 30) {
        mousePosHistory.current.shift();
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Create MANY trail particles based on speed
      if (speed > 1) {
        const newParticles: CursorParticle[] = [];
        const particleCount = Math.min(Math.floor(speed / 2), 25); // More particles
        const angle = Math.atan2(dy, dx);

        for (let i = 0; i < particleCount; i++) {
          const colorIndex = Math.floor(Math.random() * colorKeys.length);
          const colorKey = colorKeys[colorIndex];
          const particleAngle = angle + (Math.random() - 0.5) * Math.PI;
          const particleSpeed = (0.2 + Math.random() * 1.5) * (speed / 15);

          newParticles.push({
            id: now + i + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            size: 6 + Math.random() * 8, // Bigger dots (6-14px)
            color: colors[colorKey as keyof typeof colors],
            lifetime: 300 + Math.random() * 400,
            velocity: {
              x:
                Math.cos(particleAngle) * particleSpeed +
                (Math.random() - 0.5) * 0.5,
              y:
                Math.sin(particleAngle) * particleSpeed +
                (Math.random() - 0.5) * 0.5,
            },
            type: Math.random() > 0.4 ? "trail" : "float",
            rotation: Math.random() * 360,
            opacity: 0.8 + Math.random() * 0.2,
            delay: Math.random() * 0.2,
          });
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-300)); // Keep many particles
      }

      // Update cursor immediately
      if (
        cursorRef.current &&
        cursorInnerRef.current &&
        cursorRingRef.current
      ) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInnerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorRingRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    },
    [isVisible, colors, colorKeys]
  );

  // Mouse enter/leave
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Click handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsClicking(true);

      // Create massive click explosion particles
      const now = Date.now();
      const newParticles: CursorParticle[] = [];

      for (let i = 0; i < 40; i++) {
        // Even more particles
        const angle = (i * Math.PI * 2) / 40;
        const colorIndex = i % colorKeys.length;
        const colorKey = colorKeys[colorIndex];
        const size = 5 + Math.random() * 10; // Bigger particles (5-15px)

        newParticles.push({
          id: now + i,
          x: e.clientX,
          y: e.clientY,
          size: size,
          color: colors[colorKey as keyof typeof colors],
          lifetime: 400 + Math.random() * 400,
          velocity: {
            x: Math.cos(angle) * (2 + Math.random() * 4),
            y: Math.sin(angle) * (2 + Math.random() * 4),
          },
          type: "float",
          rotation: Math.random() * 360,
          opacity: 0.9 + Math.random() * 0.1,
          delay: Math.random() * 0.1,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Click ripple effect
      setTimeout(() => setIsClicking(false), 150);
    },
    [colors, colorKeys]
  );

  // Update cursor type
  useEffect(() => {
    if (isMobile) return;

    const updateCursorType = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.closest("a") || target.closest("button")) {
        setCursorType("link");
        setIsHovering(true);
      } else if (target.closest("input, textarea")) {
        setCursorType("text");
        setIsHovering(true);
      } else {
        setCursorType("default");
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", updateCursorType);
    document.addEventListener("mouseout", () => {
      setCursorType("default");
      setIsHovering(false);
    });

    return () => {
      document.removeEventListener("mouseover", updateCursorType);
      document.removeEventListener("mouseout", () => {});
    };
  }, [isMobile]);

  // Smooth animation loop for particles only (cursor is immediate)
  const animateParticles = useCallback(() => {
    const now = Date.now();

    // Update all particles
    setParticles((prev) =>
      prev
        .map((p) => {
          const age = now - p.id;
          const progress = age / p.lifetime;

          let newX = p.x;
          let newY = p.y;

          if (p.type === "float") {
            // Floating particles have physics
            newX = p.x + p.velocity.x;
            newY = p.y + p.velocity.y;
            p.velocity.x *= 0.98; // Slow down
            p.velocity.y *= 0.98;
          } else {
            // Trail particles just fade out
            newX = p.x + p.velocity.x * 0.5;
            newY = p.y + p.velocity.y * 0.5;
          }

          return {
            ...p,
            x: newX,
            y: newY,
            lifetime: p.lifetime - 16,
            size: p.size * (1 - progress * 0.2),
            opacity: p.opacity * (1 - progress * 0.5),
            rotation: p.rotation + p.velocity.x * 0.3,
          };
        })
        .filter((p) => {
          const age = now - p.id;
          return age < p.lifetime && p.size > 1 && p.opacity > 0.05;
        })
    );

    // eslint-disable-next-line react-hooks/immutability
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // Start animation loop
  useEffect(() => {
    if (isMobile) return;

    // Wrap animateParticles call so the identifier is not accessed
    // before it's initialized (avoids TDZ / "accessed before declared" errors).
    animationFrameRef.current = requestAnimationFrame(() => animateParticles());

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, animateParticles]);

  // Event listeners with throttling for performance
  useEffect(() => {
    if (isMobile) return;

    let lastCall = 0;
    const throttleMs = 1000 / 120; // 120 FPS limit

    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall >= throttleMs) {
        handleMouseMove(e);
        lastCall = now;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", () => setIsClicking(false));

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", () => {});
    };
  }, [
    isMobile,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
  ]);

  if (isMobile) return null;

  // Generate trailing dots that follow behind cursor
  const trailingDots = Array.from({ length: 20 }).map((_, i) => {
    const delay = (i + 1) * 10; // Staggered delay
    const historyIndex = Math.max(
      0,
      mousePosHistory.current.length - 1 - delay
    );
    const pos = mousePosHistory.current[historyIndex] || cursorPos.current;

    const colorIndex = i % colorKeys.length;
    const colorKey = colorKeys[colorIndex];
    const size = 4 + (i % 3) * 2; // Varying sizes

    return {
      x: pos?.x || cursorPos.current.x,
      y: pos?.y || cursorPos.current.y,
      color: colors[colorKey as keyof typeof colors],
      size,
      opacity: 0.7 - i * 0.03,
    };
  });

  return (
    <>
      {/* CSS Animations */}

      {/* All Particles */}
      <div className="fixed custom-cursor top-0 left-0 w-full h-full pointer-events-none z-[9997] overflow-hidden">
        {/* Trailing dots that follow cursor */}
        {trailingDots.map((dot, i) => (
          <div
            key={`trail-${i}`}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              opacity: dot.opacity,
              boxShadow: `0 0 ${dot.size}px ${dot.color}`,
              transition: "all 0.05s linear",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Floating particles */}
        {particles.map((particle) => {
          const style: React.CSSProperties = {
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: particle.type === "float" ? "50%" : "30%",
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            pointerEvents: "none",
          };

          return (
            <div key={particle.id} style={style} className="custom-cursor" />
          );
        })}
      </div>

      {/* Main Cursor - Immediate response */}
      {isVisible && (
        <>
          {/* Outer Ring */}
          <div
            ref={cursorRingRef}
            className="fixed custom-cursor top-0 left-0 pointer-events-none z-[9999] transition-all duration-75"
            style={{
              transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
              width: isHovering ? "60px" : "50px",
              height: isHovering ? "60px" : "50px",
              marginLeft: isHovering ? "-30px" : "-25px",
              marginTop: isHovering ? "-30px" : "-25px",
              border: `2px solid ${
                cursorType === "link" ? colors.secondary : colors.primary
              }80`,
              borderRadius: "50%",
              opacity: isHovering ? 1 : 0.8,
              animation:
                cursorType === "link" ? "spin 2s linear infinite" : "none",
              transition:
                "transform 0s linear, width 0.1s, height 0.1s, opacity 0.1s",
            }}
          >
            {/* Ring particles */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const radius = 30;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const colorIndex = i % colorKeys.length;
              const colorKey = colorKeys[colorIndex];

              return (
                <div
                  key={i}
                  className="absolute rounded-full transition-all duration-200"
                  style={{
                    width: "6px",
                    height: "6px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-3px",
                    marginTop: "-3px",
                    transform: `translate(${x}px, ${y}px)`,
                    background: colors[colorKey as keyof typeof colors],
                    boxShadow: `0 0 8px ${
                      colors[colorKey as keyof typeof colors]
                    }`,
                    opacity: isHovering ? 0.9 : 0.7,
                    animation: `pulse 1.5s ease-in-out infinite ${i * 0.05}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Inner Cursor */}
          <div
            ref={cursorRef}
            className="fixed custom-cursor top-0 left-0 pointer-events-none z-[9999] transition-all duration-75"
            style={{
              transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
              width: isClicking ? "22px" : isHovering ? "16px" : "14px",
              height: isClicking ? "22px" : isHovering ? "16px" : "14px",
              marginLeft: isClicking ? "-11px" : isHovering ? "-8px" : "-7px",
              marginTop: isClicking ? "-11px" : isHovering ? "-8px" : "-7px",
              background:
                cursorType === "link"
                  ? `radial-gradient(circle at 30% 30%, ${colors.secondary}, ${colors.primary})`
                  : cursorType === "text"
                  ? colors.accent
                  : colors.primary,
              borderRadius: "50%",
              boxShadow: `
                0 0 25px ${
                  cursorType === "link" ? colors.secondary : colors.primary
                }80,
                0 0 10px ${
                  cursorType === "link" ? colors.secondary : colors.primary
                }40,
                inset 0 0 8px rgba(255, 255, 255, 0.4)
              `,
              animation: isClicking ? "pulse 0.3s ease-out" : "none",
              transition: "transform 0s linear, width 0.1s, height 0.1s",
            }}
          >
            {/* Floating dots around cursor */}
            {Array.from({ length: 12 }).map((_, i) => {
              const colorIndex = i % colorKeys.length;
              const colorKey = colorKeys[colorIndex];
              const angle = (i * 30 * Math.PI) / 180;
              const distance = isHovering ? 40 : 35;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <div
                  key={i}
                  className="absolute rounded-full transition-all duration-300"
                  style={{
                    width: "5px",
                    height: "5px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-2.5px",
                    marginTop: "-2.5px",
                    background: colors[colorKey as keyof typeof colors],
                    boxShadow: `0 0 10px ${
                      colors[colorKey as keyof typeof colors]
                    }`,
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: isHovering ? 0.9 : 0.7,
                    animation: `orbit 3s linear infinite ${i * 0.2}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Inner dot - moves with cursor */}
          <div
            ref={cursorInnerRef}
            className="fixedcustom-cursor top-0 left-0 pointer-events-none z-[9999] transition-all duration-75"
            style={{
              transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
              width: "6px",
              height: "6px",
              marginLeft: "-3px",
              marginTop: "-3px",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 15px white, 0 0 8px rgba(255, 255, 255, 0.8)",
              opacity: 0.9,
              transition: "transform 0s linear",
            }}
          />

          {/* Text cursor indicator */}
          {cursorType === "text" && (
            <div
              className="fixed pointer-events-none z-[9999] transition-all duration-100"
              style={{
                left: cursorPos.current.x + 12,
                top: cursorPos.current.y - 10,
                width: "3px",
                height: "20px",
                background: colors.accent,
                animation: "blink 1s infinite",
                boxShadow: `0 0 12px ${colors.accent}`,
                borderRadius: "2px",
                transition: "left 0s linear, top 0s linear",
              }}
            />
          )}

          {/* Link cursor indicator */}
          {cursorType === "link" && (
            <div
              className="fixed pointer-events-none z-[9999] transition-all duration-100"
              style={{
                left: cursorPos.current.x + 15,
                top: cursorPos.current.y - 7,
                animation: "float 1.5s ease-in-out infinite",
                transition: "left 0s linear, top 0s linear",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.secondary}
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </div>
          )}

          {/* Click ripple effect */}
          {isClicking && (
            <>
              <div
                className="fixed custom-cursor top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                  left: cursorPos.current.x,
                  top: cursorPos.current.y,
                  width: "120px",
                  height: "120px",
                  marginLeft: "-60px",
                  marginTop: "-60px",
                  border: `3px solid ${colors.secondary}`,
                  animation: "ripple 0.6s ease-out forwards",
                }}
              />
              <div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                  left: cursorPos.current.x,
                  top: cursorPos.current.y,
                  width: "90px",
                  height: "90px",
                  marginLeft: "-45px",
                  marginTop: "-45px",
                  border: `2px solid ${colors.primary}`,
                  animation: "ripple 0.5s ease-out 0.1s forwards",
                }}
              />
            </>
          )}
        </>
      )}
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

// Magnetic element wrapper for interactive elements
interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  range?: number;
  className?: string;
}

export const MagneticElement = ({
  children,
  strength = 0.3,
  range = 100,
  className,
}: MagneticElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const { x: mouseX, y: mouseY } = useMousePosition();

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      const force = 1 - distance / range;
      setTransform({
        x: distanceX * strength * force,
        y: distanceY * strength * force,
      });
    } else {
      setTransform({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY, range, strength]);

  return (
    <div
      ref={elementRef}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
    >
      {children}
    </div>
  );
};

// Hover text effect component
interface HoverTextEffectProps {
  text: string;
  className?: string;
  hoverColor?: string;
}

export const HoverTextEffect = ({
  text,
  className,
  hoverColor = "text-primary",
}: HoverTextEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const letters = text.split("");

  return (
    <div
      className={cn("inline-flex overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500 ease-out",
            isHovered && `${hoverColor} transform translate-y-0`
          )}
          style={{
            transitionDelay: `${index * 50}ms`,
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

// Interactive button with cursor effects
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const InteractiveButton = ({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}: InteractiveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25",
    secondary: "bg-white/10 text-white backdrop-blur-sm border border-white/20",
    outline: "bg-transparent text-primary border-2 border-primary",
    ghost: "bg-transparent text-gray-400 hover:text-white",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
        isHovered && "scale-105 shadow-xl",
        isActive && "scale-95"
      )}
    >
      {/* Shimmer effect */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Ripple effect on click */}
      {isActive && !disabled && (
        <div className="absolute inset-0 rounded-xl bg-white/10 animate-ping" />
      )}

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          boxShadow: `0 0 40px ${
            variant === "primary"
              ? "rgba(22, 163, 74, 0.4)"
              : "rgba(255, 255, 255, 0.1)"
          }`,
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default CustomCursor;
