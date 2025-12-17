"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronRight,
  X,
  ArrowRight,
  Star,
  Eye,
  Code2,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { InfiniteMarquee } from "@/components/UI/InfiniteMarquee";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { ProjectModal } from "@/components/Projects/ProjectModal";

const PROJECTS_DATA = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Marketplace Solution",
    category: "Full-Stack",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    description:
      "A scalable e-commerce platform handling millions of transactions.",
    context:
      "A rapidly growing retail company needed to migrate from a legacy monolithic system to a modern, scalable platform capable of handling 10x traffic during peak seasons while reducing operational costs.",
    action:
      "Architected a microservices-based solution using React for the frontend, Node.js/Express for backend services, and PostgreSQL with Redis caching. Implemented event-driven architecture using AWS SQS for order processing.",
    result:
      "Successfully migrated 500K+ products and 2M+ users with zero downtime. The new platform achieved sub-200ms response times under load, reduced infrastructure costs by 45%, and enabled the business to scale during Black Friday with 15x normal traffic.",
    metrics: [
      { label: "Response Time", value: "<200ms", icon: Zap },
      { label: "Cost Reduction", value: "45%", icon: TrendingUp },
      { label: "Peak Traffic", value: "15x", icon: Users },
      { label: "Uptime", value: "99.99%", icon: Star },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: true,
    color: "primary",
  },
  {
    id: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    subtitle: "Real-Time Financial Intelligence",
    category: "Data Visualization",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    technologies: ["TypeScript", "Vue.js", "D3.js", "Go", "TimescaleDB"],
    description:
      "Real-time analytics platform processing millions of data points per second.",
    context:
      "A financial services firm required a real-time analytics platform to process and visualize millions of market data points per second, replacing an aging system that struggled with 100K points.",
    action:
      "Built a high-performance data pipeline using Go for stream processing, TimescaleDB for time-series storage, and Vue.js with D3.js for interactive visualizations. Implemented WebSocket connections for real-time updates.",
    result:
      "Delivered a platform processing 5M+ data points per second with 99.9% accuracy. Traders reported 60% faster decision-making, and the firm gained competitive advantage with sub-second market insights.",
    metrics: [
      { label: "Data Points/sec", value: "5M+", icon: Zap },
      { label: "Accuracy", value: "99.9%", icon: Star },
      { label: "Decision Speed", value: "+60%", icon: TrendingUp },
      { label: "Latency", value: "<50ms", icon: Code2 },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: true,
    color: "secondary",
  },
  {
    id: "healthcare-platform",
    title: "Healthcare Management System",
    subtitle: "HIPAA-Compliant Patient Portal",
    category: "Enterprise",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
    technologies: ["React", "Python", "Django", "Kubernetes", "GCP"],
    description:
      "Secure healthcare platform unifying patient records across facilities.",
    context:
      "A healthcare network needed to unify patient records across 50+ facilities while maintaining strict HIPAA compliance and enabling telemedicine capabilities during the pandemic.",
    action:
      "Designed a secure, HIPAA-compliant architecture on GCP with end-to-end encryption. Built a React-based patient portal with Django backend, implemented OAuth 2.0 with MFA, and deployed using Kubernetes.",
    result:
      "Unified 2M+ patient records with zero security incidents. Telemedicine adoption increased 400%, patient satisfaction scores improved by 35%, and the system passed all compliance audits.",
    metrics: [
      { label: "Patient Records", value: "2M+", icon: Users },
      { label: "Telemedicine Growth", value: "+400%", icon: TrendingUp },
      { label: "Satisfaction", value: "+35%", icon: Star },
      { label: "Security Incidents", value: "0", icon: Zap },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: true,
    color: "accent",
  },
  {
    id: "ai-content-platform",
    title: "AI Content Generation Platform",
    subtitle: "Machine Learning at Scale",
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    technologies: ["Next.js", "Python", "FastAPI", "OpenAI", "Vercel"],
    description:
      "AI-powered content creation platform with editorial workflows.",
    context:
      "A media company wanted to automate content creation while maintaining editorial quality, aiming to increase output by 10x without expanding their writing team.",
    action:
      "Integrated OpenAI GPT-4 with custom fine-tuning for brand voice. Built a Next.js frontend with real-time editing, FastAPI backend for model orchestration, and implemented human-in-the-loop review workflows.",
    result:
      "Enabled 12x content output with 90% editorial approval rate on first pass. Reduced time-to-publish from days to hours, and the platform now generates 500+ articles monthly.",
    metrics: [
      { label: "Output Increase", value: "12x", icon: TrendingUp },
      { label: "Approval Rate", value: "90%", icon: Star },
      { label: "Monthly Articles", value: "500+", icon: Code2 },
      { label: "Time Saved", value: "80%", icon: Zap },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: false,
    color: "primary",
  },
  {
    id: "iot-monitoring",
    title: "IoT Monitoring Platform",
    subtitle: "Industrial Sensor Management",
    category: "IoT",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    technologies: ["React Native", "MQTT", "InfluxDB", "Grafana", "AWS IoT"],
    description:
      "Real-time monitoring of industrial sensors with predictive maintenance.",
    context:
      "A manufacturing company needed real-time monitoring of 10,000+ industrial sensors across multiple factories to predict equipment failures and reduce downtime.",
    action:
      "Built a comprehensive IoT platform using MQTT for device communication, InfluxDB for sensor data storage, and React Native for mobile monitoring. Implemented ML-based anomaly detection for predictive maintenance.",
    result:
      "Reduced unplanned downtime by 70%, saved $2M annually in maintenance costs, and achieved 95% accuracy in failure prediction 48 hours in advance.",
    metrics: [
      { label: "Downtime Reduction", value: "70%", icon: TrendingUp },
      { label: "Annual Savings", value: "$2M", icon: Star },
      { label: "Prediction Accuracy", value: "95%", icon: Zap },
      { label: "Sensors Monitored", value: "10K+", icon: Users },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: false,
    color: "secondary",
  },
  {
    id: "social-platform",
    title: "Social Networking App",
    subtitle: "Community Building Platform",
    category: "Mobile",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
    technologies: ["React Native", "Firebase", "GraphQL", "Algolia", "Stripe"],
    description:
      "Niche social platform for professional communities with real-time features.",
    context:
      "A startup needed to launch a niche social platform for professional communities with real-time chat, content sharing, and monetization features within a tight 4-month deadline.",
    action:
      "Developed a cross-platform mobile app using React Native, Firebase for real-time features, GraphQL for efficient data fetching, Algolia for search, and Stripe for subscription management.",
    result:
      "Launched on schedule with 50K users in the first month. Achieved 4.8 App Store rating, 65% monthly active user retention, and $100K MRR within 6 months.",
    metrics: [
      { label: "Launch Users", value: "50K", icon: Users },
      { label: "App Rating", value: "4.8★", icon: Star },
      { label: "MAU Retention", value: "65%", icon: TrendingUp },
      { label: "6-Month MRR", value: "$100K", icon: Code2 },
    ],
    links: { github: "https://github.com", live: "https://demo.com" },
    featured: false,
    color: "accent",
  },
];

const CATEGORIES = [
  "All",
  "Full-Stack",
  "AI/ML",
  "Enterprise",
  "Mobile",
  "IoT",
  "Data Visualization",
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS_DATA)[0] | null
  >(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Filter projects based on category
  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  const featuredProjects = PROJECTS_DATA.filter((project) => project.featured);

  // Handle project selection
  const handleSelectProject = (id: string) => {
    const project = PROJECTS_DATA.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        handleCloseModal();
      }
      if (e.key === "ArrowRight" && selectedProject) {
        const currentIndex = PROJECTS_DATA.findIndex(
          (p) => p.id === selectedProject.id
        );
        const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
        setSelectedProject(PROJECTS_DATA[nextIndex]);
      }
      if (e.key === "ArrowLeft" && selectedProject) {
        const currentIndex = PROJECTS_DATA.findIndex(
          (p) => p.id === selectedProject.id
        );
        const prevIndex =
          (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        setSelectedProject(PROJECTS_DATA[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding-lg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"
        style={{ y }}
      />

      <div className="container-wide relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary-foreground text-sm font-medium rounded-full mb-4 border border-secondary/20"
            whileHover={{ scale: 1.05 }}
            // variants={itemVariants}
          >
            <Code2 className="w-4 h-4" />
            Project Showcase
          </motion.div>
          <motion.h2
            className="font-heading text-foreground mb-6"
            // variants={itemVariants}
          >
            Featured <span className="text-gradient-secondary">Work</span>
          </motion.h2>
          <motion.p
            className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            // variants={itemVariants}
          >
            A curated selection of projects demonstrating end-to-end technical
            expertise, from architecture design to production deployment.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CATEGORIES.map((category, index) => (
            <MagneticElement key={category} strength={0.1}>
              <motion.button
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                // variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    {
                      PROJECTS_DATA.filter((p) => p.category === category)
                        .length
                    }
                  </span>
                )}
              </motion.button>
            </MagneticElement>
          ))}
        </motion.div>

        {/* Infinite Marquee */}
        <motion.div
          // variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <InfiniteMarquee
            items={PROJECTS_DATA.map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
            }))}
            onItemClick={handleSelectProject}
            speed={30}
          />
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              onClick={() => handleSelectProject(project.id)}
            />
          ))}
        </motion.div>

        {/* All Projects Grid */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="font-heading text-2xl text-foreground mb-8 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-primary" />
              All Projects
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredProjects.length})
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  // variants={itemVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => handleSelectProject(project.id)}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                        <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="font-heading text-xl text-foreground mb-1">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold flex items-center gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border/50 mb-8">
            <h3 className="font-heading text-2xl text-foreground mb-3">
              Have a Project in Mind?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how we can bring your ideas to life with
              cutting-edge technology.
            </p>
            <MagneticElement strength={0.2}>
              <motion.button
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </MagneticElement>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
            onNext={() => {
              const currentIndex = PROJECTS_DATA.findIndex(
                (p) => p.id === selectedProject.id
              );
              const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
              setSelectedProject(PROJECTS_DATA[nextIndex]);
            }}
            onPrev={() => {
              const currentIndex = PROJECTS_DATA.findIndex(
                (p) => p.id === selectedProject.id
              );
              const prevIndex =
                (currentIndex - 1 + PROJECTS_DATA.length) %
                PROJECTS_DATA.length;
              setSelectedProject(PROJECTS_DATA[prevIndex]);
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/10 blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default ProjectsSection;
