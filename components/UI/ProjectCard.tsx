"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Eye,
  ArrowUpRight,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    images: string[]; // Changed from image to images array
    technologies: string[];
    description: string;
    metrics: { label: string; value: string; icon: any }[];
    links: { github?: string; live?: string };
    color: string;
    featured?: boolean;
  };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ProjectCard = ({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
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
  const thumbnailImage = project.images?.[0] || ""; // Get first image as thumbnail

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover="hover"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card Container */}
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 transition-all duration-500 shadow-lg hover:shadow-2xl",
          colors.bg,
          colors.border,
          colors.hover,
          colors.glass
        )}
        variants={{
          hover: {
            y: -10,
            boxShadow: "0 20px 40px rgba(var(--primary), 0.1)",
          },
        }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Background Image - Using first image as thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${thumbnailImage})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground glass-effect">
              {project.category}
            </span>

            {/* Image Counter Badge - Shows how many images this project has */}
            {project.images.length > 1 && (
              <span className="px-2.5 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground glass-effect flex items-center gap-1">
                <Images className="w-3 h-3" />
                <span>{project.images.length}</span>
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button
              onClick={onClick}
              className="px-6 py-3 bg-background text-primary rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5" />
              {project.images.length > 1 ? "View Gallery" : "View Details"}
            </motion.button>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5 glass-effect border border-yellow-500/20">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Links */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-1">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card text-muted-foreground hover:bg-card/80 transition-colors shadow-sm glass-effect"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card text-muted-foreground hover:bg-card/80 transition-colors shadow-sm glass-effect"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-card/80 text-muted-foreground border border-border shadow-sm glass-effect"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-card/80 text-muted/80 border border-border shadow-sm glass-effect">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Metrics Preview (Optional) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50">
              {project.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-card flex items-center justify-center border border-border">
                    <metric.icon className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {metric.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decorative Corner */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
          variants={{
            hover: { rotate: 90 },
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rotate-45 ${colors.bg} ${colors.border} border-b-2 border-r-2`}
          />
        </motion.div>
      </motion.div>

      {/* Floating Elements on Hover */}
      {isHovered && (
        <>
          {/* Floating Icons */}
          {project.technologies.slice(0, 3).map((tech, i) => (
            <motion.div
              key={tech}
              className="absolute w-8 h-8 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center text-foreground glass-effect"
              style={{
                top: `${20 + i * 30}%`,
                left: "-20px",
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-xs font-medium">{tech.charAt(0)}</span>
            </motion.div>
          ))}

          {/* Floating Stats - Only show if project is featured */}
          {project.featured && (
            <motion.div
              className="absolute -right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-card border border-border shadow-lg glass-effect"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-foreground">
                  Featured
                </span>
              </div>
            </motion.div>
          )}

          {/* Floating Image Counter */}
          {project.images.length > 1 && (
            <motion.div
              className="absolute -right-4 bottom-8 px-3 py-2 rounded-xl bg-card border border-border shadow-lg glass-effect"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Images className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {project.images.length} images
                </span>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

// Compact Project Card Variant - Updated for images array
export const CompactProjectCard = ({
  project,
  onClick,
}: {
  project: {
    images: string[];
    category: string;
    title: string;
    description: string;
    featured?: boolean;
  };
  onClick: () => void;
}) => {
  const thumbnailImage = project.images?.[0] || "";

  return (
    <motion.div
      className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${thumbnailImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-sm font-medium text-foreground glass-effect">
              {project.category}
            </span>
            {project.images.length > 1 && (
              <span className="px-2 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs font-medium text-foreground glass-effect flex items-center gap-1">
                <Images className="w-3 h-3" />
                <span>{project.images.length}</span>
              </span>
            )}
          </div>
          <ArrowUpRight className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" />
        </div>
        <h3 className="font-heading text-xl text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-foreground/80 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-primary-foreground font-semibold">
          {project.images.length > 1 ? "View Gallery" : "View Details"}
        </span>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5 glass-effect border border-yellow-500/20">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
