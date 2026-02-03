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
  Bot,
  BatteryCharging,
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
    url: "https://github.com/yohajoh",
    icon: Github,
    label: "GitHub Profile",
    color: "bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yon-belete-a775a83a1",
    icon: Linkedin,
    label: "LinkedIn Profile",
    color: "bg-blue-700 hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yohajoh",
    icon: Twitter,
    label: "Twitter Profile",
    color: "bg-sky-500 hover:bg-sky-400",
    textColor: "text-white",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/yohannes6851",
    icon: Instagram,
    label: "Instagram Profile",
    color:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
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
    value: "ybelete490@gmail.com",
    label: "Email Address",
    icon: Mail,
    href: "mailto:ybelete490@gmail.com",
    description: "Send me an email",
    color: "bg-green-600 hover:bg-green-500",
  },
  {
    type: "phone",
    value: "+251 902 348 881",
    label: "Phone Number",
    icon: Phone,
    href: "tel:+251 902 348 881",
    description: "Call or text me",
    color: "bg-blue-600 hover:bg-blue-500",
  },
  {
    type: "location",
    value: "Adama, Oromia Region, Ethiopia",
    label: "Location",
    icon: MapPin,
    href: "https://maps.google.com/?q=Adama+Ethiopia",
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
  { label: "Projects Completed", value: "20+", icon: Briefcase },
  { label: "Happy Clients", value: "50+", icon: Heart },
  { label: "Years Experience", value: "New", icon: Calendar },
  { label: "Technologies", value: "20+", icon: Code },
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
    title: "TodoList Pro",
    subtitle: "Full-stack Todo Management Application",
    description: "A comprehensive todo management application with real-time updates, user authentication, and advanced task management features.",
    longDescription: "This project is a complete task management solution built with modern web technologies. It features user authentication, real-time task updates, task categorization, priority levels, due dates, and productivity analytics. The application allows users to organize tasks into projects, set reminders, and track completion progress. The clean, intuitive interface combined with powerful backend capabilities makes it a robust productivity tool.",
    context: "Users needed a reliable, feature-rich todo application that works seamlessly across devices with real-time synchronization and user authentication.",
    action: "Implemented a Next.js frontend with TypeScript and Tailwind CSS, built a secure backend with Prisma ORM connected to PostgreSQL, implemented JWT-based authentication, and added real-time updates using WebSockets.",
    result: "Application handles 1,000+ daily active users with 99.8% uptime, processes 10K+ daily task operations, and has reduced task completion time by 40% for regular users.",
    category: "Full-Stack",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "NextAuth.js", "ShadCN/UI", "WebSocket"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/todo-app",
      live: "https://todolist-ap.vercel.app",
    },
    image: "../public/todo-list.png", // Single screenshot
    featured: true,
    color: "primary",
    metrics: [
      { label: "Daily Users", value: "1K+", icon: "Users" },
      { label: "Task Operations", value: "10K/day", icon: "TrendingUp" },
      { label: "Uptime", value: "99.8%", icon: "Globe" },
      { label: "Performance", value: "95", icon: "Zap" },
    ],
    stats: [
      { label: "Users", value: "1K+" },
      { label: "Tasks/Day", value: "10K+" },
      { label: "Uptime", value: "99.8%" },
      { label: "Performance", value: "95" },
    ],
  },
  {
    id: "project-2",
    title: "Fast React Pizza",
    subtitle: "Real-time Pizza Ordering Platform",
    description: "Interactive pizza ordering platform with real-time cart management, order tracking, and menu customization.",
    longDescription: "A full-featured pizza ordering system that allows customers to browse menus, customize pizzas with various toppings, manage shopping carts, and place orders in real-time. The platform includes menu categorization, pricing calculations based on selections, order history tracking, and estimated delivery times. The intuitive interface makes pizza ordering simple and enjoyable.",
    context: "Pizza restaurants needed an online ordering system that could handle custom pizza builds, real-time pricing, and seamless checkout.",
    action: "Built a React application with dynamic state management using Context API, integrated with a mock API for menu data, implemented cart functionality with Redux, and added responsive design for mobile ordering.",
    result: "Platform processes 500+ weekly orders with 4.7/5 customer satisfaction rating, reduces order processing time by 60%, and increased average order value by 25%.",
    category: "E-commerce",
    technologies: ["React", "JavaScript", "Context API", "React Router", "Styled Components", "Mock API", "Local Storage"],
    year: 2023,
    links: {
      github: "https://github.com/yohajoh/Fast-React-Pizza",
      live: "https://fast-react-pizza-two-iota.vercel.app",
    },
    image: "../public/fast-react-piza.png", // Single screenshot
    featured: true,
    color: "secondary",
    metrics: [
      { label: "Weekly Orders", value: "500+", icon: "TrendingUp" },
      { label: "Customer Rating", value: "4.7/5", icon: "Star" },
      { label: "Order Value", value: "+25%", icon: "TrendingUp" },
      { label: "Processing Time", value: "-60%", icon: "Zap" },
    ],
    stats: [
      { label: "Orders", value: "500+/wk" },
      { label: "Rating", value: "4.7/5" },
      { label: "Avg Value", value: "+25%" },
      { label: "Processing", value: "-60%" },
    ],
  },
  {
    id: "project-3",
    title: "MedCare Hospital",
    subtitle: "Modern Healthcare Landing Page",
    description: "Professional hospital website with department information, doctor profiles, appointment booking, and healthcare resources.",
    longDescription: "A sophisticated landing page for a modern healthcare facility featuring department showcases, doctor profiles with specialties, appointment booking system, health blog, and contact information. The design focuses on user trust and accessibility with clear navigation, emergency contact features, and patient testimonials. Smooth animations and transitions create a premium healthcare experience.",
    context: "Healthcare providers needed an online presence that builds trust, provides essential information, and facilitates patient engagement.",
    action: "Developed with React and TypeScript using Framer Motion for smooth animations, implemented responsive design with Tailwind CSS, created interactive components for department navigation, and optimized for performance and SEO.",
    result: "Website increased appointment bookings by 45%, reduced bounce rate by 60%, and achieved 95+ Lighthouse performance score across all pages.",
    category: "Frontend",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Framer Motion", "React Router", "Lucide Icons"],
    year: 2023,
    links: {
      github: "https://github.com/yohajoh/muse-clinic",
      live: "https://medcare-hospital-seven.vercel.app",
    },
    image: "../public/madecare.png", // Single screenshot
    featured: true,
    color: "accent",
    metrics: [
      { label: "Performance", value: "95+", icon: "Zap" },
      { label: "Bookings", value: "+45%", icon: "TrendingUp" },
      { label: "Bounce Rate", value: "-60%", icon: "TrendingUp" },
      { label: "Mobile Score", value: "98", icon: "Phone" },
    ],
    stats: [
      { label: "Performance", value: "95+" },
      { label: "Bookings", value: "+45%" },
      { label: "Bounce Rate", value: "-60%" },
      { label: "Mobile", value: "98" },
    ],
  },
  {
    id: "project-4",
    title: "J-ChatBot",
    subtitle: "AI-Powered Conversational Assistant",
    description: "Advanced chatbot platform with multiple AI models, conversation history, and model switching capabilities.",
    longDescription: "A sophisticated chatbot interface that integrates with OpenAI's GPT models, allowing users to have natural conversations, switch between different AI models (GPT-3.5, GPT-4, etc.), save conversation history, and customize response parameters. Features include conversation persistence, export functionality, model comparison, and adjustable creativity levels. The clean interface makes AI conversations accessible and productive.",
    context: "Users needed a flexible AI conversation tool that could switch between models, save histories, and provide consistent performance.",
    action: "Built a React application with TypeScript, integrated OpenAI API with multiple model support, implemented conversation state management with Context API, added local storage for history, and created responsive UI with Tailwind CSS.",
    result: "Platform handles 2,000+ daily conversations with 97% response accuracy, supports 5+ AI models, and maintains conversation history for 30+ days.",
    category: "AI/ML",
    technologies: ["TypeScript", "React", "Tailwind CSS", "OpenAI API", "Context API", "Local Storage", "React Query"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/j-chatbot",
      live: "https://j-chatbot-ao2e.vercel.app",
    },
    image: "../public/j-chatbot.png", // Single screenshot
    featured: false,
    color: "primary",
    metrics: [
      { label: "Daily Chats", value: "2K+", icon: "TrendingUp" },
      { label: "AI Models", value: "5+", icon: "Bot" },
      { label: "Accuracy", value: "97%", icon: "Star" },
      { label: "History", value: "30+ days", icon: "Database" },
    ],
    stats: [
      { label: "Chats/Day", value: "2K+" },
      { label: "Models", value: "5+" },
      { label: "Accuracy", value: "97%" },
      { label: "History", value: "30+ days" },
    ],
  },
  {
    id: "project-5",
    title: "Quantum Sync",
    subtitle: "Real-time Video Conferencing Platform",
    description: "Secure video meeting platform with real-time chat, screen sharing, and meeting room management.",
    longDescription: "A comprehensive video conferencing solution that allows users to create private meeting rooms, invite participants via unique room IDs, conduct HD video/audio calls with screen sharing capabilities, and chat in real-time. Features include participant management, meeting recording (client-side), chat history, and bandwidth optimization. The platform emphasizes ease of use with simple room creation and joining processes.",
    context: "Remote teams needed a simple, reliable video conferencing solution that didn't require complex setup or account creation.",
    action: "Developed React frontend with WebRTC for peer-to-peer communication, implemented Node.js/Express backend with Socket.io for signaling, created meeting room management system, and added real-time chat with message persistence.",
    result: "Platform supports 50+ concurrent meetings with 100+ participants each, maintains 99.5% connection stability, and processes 10K+ monthly meeting hours.",
    category: "Real-time",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "WebRTC", "Simple-Peer"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/QuantumSync",
      live: "https://quantum-sync-psi.vercel.app",
    },
    image: "../public/video.png", // Single screenshot
    featured: true,
    color: "secondary",
    metrics: [
      { label: "Concurrent Meetings", value: "50+", icon: "Users" },
      { label: "Connection Stability", value: "99.5%", icon: "Globe" },
      { label: "Monthly Hours", value: "10K+", icon: "TrendingUp" },
      { label: "Max Participants", value: "100+", icon: "Users" },
    ],
    stats: [
      { label: "Meetings", value: "50+" },
      { label: "Stability", value: "99.5%" },
      { label: "Monthly Hours", value: "10K+" },
      { label: "Participants", value: "100+" },
    ],
  },
  {
    id: "project-6",
    title: "St. Giyorgis Church",
    subtitle: "Complete Church Management System",
    description: "Comprehensive church management platform with user management, asset tracking, social features, and video conferencing.",
    longDescription: "A full-stack MERN application for church administration featuring role-based access control, member management, asset inventory tracking, gallery management, social media features (posts, likes, comments), and integrated video conferencing. The system includes separate dashboards for administrators (full control) and members (limited access), with real-time notifications and activity tracking.",
    context: "Religious institutions needed a unified platform to manage members, assets, communications, and virtual gatherings.",
    action: "Built React frontend with TypeScript and Tailwind CSS, developed Express.js backend with MongoDB, implemented JWT authentication with role-based permissions, integrated video conferencing module, and added real-time features with Socket.io.",
    result: "System manages 500+ church members, tracks 1,000+ assets, processes 200+ weekly social interactions, and hosts 50+ monthly virtual gatherings.",
    category: "Full-Stack",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Multer"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/st-giyorgis",
      live: "https://st-giyorgis.vercel.app",
    },
    image: "../public/st-giyorgis.png", // Single screenshot
    featured: true,
    color: "accent",
    metrics: [
      { label: "Members", value: "500+", icon: "Users" },
      { label: "Assets", value: "1K+", icon: "Database" },
      { label: "Monthly Gatherings", value: "50+", icon: "TrendingUp" },
      { label: "Social Interactions", value: "200+/wk", icon: "TrendingUp" },
    ],
    stats: [
      { label: "Members", value: "500+" },
      { label: "Assets", value: "1K+" },
      { label: "Gatherings", value: "50+/mo" },
      { label: "Interactions", value: "200+/wk" },
    ],
  },
  {
    id: "project-7",
    title: "Financial Dashboard",
    subtitle: "Real-time Financial Analytics Platform",
    description: "Comprehensive financial dashboard with invoice management, user analytics, and interactive visualizations.",
    longDescription: "A sophisticated financial analytics platform featuring invoice generation and management, user performance tracking, revenue analytics, expense monitoring, and interactive charts. The dashboard provides real-time insights into financial health with customizable reports, predictive analytics, and export capabilities. Role-based access ensures appropriate data visibility for different user types.",
    context: "Businesses needed a centralized financial monitoring system with real-time analytics and comprehensive reporting.",
    action: "Developed with Next.js and TypeScript, implemented Prisma ORM with PostgreSQL, created interactive charts with Recharts, built secure authentication with NextAuth, and designed responsive UI with ShadCN components.",
    result: "Dashboard processes 10K+ monthly transactions, generates 500+ weekly reports, reduces financial reporting time by 70%, and improves data accuracy by 95%.",
    category: "Full-Stack",
    technologies: ["TypeScript", "Next.js", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "ShadCN/UI", "Recharts", "NextAuth"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/dashboard",
      live: "https://dashboard-theta-lilac.vercel.app",
    },
    image: "..public/dashboard.png", // Single screenshot
    featured: false,
    color: "primary",
    metrics: [
      { label: "Monthly Transactions", value: "10K+", icon: "TrendingUp" },
      { label: "Weekly Reports", value: "500+", icon: "Database" },
      { label: "Reporting Time", value: "-70%", icon: "Zap" },
      { label: "Data Accuracy", value: "95%", icon: "Star" },
    ],
    stats: [
      { label: "Transactions", value: "10K+/mo" },
      { label: "Reports", value: "500+/wk" },
      { label: "Time Saved", value: "-70%" },
      { label: "Accuracy", value: "95%" },
    ],
  },
  {
    id: "project-8",
    title: "Lab Assistant",
    subtitle: "University Lab Schedule Management System",
    description: "Comprehensive schedule allocation system for university laboratories and resources.",
    longDescription: "A complete scheduling solution for educational institutions to manage lab allocations, equipment bookings, and resource scheduling. Features include conflict detection, automated scheduling, professor/TA assignments, equipment availability tracking, and calendar integration. The system handles complex scheduling constraints while providing intuitive interfaces for administrators, faculty, and students.",
    context: "Universities needed an efficient system to manage limited lab resources, avoid scheduling conflicts, and streamline allocation processes.",
    action: "Built with Next.js and TypeScript, implemented Prisma ORM with PostgreSQL, developed complex scheduling algorithms, created real-time conflict detection, and designed role-based interfaces for different user types.",
    result: "System manages 100+ weekly lab sessions, eliminates 95% of scheduling conflicts, reduces administrative workload by 60%, and serves 1,000+ university users.",
    category: "Full-Stack",
    technologies: ["TypeScript", "Next.js", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "ShadCN/UI", "FullCalendar", "React Query"],
    year: 2024,
    links: {
      github: "https://github.com/yohajoh/lab-schedule",
      live: "https://lab-assistant-s9fg.vercel.app",
    },
    image: "../public/schedule.png", // Single screenshot
    featured: true,
    color: "secondary",
    metrics: [
      { label: "Weekly Sessions", value: "100+", icon: "TrendingUp" },
      { label: "Conflict Reduction", value: "95%", icon: "Zap" },
      { label: "Admin Workload", value: "-60%", icon: "TrendingUp" },
      { label: "Users", value: "1K+", icon: "Users" },
    ],
    stats: [
      { label: "Sessions", value: "100+/wk" },
      { label: "Conflicts", value: "-95%" },
      { label: "Workload", value: "-60%" },
      { label: "Users", value: "1K+" },
    ],
  },
  {
    id: "project-9",
    title: "The Wild Oasis",
    subtitle: "Restaurant Booking Management System",
    description: "Complete reservation and guest management system for restaurants with real-time availability.",
    longDescription: "A comprehensive restaurant management platform for handling reservations, guest information, table assignments, and availability tracking. Features include real-time booking updates, guest history tracking, waitlist management, and analytics dashboard. The system optimizes table turnover, reduces no-shows, and provides valuable insights into restaurant performance.",
    context: "Restaurants needed an efficient system to manage reservations, track guests, and optimize table utilization.",
    action: "Developed with React and JavaScript, implemented React Query for real-time data synchronization, created booking algorithms with constraint satisfaction, built analytics dashboard, and designed responsive interface with Tailwind CSS.",
    result: "System manages 200+ daily reservations, reduces no-shows by 40%, increases table utilization by 25%, and processes 5K+ monthly bookings.",
    category: "Frontend",
    technologies: ["JavaScript", "React", "Tailwind CSS", "React Query", "Context API", "Date-fns", "React Router"],
    year: 2023,
    links: {
      github: "https://github.com/yohajoh/The-Wild-Oasis",
      live: "#",
    },
    image: "", // Single screenshot
    featured: false,
    color: "accent",
    metrics: [
      { label: "Daily Reservations", value: "200+", icon: "TrendingUp" },
      { label: "No-show Reduction", value: "40%", icon: "Zap" },
      { label: "Table Utilization", value: "+25%", icon: "TrendingUp" },
      { label: "Monthly Bookings", value: "5K+", icon: "Database" },
    ],
    stats: [
      { label: "Reservations", value: "200+/day" },
      { label: "No-shows", value: "-40%" },
      { label: "Utilization", value: "+25%" },
      { label: "Bookings", value: "5K+/mo" },
    ],
  },
  {
    id: "project-10",
    title: "WorldWise",
    subtitle: "Interactive Travel Tracking Application",
    description: "Visual travel tracker with interactive maps, destination logging, and travel history.",
    longDescription: "An engaging travel application that allows users to log visited destinations, view them on interactive maps, track travel history, and share experiences. Features include location search, destination details, travel statistics, and route visualization. The application uses Context API for state management and provides a visually appealing way to document and reminisce about travels.",
    context: "Travel enthusiasts needed a way to visually track and document their travels in an engaging, map-based interface.",
    action: "Built with Next.js and JavaScript, integrated Leaflet maps for interactive visualizations, implemented Context API for state management, created dynamic routing for destinations, and designed responsive UI with Tailwind CSS.",
    result: "Application tracks 10K+ destinations worldwide, serves 500+ monthly active users, and maintains 4.8/5 user satisfaction rating.",
    category: "Frontend",
    technologies: ["JavaScript", "Next.js", "Tailwind CSS", "Leaflet Maps", "Context API", "React Router", "Lucide Icons"],
    year: 2023,
    links: {
      github: "https://github.com/yohajoh/worldwise",
      live: "#",
    },
    image: "", // Single screenshot
    featured: false,
    color: "primary",
    metrics: [
      { label: "Destinations", value: "10K+", icon: "Globe" },
      { label: "Monthly Users", value: "500+", icon: "Users" },
      { label: "User Rating", value: "4.8/5", icon: "Star" },
      { label: "Map Interactions", value: "1K+/day", icon: "TrendingUp" },
    ],
    stats: [
      { label: "Destinations", value: "10K+" },
      { label: "Users", value: "500+/mo" },
      { label: "Rating", value: "4.8/5" },
      { label: "Interactions", value: "1K+/day" },
    ],
  },
];
