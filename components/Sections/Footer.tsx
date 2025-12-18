"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Coffee,
  Code2,
  Rocket,
  ArrowUp,
  Sun,
  Moon,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Copyright,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { InteractiveButton } from "../Cursor/CustomCursor";
import { NAVIGATION, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { cn, getCurrentYear } from "@/lib/utils";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentYear] = useState(getCurrentYear());
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footer = document.getElementById("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-b from-background via-gray-900/20 to-background border-t border-white/10"
      aria-label="Footer"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-10 noise-texture"
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Animated gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ transform: `translateX(${scrollProgress - 100}%)` }}
      />

      <div className="container-wide relative z-10">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand column */}
            <div
              className={cn(
                "space-y-6 transition-all duration-1000 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="font-heading font-bold text-xl text-white">
                      YB
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Yohannes Belete
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Senior Developer & Architect
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Building exceptional digital experiences with modern
                technologies. Specializing in full-stack development, cloud
                architecture, and performance optimization.
              </p>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.slice(0, 4).map((social) => {
                  const Icon = social.icon;
                  return (
                    <MagneticElement key={social.platform} strength={0.2}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          "bg-white/5 border border-white/10 backdrop-blur-sm",
                          "transition-all duration-300 hover:scale-110 hover:shadow-lg",
                          "group"
                        )}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </a>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>

            {/* Quick links */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" />
                Quick Links
              </h3>
              <nav className="space-y-3" aria-label="Footer navigation">
                {NAVIGATION.map((item) => (
                  <MagneticElement key={item.id} strength={0.1}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(item.id);
                        if (element) {
                          const offset = 80;
                          const elementPosition =
                            element.getBoundingClientRect().top;
                          const offsetPosition =
                            elementPosition + window.pageYOffset - offset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300"
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-all duration-300 group-hover:w-3" />
                      <span className="text-sm">{item.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticElement>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Services
              </h3>
              <div className="space-y-3">
                {[
                  "Full-Stack Development",
                  "Cloud Architecture",
                  "DevOps & CI/CD",
                  "Performance Optimization",
                  "Technical Consulting",
                  "Team Leadership",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 text-muted-foreground group"
                  >
                    <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-secondary transition-all duration-300" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Contact Info
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.type}
                      href={info.href}
                      className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300"
                      aria-label={info.label}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs opacity-75">{info.label}</div>
                        <div className="text-sm font-medium">{info.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Newsletter & CTA */}
          <div
            className={cn(
              "mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-white/10",
              "transition-all duration-1000 ease-out delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground">
                  Subscribe to my newsletter for the latest updates, tech
                  insights, and exclusive content.
                </p>
              </div>

              <form className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                    aria-label="Email address for newsletter"
                  />
                  <InteractiveButton
                    type="submit"
                    variant="primary"
                    className="group"
                  >
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Subscribe
                  </InteractiveButton>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam ever. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Copyright className="w-4 h-4" />
              <span>{currentYear} Yohannes Belete. All rights reserved.</span>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and</span>
                <Coffee className="w-4 h-4 text-amber-600" />
                <span>in San Francisco</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } theme`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </button>

              {/* Back to top */}
              <InteractiveButton
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                Back to Top
              </InteractiveButton>
            </div>
          </div>

          {/* Privacy links */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/10">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Disclaimer",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-20 left-10 opacity-5">
        <Sparkles className="w-20 h-20" />
      </div>
      <div className="absolute top-20 right-10 opacity-5">
        <Rocket className="w-20 h-20" />
      </div>

      {/* Animated particles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 10 + 5
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
