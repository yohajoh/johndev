"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  connectionRadius: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  particleColors?: string[];
  moveSpeed?: number;
  interactive?: boolean;
  className?: string;
}

export const ParticleBackground = ({
  particleCount = 50,
  connectionDistance = 150,
  particleColors = [
    "rgba(22, 163, 74, 0.5)", // primary
    "rgba(245, 158, 11, 0.5)", // secondary
    "rgba(139, 92, 246, 0.5)", // accent
    "rgba(59, 130, 246, 0.3)", // blue
    "rgba(16, 185, 129, 0.3)", // green
  ],
  moveSpeed = 0.5,
  interactive = true,
  className,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -100, y: -100, radius: 100 });

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * moveSpeed,
      speedY: (Math.random() - 0.5) * moveSpeed,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.5 + 0.2,
      connectionRadius: connectionDistance,
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -100;
      mouseRef.current.y = -100;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with fade effect for trails
      ctx.fillStyle = "rgba(10, 10, 12, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction
        if (interactive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Repel particles from mouse
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off walls
        if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;

        // Keep within bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.5", p.opacity.toString());
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < p.connectionRadius) {
            // Calculate line opacity based on distance
            const opacity = 1 - distance / p.connectionRadius;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color.replace(
              "0.5",
              (opacity * 0.2).toString()
            );
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (interactive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius * 2) {
            const opacity = 1 - distance / (mouse.radius * 2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(22, 163, 74, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse influence area (for debugging)
      if (interactive && process.env.NODE_ENV === "development") {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(22, 163, 74, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    particleCount,
    connectionDistance,
    particleColors,
    moveSpeed,
    interactive,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
      aria-hidden="true"
    />
  );
};

// Alternative: CSS-based particle system (less performant but simpler)
export const CSSParticleBackground = ({
  particleCount = 30,
  className,
}: {
  particleCount?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden z-0",
        className
      )}
    >
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Gradient mesh background
export const GradientMeshBackground = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
      style={{
        background: `
          radial-gradient(at 40% 20%, rgba(22, 163, 74, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(245, 158, 11, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 100%, rgba(239, 68, 68, 0.1) 0px, transparent 50%)
        `,
      }}
    />
  );
};

export default ParticleBackground;
