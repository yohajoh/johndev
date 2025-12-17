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
  Calendar,
  Clock,
  Globe,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";

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
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
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
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <MagneticElement strength={0.3}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:border-primary/30 transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </MagneticElement>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <MagneticElement strength={0.2}>
              <button
                onClick={onPrev}
                className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:border-primary/30 transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </MagneticElement>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
            <MagneticElement strength={0.2}>
              <button
                onClick={onNext}
                className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:border-primary/30 transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </MagneticElement>
          </div>

          {/* Project Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />

            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-medium rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <h3 className="font-heading text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
                {project.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {project.subtitle}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-800"
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
                  className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="font-heading text-2xl md:text-3xl text-gray-900 dark:text-white font-bold">
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CAR Framework */}
            <div className="space-y-8 mb-10">
              {/* Context */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30">
                <h4 className="flex items-center gap-3 font-heading text-lg text-blue-700 dark:text-blue-400 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  Context
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.context}
                </p>
              </div>

              {/* Action */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border border-green-200 dark:border-green-800/30">
                <h4 className="flex items-center gap-3 font-heading text-lg text-green-700 dark:text-green-400 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  Action
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.action}
                </p>
              </div>

              {/* Result */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200 dark:border-purple-800/30">
                <h4 className="flex items-center gap-3 font-heading text-lg text-purple-700 dark:text-purple-400 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  Result
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
              {project.links.github && (
                <MagneticElement strength={0.2}>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                </MagneticElement>
              )}
              {project.links.live && (
                <MagneticElement strength={0.2}>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </MagneticElement>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
