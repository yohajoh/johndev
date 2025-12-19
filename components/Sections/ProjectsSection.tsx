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
import { ProjectCard } from "@/components/UI/ProjectCard";
import { ProjectModal } from "@/components/UI/ProjectModal";
import { PROJECTS_DATA } from "@/lib/constants";

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
        className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-gray-900/20 to-background"
        aria-labelledby="projects-heading"
      >
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
