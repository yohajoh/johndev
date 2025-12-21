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
  Circle,
  CircleDot,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image"; // Import Next.js Image component

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    images: string[];
    technologies: string[];
    description: string;
    context: string;
    action: string;
    result: string;
    links: { github?: string; live?: string };
    color: string;
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Reset carousel when project changes
  useEffect(() => {
    setCarouselIndex(0);
    setIsLoading(true);
  }, [project.id]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project?.images?.length) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (e.shiftKey) {
            onPrev();
          } else {
            prevImage();
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (e.shiftKey) {
            onNext();
          } else {
            nextImage();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [project?.images?.length, onPrev, onNext, onClose]
  );

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
  }, [handleKeyDown]);

  // Carousel navigation functions
  const nextImage = () => {
    if (!project?.images?.length) return;
    setIsLoading(true);
    setCarouselIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project?.images?.length) return;
    setIsLoading(true);
    setCarouselIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setIsLoading(true);
    setCarouselIndex(index);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle swipe gestures for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Helper function to extract image path
  const getImagePath = (imgPath: string) => {
    // Remove '../public' prefix if present
    return imgPath.startsWith("../public/")
      ? imgPath.replace("../public/", "/")
      : imgPath;
  };

  if (!project || !mounted || !project.images?.length) return null;

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

          {/* Project Image Carousel */}
          <div
            className="relative h-80 md:h-100 overflow-hidden rounded-t-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Loading skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse z-10" />
            )}

            {/* Carousel Container */}
            <motion.div
              className="flex h-full"
              animate={{ x: `-${carouselIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {project.images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-full flex-shrink-0"
                >
                  {/* Background Image with Next.js Image component */}
                  <div className="absolute inset-0">
                    <Image
                      src={getImagePath(img)}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      className="object-cover"
                      priority={index === carouselIndex && carouselIndex === 0}
                      onLoad={
                        index === carouselIndex ? handleImageLoad : undefined
                      }
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full shadow-lg glass-effect z-10">
                    {index + 1} / {project.images.length}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Category Badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="px-4 py-2 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full shadow-lg glass-effect">
                {project.category}
              </span>
            </div>

            {/* Carousel Navigation - Only show if multiple images */}
            {project.images.length > 1 && (
              <>
                {/* Previous Image Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 glass-effect group z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="absolute left-full ml-2 px-2 py-1 bg-background/90 backdrop-blur-sm text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Previous (←)
                  </span>
                </button>

                {/* Next Image Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all duration-300 glass-effect group z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                  <span className="absolute right-full mr-2 px-2 py-1 bg-background/90 backdrop-blur-sm text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Next (→)
                  </span>
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      className="p-1"
                      aria-label={`Go to image ${index + 1}`}
                    >
                      {index === carouselIndex ? (
                        <CircleDot className="w-3 h-3 text-primary fill-primary" />
                      ) : (
                        <Circle className="w-3 h-3 text-foreground/40 hover:text-foreground/60 transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content - Rest of your existing modal content */}
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
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
