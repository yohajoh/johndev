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

// Mock projects data - you would replace this with actual data
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
    color: "primary",
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
    color: "secondary",
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
    color: "accent",
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
    color: "primary",
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
    color: "secondary",
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
    color: "accent",
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
        className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
        aria-labelledby="projects-heading"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-10 noise-texture"
            aria-hidden="true"
          />
          <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Optimized particles with reduced count */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20"
              style={{
                left: `${10 + i * 8}%`,
                top: `${Math.sin(performance.now() / 1000 + i) * 20 + 50}%`,
                animation: `float ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container-wide relative z-10">
          {/* Section header */}
          <div
            className={cn(
              "text-center mb-12 transition-all duration-1000 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <MagneticElement strength={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
                <Code2 className="w-4 h-4 text-primary" aria-hidden="true" />
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
              <span className="text-gradient-primary relative">
                Projects
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A collection of my recent work, showcasing expertise across
              different domains and technologies. Each project represents unique
              challenges and innovative solutions.
            </p>
          </div>

          {/* Filters and controls */}
          <div
            className={cn(
              "mb-12 transition-all duration-1000 ease-out delay-100",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-br from-card/80 to-background/80 border border-white/10 backdrop-blur-sm">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search
                    className="w-5 h-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search projects or technologies..."
                  defaultValue={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                  aria-label="Search projects"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {PROJECT_CATEGORIES.map((category) => (
                  <MagneticElement key={category} strength={0.1}>
                    <Button
                      onClick={() => setSelectedCategory(category)}
                      variant={
                        selectedCategory === category ? "primary" : "outline"
                      }
                      size="sm"
                      className="font-medium"
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </Button>
                  </MagneticElement>
                ))}
              </div>

              {/* View controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5">
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

          {/* Projects grid/list */}
          <div
            className={cn(
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6",
              "transition-all duration-1000 ease-out delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {filteredProjects.map((project, index) => {
              const TechIcon = getTechIcon(project.technologies[0]);
              const isHovered = hoveredProject === project.id;

              return (
                <MagneticElement key={project.id} strength={0.05}>
                  <article
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-sm",
                      "transition-all duration-500 hover:scale-[1.02] hover:border-primary/30",
                      "reveal-up cursor-pointer",
                      viewMode === "list" && "flex items-stretch"
                    )}
                    style={{ transitionDelay: getCardAnimationDelay(index) }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => setSelectedProject(project.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${project.title}`}
                  >
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium flex items-center gap-1">
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
                      {/* Color overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 transition-opacity duration-500",
                          isHovered ? "opacity-90" : "opacity-50"
                        )}
                        style={{
                          background:
                            project.color === "primary"
                              ? "linear-gradient(135deg, rgba(22, 163, 74, 0.3), rgba(245, 158, 11, 0.2))"
                              : project.color === "secondary"
                              ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(139, 92, 246, 0.2))"
                              : "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(22, 163, 74, 0.2))",
                        }}
                        aria-hidden="true"
                      />

                      {/* Tech icon */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <TechIcon
                            className="w-5 h-5 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Year */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                          {project.year}
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                          isHovered ? "opacity-100" : "opacity-0"
                        )}
                        aria-hidden="true"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                          <Maximize2
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Animated border */}
                      <div
                        className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl transition-all duration-500"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Project content */}
                    <div className={cn("p-6", viewMode === "list" && "flex-1")}>
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            className={cn(
                              "w-5 h-5 text-muted-foreground transition-all duration-300",
                              isHovered &&
                                "text-primary translate-x-1 -translate-y-1"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
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
                            className="p-2 rounded-xl bg-white/5"
                          >
                            <div className="text-xs text-muted-foreground">
                              {stat.label}
                            </div>
                            <div className="text-sm font-semibold text-foreground">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project.id);
                          }}
                          variant="outline"
                          size="sm"
                          icon={<Eye className="w-4 h-4" aria-hidden="true" />}
                          iconPosition="left"
                          className="flex-1"
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

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-xl"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                </MagneticElement>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div
              className={cn(
                "text-center py-20 transition-all duration-1000 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-primary" aria-hidden="true" />
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
                className="mt-6"
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Stats summary */}
          <div
            className={cn(
              "mt-16 grid grid-cols-2 md:grid-cols-4 gap-6",
              "transition-all duration-1000 ease-out delay-300",
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
                    className="p-6 rounded-3xl bg-gradient-to-br from-card/80 to-background/80 border border-white/10 hover:border-primary/30 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
                        <Icon
                          className="w-6 h-6 text-primary"
                          aria-hidden="true"
                        />
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
          </div>

          {/* Call to action */}
          <div
            className={cn(
              "mt-16 text-center",
              "transition-all duration-1000 ease-out delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Have a Project in Mind?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  Let's collaborate to bring your ideas to life. I'm always
                  excited to work on challenging projects and deliver
                  exceptional results.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
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
                  className="group"
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
                  className="group"
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating tech icons */}
        <div className="absolute top-20 left-20 opacity-5">
          <Globe className="w-40 h-40" aria-hidden="true" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <Cpu className="w-40 h-40" aria-hidden="true" />
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
