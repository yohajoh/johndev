export interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  categories: string[];
  year: number;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactInfo {
  type: "email" | "phone" | "location" | "social";
  value: string;
  label: string;
  icon: string;
  href?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface ColorPalette {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  accent: string;
  accentDark: string;
  background: string;
  foreground: string;
  card: string;
  muted: string;
  border: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  stagger?: number;
}

export interface MarqueeItem {
  id: string;
  title: string;
  category?: string;
  color?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient"
    | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  animated?: boolean;
  pulse?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  gradient?: boolean;
  border?: boolean;
  shadow?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export interface TypewriterProps {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
  cursor?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

export interface MousePosition {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
}

export interface ScrollProgress {
  progress: number;
  isScrolled: boolean;
  scrollDirection: "up" | "down";
}

export interface IntersectionObserverResult {
  isIntersecting: boolean;
  hasIntersected: boolean;
  entry?: IntersectionObserverEntry;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export interface ThemeConfig {
  theme: "light" | "dark" | "system";
  colors: ColorPalette;
  animations: {
    enable: boolean;
    reduceMotion: boolean;
    prefersReducedMotion: boolean;
  };
}

// Constants
export const COLOR_PALETTE: ColorPalette = {
  primary: "rgb(22, 163, 74)",
  primaryDark: "rgb(21, 128, 61)",
  secondary: "rgb(245, 158, 11)",
  secondaryDark: "rgb(217, 119, 6)",
  accent: "rgb(139, 92, 246)",
  accentDark: "rgb(124, 58, 237)",
  background: "rgb(10, 10, 12)",
  foreground: "rgb(250, 250, 250)",
  card: "rgb(25, 25, 28)",
  muted: "rgb(82, 82, 91)",
  border: "rgb(38, 38, 45)",
};

export const ANIMATION_EASINGS = {
  easeOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  easeInOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const Z_INDEX = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1700,
  tooltip: 1800,
};

// Utility types
export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Component props with defaults
export type WithDefaults<P, D> = Omit<P, keyof D> & Partial<D>;

// Event handlers
export type EventHandler<T = Element> = React.EventHandler<
  React.SyntheticEvent<T>
>;

// CSS utility types
export type ResponsiveValue<T> = T | { [key in keyof typeof BREAKPOINTS]?: T };
export type SpacingValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64;

// Animation types
export interface AnimationKeyframes {
  [key: string]: {
    [property: string]: string | number;
  };
}

export interface AnimationSequence {
  keyframes: AnimationKeyframes;
  options?: KeyframeAnimationOptions;
}

// Scroll animation types
export interface ScrollTrigger {
  trigger: Element;
  start: string;
  end: string;
  scrub?: boolean;
  markers?: boolean;
}

export interface ScrollAnimation {
  element: Element;
  animations: AnimationSequence[];
  triggers: ScrollTrigger[];
}
