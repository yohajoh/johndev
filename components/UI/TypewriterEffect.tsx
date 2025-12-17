"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
}

export const TypewriterEffect = ({
  texts,
  className = "",
  speed = 50,
  delay = 1000,
  loop = true,
  cursor = true,
  cursorBlinkSpeed = 500,
}: TypewriterEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [cursorBlinkSpeed]);

  // Typewriter effect
  useEffect(() => {
    if (isPaused) return;

    const currentFullText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === currentFullText) {
      // Pause at the end of typing
      setIsPaused(true);
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && currentText === "") {
      // Move to next text after deleting
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
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
  ]);

  // Reset animation when texts change
  useEffect(() => {
    setCurrentText("");
    setCurrentTextIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, [texts]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="inline-block"
        >
          {currentText}
          {cursor && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-current ml-1"
              animate={{
                opacity: cursorVisible ? 1 : 0,
              }}
              transition={{
                duration: cursorBlinkSpeed / 1000,
              }}
            />
          )}
        </motion.span>
      </AnimatePresence>

      {/* Decorative elements */}
      {!loop &&
        currentTextIndex === texts.length - 1 &&
        currentText === texts[texts.length - 1] && (
          <motion.span
            className="ml-2 text-sm text-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✓
          </motion.span>
        )}
    </div>
  );
};

// Multi-line typewriter variant
export const MultiLineTypewriter = ({
  lines,
  className = "",
  lineDelay = 500,
  ...props
}: Omit<TypewriterEffectProps, "texts"> & { lines: string[][] }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines.length, lineDelay]);

  return (
    <div className={`space-y-2 ${className}`}>
      {lines.slice(0, currentLineIndex + 1).map((texts, index) => (
        <TypewriterEffect
          key={index}
          texts={texts}
          {...props}
          delay={index === 0 ? props.delay : lineDelay}
        />
      ))}
    </div>
  );
};

export default TypewriterEffect;
