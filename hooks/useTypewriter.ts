/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TypewriterOptions {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
  onType?: (char: string) => void;
  onDelete?: () => void;
  onLoop?: () => void;
  onComplete?: () => void;
}

interface TypewriterState {
  text: string;
  isTyping: boolean;
  isDeleting: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentIndex: number;
  currentTextIndex: number;
}

export const useTypewriter = ({
  text,
  speed = 50,
  deleteSpeed = 30,
  delay = 1000,
  loop = true,
  loopDelay = 2000,
  onType,
  onDelete,
  onLoop,
  onComplete,
}: TypewriterOptions) => {
  const texts = Array.isArray(text) ? text : [text];

  const [state, setState] = useState<TypewriterState>({
    text: "",
    isTyping: false,
    isDeleting: false,
    isPaused: false,
    isComplete: false,
    currentIndex: 0,
    currentTextIndex: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isMountedRef = useRef(true);

  const currentText = texts[state.currentTextIndex];
  const isLastText = state.currentTextIndex === texts.length - 1;
  const isLastCharacter = state.currentIndex === currentText.length;

  // Reset timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  // Type character
  const typeCharacter = useCallback(() => {
    if (!isMountedRef.current) return;

    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      const nextCharacter = currentText.charAt(prev.currentIndex);

      // Call onType callback
      if (onType && nextCharacter) {
        onType(nextCharacter);
      }

      return {
        ...prev,
        text: currentText.substring(0, nextIndex),
        currentIndex: nextIndex,
        isTyping: true,
        isDeleting: false,
      };
    });
  }, [currentText, onType]);

  // Delete character
  const deleteCharacter = useCallback(() => {
    if (!isMountedRef.current) return;

    setState((prev) => {
      const nextIndex = prev.currentIndex - 1;

      // Call onDelete callback
      if (onDelete && prev.currentIndex > 0) {
        onDelete();
      }

      return {
        ...prev,
        text: currentText.substring(0, nextIndex),
        currentIndex: nextIndex,
        isTyping: false,
        isDeleting: true,
      };
    });
  }, [currentText, onDelete]);

  // Pause typing
  const pause = useCallback(
    (pauseDelay: number = delay) => {
      if (!isMountedRef.current) return;

      setState((prev) => ({
        ...prev,
        isPaused: true,
      }));

      clearTimer();
      timerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        setState((prev) => ({
          ...prev,
          isPaused: false,
        }));
      }, pauseDelay);
    },
    [delay, clearTimer]
  );

  // Move to next text
  const nextText = useCallback(() => {
    if (!isMountedRef.current) return;

    setState((prev) => {
      const nextTextIndex = (prev.currentTextIndex + 1) % texts.length;
      const isLooping = nextTextIndex === 0;

      // Call onLoop callback
      if (isLooping && onLoop) {
        onLoop();
      }

      // Call onComplete callback if this is the last text and not looping
      if (isLastText && !loop && onComplete) {
        onComplete();
      }

      return {
        ...prev,
        currentTextIndex: nextTextIndex,
        currentIndex: 0,
        text: "",
        isComplete: isLastText && !loop,
      };
    });
  }, [texts.length, isLastText, loop, onLoop, onComplete]);

  // Main typing logic
  const tick = useCallback(() => {
    if (!isMountedRef.current || state.isComplete) return;

    // If we're at the end of typing
    if (state.currentIndex === currentText.length) {
      // If this is the last text and we don't loop, complete
      if (isLastText && !loop) {
        setState((prev) => ({ ...prev, isComplete: true }));
        if (onComplete) onComplete();
        return;
      }

      // Otherwise, pause then start deleting or move to next text
      pause(loopDelay);
      timerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        if (loop) {
          setState((prev) => ({ ...prev, isDeleting: true }));
        } else {
          nextText();
        }
      }, loopDelay);
      return;
    }

    // If we're at the beginning of deleting
    if (state.currentIndex === 0 && state.isDeleting) {
      // Move to next text after deleting
      nextText();
      return;
    }

    // Determine speed based on action
    const currentSpeed = state.isDeleting ? deleteSpeed : speed;

    // Schedule next action
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      if (state.isDeleting) {
        deleteCharacter();
      } else {
        typeCharacter();
      }
    }, currentSpeed);
  }, [
    state.currentIndex,
    state.isDeleting,
    state.isComplete,
    currentText.length,
    isLastText,
    loop,
    speed,
    deleteSpeed,
    loopDelay,
    pause,
    nextText,
    deleteCharacter,
    typeCharacter,
    clearTimer,
    onComplete,
  ]);

  // Start/stop typing
  const start = useCallback(() => {
    if (state.isComplete) return;
    clearTimer();
    tick();
  }, [state.isComplete, clearTimer, tick]);

  const stop = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      isTyping: false,
      isPaused: true,
    }));
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setState({
      text: "",
      isTyping: false,
      isDeleting: false,
      isPaused: false,
      isComplete: false,
      currentIndex: 0,
      currentTextIndex: 0,
    });
  }, [clearTimer]);

  // Initialize
  useEffect(() => {
    isMountedRef.current = true;
    start();

    return () => {
      isMountedRef.current = false;
      clearTimer();
    };
  }, [start, clearTimer]);

  // Handle text changes
  useEffect(() => {
    if (!isMountedRef.current) return;
    reset();
    start();
  }, [text, reset, start]);

  // Control functions
  const controls = {
    start,
    stop,
    reset,
    pause: () => pause(delay),
    resume: () => {
      setState((prev) => ({ ...prev, isPaused: false }));
      start();
    },
    skip: () => {
      if (state.isDeleting) {
        // Skip to next text immediately
        nextText();
      } else {
        // Skip to end of current text
        setState((prev) => ({
          ...prev,
          text: currentText,
          currentIndex: currentText.length,
          isTyping: false,
        }));
      }
    },
  };
  // hello any one
  return {
    text: state.text,
    isTyping: state.isTyping,
    isDeleting: state.isDeleting,
    isPaused: state.isPaused,
    isComplete: state.isComplete,
    currentText: currentText,
    currentTextIndex: state.currentTextIndex,
    progress:
      currentText.length > 0
        ? (state.currentIndex / currentText.length) * 100
        : 0,
    ...controls,
  };
};

// Multi-line typewriter hook
interface MultiLineTypewriterOptions extends Omit<TypewriterOptions, "text"> {
  lines: string[];
  lineDelay?: number;
}

export const useMultiLineTypewriter = ({
  lines,
  lineDelay = 500,
  ...options
}: MultiLineTypewriterOptions) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  const addLine = useCallback((index: number) => {
    setVisibleLines((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  }, []);
  //  helo ne
  const completeLine = useCallback((index: number) => {
    setCompletedLines((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  }, []);

  // Show lines with delay
  useEffect(() => {
    lines.forEach((_, index) => {
      setTimeout(() => {
        addLine(index);
      }, index * lineDelay);
    });
  }, [lines, lineDelay, addLine]);

  const typedLines = lines.map((line, index) => {
    const isVisible = visibleLines.includes(index);
    const isCompleted = completedLines.includes(index);

    return {
      text: line,
      isVisible,
      isCompleted,
      index,
    };
  });

  return {
    lines: typedLines,
    allLinesVisible: visibleLines.length === lines.length,
    allLinesCompleted: completedLines.length === lines.length,
    addLine,
    completeLine,
  };
};

// Cursor animation hook
export const useTypewriterCursor = (
  blinkSpeed: number = 500,
  visible: boolean = true
) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, blinkSpeed);

    return () => clearInterval(interval);
  }, [blinkSpeed, visible]);

  return {
    isVisible,
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    toggle: () => setIsVisible((prev) => !prev),
  };
};

export default useTypewriter;
