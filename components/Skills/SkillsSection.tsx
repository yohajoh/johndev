"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Server,
  Lock,
  Zap,
  GitBranch,
  Box,
  Brain,
  Palette,
  Smartphone,
  LineChart,
  Shield,
  Rocket,
  Wifi,
  Users,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "primary",
    description: "Building responsive and interactive user interfaces",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "secondary",
    description: "Developing robust server-side applications",
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Cloud,
    color: "accent",
    description: "Deploying and maintaining scalable infrastructure",
  },
  {
    id: "tools",
    label: "Tools",
    icon: Box,
    color: "primary",
    description: "Development tools and technologies",
  },
  {
    id: "soft",
    label: "Soft Skills",
    icon: Brain,
    color: "secondary",
    description: "Professional and interpersonal abilities",
  },
];

const SKILLS_DATA = {
  frontend: [
    {
      name: "React / Next.js",
      level: 98,
      icon: Code2,
      description: "Building modern web applications",
    },
    {
      name: "TypeScript",
      level: 95,
      icon: Code2,
      description: "Type-safe JavaScript development",
    },
    {
      name: "Vue.js / Nuxt.js",
      level: 88,
      icon: Globe,
      description: "Progressive framework expertise",
    },
    {
      name: "Tailwind CSS",
      level: 96,
      icon: Palette,
      description: "Utility-first CSS framework",
    },
    {
      name: "Framer Motion",
      level: 92,
      icon: Layers,
      description: "Animation and interaction library",
    },
    {
      name: "Three.js / R3F",
      level: 85,
      icon: Box,
      description: "3D graphics and visualization",
    },
  ],
  backend: [
    {
      name: "Node.js / Express",
      level: 96,
      icon: Server,
      description: "Server-side JavaScript runtime",
    },
    {
      name: "Python / Django",
      level: 90,
      icon: Terminal,
      description: "Full-stack Python framework",
    },
    {
      name: "Go",
      level: 85,
      icon: Cpu,
      description: "High-performance systems programming",
    },
    {
      name: "PostgreSQL",
      level: 94,
      icon: Database,
      description: "Advanced relational database",
    },
    {
      name: "MongoDB",
      level: 88,
      icon: Database,
      description: "NoSQL document database",
    },
    {
      name: "Redis",
      level: 90,
      icon: Database,
      description: "In-memory data structure store",
    },
    {
      name: "GraphQL",
      level: 92,
      icon: GitBranch,
      description: "Query language for APIs",
    },
    {
      name: "REST APIs",
      level: 98,
      icon: MessageSquare,
      description: "Designing robust APIs",
    },
  ],
  devops: [
    {
      name: "AWS",
      level: 95,
      icon: Cloud,
      description: "Cloud infrastructure and services",
    },
    {
      name: "Docker",
      level: 96,
      icon: Box,
      description: "Containerization platform",
    },
    {
      name: "Kubernetes",
      level: 90,
      icon: Layers,
      description: "Container orchestration",
    },
    {
      name: "CI/CD",
      level: 94,
      icon: GitBranch,
      description: "Continuous integration/deployment",
    },
    {
      name: "Terraform",
      level: 88,
      icon: Cloud,
      description: "Infrastructure as code",
    },
    {
      name: "Monitoring",
      level: 92,
      icon: LineChart,
      description: "System observability",
    },
    {
      name: "Security",
      level: 89,
      icon: Shield,
      description: "Security best practices",
    },
    {
      name: "Linux / Bash",
      level: 93,
      icon: Terminal,
      description: "System administration",
    },
  ],
  tools: [
    {
      name: "Git / GitHub",
      level: 98,
      icon: GitBranch,
      description: "Version control and collaboration",
    },
    {
      name: "VS Code",
      level: 97,
      icon: Code2,
      description: "Code editor and extensions",
    },
    {
      name: "Webpack / Vite",
      level: 91,
      icon: Box,
      description: "Build tools and bundlers",
    },
    {
      name: "Jest / Cypress",
      level: 90,
      icon: Shield,
      description: "Testing frameworks",
    },
    {
      name: "Figma",
      level: 85,
      icon: Palette,
      description: "Design and prototyping",
    },
    {
      name: "Postman",
      level: 94,
      icon: MessageSquare,
      description: "API development and testing",
    },
  ],
  soft: [
    {
      name: "Problem Solving",
      level: 96,
      icon: Brain,
      description: "Analytical thinking and solutions",
    },
    {
      name: "Communication",
      level: 94,
      icon: MessageSquare,
      description: "Clear and effective communication",
    },
    {
      name: "Leadership",
      level: 92,
      icon: Rocket,
      description: "Team leadership and mentoring",
    },
    {
      name: "Agile / Scrum",
      level: 95,
      icon: Layers,
      description: "Project management methodologies",
    },
    {
      name: "Time Management",
      level: 93,
      icon: Zap,
      description: "Efficient task prioritization",
    },
    {
      name: "Collaboration",
      level: 97,
      icon: Users,
      description: "Team collaboration and coordination",
    },
  ],
};

const SKILLS_OVERVIEW = [
  {
    category: "Frontend",
    stats: [
      { label: "Frameworks", value: "React, Vue, Angular" },
      { label: "Styling", value: "Tailwind, SCSS, CSS-in-JS" },
      { label: "State Management", value: "Redux, Context, Zustand" },
      { label: "Performance", value: "Lighthouse 95+" },
    ],
  },
  {
    category: "Backend",
    stats: [
      { label: "Languages", value: "Node.js, Python, Go" },
      { label: "Databases", value: "PostgreSQL, MongoDB, Redis" },
      { label: "APIs", value: "REST, GraphQL, WebSocket" },
      { label: "Architecture", value: "Microservices, Monolith" },
    ],
  },
  {
    category: "Infrastructure",
    stats: [
      { label: "Cloud", value: "AWS, GCP, Azure" },
      { label: "Containers", value: "Docker, Kubernetes" },
      { label: "CI/CD", value: "GitHub Actions, Jenkins" },
      { label: "Monitoring", value: "Prometheus, Grafana" },
    ],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animate progress on view
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  };

  const currentSkills = SKILLS_DATA[activeCategory as keyof typeof SKILLS_DATA];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div
        className="container-wide relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={itemVariants}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4 border border-accent/20"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-4 h-4" />
            Technical Expertise
          </motion.span>
          <h2 className="font-heading text-foreground mb-6">
            Skills & <span className="text-gradient-accent">Technologies</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit refined over years of building production
            systems at scale, combining technical expertise with practical
            experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Category Selector */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <h3 className="font-heading text-lg text-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Categories
                </h3>

                <div className="space-y-3">
                  {SKILL_CATEGORIES.map((category) => (
                    <MagneticElement key={category.id} strength={0.1}>
                      <motion.button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
                          activeCategory === category.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50 border border-transparent"
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            activeCategory === category.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`font-heading font-semibold ${
                              activeCategory === category.id
                                ? "text-primary"
                                : "text-foreground"
                            }`}
                          >
                            {category.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            activeCategory === category.id
                              ? "text-primary rotate-90"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>
                    </MagneticElement>
                  ))}
                </div>
              </div>

              {/* Skills Overview */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50">
                <h3 className="font-heading text-lg text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  Quick Overview
                </h3>

                <div className="space-y-4">
                  {SKILLS_OVERVIEW.map((overview) => (
                    <div key={overview.category} className="space-y-2">
                      <h4 className="font-medium text-sm text-foreground">
                        {overview.category}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {overview.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="p-2 rounded-lg bg-background/50 border border-border/50"
                          >
                            <div className="text-xs text-muted-foreground">
                              {stat.label}
                            </div>
                            <div className="text-sm font-medium text-foreground truncate">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills Visualization */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="p-6 md:p-8 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading text-2xl text-foreground mb-1">
                    {
                      SKILL_CATEGORIES.find((c) => c.id === activeCategory)
                        ?.label
                    }{" "}
                    Skills
                  </h3>
                  <p className="text-muted-foreground">
                    {
                      SKILL_CATEGORIES.find((c) => c.id === activeCategory)
                        ?.description
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gradient-primary">
                    {Math.round(
                      currentSkills.reduce(
                        (acc, skill) => acc + skill.level,
                        0
                      ) / currentSkills.length
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg. Proficiency
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="space-y-6">
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            hoveredSkill === skill.name
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          } transition-colors duration-300`}
                        >
                          <skill.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-heading text-base text-foreground">
                            {skill.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          hoveredSkill === skill.name
                            ? "text-primary"
                            : "text-foreground"
                        } transition-colors duration-300`}
                      >
                        {skill.level}%
                      </div>
                    </div>

                    {/* Skill Bar */}
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          skill.level >= 90
                            ? "bg-gradient-to-r from-primary to-secondary"
                            : skill.level >= 80
                            ? "bg-gradient-to-r from-primary to-accent"
                            : "bg-primary"
                        } relative`}
                        variants={skillBarVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      >
                        {/* Animated Glow */}
                        {hoveredSkill === skill.name && (
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <span className="text-xs text-muted-foreground">
                    Expert (90-100%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span className="text-xs text-muted-foreground">
                    Advanced (80-89%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">
                    Proficient (70-79%)
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Zap,
                  title: "Fast Learner",
                  description:
                    "Quickly adapt to new technologies and frameworks",
                  color: "primary",
                },
                {
                  icon: Rocket,
                  title: "Performance Focus",
                  description:
                    "Optimize for speed, efficiency, and scalability",
                  color: "secondary",
                },
                {
                  icon: Shield,
                  title: "Best Practices",
                  description:
                    "Follow industry standards and security guidelines",
                  color: "accent",
                },
              ].map((highlight, index) => (
                <MagneticElement key={highlight.title} strength={0.1}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-${highlight.color}/10 flex items-center justify-center mb-4`}
                    >
                      <highlight.icon
                        className={`w-6 h-6 text-${highlight.color}`}
                      />
                    </div>
                    <h4 className="font-heading text-lg text-foreground mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </motion.div>
                </MagneticElement>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
