"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Eye,
  Code2,
  Filter,
  Search,
  Grid,
  List,
  ArrowUpRight,
  Star,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Cpu,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Play,
  Pause,
  Server,
  Database,
  Cloud,
  Palette,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { Button, IconButton } from "@/components/UI/Button";
import { ProjectCard, CompactProjectCard } from "@/components/UI/ProjectCard";
import { ProjectModal } from "@/components/UI/ProjectModal";

// Technology icon mapping
const TECH_ICONS: Record<string, React.ElementType> = {
  "Next.js": Globe,
  React: Code2,
  "Vue.js": Code2,
  "Node.js": Server,
  Python: Server,
  Go: Cpu,
  MongoDB: Database,
  PostgreSQL: Database,
  Redis: Database,
  AWS: Cloud,
  GCP: Cloud,
  Docker: Server,
  Kubernetes: Server,
  TypeScript: Code2,
  GraphQL: Server,
  Firebase: Cloud,
  "React Native": Smartphone,
  Stripe: Zap,
  FastAPI: Server,
  Kafka: Server,
  ClickHouse: Database,
  Jest: Zap,
  Storybook: Code2,
  Rollup: Zap,
  "GitHub Actions": Zap,
  MQTT: Cloud,
  "Raspberry Pi": Cpu,
  "AWS IoT": Cloud,
  AppCenter: Smartphone,
  Redux: Code2,
};

// Project categories
const PROJECT_CATEGORIES = [
  "All",
  "Full-Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "AI/ML",
  "E-commerce",
  "Enterprise",
  "Open Source",
  "UI/UX",
  "SaaS",
  "IoT",
  "Health",
  "Data Visualization",
];

// Enhanced projects data with all properties
const PROJECTS_DATA = [
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
    image: "/projects/ecommerce.jpg",
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

// Light Mode Background Component using theme variables
const LightModeBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden"
      aria-hidden="true"
    >
      {/* White base with subtle gradient */}
      <div className="absolute inset-0 bg-background gradient-bg" />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floating orbs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`light-orb-${i}`}
          className="absolute rounded-full animate-float"
          style={{
            width: `${30 + i * 8}px`,
            height: `${30 + i * 8}px`,
            left: `${15 + i * 20}%`,
            top: `${20 + ((i * 15) % 80)}%`,
            background: `radial-gradient(circle, rgba(var(--primary) / 0.05), transparent 70%)`,
            animationDuration: `${20 + i * 5}s`,
            animationDelay: `${i * 2}s`,
            filter: "blur(8px)",
          }}
        />
      ))}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-96 h-96">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-secondary/10 via-transparent to-transparent blur-3xl" />
      </div>
    </div>
  );
};

// Dark Mode Background Component using theme variables
const DarkModeBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-background gradient-bg" />

      {/* Animated geometric grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Floating orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`dark-orb-${i}`}
          className="absolute rounded-full animate-float"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + ((i * 12) % 80)}%`,
            background: `radial-gradient(circle, rgba(var(--primary) / 0.1), transparent 70%)`,
            animationDuration: `${15 + i * 5}s`,
            animationDelay: `${i * 1.5}s`,
            filter: "blur(12px)",
          }}
        />
      ))}

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-5" />
    </div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Initialize Intersection Observer
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Get selected project data
  const selectedProjectData = useMemo(() => {
    if (!selectedProject) return null;
    const index = PROJECTS_DATA.findIndex((p) => p.id === selectedProject);
    setCurrentProjectIndex(index);
    return PROJECTS_DATA[index];
  }, [selectedProject]);

  // Navigation functions
  const handleNextProject = useCallback(() => {
    const nextIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[nextIndex].id);
  }, [currentProjectIndex]);

  const handlePrevProject = useCallback(() => {
    const prevIndex =
      (currentProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[prevIndex].id);
  }, [currentProjectIndex]);

  // Get color classes based on theme variables
  const getColorClasses = useCallback((color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
          border: "border-primary/20",
          text: "text-primary",
          button: "bg-primary text-primary-foreground hover:bg-primary/90",
          hover: "hover:border-primary/40",
        };
      case "secondary":
        return {
          bg: "bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent",
          border: "border-secondary/20",
          text: "text-secondary",
          button:
            "bg-secondary text-secondary-foreground hover:bg-secondary/90",
          hover: "hover:border-secondary/40",
        };
      case "accent":
        return {
          bg: "bg-gradient-to-br from-accent/10 via-accent/5 to-transparent",
          border: "border-accent/20",
          text: "text-accent",
          button: "bg-accent text-accent-foreground hover:bg-accent/90",
          hover: "hover:border-accent/40",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-card/50 to-background",
          border: "border-border",
          text: "text-muted",
          button: "bg-muted text-muted-foreground hover:bg-muted/90",
          hover: "hover:border-border",
        };
    }
  }, []);

  // Handle scroll to contact
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProjectData && (
          <ProjectModal
            project={selectedProjectData}
            onClose={() => setSelectedProject(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section
        ref={sectionRef}
        id="projects"
        className="section-padding relative overflow-hidden bg-background"
        aria-labelledby="projects-heading"
      >
        {/* Backgrounds */}
        <LightModeBackground />
        <DarkModeBackground />

        <div className="container-wide relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <MagneticElement strength={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 dark:border-primary/20 mb-6 shadow-lg shadow-primary/5 dark:shadow-primary/10 glass-effect">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Portfolio Showcase
                </span>
              </div>
            </MagneticElement>

            <h2
              id="projects-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Featured{" "}
              <span className="text-gradient-primary relative inline-block">
                Projects
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse shadow-lg shadow-primary/30" />
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A collection of my recent work, showcasing expertise across
              different domains and technologies. Each project represents unique
              challenges and innovative solutions.
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl glass-effect border border-border shadow-xl">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card/60 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted transition-all duration-300 shadow-inner"
                  aria-label="Search projects"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {PROJECT_CATEGORIES.slice(0, 6).map((category) => (
                  <MagneticElement key={category} strength={0.1}>
                    <Button
                      onClick={() => setSelectedCategory(category)}
                      variant={
                        selectedCategory === category ? "primary" : "outline"
                      }
                      size="sm"
                      className={cn(
                        "font-medium transition-all duration-300",
                        selectedCategory === category &&
                          "shadow-lg shadow-primary/20"
                      )}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </Button>
                  </MagneticElement>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 rounded-xl bg-card/60 backdrop-blur-sm">
                  <IconButton
                    onClick={() => setViewMode("grid")}
                    icon={<Grid className="w-5 h-5" />}
                    label="Grid view"
                    variant={viewMode === "grid" ? "primary" : "ghost"}
                    size="sm"
                  />
                  <IconButton
                    onClick={() => setViewMode("list")}
                    icon={<List className="w-5 h-5" />}
                    label="List view"
                    variant={viewMode === "list" ? "primary" : "ghost"}
                    size="sm"
                  />
                </div>
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  icon={
                    isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )
                  }
                  label={isPlaying ? "Pause animations" : "Play animations"}
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project.id)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6 shadow-lg glass-effect">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                variant="primary"
                className="mt-6 shadow-lg shadow-primary/20"
              >
                Clear filters
              </Button>
            </motion.div>
          )}

          {/* Stats Summary */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: TrendingUp, label: "Projects Completed", value: "150+" },
              { icon: Users, label: "Satisfied Clients", value: "50+" },
              { icon: Zap, label: "Performance Score", value: "98%" },
              { icon: Star, label: "Client Rating", value: "4.9/5" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <MagneticElement key={stat.label} strength={0.1}>
                  <div className="p-6 rounded-3xl glass-effect border border-border hover:border-primary/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </MagneticElement>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl glass-effect border border-border shadow-2xl shadow-primary/10 dark:shadow-black/30 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 blur-3xl" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 z-10">
                <Code2 className="w-8 h-8 text-primary-foreground" />
              </div>

              <div className="z-10">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Have a Project in Mind?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Let's collaborate to bring your ideas to life. I'm always
                  excited to work on challenging projects and deliver
                  exceptional results.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center z-10">
                <Button
                  onClick={scrollToContact}
                  variant="primary"
                  size="lg"
                  icon={
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  }
                  iconPosition="left"
                  className="group bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark shadow-2xl shadow-primary/30"
                >
                  Start a Project
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/50 animate-pulse ml-2" />
                </Button>

                <Button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  variant="outline"
                  size="lg"
                  icon={
                    <Eye className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                  }
                  iconPosition="left"
                  className="group shadow-lg hover:shadow-primary/20"
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 opacity-10">
          <Globe className="w-40 h-40 text-primary" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <Cpu className="w-40 h-40 text-secondary" />
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
