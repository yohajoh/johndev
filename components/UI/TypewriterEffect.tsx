/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

export const TypewriterEffect = ({
  texts,
  className = "",
  speed = 50,
  delay = 1000,
  loop = true,
  cursor = true,
  cursorBlinkSpeed = 500,
  onComplete,
}: TypewriterEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor blink animation
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  // Typewriter effect animation
  useEffect(() => {
    if (!isAnimating || isPaused) return;

    const currentFullText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === currentFullText) {
      // Pause at the end of typing
      setIsPaused(true);
      timeout = setTimeout(() => {
        setIsPaused(false);
        if (loop) {
          setIsDeleting(true);
        } else if (currentTextIndex === texts.length - 1) {
          onComplete?.();
          setIsAnimating(false);
        }
      }, delay);
    } else if (isDeleting && currentText === "") {
      // Move to next text after deleting
      setIsDeleting(false);
      if (currentTextIndex === texts.length - 1) {
        setCurrentTextIndex(0);
      } else {
        setCurrentTextIndex((prev) => prev + 1);
      }
    } else {
      // Typing or deleting
      const typeSpeed = isDeleting ? speed / 2 : speed;
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? currentFullText.substring(0, currentText.length - 1)
            : currentFullText.substring(0, currentText.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isPaused,
    texts,
    speed,
    delay,
    loop,
    onComplete,
    isAnimating,
  ]);

  // Reset animation when texts change
  useEffect(() => {
    setCurrentText("");
    setCurrentTextIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
    setIsAnimating(true);
  }, [texts]);

  // Intersection Observer for animation start
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimating(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("inline-flex items-center", className)}
      aria-live="polite"
      aria-label={`Typing: ${currentText}`}
    >
      <span className="relative inline-block">
        {/* Text with gradient background */}
        <span
          className={cn(
            "inline-block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
            "animate-gradient bg-[length:200%_auto]"
          )}
        >
          {currentText}
        </span>

        {/* Cursor */}
        {cursor && (
          <span
            className={cn(
              "inline-block w-[2px] h-[1.2em] bg-gradient-to-b from-primary to-secondary ml-1",
              "transition-opacity duration-150"
            )}
            style={{
              opacity: cursorVisible ? 1 : 0,
            }}
            aria-hidden="true"
          />
        )}

        {/* Decorative underline */}
        <span
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 rounded-full"
          style={{
            transform: `scaleX(${
              currentText.length / texts[currentTextIndex]?.length || 0
            })`,
            transformOrigin: "left",
            transition: "transform 0.3s ease-out",
          }}
        />
      </span>

      {/* Completion indicator */}
      {!loop &&
        currentTextIndex === texts.length - 1 &&
        currentText === texts[texts.length - 1] && (
          <span
            className="ml-2 text-primary animate-pulse"
            aria-label="Complete"
          >
            ✓
          </span>
        )}

      {/* Animated background effect */}
      <span className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

// Multi-line typewriter variant
interface MultiLineTypewriterProps
  extends Omit<TypewriterEffectProps, "texts"> {
  lines: string[][];
  lineDelay?: number;
  staggerDelay?: number;
}

export const MultiLineTypewriter = ({
  lines,
  className = "",
  lineDelay = 500,
  staggerDelay = 100,
  ...props
}: MultiLineTypewriterProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal lines with delay
            lines.forEach((_, index) => {
              setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
              }, index * lineDelay);
            });
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
    };
  }, [lines, lineDelay]);

  return (
    <div ref={containerRef} className={cn("space-y-2", className)}>
      {lines.map((texts, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-500 ease-out",
            visibleLines.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          <TypewriterEffect
            texts={texts}
            {...props}
            delay={index === 0 ? props.delay : lineDelay}
          />
        </div>
      ))}
    </div>
  );
};

// Animated text with particles
interface AnimatedTextProps {
  text: string;
  className?: string;
  animateOnHover?: boolean;
  particleCount?: number;
}

export const AnimatedText = ({
  text,
  className,
  animateOnHover = true,
  particleCount = 20,
}: AnimatedTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const letters = text.split("");

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => animateOnHover && setIsHovered(true)}
      onMouseLeave={() => animateOnHover && setIsHovered(false)}
    >
      {/* Text letters */}
      <div className="flex">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={cn(
              "inline-block transition-all duration-500 ease-out",
              isHovered && "text-primary transform translate-y-[-10px]"
            )}
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: particleCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 2 + 1}s ease-out forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Underline effect */}
      <div
        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
        style={{
          width: isHovered ? "100%" : "0%",
        }}
      />
    </div>
  );
};

// Gradient text with animation
interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animate?: boolean;
  speed?: number;
}

export const GradientText = ({
  text,
  className,
  gradient = "from-primary via-secondary to-accent",
  animate = true,
  speed = 5,
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradient,
        animate && "animate-gradient",
        className
      )}
      style={animate ? { animationDuration: `${speed}s` } : undefined}
    >
      {text}
    </span>
  );
};

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export const TextReveal = ({
  text,
  className,
  direction = "up",
  delay = 0,
  duration = 500,
}: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(20px)";
      case "down":
        return "translateY(-20px)";
      case "left":
        return "translateX(20px)";
      case "right":
        return "translateX(-20px)";
      default:
        return "translateY(20px)";
    }
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className="transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate(0)" : getTransform(),
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default TypewriterEffect;
