"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectModalProps {
  project: any;
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

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project || !mounted) return null;

  // Create a wrapper with cursor provider if needed
  const modalContent = (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-background rounded-3xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Without MagneticElement temporarily */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Navigation Buttons - Without MagneticElement temporarily */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <button
              onClick={onPrev}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
            <button
              onClick={onNext}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-primary/30 transition-all duration-300 glass-effect"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Project Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <span className="px-4 py-2 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full shadow-lg glass-effect">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-lg text-muted-foreground">
                {project.subtitle}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-card text-muted-foreground text-sm font-medium rounded-xl border border-border shadow-sm glass-effect"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {project.metrics.map((metric: any, index: number) => (
                <motion.div
                  key={metric.label}
                  className="p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 glass-effect"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 glass-effect">
                      <metric.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="font-heading text-2xl md:text-3xl text-foreground font-bold">
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CAR Framework */}
            <div className="space-y-8 mb-10">
              {/* Context */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm glass-effect">
                <h4 className="flex items-center gap-3 font-heading text-lg text-primary mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 glass-effect">
                    <Globe className="w-4 h-4" />
                  </div>
                  Context
                </h4>
                <p className="text-foreground leading-relaxed">
                  {project.context}
                </p>
              </div>

              {/* Action */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 shadow-sm glass-effect">
                <h4 className="flex items-center gap-3 font-heading text-lg text-secondary mb-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 glass-effect">
                    <Zap className="w-4 h-4" />
                  </div>
                  Action
                </h4>
                <p className="text-foreground leading-relaxed">
                  {project.action}
                </p>
              </div>

              {/* Result */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 shadow-sm glass-effect">
                <h4 className="flex items-center gap-3 font-heading text-lg text-accent mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 glass-effect">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  Result
                </h4>
                <p className="text-foreground leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-card text-foreground font-semibold rounded-xl hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl glass-effect"
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
