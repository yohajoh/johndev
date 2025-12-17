"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  ArrowUp,
  ExternalLink,
  MapPin,
  Phone,
  Calendar,
  Code2,
  Facebook,
  Instagram,
  Youtube,
  Send,
  ChevronRight,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import MonogramLogo from "@/components/Logo/MonogramLogo";

const FOOTER_LINKS = {
  Navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Apps", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "DevOps", href: "#services" },
    { label: "Consulting", href: "#services" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Documentation", href: "/docs" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Open Source", href: "/open-source" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/yohannesbelete",
    label: "GitHub",
    color: "hover:bg-gray-900 dark:hover:bg-gray-800",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yohannesbelete",
    label: "LinkedIn",
    color: "hover:bg-blue-600",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yohannesbelete",
    label: "Twitter",
    color: "hover:bg-sky-500",
  },
  {
    icon: Facebook,
    href: "https://facebook.com/yohannesbelete",
    label: "Facebook",
    color: "hover:bg-blue-700",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/yohannesbelete",
    label: "Instagram",
    color: "hover:bg-pink-600",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@yohannesbelete",
    label: "YouTube",
    color: "hover:bg-red-600",
  },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@yohannesbelete.dev",
    href: "mailto:hello@yohannesbelete.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: null },
  {
    icon: Calendar,
    label: "Available",
    value: "Mon - Fri, 9AM - 6PM PST",
    href: null,
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <footer className="relative bg-gradient-to-b from-background via-gray-50/50 dark:via-gray-900/50 to-background border-t border-gray-200/30 dark:border-gray-800/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      {/* Floating Shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-32 h-32 rounded-full blur-3xl ${
            i % 3 === 0
              ? "bg-primary/10"
              : i % 3 === 1
              ? "bg-secondary/10"
              : "bg-accent/10"
          }`}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container-wide relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Left Column - Brand & Contact */}
            <div className="space-y-8">
              {/* Brand */}
              <div className="space-y-6">
                <motion.a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTop();
                  }}
                  className="inline-flex items-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <MagneticElement strength={0.2}>
                    <MonogramLogo
                      size={48}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </MagneticElement>
                  <div>
                    <span className="font-heading text-2xl font-bold text-gray-900 dark:text-white block">
                      Yohannes<span className="text-secondary">Belete</span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Senior Full-Stack Developer
                    </span>
                  </div>
                </motion.a>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                  Building exceptional digital experiences with modern
                  technologies. Specializing in full-stack development, cloud
                  architecture, and performance optimization for scalable
                  applications.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-gray-900 dark:text-white">
                  Get In Touch
                </h3>
                <div className="space-y-3">
                  {CONTACT_INFO.map((info) => (
                    <div key={info.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          {info.label}
                        </span>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-gray-900 dark:text-white font-medium">
                            {info.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-gray-900 dark:text-white">
                  Connect With Me
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <MagneticElement key={social.label} strength={0.3}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    </MagneticElement>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Links & Newsletter */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Navigation Links */}
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-heading text-lg text-gray-900 dark:text-white">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (link.href.startsWith("#")) {
                              e.preventDefault();
                              scrollToSection(link.href);
                            }
                          }}
                          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 group"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl text-gray-900 dark:text-white mb-3">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Subscribe to my newsletter for the latest projects, tutorials,
                  and insights.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <MagneticElement strength={0.2}>
                    <motion.button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubscribing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          <span>Subscribe</span>
                        </div>
                      )}
                    </motion.button>
                  </MagneticElement>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  No spam ever. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {currentYear} Yohannes Belete. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Made With Love */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                Made with
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                using
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Next.js + Tailwind
                </span>
              </div>
            </div>

            {/* Back to Top */}
            <MagneticElement strength={0.3}>
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <span className="text-sm font-medium">Back to Top</span>
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
