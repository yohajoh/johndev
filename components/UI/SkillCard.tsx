"use client";

import { ReactNode, useState } from "react";
import {
  Star,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button } from "./Button";

interface SkillCardProps {
  title: string;
  description: string;
  level: number;
  icon: ReactNode;
  color: "primary" | "secondary" | "accent" | "success" | "warning" | "info";
  experience?: string;
  projects?: number;
  certifications?: string[];
  trending?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SkillCard = ({
  title,
  description,
  level,
  icon,
  color,
  experience,
  projects,
  certifications = [],
  trending = false,
  className,
  onClick,
}: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    primary:
      "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 text-primary",
    secondary:
      "bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20 text-secondary",
    accent:
      "bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 text-accent",
    success:
      "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-500",
    warning:
      "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-500",
    info: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-500",
  };

  const getLevelColor = () => {
    if (level >= 90) return "from-primary to-secondary";
    if (level >= 80) return "from-secondary to-accent";
    if (level >= 70) return "from-accent to-primary";
    return "from-gray-500 to-gray-600";
  };

  const getLevelLabel = () => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <MagneticElement strength={0.1}>
      <article
        className={cn(
          "group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500",
          "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
          colorClasses[color],
          isHovered && "border-primary/40",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        aria-expanded={isExpanded}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                isHovered && "scale-110"
              )}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                  {getLevelLabel()}
                </span>
                {trending && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    Trending
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{level}%</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(level / 20)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-500"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-foreground">Proficiency</span>
            <span className="font-semibold">{level}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
                getLevelColor()
              )}
              style={{
                width: isHovered ? `${level}%` : "0%",
                transitionDelay: "200ms",
              }}
              aria-valuenow={level}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            >
              {isHovered && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-sm"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {experience && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <div>
                <div className="text-xs text-muted-foreground">Experience</div>
                <div className="text-sm font-medium text-foreground">
                  {experience}
                </div>
              </div>
            </div>
          )}

          {projects && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
              <BarChart className="w-4 h-4" aria-hidden="true" />
              <div>
                <div className="text-xs text-muted-foreground">Projects</div>
                <div className="text-sm font-medium text-foreground">
                  {projects}+
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">
                Certifications
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expand button */}
        {certifications.length > 0 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            variant="ghost"
            size="sm"
            className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
            aria-label={isExpanded ? "Show less" : "Show more"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Show Less" : "Show Certifications"}
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                isExpanded && "rotate-90"
              )}
              aria-hidden="true"
            />
          </Button>
        )}

        {/* Hover effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-1 rounded-3xl blur-xl opacity-0 transition-opacity duration-500 pointer-events-none",
            isHovered && "opacity-30",
            color === "primary" &&
              "bg-gradient-to-r from-primary/20 to-secondary/20",
            color === "secondary" &&
              "bg-gradient-to-r from-secondary/20 to-accent/20",
            color === "accent" &&
              "bg-gradient-to-r from-accent/20 to-primary/20"
          )}
          aria-hidden="true"
        />

        {/* Link indicator */}
        {onClick && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
      </article>
    </MagneticElement>
  );
};

// Skill card grid
interface SkillCardGridProps {
  skills: Omit<SkillCardProps, "onClick">[];
  columns?: 2 | 3 | 4;
  onSkillClick?: (index: number) => void;
}

export const SkillCardGrid = ({
  skills,
  columns = 3,
  onSkillClick,
}: SkillCardGridProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns])}>
      {skills.map((skill, index) => (
        <SkillCard
          key={index}
          {...skill}
          onClick={() => onSkillClick?.(index)}
        />
      ))}
    </div>
  );
};

// Skill progress circle
interface SkillCircleProps {
  level: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  showPercentage?: boolean;
}

export const SkillCircle = ({
  level,
  size = "md",
  label,
  showPercentage = true,
}: SkillCircleProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const strokeWidth = {
    sm: 6,
    md: 8,
    lg: 10,
  };

  const radius = {
    sm: 25,
    md: 40,
    lg: 55,
  };

  const circumference = 2 * Math.PI * radius[size];
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          aria-label={`Skill level: ${level}%`}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius[size] / 2}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth[size]}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius[size] / 2}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth[size]}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(22, 163, 74)" />
              <stop offset="100%" stopColor="rgb(245, 158, 11)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {showPercentage ? (
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{level}%</div>
              {label && (
                <div className="text-xs text-muted-foreground">{label}</div>
              )}
            </div>
          ) : (
            <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
          )}
        </div>
      </div>

      {label && !showPercentage && (
        <div className="mt-2 text-sm font-medium text-foreground">{label}</div>
      )}
    </div>
  );
};

export default SkillCard;
