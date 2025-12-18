/**
 * Animation utilities and CSS classes
 * Converted from Framer Motion to pure CSS animations
 */

// Animation timing functions
export const EASING_FUNCTIONS = {
  easeOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  easeInOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
  linear: "linear",
};

// Animation delays for staggering
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
  return `${index * baseDelay}s`;
};

// CSS classes for common animations
export const ANIMATION_CLASSES = {
  // Fade animations
  fadeIn: "animate-in fade-in",
  fadeOut: "animate-out fade-out",
  fadeInUp: "animate-in fade-in slide-in-from-bottom-10",
  fadeInDown: "animate-in fade-in slide-in-from-top-10",
  fadeInLeft: "animate-in fade-in slide-in-from-left-10",
  fadeInRight: "animate-in fade-in slide-in-from-right-10",

  // Slide animations
  slideInUp: "animate-in slide-in-from-bottom-10",
  slideInDown: "animate-in slide-in-from-top-10",
  slideInLeft: "animate-in slide-in-from-left-10",
  slideInRight: "animate-in slide-in-from-right-10",

  // Scale animations
  scaleIn: "animate-in zoom-in-95",
  scaleOut: "animate-out zoom-out-95",

  // Combined animations
  fadeInUpScale: "animate-in fade-in slide-in-from-bottom-10 zoom-in-95",
  fadeInDownScale: "animate-in fade-in slide-in-from-top-10 zoom-in-95",
};

// Animation durations
export const DURATIONS = {
  fast: "duration-150",
  medium: "duration-300",
  slow: "duration-500",
  verySlow: "duration-1000",
};

// Reveal animation helpers
export const createRevealAnimation = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance: number = 30
) => {
  const directions = {
    up: { transform: `translateY(${distance}px)` },
    down: { transform: `translateY(-${distance}px)` },
    left: { transform: `translateX(${distance}px)` },
    right: { transform: `translateX(-${distance}px)` },
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      transform: "translate(0, 0)",
      transition: {
        duration: 0.6,
        ease: EASING_FUNCTIONS.easeOut,
      },
    },
  };
};

// Stagger children animation
export const createStaggerAnimation = (
  childAnimation: any,
  staggerDelay: number = 0.1
) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };
};

// Hover animations
export const HOVER_ANIMATIONS = {
  lift: {
    transform: "translateY(-10px) scale(1.02)",
    transition: {
      duration: 0.2,
      ease: EASING_FUNCTIONS.easeOut,
    },
  },
  scale: {
    transform: "scale(1.05)",
    transition: {
      duration: 0.2,
      ease: EASING_FUNCTIONS.easeOut,
    },
  },
  glow: {
    boxShadow: "0 0 30px rgba(22, 163, 74, 0.3)",
    transition: {
      duration: 0.3,
      ease: EASING_FUNCTIONS.easeOut,
    },
  },
};

// Tap/click animations
export const TAP_ANIMATIONS = {
  scale: {
    transform: "scale(0.95)",
    transition: {
      duration: 0.1,
    },
  },
  push: {
    transform: "translateY(2px)",
    transition: {
      duration: 0.1,
    },
  },
};

// Text reveal animation
export const createTextReveal = (delayPerCharacter: number = 0.05) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delayPerCharacter,
        duration: 0.6,
        ease: EASING_FUNCTIONS.easeOut,
      },
    }),
  };
};

// Floating animation
export const FLOAT_ANIMATION = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotation animation
export const ROTATE_ANIMATION = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Pulse animation
export const PULSE_ANIMATION = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Page transition
export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: EASING_FUNCTIONS.easeOut },
};

// Modal animation
export const MODAL_ANIMATION = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: {
    type: "spring",
    damping: 25,
    stiffness: 300,
  },
};

// Utility to convert Framer Motion variants to CSS
export const variantsToCSS = (variants: any) => {
  // This is a helper to convert Framer Motion variants to CSS classes
  // For a full implementation, you'd need to generate CSS keyframes
  return Object.keys(variants).map((key) => {
    const variant = variants[key];
    return {
      name: key,
      properties: variant,
    };
  });
};

// Pre-defined animation sequences
export const ANIMATION_SEQUENCES = {
  // Hero section sequence
  hero: {
    container: createStaggerAnimation(createRevealAnimation("up"), 0.1),
    items: createRevealAnimation("up"),
  },

  // About section sequence
  about: {
    container: createStaggerAnimation(createRevealAnimation("left"), 0.15),
    items: createRevealAnimation("left"),
  },

  // Skills section sequence
  skills: {
    container: createStaggerAnimation(createRevealAnimation("right"), 0.1),
    items: createRevealAnimation("right"),
  },

  // Projects section sequence
  projects: {
    container: createStaggerAnimation(createRevealAnimation("up"), 0.2),
    items: createRevealAnimation("up"),
  },
};

export default ANIMATION_CLASSES;
