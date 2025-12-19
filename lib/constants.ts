/**
 * Application constants and configuration
 */
import john from "../public/john.jpg";
import {
  Code2,
  Database,
  Cloud,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Server,
  Zap,
  GitBranch,
  Box,
  Brain,
  Palette,
  Smartphone,
  Shield,
  Rocket,
  Users,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Star,
  Calendar,
  User,
  Home,
  Briefcase,
  TrendingUp,
  Smartphone as PhoneIcon,
  Wifi as WifiIcon,
  Cpu as CpuIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Server as ServerIcon,
  Code,
  Terminal as TerminalIcon,
  Cpu as Chip,
  Cpu as Processor,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Headphones as HeadphonesIcon,
  Globe as GlobeIcon,
  MapPin as MapPinIcon,
  Rocket as RocketIcon,
  Satellite as SatelliteIcon,
} from "lucide-react";

// Application configuration
export const APP_CONFIG = {
  name: "Yohannes Belete",
  title: "Senior Full-Stack Developer & System Architect",
  description:
    "Building exceptional digital experiences with modern technologies. Specializing in full-stack development, cloud architecture, and performance optimization.",
  url: "https://yohannesbelete.dev",
  author: "Yohannes Belete",
  email: "hello@yohannesbelete.dev",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  copyright: `© ${new Date().getFullYear()} Yohannes Belete. All rights reserved.`,
  version: "1.0.0",
  environment: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

// Navigation items
export const NAVIGATION = [
  {
    id: "home",
    name: "Home",
    href: "#home",
    icon: Home,
    description: "Welcome section",
  },
  {
    id: "about",
    name: "About",
    href: "#about",
    icon: User,
    description: "About me section",
  },

  {
    id: "skills",
    name: "Skills",
    href: "#skills",
    icon: Code,
    description: "Technical skills section",
  },
  {
    id: "projects",
    name: "Projects",
    href: "#projects",
    icon: Briefcase,
    description: "Projects showcase",
  },
  {
    id: "contact",
    name: "Contact",
    href: "#contact",
    icon: MessageSquare,
    description: "Contact information",
  },
] as const;

// Social media links
export const SOCIAL_LINKS = [
  {
    platform: "GitHub",
    url: "https://github.com/yohannesbelete",
    icon: Github,
    label: "GitHub Profile",
    color: "bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yohannesbelete",
    icon: Linkedin,
    label: "LinkedIn Profile",
    color: "bg-blue-700 hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yohannesbelete",
    icon: Twitter,
    label: "Twitter Profile",
    color: "bg-sky-500 hover:bg-sky-400",
    textColor: "text-white",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/yohannesbelete",
    icon: Instagram,
    label: "Instagram Profile",
    color:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    textColor: "text-white",
  },
  {
    platform: "Email",
    url: "mailto:hello@yohannesbelete.dev",
    icon: Mail,
    label: "Send Email",
    color: "bg-green-600 hover:bg-green-500",
    textColor: "text-white",
  },
] as const;

// Skill categories
export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend Development",
    icon: Globe,
    color: "primary",
    description: "Building responsive and interactive user interfaces",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "backend",
    label: "Backend Development",
    icon: Server,
    color: "secondary",
    description: "Developing robust server-side applications",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: Cloud,
    color: "accent",
    description: "Deploying and maintaining scalable infrastructure",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "tools",
    label: "Development Tools",
    icon: Box,
    color: "primary",
    description: "Development tools and technologies",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: "soft",
    label: "Soft Skills",
    icon: Brain,
    color: "secondary",
    description: "Professional and interpersonal abilities",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    id: "design",
    label: "UI/UX Design",
    icon: Palette,
    color: "accent",
    description: "User interface and experience design",
    gradient: "from-violet-500 to-pink-500",
  },
] as const;

// Skills data
export const SKILLS_DATA = {
  frontend: [
    {
      name: "React / Next.js",
      level: 98,
      icon: Code2,
      description: "Building modern web applications with React ecosystem",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      experience: "2+ years",
      projects: 5,
    },
    {
      name: "TypeScript",
      level: 95,
      icon: Code2,
      description: "Type-safe JavaScript development",
      color: "bg-gradient-to-r from-blue-600 to-blue-400",
      experience: "2+ years",
      projects: 5,
    },

    {
      name: "Tailwind CSS",
      level: 96,
      icon: Palette,
      description: "Utility-first CSS framework",
      color: "bg-gradient-to-r from-cyan-500 to-teal-500",
      experience: "3+ years",
      projects: 7,
    },
    {
      name: "Animation Libraries",
      level: 92,
      icon: Layers,
      description: "Creating smooth animations and interactions",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      experience: "1+ years",
      projects: 2,
    },
  ],
  backend: [
    {
      name: "Node.js / Express",
      level: 96,
      icon: Server,
      description: "Server-side JavaScript runtime",
      color: "bg-gradient-to-r from-green-600 to-lime-500",
      experience: "2+ years",
      projects: 3,
    },
    {
      name: "Python / Django",
      level: 90,
      icon: Terminal,
      description: "Full-stack Python framework",
      color: "bg-gradient-to-r from-blue-800 to-cyan-600",
      experience: "1+ years",
      projects: 1,
    },

    {
      name: "PostgreSQL",
      level: 94,
      icon: Database,
      description: "Advanced relational database",
      color: "bg-gradient-to-r from-blue-700 to-blue-500",
      experience: "4+ years",
      projects: 10,
    },
    {
      name: "MongoDB",
      level: 88,
      icon: DatabaseIcon,
      description: "NoSQL document database",
      color: "bg-gradient-to-r from-green-700 to-green-500",
      experience: "3+ years",
      projects: 6,
    },
    {
      name: "REST APIs",
      level: 98,
      icon: MessageSquare,
      description: "Designing robust APIs",
      color: "bg-gradient-to-r from-green-600 to-emerald-500",
      experience: "2+ years",
      projects: 5,
    },
  ],
  devops: [
    {
      name: "AWS",
      level: 95,
      icon: Cloud,
      description: "Cloud infrastructure and services",
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
      experience: "1+ years",
      projects: 1,
    },
    {
      name: "Docker",
      level: 96,
      icon: Box,
      description: "Containerization platform",
      color: "bg-gradient-to-r from-blue-600 to-cyan-500",
      experience: "1+ years",
      projects: 1,
    },

    {
      name: "CI/CD",
      level: 94,
      icon: GitBranch,
      description: "Continuous integration/deployment",
      color: "bg-gradient-to-r from-green-600 to-emerald-500",
      experience: "2+ years",
      projects: 5,
    },
  ],
  tools: [
    {
      name: "Git / GitHub",
      level: 98,
      icon: GitBranch,
      description: "Version control and collaboration",
      color: "bg-gradient-to-r from-gray-900 to-gray-700",
      experience: "4+ years",
      projects: 30,
    },
    {
      name: "VS Code",
      level: 97,
      icon: Code2,
      description: "Code editor and extensions",
      color: "bg-gradient-to-r from-blue-600 to-cyan-500",
      experience: "5+ years",
      projects: 35,
    },
    {
      name: "Webpack / Vite",
      level: 91,
      icon: Box,
      description: "Build tools and bundlers",
      color: "bg-gradient-to-r from-yellow-600 to-amber-500",
      experience: "2+ years",
      projects: 10,
    },
    {
      name: "Figma",
      level: 85,
      icon: Palette,
      description: "Design and prototyping",
      color: "bg-gradient-to-r from-purple-600 to-pink-500",
      experience: "1+ years",
      projects: 2,
    },
    {
      name: "Postman",
      level: 94,
      icon: MessageSquare,
      description: "API development and testing",
      color: "bg-gradient-to-r from-orange-600 to-orange-400",
      experience: "2+ years",
      projects: 4,
    },
  ],
  soft: [
    {
      name: "Problem Solving",
      level: 96,
      icon: Brain,
      description: "Analytical thinking and solutions",
      color: "bg-gradient-to-r from-indigo-600 to-purple-500",
      experience: "3+ years",
      projects: 5,
    },

    {
      name: "Agile / Scrum",
      level: 95,
      icon: Layers,
      description: "Project management methodologies",
      color: "bg-gradient-to-r from-blue-600 to-cyan-500",
      experience: "2+ years",
      projects: 25,
    },
    {
      name: "Time Management",
      level: 93,
      icon: Zap,
      description: "Efficient task prioritization",
      color: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      experience: "3+ years",
      projects: 2,
    },
    {
      name: "Collaboration",
      level: 97,
      icon: Users,
      description: "Team collaboration and coordination",
      color: "bg-gradient-to-r from-teal-600 to-cyan-500",
      experience: "4+ years",
      projects: 8,
    },
  ],
} as const;

// Skills overview statistics
export const SKILLS_OVERVIEW = [
  {
    category: "Frontend Development",
    icon: Globe,
    stats: [
      { label: "Frameworks", value: "React, Vue, Angular, Svelte" },
      { label: "Styling", value: "Tailwind, SCSS, CSS-in-JS, Styled" },
      { label: "State Management", value: "Redux, Context, Zustand, Pinia" },
      { label: "Performance", value: "Lighthouse 95+, Core Web Vitals" },
      { label: "Animation", value: "GSAP, Framer, Anime.js, Three.js" },
      { label: "Testing", value: "Jest, Testing Library, Cypress" },
    ],
    gradient: "from-emerald-500/20 via-green-500/10 to-emerald-500/5",
  },
  {
    category: "Backend Development",
    icon: Server,
    stats: [
      { label: "Languages", value: "Node.js, Python, Go, Java" },
      { label: "Databases", value: "PostgreSQL, MongoDB, Redis, MySQL" },
      { label: "APIs", value: "REST, GraphQL, WebSocket, gRPC" },
      { label: "Architecture", value: "Microservices, Monolith, Serverless" },
      { label: "Authentication", value: "JWT, OAuth2, Passport, Auth0" },
      { label: "Caching", value: "Redis, Memcached, CDN, Varnish" },
    ],
    gradient: "from-amber-500/20 via-orange-500/10 to-amber-500/5",
  },
  {
    category: "Infrastructure & DevOps",
    icon: Cloud,
    stats: [
      { label: "Cloud Platforms", value: "AWS, GCP, Azure, DigitalOcean" },
      { label: "Containers", value: "Docker, Kubernetes, Podman, ECS" },
      { label: "CI/CD", value: "GitHub Actions, Jenkins, GitLab, CircleCI" },
      { label: "Monitoring", value: "Prometheus, Grafana, Datadog, New Relic" },
      { label: "Security", value: "WAF, DDoS, SSL/TLS, Penetration Testing" },
      { label: "Infrastructure", value: "Terraform, Ansible, CloudFormation" },
    ],
    gradient: "from-violet-500/20 via-purple-500/10 to-violet-500/5",
  },
] as const;

// Projects data
export const PROJECT_CATEGORIES = [
  "All",
  "Full-Stack",
  "AI/ML",
  "Enterprise",
  "Mobile",
  "IoT",
  "Data Visualization",
  "E-commerce",
  "SaaS",
  "Open Source",
] as const;

// Contact information
export const CONTACT_INFO = [
  {
    type: "email",
    value: "hello@yohannesbelete.dev",
    label: "Email Address",
    icon: Mail,
    href: "mailto:hello@yohannesbelete.dev",
    description: "Send me an email",
    color: "bg-green-600 hover:bg-green-500",
  },
  {
    type: "phone",
    value: "+1 (555) 123-4567",
    label: "Phone Number",
    icon: Phone,
    href: "tel:+15551234567",
    description: "Call or text me",
    color: "bg-blue-600 hover:bg-blue-500",
  },
  {
    type: "location",
    value: "San Francisco, CA",
    label: "Location",
    icon: MapPin,
    href: "https://maps.google.com/?q=San+Francisco+CA",
    description: "Based in San Francisco",
    color: "bg-red-600 hover:bg-red-500",
  },
] as const;

// Working hours
export const WORKING_HOURS = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST", available: true },
  { day: "Saturday", hours: "By appointment only", available: true },
  { day: "Sunday", hours: "Not available", available: false },
] as const;

// Color palette
export const COLORS = {
  primary: {
    light: "#16a34a",
    dark: "#15803d",
    gradient: "linear-gradient(135deg, #16a34a, #15803d)",
  },
  secondary: {
    light: "#f59e0b",
    dark: "#d97706",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  accent: {
    light: "#8b5cf6",
    dark: "#7c3aed",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  },
  success: {
    light: "#10b981",
    dark: "#059669",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  warning: {
    light: "#f59e0b",
    dark: "#d97706",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  error: {
    light: "#ef4444",
    dark: "#dc2626",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
  },
  info: {
    light: "#3b82f6",
    dark: "#2563eb",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  medium: 300,
  slow: 500,
  verySlow: 1000,
  extraSlow: 2000,
} as const;

// Animation easings
export const ANIMATION_EASINGS = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  cubicBezier: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  background: -1,
  base: 0,
  content: 10,
  navigation: 50,
  dropdown: 100,
  modal: 200,
  toast: 300,
  tooltip: 400,
  cursor: 500,
} as const;

// Typography
export const TYPOGRAPHY = {
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Spacing
export const SPACING = {
  0: "0px",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
  56: "14rem",
  64: "16rem",
} as const;

// Border radius
export const BORDER_RADIUS = {
  none: "0px",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// Shadows
export const SHADOWS = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  base: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  md: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  lg: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  xl: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "2xl": "0 50px 100px -20px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  glow: "0 0 20px rgba(22, 163, 74, 0.3)",
  "glow-lg": "0 0 40px rgba(22, 163, 74, 0.5)",
} as const;

// Marquee items
export const MARQUEE_ITEMS = [
  { id: "react", title: "React", category: "Frontend", color: "primary" },
  {
    id: "typescript",
    title: "TypeScript",
    category: "Language",
    color: "secondary",
  },
  { id: "nextjs", title: "Next.js", category: "Framework", color: "accent" },
  { id: "nodejs", title: "Node.js", category: "Backend", color: "primary" },
  { id: "aws", title: "AWS", category: "Cloud", color: "secondary" },
  { id: "docker", title: "Docker", category: "DevOps", color: "accent" },
  { id: "graphql", title: "GraphQL", category: "API", color: "primary" },
  { id: "mongodb", title: "MongoDB", category: "Database", color: "secondary" },
  {
    id: "kubernetes",
    title: "Kubernetes",
    category: "DevOps",
    color: "accent",
  },
  { id: "tailwind", title: "Tailwind CSS", category: "CSS", color: "primary" },
  { id: "python", title: "Python", category: "Language", color: "secondary" },
  { id: "go", title: "Go", category: "Language", color: "accent" },
  { id: "redis", title: "Redis", category: "Database", color: "primary" },
  {
    id: "terraform",
    title: "Terraform",
    category: "DevOps",
    color: "secondary",
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    category: "Database",
    color: "accent",
  },
] as const;

// Typewriter texts
export const TYPEWRITER_TEXTS = [
  "Full-Stack Developer",
  "System Architect",
  "Cloud Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Tech Innovator",
  "Performance Optimizer",
  "Team Leader",
  "Open Source Contributor",
  "Mentor & Educator",
] as const;

// Features highlights
export const FEATURE_HIGHLIGHTS = [
  {
    icon: Zap,
    title: "Fast Learner",
    description:
      "Quickly adapt to new technologies and frameworks with proven track record",
    color: "primary",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Rocket,
    title: "Performance Focus",
    description: "Optimize applications for speed, efficiency, and scalability",
    color: "secondary",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Best Practices",
    description:
      "Follow industry standards, security guidelines, and clean code principles",
    color: "accent",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Team Player",
    description:
      "Excellent collaboration skills and experience leading cross-functional teams",
    color: "primary",
    gradient: "from-cyan-500 to-blue-500",
  },
] as const;

// Experience timeline
export const EXPERIENCE_TIMELINE = [
  {
    id: "exp2",
    company: "Digital Solutions Co.",
    position: "Full-Stack Developer",
    period: "2023 - 2025",
    description: [
      "Developed and maintained multiple client projects using modern stack",
      "Built real-time dashboard for data visualization and analytics",
      "Integrated third-party APIs and payment gateways",
      "Improved application security and implemented best practices",
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "Redis", "Docker"],
    current: false,
    logo: "/logos/digital-solutions.svg",
  },
  {
    id: "exp3",
    company: "Startup Ventures",
    position: "Frontend Developer",
    period: "2022 - 2023",
    description: [
      "Built responsive web applications with React and TypeScript",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Optimized website performance and accessibility",
      "Participated in agile development processes",
    ],
    technologies: ["React", "TypeScript", "Redux", "SASS", "Jest"],
    current: false,
    logo: "/logos/startup-ventures.svg",
  },
] as const;

// Education
export const EDUCATION = [
  {
    id: "edu2",
    institution: "ASTU",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2022 - 2016",
    grade: "Summa Cum Laude",
    logo: "/logos/mit.svg",
  },
] as const;

// Metrics
export const METRICS = [
  { label: "Projects Completed", value: "150+", icon: Briefcase },
  { label: "Happy Clients", value: "50+", icon: Heart },
  { label: "Years Experience", value: "6+", icon: Calendar },
  { label: "Technologies", value: "25+", icon: Code },
] as const;

// SEO metadata
export const SEO_METADATA = {
  title: "Yohannes Belete | Senior Full-Stack Developer & System Architect",
  description:
    "Building exceptional digital experiences with modern technologies. Specializing in full-stack development, cloud architecture, and performance optimization.",
  keywords: [
    "full-stack developer",
    "system architect",
    "react developer",
    "next.js developer",
    "typescript developer",
    "aws architect",
    "devops engineer",
    "san francisco developer",
    "software engineer",
    "web developer",
    "cloud architect",
    "performance optimization",
    "scalable applications",
    "microservices",
    "modern web development",
  ],
  author: "Yohannes Belete",
  url: "https://yohannesbelete.dev",
  image: "/og-image.jpg",
  locale: "en_US",
  type: "website",
} as const;

// Accessibility labels
export const ACCESSIBILITY_LABELS = {
  navigation: "Main navigation",
  skipToContent: "Skip to main content",
  themeToggle: "Toggle theme",
  languageToggle: "Toggle language",
  closeMenu: "Close menu",
  openMenu: "Open menu",
  closeModal: "Close modal",
  openModal: "Open modal",
  previousSlide: "Previous slide",
  nextSlide: "Next slide",
  playAnimation: "Play animation",
  pauseAnimation: "Pause animation",
  volumeToggle: "Toggle volume",
  fullscreenToggle: "Toggle fullscreen",
  loading: "Loading",
  loaded: "Loaded",
  error: "Error",
  success: "Success",
  warning: "Warning",
  info: "Information",
} as const;

// Performance metrics
export const PERFORMANCE_TARGETS = {
  fcp: 1000, // First Contentful Paint (ms)
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100, // First Input Delay (ms)
  cls: 0.1, // Cumulative Layout Shift
  tti: 3800, // Time to Interactive (ms)
  tbt: 300, // Total Blocking Time (ms)
} as const;

export const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    subtitle:
      "Full-stack e-commerce solution with real-time inventory management",
    description:
      "A scalable e-commerce platform built with Next.js, Node.js, and MongoDB. Features include real-time inventory management, payment processing, admin dashboard, and advanced search functionality.",
    longDescription:
      "This project involved building a complete e-commerce solution from scratch. The platform handles thousands of concurrent users with real-time inventory updates, secure payment processing using Stripe, and an intuitive admin dashboard for business owners.",
    context:
      "Businesses needed a scalable e-commerce solution that could handle high traffic during sales events while maintaining real-time inventory accuracy.",
    action:
      "Built a microservices architecture with Next.js frontend, Node.js backend, MongoDB for data storage, Redis for caching, and Docker containers for easy deployment.",
    result:
      "Platform handles 50K+ monthly users with 99.9% uptime, processes $2M+ in annual revenue, and reduces inventory discrepancies by 95%.",
    category: "E-commerce",
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redis",
      "Docker",
    ],
    year: 2024,
    links: {
      github: "https://github.com/example",
      live: "https://example.com",
    },
    image: "../public/john.jpg",
    featured: true,
    color: "primary",
    metrics: [
      { label: "Performance", value: "98", icon: Zap },
      { label: "Monthly Users", value: "50K+", icon: Users },
      { label: "Annual Revenue", value: "$2M+", icon: TrendingUp },
      { label: "Uptime", value: "99.9%", icon: Globe },
    ],
    stats: [
      { label: "Performance", value: "Lighthouse 98" },
      { label: "Users", value: "50K+" },
      { label: "Revenue", value: "$2M+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "project-2",
    title: "AI Content Generator",
    subtitle: "AI-powered content creation platform with GPT integration",
    description:
      "Advanced AI content generation platform that uses GPT-4 to create high-quality articles, social media posts, and marketing copy.",
    longDescription:
      "A comprehensive AI platform that helps content creators generate high-quality content in minutes. Features include template system, team collaboration, content scheduling, and performance analytics.",
    context:
      "Content creators and marketers needed a tool to generate high-quality content quickly while maintaining brand voice and SEO optimization.",
    action:
      "Developed a React frontend with Python/FastAPI backend, integrated GPT-4 API, built template engine, and implemented team collaboration features.",
    result:
      "Platform serves 10K+ users, generated 1M+ pieces of content with 95% user satisfaction rate, and reduced content creation time by 80%.",
    category: "AI/ML",
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    year: 2024,
    links: {
      github: "https://github.com/ai-example",
      live: "https://ai.example.com",
    },
    image: "/projects/ai-platform.jpg",
    featured: true,
    color: "secondary",
    metrics: [
      { label: "AI Models", value: "5+", icon: Cpu },
      { label: "Active Users", value: "10K+", icon: Users },
      { label: "Content Generated", value: "1M+", icon: TrendingUp },
      { label: "Accuracy", value: "95%", icon: Star },
    ],
    stats: [
      { label: "AI Models", value: "5+" },
      { label: "Users", value: "10K+" },
      { label: "Content Generated", value: "1M+" },
      { label: "Accuracy", value: "95%" },
    ],
  },
  {
    id: "project-3",
    title: "Enterprise Dashboard",
    subtitle: "Real-time analytics dashboard for enterprise clients",
    description:
      "Comprehensive analytics dashboard for enterprise clients with real-time data visualization, custom reporting, and team collaboration features.",
    longDescription:
      "Built with microservices architecture, this dashboard handles billions of data points with sub-100ms query response times. Features include real-time notifications, custom report builder, and role-based access control.",
    context:
      "Large enterprises needed a unified dashboard to monitor KPIs across multiple departments with real-time updates and custom reporting capabilities.",
    action:
      "Implemented Vue.js frontend with Go microservices, Kafka for real-time data streaming, ClickHouse for analytics, and Kubernetes for orchestration.",
    result:
      "Handles 1B+ data points, processes 10M+ queries daily with <100ms response time, and serves 50+ enterprise clients with 99.99% uptime.",
    category: "Enterprise",
    technologies: ["Vue.js", "Go", "Kafka", "ClickHouse", "Kubernetes", "GCP"],
    year: 2023,
    links: {
      github: "https://github.com/dashboard-example",
      live: "https://dashboard.example.com",
    },
    image: "/projects/dashboard.jpg",
    featured: true,
    color: "accent",
    metrics: [
      { label: "Data Points", value: "1B+", icon: Database },
      { label: "Daily Queries", value: "10M+", icon: TrendingUp },
      { label: "Response Time", value: "<100ms", icon: Zap },
      { label: "Enterprise Clients", value: "50+", icon: Users },
    ],
    stats: [
      { label: "Data Points", value: "1B+" },
      { label: "Queries/Day", value: "10M+" },
      { label: "Response Time", value: "<100ms" },
      { label: "Clients", value: "50+" },
    ],
  },
  {
    id: "project-4",
    title: "Mobile Fitness App",
    subtitle: "Cross-platform fitness tracking application",
    description:
      "Feature-rich fitness tracking app with workout plans, nutrition tracking, and social features for iOS and Android.",
    longDescription:
      "A React Native app that helps users track workouts, nutrition, and progress. Includes social features, personalized workout plans, and integration with health devices.",
    context:
      "Fitness enthusiasts needed a comprehensive app to track workouts, nutrition, and progress across iOS and Android devices with offline capabilities.",
    action:
      "Built with React Native, Firebase backend, GraphQL API, Redux for state management, and comprehensive testing with Jest.",
    result:
      "100K+ downloads, 1M+ workouts logged, 4.8/5 app store rating, and 20K+ active monthly users with 95% retention rate.",
    category: "Mobile",
    technologies: [
      "React Native",
      "Firebase",
      "GraphQL",
      "Redux",
      "Jest",
      "AppCenter",
    ],
    year: 2023,
    links: {
      github: "https://github.com/fitness-app",
      live: "https://apps.apple.com/app",
    },
    image: "/projects/fitness-app.jpg",
    featured: false,
    color: "primary",
    metrics: [
      { label: "Downloads", value: "100K+", icon: Smartphone },
      { label: "Workouts Logged", value: "1M+", icon: TrendingUp },
      { label: "App Rating", value: "4.8/5", icon: Star },
      { label: "Active Users", value: "20K+", icon: Users },
    ],
    stats: [
      { label: "Downloads", value: "100K+" },
      { label: "Workouts", value: "1M+" },
      { label: "Rating", value: "4.8/5" },
      { label: "Active Users", value: "20K+" },
    ],
  },
  {
    id: "project-5",
    title: "IoT Smart Home System",
    subtitle: "Complete IoT solution for smart home automation",
    description:
      "End-to-end IoT solution for smart home automation with device management, real-time monitoring, and automation rules.",
    longDescription:
      "A complete IoT ecosystem including mobile app, web dashboard, cloud backend, and device firmware. Supports 100+ different smart devices with real-time control and automation.",
    context:
      "Homeowners wanted a unified system to control all smart devices with reliable automation rules and real-time monitoring from anywhere.",
    action:
      "Developed React web app, Node.js backend, MQTT protocol for device communication, MongoDB for data storage, and Raspberry Pi gateways.",
    result:
      "Manages 100+ device types, 500+ automations, 99.99% uptime, and reduces energy consumption by 30% through smart automation.",
    category: "IoT",
    technologies: [
      "React",
      "Node.js",
      "MQTT",
      "MongoDB",
      "Raspberry Pi",
      "AWS IoT",
    ],
    year: 2023,
    links: {
      github: "https://github.com/iot-smart-home",
      live: "https://smart-home.example.com",
    },
    image: "/projects/iot-system.jpg",
    featured: false,
    color: "secondary",
    metrics: [
      { label: "Device Types", value: "100+", icon: Cpu },
      { label: "Automations", value: "500+", icon: Zap },
      { label: "System Uptime", value: "99.99%", icon: Globe },
      { label: "Energy Saved", value: "30%", icon: TrendingUp },
    ],
    stats: [
      { label: "Devices", value: "100+" },
      { label: "Automations", value: "500+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Energy Saved", value: "30%" },
    ],
  },
  {
    id: "project-6",
    title: "Open Source UI Library",
    subtitle: "Popular open-source UI component library",
    description:
      "Comprehensive UI component library built with React and TypeScript used by thousands of developers worldwide.",
    longDescription:
      "A fully accessible, themeable UI component library with extensive documentation, TypeScript support, and comprehensive testing. Includes 50+ components with dark mode support.",
    context:
      "Developers needed a well-documented, accessible UI component library with TypeScript support and comprehensive theming capabilities.",
    action:
      "Built with React and TypeScript, Storybook for documentation, Jest for testing, Rollup for bundling, and GitHub Actions for CI/CD.",
    result:
      "5K+ GitHub stars, 1M+ npm downloads, 50+ components, 100+ contributors, and used by 500+ companies worldwide.",
    category: "Open Source",
    technologies: [
      "React",
      "TypeScript",
      "Storybook",
      "Jest",
      "Rollup",
      "GitHub Actions",
    ],
    year: 2023,
    links: {
      github: "https://github.com/ui-library",
      live: "https://ui-library.example.com",
    },
    image: "/projects/ui-library.jpg",
    featured: false,
    color: "accent",
    metrics: [
      { label: "GitHub Stars", value: "5K+", icon: Star },
      { label: "NPM Downloads", value: "1M+", icon: TrendingUp },
      { label: "Components", value: "50+", icon: Palette },
      { label: "Contributors", value: "100+", icon: Users },
    ],
    stats: [
      { label: "Stars", value: "5K+" },
      { label: "Downloads", value: "1M+" },
      { label: "Components", value: "50+" },
      { label: "Contributors", value: "100+" },
    ],
  },
];
