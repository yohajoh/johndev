/* eslint-disable react-hooks/immutability */
"use client";

import {
  motion,
  AnimatePresence as MotionAnimatePresence,
} from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
  Globe,
  Database,
  Phone,
  Bot,
  Home,
  BatteryCharging,
  Users,
  Layers,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    technologies: string[];
    description: string;
    longDescription: string;
    context: string;
    action: string;
    result: string;
    links: { github?: string; live?: string };
    color: string;
    year: number;
    featured?: boolean;
    stats?: { label: string; value: string }[];
    metrics?: { label: string; value: string; icon: any }[];
  };
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectModal = ({
  project,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (e.shiftKey) {
          onPrev();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (e.shiftKey) {
          onNext();
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    // Add keyboard event listener
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext, onClose]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Helper function to extract image path
  const getImagePath = (imgPath: string) => {
    // Remove '../public' prefix if present
    return imgPath.startsWith("../public/")
      ? imgPath.replace("../public/", "/")
      : imgPath;
  };

  // Get color classes based on project color
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          context: "from-primary/10 to-primary/5 border-primary/20 text-primary",
          action: "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary",
          result: "from-accent/10 to-accent/5 border-accent/20 text-accent",
        };
      case "secondary":
        return {
          context: "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-500",
          action: "from-primary/10 to-primary/5 border-primary/20 text-primary",
          result: "from-green-500/10 to-green-500/5 border-green-500/20 text-green-500",
        };
      case "accent":
        return {
          context: "from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-500",
          action: "from-pink-500/10 to-pink-500/5 border-pink-500/20 text-pink-500",
          result: "from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-500",
        };
      default:
        return {
          context: "from-primary/10 to-primary/5 border-primary/20 text-primary",
          action: "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary",
          result: "from-accent/10 to-accent/5 border-accent/20 text-accent",
        };
    }
  };

  const colors = getColorClasses(project.color);

  if (!project || !mounted) return null;

  // Create a typed version
  const AnimatePresence = MotionAnimatePresence as React.FC<{
    children: React.ReactNode;
    mode?: "sync" | "wait" | "popLayout";
    initial?: boolean;
    onExitComplete?: () => void;
    presenceAffectsLayout?: boolean;
  }>;

  return createPortal(
    <AnimatePresence mode="wait">
      {/* Main container */}
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-auto"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl pointer-events-auto"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Project Navigation Buttons */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
            <button
              onClick={onPrev}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect group"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-background/90 backdrop-blur-sm text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Prev Project (Shift+←)
              </span>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
            <button
              onClick={onNext}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect group"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-background/90 backdrop-blur-sm text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Next Project (Shift+→)
              </span>
            </button>
          </div>

          {/* Project Image */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-t-3xl">
            {/* Loading skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse z-10" />
            )}

            {/* Single Image */}
            <div className="relative w-full h-full">
              {/* Background Image with Next.js Image component */}
              <div className="absolute inset-0">
                <Image
                  src={getImagePath(project.image)}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  className="object-cover"
                  priority={true}
                  onLoad={handleImageLoad}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

              {/* Category Badge */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                <span className="px-4 py-2 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full shadow-lg glass-effect">
                  {project.category}
                </span>
                
                {/* Year Badge */}
                <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full shadow-lg glass-effect flex items-center gap-1">
                  <span>{project.year}</span>
                </span>
                
                {/* Featured Badge */}
                {project.featured && (
                  <span className="px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm text-yellow-600 dark:text-yellow-400 text-sm font-medium rounded-full shadow-lg glass-effect flex items-center gap-1.5 border border-yellow-500/20">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-10">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-3">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                {project.subtitle}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-card text-muted-foreground text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl border border-border shadow-sm glass-effect"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {project.metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <div className="text-lg sm:text-xl font-bold text-foreground">{metric.value}</div>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Description */}
            {project.longDescription && (
              <div className="mb-6 sm:mb-8">
                <h4 className="font-heading text-lg sm:text-xl text-foreground mb-3 sm:mb-4">Overview</h4>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {/* CAR Framework */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              {/* Context */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${colors.context} shadow-sm glass-effect`}>
                <h4 className="flex items-center gap-3 font-heading text-base sm:text-lg mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 glass-effect">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  Context
                </h4>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {project.context}
                </p>
              </div>

              {/* Action */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${colors.action} shadow-sm glass-effect`}>
                <h4 className="flex items-center gap-3 font-heading text-base sm:text-lg mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 glass-effect">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  Action
                </h4>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {project.action}
                </p>
              </div>

              {/* Result */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r ${colors.result} shadow-sm glass-effect`}>
                <h4 className="flex items-center gap-3 font-heading text-base sm:text-lg mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 glass-effect">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  Result
                </h4>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-card text-foreground font-semibold rounded-xl hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl glass-effect text-sm sm:text-base"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Code</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg text-sm sm:text-base"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;