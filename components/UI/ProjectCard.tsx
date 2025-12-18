"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Eye,
  ArrowUpRight,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    technologies: string[];
    description: string;
    metrics: { label: string; value: string; icon: any }[];
    links: { github?: string; live?: string };
    color: string;
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
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground glass-effect">
              {project.category}
            </span>
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
              View Case Study
            </motion.button>
          </motion.div>
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

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
            {project.metrics.slice(0, 2).map((metric, i) => (
              <motion.div
                key={metric.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center border ${colors.border} glass-effect`}
                >
                  <metric.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <div className="font-heading text-lg font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

          {/* Floating Stats */}
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
        </>
      )}
    </motion.div>
  );
};

// Compact Project Card Variant
export const CompactProjectCard = ({
  project,
  onClick,
}: {
  project: any;
  onClick: () => void;
}) => {
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
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-sm font-medium text-foreground glass-effect">
            {project.category}
          </span>
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
          View Details
        </span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
