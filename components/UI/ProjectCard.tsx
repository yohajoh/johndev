"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Eye,
  Calendar,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Database,
  Phone,
  Bot,
  Home,
  BatteryCharging,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    technologies: string[];
    description: string;
    year: number;
    links: { github?: string; live?: string };
    color: string;
    featured?: boolean;
    stats?: { label: string; value: string }[];
    metrics?: { label: string; value: string; icon: any }[];
  };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  compact?: boolean;
  variant?: "grid" | "list";
}

export const ProjectCard = ({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
  compact = false,
  variant = "grid",
}: ProjectCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
          border: "border-primary/20",
          text: "text-primary",
          button: "bg-primary text-primary-foreground hover:bg-primary/90",
          hover: "hover:border-primary/40",
          glass: "glass-effect border-primary/20",
        };
      case "secondary":
        return {
          bg: "bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent",
          border: "border-secondary/20",
          text: "text-secondary",
          button:
            "bg-secondary text-secondary-foreground hover:bg-secondary/90",
          hover: "hover:border-secondary/40",
          glass: "glass-effect border-secondary/20",
        };
      case "accent":
        return {
          bg: "bg-gradient-to-br from-accent/10 via-accent/5 to-transparent",
          border: "border-accent/20",
          text: "text-accent",
          button: "bg-accent text-accent-foreground hover:bg-accent/90",
          hover: "hover:border-accent/40",
          glass: "glass-effect border-accent/20",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-card to-background",
          border: "border-border",
          text: "text-muted",
          button: "bg-muted text-muted-foreground hover:bg-muted/90",
          hover: "hover:border-border",
          glass: "glass-effect",
        };
    }
  };

  const colors = getColorClasses(project.color);
  const projectImage = project.image || "";

  // Helper function to extract image path
  const getImagePath = (imgPath: string) => {
    // Remove '../public' prefix if present
    return imgPath.startsWith("../public/")
      ? imgPath.replace("../public/", "/")
      : imgPath;
  };

  // Card classes based on variant and compact mode
  const cardClasses = cn(
    "relative overflow-hidden transition-all duration-300 cursor-pointer group h-full",
    "bg-gradient-to-br from-card to-card/90 border border-border/50",
    "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
    "active:scale-[0.98]",
    
    // Size variations
    variant === "grid" 
      ? compact 
        ? "rounded-2xl p-4" 
        : "rounded-3xl p-6"
      : compact 
        ? "rounded-2xl p-4" 
        : "rounded-2xl p-5",
    
    // List variant specific
    variant === "list" && "flex flex-col sm:flex-row sm:items-start gap-4"
  );

  // Image container classes
  const imageContainerClasses = cn(
    "relative overflow-hidden rounded-xl",
    variant === "grid" 
      ? compact 
        ? "h-36 sm:h-40 mb-3" 
        : "h-48 mb-4"
      : variant === "list"
      ? compact 
        ? "w-full sm:w-36 h-32 mb-3 sm:mb-0 flex-shrink-0" 
        : "w-full sm:w-40 h-36 mb-4 sm:mb-0 flex-shrink-0"
      : "h-48 mb-4"
  );

  // Content container classes for list view
  const contentClasses = cn(
    variant === "list" && "flex-1"
  );

  // Title classes
  const titleClasses = cn(
    "font-heading font-bold text-foreground",
    compact 
      ? "text-base sm:text-lg mb-1" 
      : "text-lg sm:text-xl mb-2"
  );

  // Subtitle classes
  const subtitleClasses = cn(
    "text-muted-foreground",
    compact 
      ? "text-xs sm:text-sm mb-2 line-clamp-1" 
      : "text-sm mb-3 line-clamp-1"
  );

  // Description classes
  const descriptionClasses = cn(
    "text-muted-foreground",
    compact 
      ? "text-xs sm:text-sm line-clamp-2 mb-3" 
      : "text-sm sm:text-base line-clamp-3 mb-4"
  );

  // Metrics container classes
  const metricsContainerClasses = cn(
    "flex flex-wrap gap-2 mb-3",
    compact ? "hidden sm:flex" : ""
  );

  // Stats container classes
  const statsContainerClasses = cn(
    "grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3",
    compact ? "hidden" : ""
  );

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: variant === "grid" ? -4 : 0 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card Container */}
      <motion.div
        className={cardClasses}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* List view layout */}
        {variant === "list" ? (
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Image Container */}
            <div className={imageContainerClasses}>
              {/* Background Image */}
              <div className="absolute inset-0">
                {projectImage ? (
                  <Image
                    src={getImagePath(projectImage)}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index < 2}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground glass-effect">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={contentClasses}>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className={titleClasses}>{project.title}</h3>
                  <p className={subtitleClasses}>{project.subtitle}</p>
                </div>
                
                {/* Year and Links */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={descriptionClasses}>{project.description}</p>

              {/* Metrics */}
              {!compact && project.metrics && project.metrics.length > 0 && (
                <div className={metricsContainerClasses}>
                  {project.metrics.slice(0, 4).map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-xs">
                        <Icon className="w-3 h-3 text-primary" />
                        <span className="font-medium">{metric.value}</span>
                        <span className="text-muted-foreground text-xs">{metric.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Stats */}
              {!compact && project.stats && project.stats.length > 0 && (
                <div className={statsContainerClasses}>
                  {project.stats.slice(0, 4).map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                      <div className="font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground text-center">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 rounded-lg text-xs text-muted-foreground border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > (compact ? 3 : 4) && (
                  <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-muted-foreground border border-white/10">
                    +{project.technologies.length - (compact ? 3 : 4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Grid view layout */
          <>
            {/* Image Container */}
            <div className={imageContainerClasses}>
              {/* Background Image */}
              <div className="absolute inset-0">
                {projectImage ? (
                  <Image
                    src={getImagePath(projectImage)}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index < 2}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground glass-effect">
                  {project.category}
                </span>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5 glass-effect">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    Featured
                  </span>
                </div>
              )}

              {/* View Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <div className="flex items-center gap-2 text-white">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium text-sm sm:text-base">View Details</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className={titleClasses}>{project.title}</h3>
                  <p className={subtitleClasses}>{project.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className={descriptionClasses}>{project.description}</p>

              {/* Year */}
              <div className="flex items-center gap-1 mb-3 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{project.year}</span>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className={metricsContainerClasses}>
                  {project.metrics.slice(0, 2).map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg text-xs">
                        <Icon className="w-3 h-3 text-primary" />
                        <span className="font-medium">{metric.value}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/5 rounded-lg text-xs text-muted-foreground border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > (compact ? 3 : 4) && (
                  <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-muted-foreground border border-white/10">
                    +{project.technologies.length - (compact ? 3 : 4)}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Decorative Corner */}
        {variant === "grid" && (
          <motion.div
            className="absolute top-0 right-0 w-12 h-12 overflow-hidden"
            variants={{
              hover: { rotate: 90 },
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rotate-45 ${colors.bg} ${colors.border} border-b-2 border-r-2`}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;