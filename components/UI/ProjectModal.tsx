"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  Smartphone,
  Layers,
  Lock,
  Globe,
  Cpu,
} from "lucide-react";
import { Button, IconButton } from "@/components/UI/Button";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    categories: string[];
    year: number;
    liveUrl?: string;
    githubUrl?: string;
    image: string;
    featured: boolean;
    stats?: { label: string; value: string }[];
    color: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Mock images for carousel
  const projectImages = useMemo(
    () => [
      project.image,
      "/projects/design-system.jpg",
      "/projects/architecture.jpg",
      "/projects/code-screenshot.jpg",
    ],
    [project.image]
  );

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrevImage = useCallback(() => {
    setCurrentImage(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length
    );
  }, [projectImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % projectImages.length);
  }, [projectImages.length]);

  const handleImageSelect = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "f":
          setIsFullscreen(!isFullscreen);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    isPlaying,
    isFullscreen,
    onClose,
    handlePrevImage,
    handleNextImage,
  ]);

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % projectImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, isOpen, projectImages.length]);

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
      Docker: Layers,
      Kubernetes: Layers,
      TypeScript: Code2,
      GraphQL: Server,
      Firebase: Cloud,
      "React Native": Smartphone,
      Stripe: Lock,
      Kafka: Server,
    };
    return iconMap[tech] || Code2;
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 ease-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity duration-500"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={cn(
          "relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl",
          "bg-gradient-to-br from-card to-gray-900/80 backdrop-blur-xl border border-white/10",
          "transition-all duration-500 ease-out transform-gpu",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          isFullscreen && "!max-w-none !max-h-none !rounded-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <IconButton
            onClick={() => setIsFullscreen(!isFullscreen)}
            icon={
              isFullscreen ? (
                <Minimize2 className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Maximize2 className="w-5 h-5" aria-hidden="true" />
              )
            }
            label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            variant="ghost"
            size="sm"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
          />
          <IconButton
            onClick={onClose}
            icon={<X className="w-5 h-5" aria-hidden="true" />}
            label="Close modal"
            variant="ghost"
            size="sm"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
          />
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left column - Image carousel */}
          <div className="lg:w-1/2 relative overflow-hidden">
            {/* Main image */}
            <div className="relative aspect-video lg:aspect-auto lg:h-full bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Color overlay */}
              <div
                className="absolute inset-0 opacity-50"
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

              {/* Image navigation */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <IconButton
                  onClick={handlePrevImage}
                  icon={<ChevronLeft className="w-5 h-5" aria-hidden="true" />}
                  label="Previous image"
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                />
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <IconButton
                  onClick={handleNextImage}
                  icon={<ChevronRight className="w-5 h-5" aria-hidden="true" />}
                  label="Next image"
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                />
              </div>

              {/* Play/pause toggle */}
              <div className="absolute bottom-4 left-4">
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  icon={
                    isPlaying ? (
                      <Pause className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Play className="w-5 h-5" aria-hidden="true" />
                    )
                  }
                  label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                />
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                {currentImage + 1} / {projectImages.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {projectImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={cn(
                      "relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-primary",
                      currentImage === index
                        ? "ring-2 ring-primary scale-105"
                        : "opacity-50 hover:opacity-100"
                    )}
                    aria-label={`View image ${index + 1}`}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
                      style={{
                        background:
                          index === 0 && project.color === "primary"
                            ? "linear-gradient(135deg, rgba(22, 163, 74, 0.3), rgba(245, 158, 11, 0.2))"
                            : index === 0 && project.color === "secondary"
                            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(139, 92, 246, 0.2))"
                            : index === 0 && project.color === "accent"
                            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(22, 163, 74, 0.2))"
                            : "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2))",
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Project details */}
          <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium flex items-center gap-1">
                          <Award className="w-3 h-3" aria-hidden="true" />
                          Featured
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-white/10 text-muted-foreground text-xs">
                        {project.year}
                      </span>
                    </div>
                    <h2
                      id="project-modal-title"
                      className="font-heading text-3xl font-bold text-foreground mb-2"
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Stats */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  Technologies Used
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.technologies.map((tech) => {
                    const TechIcon = getTechIcon(tech);
                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TechIcon
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {[
                    "Scalable architecture with microservices",
                    "Real-time data processing",
                    "Responsive design for all devices",
                    "Advanced security measures",
                    "Comprehensive analytics dashboard",
                    "Automated deployment pipeline",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mt-0.5">
                        <div
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex gap-3 flex-1">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full group"
                          icon={
                            <Github
                              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                              aria-hidden="true"
                            />
                          }
                          iconPosition="left"
                        >
                          View Code
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="primary"
                          className="w-full group"
                          icon={
                            <ExternalLink
                              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                              aria-hidden="true"
                            />
                          }
                          iconPosition="left"
                        >
                          Live Demo
                        </Button>
                      </a>
                    )}
                  </div>
                )}

                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="group"
                  icon={
                    <X
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  }
                  iconPosition="left"
                >
                  Close Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-30"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
