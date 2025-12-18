"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  Smartphone,
  Zap,
  Filter,
  Search,
  Grid,
  List,
  ArrowUpRight,
  Star,
  Users,
  TrendingUp,
  Globe,
  Cpu,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Play,
  Pause,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button, IconButton } from "@/components/UI/Button";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ProjectModal } from "../UI/ProjectModal";

// Light Mode Background Component
const LightModeBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden"
      aria-hidden="true"
    >
      {/* Light gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30" />

      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(16, 185, 129, 0.05) 100%),
            linear-gradient(0deg, transparent 50%, rgba(245, 158, 11, 0.05) 100%),
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.02) 0%, transparent 50%)
          `,
          backgroundSize: "80px 80px, 80px 80px, 300px 300px, 300px 300px",
        }}
      />

      {/* Floating orbs - lighter for light mode */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`light-orb-${i}`}
          className="absolute rounded-full animate-float-light"
          style={{
            width: `${30 + i * 8}px`,
            height: `${30 + i * 8}px`,
            left: `${15 + i * 20}%`,
            top: `${20 + ((i * 15) % 80)}%`,
            background: `radial-gradient(circle, rgba(${16 + i * 8}, ${
              185 + i * 3
            }, ${129 + i * 4}, 0.05), transparent 70%)`,
            animationDuration: `${20 + i * 5}s`,
            animationDelay: `${i * 2}s`,
            filter: "blur(10px)",
          }}
        />
      ))}

      {/* Corner accents - lighter */}
      <div className="absolute top-0 left-0 w-96 h-96">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-100 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-amber-100 via-transparent to-transparent blur-3xl" />
      </div>
    </div>
  );
};

// Dark Mode Background Component
const DarkModeBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950" />

      {/* Animated geometric grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(16, 185, 129, 0.1) 100%),
            linear-gradient(0deg, transparent 50%, rgba(245, 158, 11, 0.1) 100%),
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `,
          backgroundSize: "100px 100px, 100px 100px, 400px 400px, 400px 400px",
        }}
      />

      {/* Floating tech orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`dark-orb-${i}`}
          className="absolute rounded-full animate-float"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + ((i * 12) % 80)}%`,
            background: `radial-gradient(circle, rgba(${16 + i * 8}, ${
              185 + i * 3
            }, ${129 + i * 4}, 0.1), transparent 70%)`,
            animationDuration: `${15 + i * 5}s`,
            animationDelay: `${i * 1.5}s`,
            filter: "blur(12px)",
          }}
        />
      ))}

      {/* Hexagon grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hexagons' width='100' height='100' patternUnits='userSpaceOnUse' patternTransform='scale(0.5)'%3E%3Cpath d='M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z' fill='none' stroke='%2310b981' stroke-width='1' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hexagons)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-96 h-96">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-amber-500/10 via-transparent to-transparent blur-3xl" />
      </div>
    </div>
  );
};

// Mock projects data
const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory management",
    longDescription:
      "A scalable e-commerce platform built with Next.js, Node.js, and MongoDB. Features include real-time inventory management, payment processing, admin dashboard, and advanced search functionality.",
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redis",
      "Docker",
    ],
    categories: ["Full-Stack", "E-commerce"],
    year: 2024,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    image: "/projects/ecommerce.jpg",
    featured: true,
    stats: [
      { label: "Performance", value: "Lighthouse 98" },
      { label: "Users", value: "50K+" },
      { label: "Revenue", value: "$2M+" },
      { label: "Uptime", value: "99.9%" },
    ],
    color: "emerald",
  },
  {
    id: "project-2",
    title: "AI Content Generator",
    description: "AI-powered content creation platform with GPT integration",
    longDescription:
      "Advanced AI content generation platform that uses GPT-4 to create high-quality articles, social media posts, and marketing copy. Features include template system, team collaboration, and analytics dashboard.",
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    categories: ["AI/ML", "SaaS"],
    year: 2024,
    liveUrl: "https://ai.example.com",
    githubUrl: "https://github.com/ai-example",
    image: "/projects/ai-platform.jpg",
    featured: true,
    stats: [
      { label: "AI Models", value: "5+" },
      { label: "Users", value: "10K+" },
      { label: "Content Generated", value: "1M+" },
      { label: "Accuracy", value: "95%" },
    ],
    color: "amber",
  },
  {
    id: "project-3",
    title: "Enterprise Dashboard",
    description: "Real-time analytics dashboard for enterprise clients",
    longDescription:
      "Comprehensive analytics dashboard for enterprise clients with real-time data visualization, custom reporting, and team collaboration features. Built with microservices architecture for scalability.",
    technologies: ["Vue.js", "Go", "Kafka", "ClickHouse", "Kubernetes", "GCP"],
    categories: ["Enterprise", "Data Visualization"],
    year: 2023,
    liveUrl: "https://dashboard.example.com",
    githubUrl: "https://github.com/dashboard-example",
    image: "/projects/dashboard.jpg",
    featured: true,
    stats: [
      { label: "Data Points", value: "1B+" },
      { label: "Queries/Day", value: "10M+" },
      { label: "Response Time", value: "<100ms" },
      { label: "Clients", value: "50+" },
    ],
    color: "orange",
  },
  {
    id: "project-4",
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking application",
    longDescription:
      "Feature-rich fitness tracking app with workout plans, nutrition tracking, and social features. Built with React Native for both iOS and Android with offline capabilities.",
    technologies: [
      "React Native",
      "Firebase",
      "GraphQL",
      "Redux",
      "Jest",
      "AppCenter",
    ],
    categories: ["Mobile", "Health"],
    year: 2023,
    liveUrl: "https://apps.apple.com/app",
    githubUrl: "https://github.com/fitness-app",
    image: "/projects/fitness-app.jpg",
    featured: false,
    stats: [
      { label: "Downloads", value: "100K+" },
      { label: "Workouts", value: "1M+" },
      { label: "Rating", value: "4.8/5" },
      { label: "Active Users", value: "20K+" },
    ],
    color: "emerald",
  },
  {
    id: "project-5",
    title: "IoT Smart Home System",
    description: "Complete IoT solution for smart home automation",
    longDescription:
      "End-to-end IoT solution for smart home automation with device management, real-time monitoring, and automation rules. Includes mobile app, web dashboard, and cloud backend.",
    technologies: [
      "React",
      "Node.js",
      "MQTT",
      "MongoDB",
      "Raspberry Pi",
      "AWS IoT",
    ],
    categories: ["IoT", "Full-Stack"],
    year: 2023,
    liveUrl: "https://smart-home.example.com",
    githubUrl: "https://github.com/iot-smart-home",
    image: "/projects/iot-system.jpg",
    featured: false,
    stats: [
      { label: "Devices", value: "100+" },
      { label: "Automations", value: "500+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Energy Saved", value: "30%" },
    ],
    color: "amber",
  },
  {
    id: "project-6",
    title: "Open Source Library",
    description: "Popular open-source UI component library",
    longDescription:
      "Comprehensive UI component library built with React and TypeScript. Features include accessibility compliance, theming system, and extensive documentation. Used by thousands of developers worldwide.",
    technologies: [
      "React",
      "TypeScript",
      "Storybook",
      "Jest",
      "Rollup",
      "GitHub Actions",
    ],
    categories: ["Open Source", "UI/UX"],
    year: 2023,
    liveUrl: "https://ui-library.example.com",
    githubUrl: "https://github.com/ui-library",
    image: "/projects/ui-library.jpg",
    featured: false,
    stats: [
      { label: "Stars", value: "5K+" },
      { label: "Downloads", value: "1M+" },
      { label: "Components", value: "50+" },
      { label: "Contributors", value: "100+" },
    ],
    color: "orange",
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for reveal animation
  useEffect(() => {
    if (!sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current && sectionRef.current) {
              observerRef.current.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Debounced search filter
  const handleSearchChange = useCallback((value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  // Filter projects with useMemo for performance
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.categories.includes(selectedCategory);

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
    return selectedProject
      ? PROJECTS_DATA.find((project) => project.id === selectedProject)
      : null;
  }, [selectedProject]);

  // Animation for project cards
  const getCardAnimationDelay = (index: number) => {
    return `${index * 100}ms`;
  };

  // Technology icon mapping with memoization
  const getTechIcon = useCallback((tech: string) => {
    const iconMap: Record<string, React.ElementType> = {
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
    };
    return iconMap[tech] || Code2;
  }, []);

  // Get color classes based on project color (light mode friendly)
  const getColorClasses = useCallback((color: string) => {
    const lightModeColors = {
      emerald: {
        gradient: "from-emerald-500 to-emerald-600",
        bg: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-500",
        border: "border-emerald-500",
        shadow: "shadow-emerald-500/20 dark:shadow-emerald-500/20",
        hoverShadow:
          "hover:shadow-emerald-500/30 dark:hover:shadow-emerald-500/30",
        glow: "shadow-emerald-500/10 dark:shadow-emerald-500/10",
        lightBg: "bg-emerald-50",
        lightBorder: "border-emerald-200",
      },
      amber: {
        gradient: "from-amber-500 to-amber-600",
        bg: "bg-amber-500",
        text: "text-amber-600 dark:text-amber-500",
        border: "border-amber-500",
        shadow: "shadow-amber-500/20 dark:shadow-amber-500/20",
        hoverShadow: "hover:shadow-amber-500/30 dark:hover:shadow-amber-500/30",
        glow: "shadow-amber-500/10 dark:shadow-amber-500/10",
        lightBg: "bg-amber-50",
        lightBorder: "border-amber-200",
      },
      orange: {
        gradient: "from-orange-500 to-orange-600",
        bg: "bg-orange-500",
        text: "text-orange-600 dark:text-orange-500",
        border: "border-orange-500",
        shadow: "shadow-orange-500/20 dark:shadow-orange-500/20",
        hoverShadow:
          "hover:shadow-orange-500/30 dark:hover:shadow-orange-500/30",
        glow: "shadow-orange-500/10 dark:shadow-orange-500/10",
        lightBg: "bg-orange-50",
        lightBorder: "border-orange-200",
      },
    };
    return (
      lightModeColors[color as keyof typeof lightModeColors] ||
      lightModeColors.emerald
    );
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
      {selectedProjectData && (
        <ProjectModal
          project={selectedProjectData}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <section
        ref={sectionRef}
        id="projects"
        className="section-padding relative overflow-hidden bg-white dark:bg-gray-950"
        aria-labelledby="projects-heading"
      >
        {/* Adaptive Backgrounds */}
        <LightModeBackground />
        <DarkModeBackground />

        <div className="container-wide relative z-10">
          {/* Section header with adaptive colors */}
          <div
            className={cn(
              "text-center mb-16 md:mb-20 transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <MagneticElement strength={0.1}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-amber-500/10 dark:from-emerald-500/10 dark:to-amber-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-6 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-500/10 backdrop-blur-sm"
                role="note"
                aria-label="Portfolio Showcase Section"
              >
                <Code2
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-500"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                  Portfolio Showcase
                </span>
              </div>
            </MagneticElement>

            <h2
              id="projects-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-emerald-500 dark:to-amber-500 bg-clip-text text-transparent relative inline-block">
                Projects
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/30" />
              </span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A collection of my recent work, showcasing expertise across
              different domains and technologies. Each project represents unique
              challenges and innovative solutions.
            </p>
          </div>

          {/* Filters and controls - Light mode optimized */}
          <div
            className={cn(
              "mb-12 transition-all duration-700 ease-out delay-100",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/20">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search
                    className="w-5 h-5 text-gray-400 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search projects or technologies..."
                  defaultValue={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 transition-all duration-300 shadow-inner"
                  aria-label="Search projects"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-3">
                {PROJECT_CATEGORIES.map((category) => (
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
                          "shadow-lg shadow-emerald-500/20"
                      )}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </Button>
                  </MagneticElement>
                ))}
              </div>

              {/* View controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 rounded-xl bg-gray-100 dark:bg-gray-900/60 backdrop-blur-sm">
                  <IconButton
                    onClick={() => setViewMode("grid")}
                    icon={<Grid className="w-5 h-5" aria-hidden="true" />}
                    label="Grid view"
                    variant={viewMode === "grid" ? "primary" : "ghost"}
                    size="sm"
                  />
                  <IconButton
                    onClick={() => setViewMode("list")}
                    icon={<List className="w-5 h-5" aria-hidden="true" />}
                    label="List view"
                    variant={viewMode === "list" ? "primary" : "ghost"}
                    size="sm"
                  />
                </div>

                {/* Animation toggle */}
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  icon={
                    isPlaying ? (
                      <Pause className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Play className="w-5 h-5" aria-hidden="true" />
                    )
                  }
                  label={isPlaying ? "Pause animations" : "Play animations"}
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Projects grid/list - Light mode optimized */}
          <div
            className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8",
              "transition-all duration-700 ease-out delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {filteredProjects.map((project, index) => {
              const TechIcon = getTechIcon(project.technologies[0]);
              const isHovered = hoveredProject === project.id;
              const colorClasses = getColorClasses(project.color);

              return (
                <MagneticElement key={project.id} strength={0.05}>
                  <article
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 backdrop-blur-sm",
                      "transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500 dark:hover:border-emerald-500",
                      "cursor-pointer transform-gpu",
                      viewMode === "list" && "flex items-stretch",
                      "shadow-xl shadow-gray-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10"
                    )}
                    style={{
                      transitionDelay: getCardAnimationDelay(index),
                      willChange: "transform, box-shadow",
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => setSelectedProject(project.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${project.title}`}
                  >
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-20">
                        <div
                          className={cn(
                            "px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 text-white text-xs font-medium flex items-center gap-1 shadow-lg shadow-emerald-500/30",
                            "animate-pulse-slow"
                          )}
                        >
                          <Star className="w-3 h-3" aria-hidden="true" />
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Project image/thumbnail */}
                    <div
                      className={cn(
                        "relative aspect-video overflow-hidden",
                        viewMode === "list" && "w-64 flex-shrink-0"
                      )}
                    >
                      {/* Gradient overlay - lighter for light mode */}
                      <div
                        className={cn(
                          "absolute inset-0 transition-opacity duration-500",
                          isHovered ? "opacity-90" : "opacity-50"
                        )}
                        style={{
                          background:
                            project.color === "emerald"
                              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(245, 158, 11, 0.1))"
                              : project.color === "amber"
                              ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 146, 60, 0.1))"
                              : "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(16, 185, 129, 0.1))",
                        }}
                        aria-hidden="true"
                      />

                      {/* Tech icon */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-300 dark:border-gray-700">
                          <TechIcon
                            className="w-5 h-5 text-gray-700 dark:text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Year badge */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-white/80 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white text-sm shadow-lg">
                          {project.year}
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center transition-all duration-500",
                          isHovered
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90"
                        )}
                        aria-hidden="true"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-pulse-slow">
                          <Maximize2
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Animated border */}
                      <div
                        className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500 rounded-3xl transition-all duration-500"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Project content */}
                    <div className={cn("p-6", viewMode === "list" && "flex-1")}>
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            className={cn(
                              "w-5 h-5 text-gray-400 transition-all duration-300",
                              isHovered &&
                                "text-emerald-500 translate-x-1 -translate-y-1"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.categories.map((category) => (
                          <span
                            key={category}
                            className={cn(
                              "px-3 py-1 text-xs rounded-full bg-gradient-to-r from-emerald-500/10 to-amber-500/10 dark:from-emerald-500/10 dark:to-amber-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20"
                            )}
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        {project.stats?.slice(0, 2).map((stat) => (
                          <div
                            key={stat.label}
                            className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                          >
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {stat.label}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project.id);
                          }}
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-4 h-4" aria-hidden="true" />}
                          iconPosition="left"
                          className="flex-1 shadow-sm hover:shadow-emerald-500/20"
                        >
                          View Details
                        </Button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <IconButton
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              icon={
                                <Github
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              }
                              label="View source code on GitHub"
                              variant="ghost"
                              size="sm"
                            />
                          )}
                          {project.liveUrl && (
                            <IconButton
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              icon={
                                <ExternalLink
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              }
                              label="Visit live site"
                              variant="ghost"
                              size="sm"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subtle inner shadow for light mode */}
                    <div
                      className="absolute inset-0 rounded-3xl shadow-inner shadow-gray-100 dark:shadow-black/20"
                      aria-hidden="true"
                    />
                  </article>
                </MagneticElement>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div
              className={cn(
                "text-center py-20 transition-all duration-700 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search
                  className="w-10 h-10 text-emerald-500"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                variant="primary"
                className="mt-6 shadow-lg shadow-emerald-500/20"
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Stats summary */}
          <div
            className={cn(
              "mt-16 grid grid-cols-2 md:grid-cols-4 gap-8",
              "transition-all duration-700 ease-out delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
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
                  <div
                    className="p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-emerald-500 transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-black/20"
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 flex items-center justify-center shadow-lg">
                        <Icon
                          className="w-6 h-6 text-emerald-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </MagneticElement>
              );
            })}
          </div>

          {/* Call to action */}
          <div
            className={cn(
              "mt-20 text-center",
              "transition-all duration-700 ease-out delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-amber-50/80 dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-emerald-500/10 dark:shadow-black/30 relative overflow-hidden">
              {/* Background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-amber-500/5 blur-3xl"
                aria-hidden="true"
              />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40 z-10">
                <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
              </div>

              <div className="z-10">
                <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Have a Project in Mind?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
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
                    <Zap
                      className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  }
                  iconPosition="left"
                  className="group bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 shadow-2xl shadow-emerald-500/30"
                >
                  Start a Project
                  <div
                    className="w-2 h-2 rounded-full bg-white/50 animate-pulse ml-2"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  variant="outline"
                  size="lg"
                  icon={
                    <Eye
                      className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  }
                  iconPosition="left"
                  className="group shadow-lg hover:shadow-emerald-500/20"
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating icons - adaptive colors */}
        <div className="absolute top-20 left-20 opacity-10">
          <Globe className="w-40 h-40 text-emerald-500" aria-hidden="true" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <Cpu className="w-40 h-40 text-amber-500" aria-hidden="true" />
        </div>

        {/* Add custom animations */}
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(10px) rotate(240deg);
            }
          }

          @keyframes float-light {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(180deg);
            }
          }

          .animate-float {
            animation: float ease-in-out infinite;
          }

          .animate-float-light {
            animation: float-light ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(0.98);
            }
          }

          .transform-gpu {
            transform: translateZ(0);
          }
        `}</style>
      </section>
    </>
  );
};

export default ProjectsSection;
