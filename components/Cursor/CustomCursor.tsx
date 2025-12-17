"use client";
import { useEffect, useState, useCallback, useRef } from "react";
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
  const particlesRef = useRef<HTMLDivElement>(null);

  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const colors = theme === "dark" ? CURSOR_COLORS.dark : CURSOR_COLORS.light;
  const colorKeys = Object.keys(colors);

  const animationFrameRef = useRef<number>();
  const lastUpdateTime = useRef<number>(0);

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

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity for particle creation
      const dx = e.movementX;
      const dy = e.movementY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (!isVisible) setIsVisible(true);

      // Create trail particles based on speed
      if (speed > 3) {
        const now = Date.now();
        const newParticles: CursorParticle[] = [];
        const particleCount = Math.min(Math.floor(speed / 5), 15);
        const angle = Math.atan2(dy, dx);

        for (let i = 0; i < particleCount; i++) {
          const colorIndex = Math.floor(Math.random() * colorKeys.length);
          const colorKey = colorKeys[colorIndex];
          const particleAngle = angle + (Math.random() - 0.5) * Math.PI;
          const particleSpeed = (0.5 + Math.random() * 2) * (speed / 10);

          newParticles.push({
            id: now + i + Math.random(),
            x: e.clientX,
            y: e.clientY,
            size: 4 + Math.random() * 6, // Bigger dots (4-10px)
            color: colors[colorKey as keyof typeof colors],
            lifetime: 400 + Math.random() * 400,
            velocity: {
              x: Math.cos(particleAngle) * particleSpeed,
              y: Math.sin(particleAngle) * particleSpeed,
            },
            type: Math.random() > 0.3 ? "trail" : "float",
            rotation: Math.random() * 360,
            opacity: 0.7 + Math.random() * 0.3,
          });
        }

        setParticles((prev) => [...prev, ...newParticles].slice(-200)); // Keep more particles
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

      // Create click explosion particles
      const now = Date.now();
      const newParticles: CursorParticle[] = [];

      for (let i = 0; i < 30; i++) {
        // More particles
        const angle = (i * Math.PI * 2) / 30;
        const colorIndex = i % colorKeys.length;
        const colorKey = colorKeys[colorIndex];

        newParticles.push({
          id: now + i,
          x: e.clientX,
          y: e.clientY,
          size: 3 + Math.random() * 7, // Bigger dots
          color: colors[colorKey as keyof typeof colors],
          lifetime: 600 + Math.random() * 400,
          velocity: {
            x: Math.cos(angle) * (1.5 + Math.random() * 3),
            y: Math.sin(angle) * (1.5 + Math.random() * 3),
          },
          type: "float",
          rotation: Math.random() * 360,
          opacity: 0.8 + Math.random() * 0.2,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    },
    [colors, colorKeys]
  );

  const handleMouseUp = useCallback(() => setIsClicking(false), []);

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

  // Smooth cursor movement with lerp
  const updateCursor = useCallback((timestamp: number) => {
    const deltaTime =
      Math.min(timestamp - lastUpdateTime.current, 1000 / 60) / 1000;
    lastUpdateTime.current = timestamp;

    // Smooth follow with acceleration
    const smoothness = 0.15;
    cursorPos.current.x +=
      (targetPos.current.x - cursorPos.current.x) * smoothness;
    cursorPos.current.y +=
      (targetPos.current.y - cursorPos.current.y) * smoothness;

    // Update cursor position
    if (cursorRef.current && cursorInnerRef.current && cursorRingRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      cursorInnerRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      cursorRingRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
    }

    // Update particles animation
    setParticles((prev) =>
      prev
        .map((p) => {
          const newX = p.x + p.velocity.x;
          const newY = p.y + p.velocity.y;
          const newLifetime = p.lifetime - 16;

          return {
            ...p,
            x: newX,
            y: newY,
            lifetime: newLifetime,
            size: p.size * (p.type === "float" ? 0.99 : 0.97),
            opacity: Math.max(0, p.opacity - 0.01),
            rotation: p.rotation + p.velocity.x * 0.5,
          };
        })
        .filter((p) => p.lifetime > 0 && p.size > 1)
    );

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(updateCursor);
  }, []);

  // Start animation loop
  useEffect(() => {
    if (isMobile) return;

    lastUpdateTime.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, updateCursor]);

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
      {/* All Particles */}
      <div
        ref={particlesRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9997] overflow-hidden"
      >
        {particles.map((particle) => {
          const style: React.CSSProperties = {
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            borderRadius: "50%",
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            transition: particle.type === "float" ? "none" : "all 0.1s linear",
            pointerEvents: "none",
          };

          return <div key={particle.id} style={style} />;
        })}
      </div>

      {/* Main Cursor */}
      {isVisible && (
        <>
          {/* Outer Ring */}
          <div
            ref={cursorRingRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
              transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
              transition: "transform 0s linear",
              width: isHovering ? "64px" : "56px",
              height: isHovering ? "64px" : "56px",
              marginLeft: isHovering ? "-32px" : "-28px",
              marginTop: isHovering ? "-32px" : "-28px",
              border: `2px solid ${
                cursorType === "link" ? colors.secondary : colors.primary
              }`,
              borderRadius: "50%",
              opacity: isHovering ? 1 : 0.8,
              transformOrigin: "center",
              animation:
                cursorType === "link" ? "spin 3s linear infinite" : "none",
            }}
          >
            {/* Ring particles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const radius = 32;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const colorIndex = i % colorKeys.length;
              const colorKey = colorKeys[colorIndex];

              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-4px",
                    marginTop: "-4px",
                    transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
                    background: colors[colorKey as keyof typeof colors],
                    boxShadow: `0 0 8px ${
                      colors[colorKey as keyof typeof colors]
                    }`,
                    opacity: isHovering ? 0.8 : 0.6,
                    animation: `pulse 2s ease-in-out infinite ${i * 0.1}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Inner Cursor */}
          <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
              transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
              transition: "transform 0s linear",
              width: isClicking ? "24px" : isHovering ? "18px" : "16px",
              height: isClicking ? "24px" : isHovering ? "18px" : "16px",
              marginLeft: isClicking ? "-12px" : isHovering ? "-9px" : "-8px",
              marginTop: isClicking ? "-12px" : isHovering ? "-9px" : "-8px",
              background:
                cursorType === "link"
                  ? `radial-gradient(circle at 30% 30%, ${colors.secondary}, ${colors.primary})`
                  : cursorType === "text"
                  ? colors.accent
                  : colors.primary,
              borderRadius: "50%",
              boxShadow: `
                0 0 20px ${
                  cursorType === "link" ? colors.secondary : colors.primary
                },
                inset 0 0 10px rgba(255, 255, 255, 0.3)
              `,
              transformOrigin: "center",
              animation: isClicking ? "pulse 0.5s ease-out" : "none",
            }}
          >
            {/* Floating dots around cursor */}
            {Array.from({ length: 8 }).map((_, i) => {
              const colorIndex = i % colorKeys.length;
              const colorKey = colorKeys[colorIndex];
              const angle = (i * 45 * Math.PI) / 180;
              const distance = isHovering ? 35 : 30;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-3px",
                    marginTop: "-3px",
                    background: colors[colorKey as keyof typeof colors],
                    boxShadow: `0 0 8px ${
                      colors[colorKey as keyof typeof colors]
                    }`,
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: isHovering ? 0.9 : 0.7,
                    animation: `orbit 4s linear infinite ${i * 0.5}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Text cursor indicator */}
          {cursorType === "text" && (
            <div
              className="fixed pointer-events-none z-[9999]"
              style={{
                left: cursorPos.current.x + 10,
                top: cursorPos.current.y - 8,
                width: "2px",
                height: "24px",
                background: colors.accent,
                animation: "blink 1s infinite",
                boxShadow: `0 0 8px ${colors.accent}`,
              }}
            />
          )}

          {/* Link cursor indicator */}
          {cursorType === "link" && (
            <div
              className="fixed pointer-events-none z-[9999]"
              style={{
                left: cursorPos.current.x + 12,
                top: cursorPos.current.y - 6,
                animation: "float 2s ease-in-out infinite",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.secondary}
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </div>
          )}

          {/* Click ripple effect */}
          {isClicking && (
            <>
              <div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                  transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
                  marginLeft: "-50px",
                  marginTop: "-50px",
                  width: "100px",
                  height: "100px",
                  border: `2px solid ${colors.secondary}`,
                  animation: "ripple 0.8s ease-out forwards",
                }}
              />
              <div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                style={{
                  transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
                  marginLeft: "-40px",
                  marginTop: "-40px",
                  width: "80px",
                  height: "80px",
                  border: `2px solid ${colors.primary}`,
                  animation: "ripple 0.6s ease-out 0.1s forwards",
                }}
              />
            </>
          )}

          {/* Add CSS animations */}
          <style jsx>{`
            @keyframes spin {
              from {
                transform: translate(
                    ${cursorPos.current.x}px,
                    ${cursorPos.current.y}px
                  )
                  rotate(0deg);
              }
              to {
                transform: translate(
                    ${cursorPos.current.x}px,
                    ${cursorPos.current.y}px
                  )
                  rotate(360deg);
              }
            }

            @keyframes pulse {
              0%,
              100% {
                opacity: 0.7;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.2);
              }
            }

            @keyframes blink {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0.2;
              }
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-3px);
              }
            }

            @keyframes ripple {
              0% {
                transform: translate(
                    ${cursorPos.current.x}px,
                    ${cursorPos.current.y}px
                  )
                  scale(0.5);
                opacity: 1;
              }
              100% {
                transform: translate(
                    ${cursorPos.current.x}px,
                    ${cursorPos.current.y}px
                  )
                  scale(2);
                opacity: 0;
              }
            }

            @keyframes orbit {
              0% {
                transform: translate(0px, 0px) rotate(0deg)
                  translateX(${isHovering ? 35 : 30}px) rotate(0deg);
              }
              100% {
                transform: translate(0px, 0px) rotate(360deg)
                  translateX(${isHovering ? 35 : 30}px) rotate(-360deg);
              }
            }
          `}</style>
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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = Math.min(rect.width, rect.height) / 2;

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
