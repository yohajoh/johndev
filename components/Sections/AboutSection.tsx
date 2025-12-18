"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  CheckCircle,
  TrendingUp,
  Globe,
  Code,
  Cloud,
  Zap,
  ChevronRight,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { Button } from "@/components/UI/Button";
import {
  EXPERIENCE_TIMELINE,
  EDUCATION,
  FEATURE_HIGHLIGHTS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// Memoized constants for performance
const STATS_DATA = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "25+", label: "Technologies" },
  { value: "99%", label: "Success Rate" },
];

const SKILLS_DATA = [
  {
    label: "Technical Skills",
    percentage: 95,
    color: "from-primary to-secondary",
  },
  {
    label: "Project Management",
    percentage: 90,
    color: "from-secondary to-accent",
  },
  {
    label: "Client Satisfaction",
    percentage: 98,
    color: "from-accent to-primary",
  },
];

// Amazing Gradient Background with Fluid Animation
const AmazingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-background" />

      {/* Animated Fluid Gradient Layers */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${20 + mousePosition.x * 10}% ${
            20 + mousePosition.y * 10
          }%, 
              rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at ${80 - mousePosition.x * 10}% ${
            80 - mousePosition.y * 10
          }%, 
              rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${50 + mousePosition.x * 5}% ${
            50 - mousePosition.y * 5
          }%, 
              rgba(14, 165, 233, 0.1) 0%, transparent 50%)
          `,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Subtle Gradient Mesh */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, transparent 51%),
            linear-gradient(135deg, transparent 49%, rgba(168, 85, 247, 0.1) 50%, transparent 51%)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0",
          animation: "meshMove 20s linear infinite",
        }}
      />

      {/* Glowing Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mousePosition.x * 20}px, ${
            mousePosition.y * 20
          }px)`,
          animation: "pulseGlow 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(${-mousePosition.x * 15}px, ${
            -mousePosition.y * 15
          }px)`,
          animation: "pulseGlow 10s ease-in-out infinite 1s",
        }}
      />

      {/* Subtle Scan Lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
          backgroundSize: "100% 4px",
          animation: "scan 15s linear infinite",
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes meshMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

// Floating Code Particles
const CodeParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        content: [
          "{",
          "}",
          "<",
          "/>",
          "();",
          "=>",
          "[]",
          "{}",
          "=",
          "==",
          "===",
          "||",
          "&&",
        ][i % 13],
        size: Math.random() * 16 + 12,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 20 + 10,
      })),
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-primary/10 font-mono font-bold"
          style={{
            fontSize: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `floatParticle ${particle.speed}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        >
          {particle.content}
        </div>
      ))}
      <style jsx>{`
        @keyframes floatParticle {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translate(20px, -40px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(0, -80px) rotate(180deg);
            opacity: 0.1;
          }
          75% {
            transform: translate(-20px, -40px) rotate(270deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const [isVisible, setIsVisible] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number>(0);

  // Memoized tab change handler
  const handleTabChange = useCallback((tab: "experience" | "education") => {
    setActiveTab(tab);
  }, []);

  // Memoized timeline data
  const timelineData = useMemo(
    () => (activeTab === "experience" ? EXPERIENCE_TIMELINE : EDUCATION),
    [activeTab]
  );

  // Memoized timeline icon
  const TimelineIcon = useMemo(
    () => (activeTab === "experience" ? Briefcase : GraduationCap),
    [activeTab]
  );

  // Optimized Intersection Observer with cleanup
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observerRef.current && sectionRef.current) {
              observerRef.current.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Optimized progress animation with requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const duration = 1200;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic bezier easing for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      setProgressValues(
        SKILLS_DATA.map((skill) => easedProgress * skill.percentage)
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  // Memoized scroll handler
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Schema.org metadata for SEO */}
      <meta
        itemProp="jobTitle"
        content="Senior Full-Stack Developer & System Architect"
      />
      <meta
        itemProp="description"
        content="With over 6 years of experience in software development and architecture, specializing in building scalable, high-performance applications."
      />
      <meta
        itemProp="knowsAbout"
        content="Full-Stack Development, Cloud Architecture, System Design, DevOps, React, Next.js, TypeScript, Node.js, AWS"
      />

      {/* Amazing Background */}
      <AmazingBackground />
      <CodeParticles />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <header
          className={cn(
            "text-center mb-12 md:mb-16",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
        >
          <MagneticElement strength={0.1}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6 backdrop-blur-sm"
              role="status"
              aria-label="About me section"
            >
              <Target className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">About Me</span>
            </div>
          </MagneticElement>

          <h1
            id="about-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Professional{" "}
            <span className="text-gradient-primary relative">
              Journey
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With over 6 years of experience in software development and
            architecture, I specialize in building scalable, high-performance
            applications. My passion lies in solving complex problems and
            creating exceptional user experiences.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Personal info & features */}
          <div className="space-y-8">
            {/* Personal introduction card */}
            <article
              className={cn(
                "p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-md border border-white/10 shadow-2xl",
                isVisible ? "animate-fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: "100ms" }}
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse" />
                      <span className="text-xl sm:text-2xl font-bold text-primary relative z-10">
                        YB
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    <CheckCircle
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Yohannes Belete
                  </h2>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    Senior Full-Stack Developer & System Architect based in San
                    Francisco
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Globe
                        className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm">
                        San Francisco, CA
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Calendar
                        className="w-3 h-3 sm:w-4 sm:h-4 text-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm">6+ Years Exp.</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Code
                        className="w-3 h-3 sm:w-4 sm:h-4 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm">Full-Stack</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Cloud
                        className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm">Cloud Expert</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I'm passionate about creating digital solutions that make a
                  real impact. With expertise spanning frontend, backend, and
                  DevOps, I approach each project with attention to detail and a
                  focus on performance. When I'm not coding, you can find me
                  contributing to open-source projects, mentoring junior
                  developers, or exploring new technologies.
                </p>
              </div>
            </article>

            {/* Features highlights */}
            <div
              className={cn(isVisible ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-4">
                What I Bring to the Table
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURE_HIGHLIGHTS.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <MagneticElement key={feature.title} strength={0.1}>
                      <article
                        className={cn(
                          "p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-card/60 to-background/60 backdrop-blur-md border border-white/10",
                          "hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl",
                          "animate-fade-in-up"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                        aria-label={`${feature.title}: ${feature.description}`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                            aria-hidden="true"
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-foreground mb-2 text-base sm:text-lg">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Experience & Education */}
          <div className="space-y-8">
            {/* Tabs */}
            <div
              className="flex gap-2 p-1 rounded-2xl bg-gradient-to-r from-white/5 to-white/5 backdrop-blur-md border border-white/10"
              role="tablist"
              aria-label="Experience and education tabs"
            >
              <Button
                onClick={() => handleTabChange("experience")}
                variant={activeTab === "experience" ? "primary" : "ghost"}
                className="flex-1 backdrop-blur-sm"
                aria-selected={activeTab === "experience"}
                role="tab"
                aria-controls="experience-content"
                id="experience-tab"
                icon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
                iconPosition="left"
              >
                Experience
              </Button>
              <Button
                onClick={() => handleTabChange("education")}
                variant={activeTab === "education" ? "primary" : "ghost"}
                className="flex-1 backdrop-blur-sm"
                aria-selected={activeTab === "education"}
                role="tab"
                aria-controls="education-content"
                id="education-tab"
                icon={<GraduationCap className="w-4 h-4" aria-hidden="true" />}
                iconPosition="left"
              >
                Education
              </Button>
            </div>

            {/* Tab content */}
            <div className="relative">
              {/* Timeline content */}
              <div
                id={`${activeTab}-content`}
                role="tabpanel"
                aria-labelledby={`${activeTab}-tab`}
                className={cn(
                  "space-y-6",
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: "300ms" }}
              >
                {timelineData.map((item, index) => (
                  <MagneticElement key={item.id} strength={0.05}>
                    <article
                      className={cn(
                        "relative pl-8 sm:pl-10 pb-8 border-l-2 border-primary/40 last:pb-0 group",
                        "animate-fade-in-up"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      itemScope
                      itemType={
                        activeTab === "experience"
                          ? "https://schema.org/Person"
                          : "https://schema.org/EducationalOccupationalCredential"
                      }
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-background shadow-lg" />

                      {/* Current indicator */}
                      {"current" in item && item.current && (
                        <div
                          className="absolute -left-3 top-0 w-2 h-2 rounded-full bg-primary animate-ping"
                          aria-hidden="true"
                        />
                      )}

                      {/* Card */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-md border border-white/10 group-hover:border-primary/50 transition-all duration-300 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                          <div>
                            <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                              {"position" in item
                                ? item.position
                                : `${item.degree} in ${item.field}`}
                            </h4>
                            <div className="flex items-center gap-3 mt-2">
                              <TimelineIcon
                                className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                                aria-hidden="true"
                              />
                              <span className="text-primary font-semibold">
                                {"company" in item
                                  ? item.company
                                  : item.institution}
                              </span>
                              {"current" in item && item.current && (
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 border border-green-500/20">
                                  Current
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            {item.period}
                          </span>
                        </div>

                        {/* Description */}
                        {"description" in item ? (
                          <ul
                            className="space-y-3 mb-6"
                            aria-label="Responsibilities"
                          >
                            {item.description.map((desc, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <>
                            {"grade" in item && item.grade && (
                              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-secondary/10 to-accent/10 mb-6">
                                <Award
                                  className="w-5 h-5 text-secondary"
                                  aria-hidden="true"
                                />
                                <span className="text-base font-semibold text-foreground">
                                  {item.grade}
                                </span>
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Specialized in software engineering principles,
                              algorithms, data structures, and modern software
                              development methodologies.
                            </p>
                          </>
                        )}

                        {/* Technologies */}
                        {"technologies" in item && (
                          <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-white/5 hover:border-primary/20"
                                aria-label={`Technology: ${tech}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </MagneticElement>
                ))}
              </div>

              {/* Stats section */}
              <article
                className={cn(
                  "mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 backdrop-blur-md border border-white/10 shadow-xl",
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: "400ms" }}
                aria-label="Career highlights and statistics"
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-8">
                  Career Highlights
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {STATS_DATA.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-4" aria-label="Skills progress">
                  {SKILLS_DATA.map((skill, index) => (
                    <div key={skill.label} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">
                          {skill.label}
                        </span>
                        <span className="text-primary font-bold">
                          {Math.round(progressValues[index])}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out shadow-lg`}
                          style={{
                            width: `${progressValues[index]}%`,
                          }}
                          role="progressbar"
                          aria-valuenow={progressValues[index]}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label={`${skill.label} progress: ${Math.round(
                            progressValues[index]
                          )}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <footer
          className={cn(
            "mt-16 text-center",
            isVisible ? "animate-fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "500ms" }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-xl">
              <Zap
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                aria-hidden="true"
              />
            </div>

            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-base">
                Let's discuss your project and create something exceptional
                together. I'm always excited to take on new challenges and
                deliver outstanding results.
              </p>
            </div>

            <Button
              onClick={scrollToContact}
              variant="primary"
              size="lg"
              icon={
                <TrendingUp
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  aria-hidden="true"
                />
              }
              iconPosition="left"
              className="group px-8 py-4 text-base"
              aria-label="Start a conversation about your project"
            >
              Start a Conversation
              <div
                className="w-2 h-2 rounded-full bg-white/50 animate-pulse ml-3"
                aria-hidden="true"
              />
            </Button>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default AboutSection;
