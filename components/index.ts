// Export all components from one place
export { Navigation } from "./Navigation/Navigation";
export { MobileMenu } from "./Navigation/MobileMenu";
export {
  CustomCursor,
  MagneticElement,
  InteractiveButton,
  HoverTextEffect,
} from "./Cursor/CustomCursor";
export { HeroSection } from "./Sections/HeroSection";
export { AboutSection } from "./Sections/AboutSection";
export { SkillsSection } from "./Sections/SkillsSection";
export { ProjectsSection } from "./Sections/ProjectsSection";
export { ContactSection } from "./Sections/ContactSection";
export { Footer } from "./Sections/Footer";
export {
  Button,
  IconButton,
  FloatingButton,
  ButtonGroup,
  DownloadButton,
  ExternalLinkButton,
  LoveButton,
  StarButton,
  ZapButton,
  RocketButton,
} from "./UI/Button";
export {
  TypewriterEffect,
  MultiLineTypewriter,
  AnimatedText,
  GradientText,
  TextReveal,
} from "./UI/TypewriterEffect";
export { InfiniteMarquee, VerticalMarquee } from "./UI/InfiniteMarquee";
export { ProjectModal } from "./UI/ProjectModal";
export { ThemeProvider } from "./ThemeProvider";
export {
  SmoothScrollProvider,
  smoothScrollTo,
  smoothScrollBy,
} from "./Providers/SmoothScroll";
export {
  ParticleBackground,
  CSSParticleBackground,
  GradientMeshBackground,
} from "./Effects/ParticleBackground";

// Export hooks
export {
  useScrollProgress,
  useScrollAnimation,
  useScrollVelocity,
  useScrollDirection,
  useScrollSnap,
  useScrollTransform,
} from "@/hooks/useScrollProgress";
export {
  useMousePosition,
  useMouseWheel,
  useMouseDrag,
  useMouseHover,
} from "@/hooks/useMousePosition";
export { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Export utilities
export {
  cn,
  formatDate,
  formatNumber,
  debounce,
  throttle,
  generateId,
  isMobile,
  scrollToElement,
  calculateReadingTime,
  truncateText,
  isValidEmail,
  copyToClipboard,
} from "@/lib/utils";

// Export constants
export {
  APP_CONFIG,
  NAVIGATION,
  SOCIAL_LINKS,
  SKILL_CATEGORIES,
  SKILLS_DATA,
  SKILLS_OVERVIEW,
  PROJECT_CATEGORIES,
  CONTACT_INFO,
  WORKING_HOURS,
  COLORS,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  BREAKPOINTS,
  Z_INDEX,
  MARQUEE_ITEMS,
  TYPEWRITER_TEXTS,
  FEATURE_HIGHLIGHTS,
  EXPERIENCE_TIMELINE,
  EDUCATION,
  METRICS,
  SEO_METADATA,
  ACCESSIBILITY_LABELS,
  PERFORMANCE_TARGETS,
} from "@/lib/constants";

// Export types
export type {
  Skill,
  SkillCategory,
  Project,
  Experience,
  Education,
  ContactInfo,
  NavigationItem,
  SocialLink,
  ColorPalette,
  AnimationConfig,
  MarqueeItem,
  ModalProps,
  ButtonProps,
  CardProps,
  TypewriterProps,
  MousePosition,
  ScrollProgress,
  IntersectionObserverResult,
  Particle,
  ThemeConfig,
} from "@/types";
