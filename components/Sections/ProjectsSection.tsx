/* eslint-disable react-hooks/set-state-in-render */
"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence as MotionAnimatePresence,
} from "framer-motion";
import {
  Code2,
  Search,
  Grid,
  List,
  Globe,
  Cpu,
  Play,
  Pause,
  Filter,
  X,
  Zap,
  Users,
  TrendingUp,
  Database,
  Phone,
  Bot,
  Home,
  BatteryCharging,
  Layers,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/UI/ProjectCard";
import { ProjectModal } from "@/components/UI/ProjectModal";
import { PROJECTS_DATA } from "@/lib/constants";

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

// Icon mapping for metrics
const iconMap: Record<string, any> = {
  "Zap": Zap,
  "Users": Users,
  "TrendingUp": TrendingUp,
  "Globe": Globe,
  "Database": Database,
  "Phone": Phone,
  "Bot": Bot,
  "Home": Home,
  "BatteryCharging": BatteryCharging,
  "Layers": Layers,
  "Star": Star,
};

// Create a typed version
const AnimatePresence = MotionAnimatePresence as React.FC<{
  children: React.ReactNode;
  mode?: "sync" | "wait" | "popLayout";
  initial?: boolean;
  onExitComplete?: () => void;
  presenceAffectsLayout?: boolean;
}>;

// Helper function to enhance project with icon instances
const enhanceProjectWithIcons = (project: any) => {
  return {
    ...project,
    metrics: project.metrics?.map((metric: any) => ({
      ...metric,
      icon: iconMap[metric.icon] || Star
    })) || []
  };
};

// Main Projects Section Component
export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        project.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
        project.subtitle?.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Get selected project data with enhanced metrics
  const selectedProjectData = useMemo(() => {
    if (!selectedProjectId) return null;
    const index = PROJECTS_DATA.findIndex((p) => p.id === selectedProjectId);
    setCurrentProjectIndex(index);
    const project = PROJECTS_DATA[index];
    return enhanceProjectWithIcons(project);
  }, [selectedProjectId]);

  // Navigation functions
  const handleNextProject = useCallback(() => {
    const nextIndex = (currentProjectIndex + 1) % PROJECTS_DATA.length;
    setSelectedProjectId(PROJECTS_DATA[nextIndex].id);
  }, [currentProjectIndex]);

  const handlePrevProject = useCallback(() => {
    const prevIndex =
      (currentProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setSelectedProjectId(PROJECTS_DATA[prevIndex].id);
  }, [currentProjectIndex]);

  // Handle click outside filter on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isFilterOpen && window.innerWidth < 1024) {
        if (!target.closest('.filter-section') && !target.closest('.filter-button')) {
          setIsFilterOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFilterOpen]);

  // Handle project click
  const handleProjectClick = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
  }, []);

  return (
    <>
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProjectData && (
          <ProjectModal
            project={selectedProjectData}
            onClose={() => setSelectedProjectId(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section
        ref={sectionRef}
        id="projects"
        className="relative overflow-hidden bg-gradient-to-b from-background via-gray-900/20 to-background py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4 sm:mb-6 shadow-lg shadow-primary/5">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Portfolio Showcase
              </span>
            </div>

            <h2
              id="projects-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6"
            >
              Featured{" "}
              <span className="text-gradient-primary relative inline-block">
                Projects
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              A collection of my recent work, showcasing expertise across different domains and technologies.
            </p>
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 filter-button">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium transition-colors hover:bg-white/10"
            >
              {isFilterOpen ? (
                <>
                  <X className="w-4 h-4" />
                  Close Filters
                </>
              ) : (
                <>
                  <Filter className="w-4 h-4" />
                  Filters & Search
                </>
              )}
            </button>
          </div>

          {/* Filters and Controls */}
          <motion.div
            className={cn(
              "filter-section mb-8 sm:mb-12",
              "lg:block",
              isFilterOpen ? "block" : "hidden"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
              {/* Search */}
              <div className="relative w-full sm:flex-1">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted text-sm sm:text-base transition-all duration-300"
                  aria-label="Search projects"
                />
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewMode === "grid" 
                        ? "bg-primary text-white" 
                        : "hover:bg-white/10 text-muted"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewMode === "list" 
                        ? "bg-primary text-white" 
                        : "hover:bg-white/10 text-muted"
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={isPlaying ? "Pause animations" : "Play animations"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {PROJECT_CATEGORIES.slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                      selectedCategory === category
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white/5 text-foreground hover:bg-white/10 border border-white/10"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Count */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm sm:text-base text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects found
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {viewMode === "grid" ? "Grid view" : "List view"}
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                : "space-y-4 sm:space-y-6"
            )}
          >
            {filteredProjects.map((project, index) => {
              const enhancedProject = enhanceProjectWithIcons(project);
              
              return (
                <ProjectCard
                  key={project.id}
                  project={enhancedProject}
                  index={index}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project.id)}
                  compact={true}
                  variant={viewMode}
                />
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12 sm:py-16 md:py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setIsFilterOpen(false);
                }}
                className="mt-4 sm:mt-6 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Load More Button */}
          {filteredProjects.length > 6 && (
            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-medium transition-colors shadow-lg"
              >
                Load More Projects
              </button>
            </motion.div>
          )}
        </div>

        {/* Floating Icons - Smaller on mobile */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 opacity-5 sm:opacity-10">
          <Globe className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 text-primary" />
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 opacity-5 sm:opacity-10">
          <Cpu className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 text-secondary" />
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;