"use client";

import { ReactNode, useState } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Star,
  Users,
  Zap,
  Calendar,
  ChevronRight,
  Award,
  TrendingUp,
  Code2,
  Palette,
  Server,
  Database,
  Cloud,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button, IconButton } from "./Button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  categories: string[];
  year: number;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    label: string;
    value: string;
    icon?: ReactNode;
  }[];
  color?: "primary" | "secondary" | "accent";
  className?: string;
  onClick?: () => void;
  layout?: "grid" | "list";
}

export const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  categories,
  year,
  featured = false,
  liveUrl,
  githubUrl,
  stats = [],
  color = "primary",
  className,
  onClick,
  layout = "grid",
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const colorClasses = {
    primary: "border-primary/20 hover:border-primary/40",
    secondary: "border-secondary/20 hover:border-secondary/40",
    accent: "border-accent/20 hover:border-accent/40",
  };

  const gradientClasses = {
    primary: "from-primary/20 via-secondary/10 to-transparent",
    secondary: "from-secondary/20 via-accent/10 to-transparent",
    accent: "from-accent/20 via-primary/10 to-transparent",
  };

  const techIcons: Record<string, ReactNode> = {
    React: <Code2 className="w-4 h-4" aria-hidden="true" />,
    "Next.js": <Code2 className="w-4 h-4" aria-hidden="true" />,
    TypeScript: <Code2 className="w-4 h-4" aria-hidden="true" />,
    "Node.js": <Server className="w-4 h-4" aria-hidden="true" />,
    Python: <Server className="w-4 h-4" aria-hidden="true" />,
    AWS: <Cloud className="w-4 h-4" aria-hidden="true" />,
    Docker: <Server className="w-4 h-4" aria-hidden="true" />,
    MongoDB: <Database className="w-4 h-4" aria-hidden="true" />,
    PostgreSQL: <Database className="w-4 h-4" aria-hidden="true" />,
    "Tailwind CSS": <Palette className="w-4 h-4" aria-hidden="true" />,
    "React Native": <Smartphone className="w-4 h-4" aria-hidden="true" />,
  };

  return (
    <MagneticElement strength={layout === "grid" ? 0.1 : 0.05}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border backdrop-blur-sm",
          "transition-all duration-500 hover:scale-[1.02]",
          "bg-gradient-to-br from-card/80 to-background/80",
          colorClasses[color],
          layout === "list" && "flex",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
      >
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" aria-hidden="true" />
              Featured
            </div>
          </div>
        )}

        {/* Image/Thumbnail */}
        <div
          className={cn(
            "relative aspect-video overflow-hidden",
            layout === "list" && "w-64 flex-shrink-0"
          )}
        >
          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
              gradientClasses[color],
              isHovered ? "opacity-80" : "opacity-50"
            )}
            aria-hidden="true"
          />

          {/* Year badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              {year}
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            aria-hidden="true"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
          </div>

          {/* Technology icon */}
          {technologies[0] && techIcons[technologies[0]] && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                {techIcons[technologies[0]]}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn("p-6", layout === "list" && "flex-1")}>
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <ChevronRight
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-all duration-300",
                  isHovered && "text-primary translate-x-1"
                )}
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground">
                +{technologies.length - 4}
              </span>
            )}
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="p-2 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    {stat.icon || (
                      <TrendingUp
                        className="w-3 h-3 text-primary"
                        aria-hidden="true"
                      />
                    )}
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              variant="outline"
              size="sm"
              icon={<Eye className="w-4 h-4" aria-hidden="true" />}
              iconPosition="left"
              className="flex-1"
            >
              View Details
            </Button>

            <div className="flex items-center gap-2">
              {githubUrl && (
                <IconButton
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  size="sm"
                  icon={<Github className="w-5 h-5" aria-hidden="true" />}
                  label="View source code on GitHub"
                />
              )}
              {liveUrl && (
                <IconButton
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  size="sm"
                  icon={<ExternalLink className="w-5 h-5" aria-hidden="true" />}
                  label="Visit live site"
                />
              )}
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r blur-xl",
              gradientClasses[color]
            )}
            aria-hidden="true"
          />
        </div>
      </article>
    </MagneticElement>
  );
};

// Project card grid
interface ProjectCardGridProps {
  projects: Omit<ProjectCardProps, "onClick">[];
  columns?: 2 | 3;
  onProjectClick?: (index: number) => void;
}

export const ProjectCardGrid = ({
  projects,
  columns = 3,
  onProjectClick,
}: ProjectCardGridProps) => {
  const gridCols = {
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns])}>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          onClick={() => onProjectClick?.(index)}
        />
      ))}
    </div>
  );
};

// Project card list
export const ProjectCardList = ({
  projects,
  onProjectClick,
}: Omit<ProjectCardGridProps, "columns">) => {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          layout="list"
          onClick={() => onProjectClick?.(index)}
        />
      ))}
    </div>
  );
};

// Project stats component
interface ProjectStatsProps {
  stats: {
    icon: ReactNode;
    label: string;
    value: string;
    description?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export const ProjectStats = ({ stats, columns = 4 }: ProjectStatsProps) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns])}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
          {stat.description && (
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
