"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  ChevronDown,
  Search,
  ExternalLink,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { MinimalMonogramLogo } from "@/components/Logo/MonogramLogo";
import MonogramLogo from "@/components/Logo/MonogramLogo";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "#hero",
    icon: Home,
    submenu: null,
  },
  {
    label: "About",
    href: "#about",
    icon: User,
    submenu: [
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Certifications", href: "#certifications" },
    ],
  },
  {
    label: "Skills",
    href: "#skills",
    icon: Code2,
    submenu: [
      { label: "Frontend", href: "#frontend" },
      { label: "Backend", href: "#backend" },
      { label: "DevOps", href: "#devops" },
    ],
  },
  {
    label: "Projects",
    href: "#projects",
    icon: Briefcase,
    submenu: [
      { label: "Featured", href: "#featured" },
      { label: "All Projects", href: "#all-projects" },
      { label: "Case Studies", href: "#case-studies" },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
    icon: Mail,
    submenu: null,
  },
];

const QUICK_LINKS = [
  { label: "Resume", href: "/resume.pdf", icon: ExternalLink },
  { label: "Blog", href: "/blog", icon: ExternalLink },
  { label: "GitHub", href: "https://github.com", icon: ExternalLink },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setShowSearch(false);
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSearch(!showSearch);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background with Glass Effect */}
        <motion.div
          className={`absolute inset-0 backdrop-blur-xl transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg"
              : "bg-transparent"
          }`}
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          }}
        />

        <div className="container-wide relative">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MagneticElement strength={0.2}>
                <div className="relative">
                  <MonogramLogo
                    size={40}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  {isScrolled && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </div>
              </MagneticElement>
              <div className="hidden md:block">
                <span
                  className={`font-heading font-bold text-lg tracking-tight transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  } group-hover:text-primary dark:group-hover:text-primary`}
                >
                  Yohannes
                  <span className="text-secondary dark:text-secondary">
                    Belete
                  </span>
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredItem(item.label);
                      if (item.submenu) setOpenSubmenu(item.label);
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      if (item.submenu && !hoveredItem?.includes("submenu-")) {
                        setOpenSubmenu(null);
                      }
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "text-primary dark:text-primary"
                          : isScrolled
                          ? "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}

                      {/* Active Indicator */}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.a>

                    {/* Submenu */}
                    {item.submenu && openSubmenu === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/20 dark:border-gray-800/20 shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(subItem.href);
                                setOpenSubmenu(null);
                              }}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                              onMouseEnter={() =>
                                setHoveredItem(`submenu-${subItem.label}`)
                              }
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <span>{subItem.label}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Search Button */}
                <MagneticElement strength={0.3}>
                  <motion.button
                    onClick={() => setShowSearch(!showSearch)}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      isScrolled
                        ? "bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700"
                        : "bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30"
                    } border border-gray-200/20 dark:border-gray-800/20`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </MagneticElement>

                {/* Theme Toggle */}
                <MagneticElement strength={0.3}>
                  <motion.button
                    onClick={toggleTheme}
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      isScrolled
                        ? "bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700"
                        : "bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-700/30"
                    } border border-gray-200/20 dark:border-gray-800/20`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="w-4 h-4 text-yellow-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="w-4 h-4 text-blue-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticElement>

                {/* CTA Button */}
                <MagneticElement strength={0.2}>
                  <motion.button
                    onClick={() => scrollToSection("#contact")}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.button>
                </MagneticElement>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/20 dark:border-gray-800/20"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-500" />
                )}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/20 dark:border-gray-800/20"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
            >
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for projects, skills, or articles..."
                    className="w-full px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xl"
                    autoFocus
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/20 dark:border-gray-800/20 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200/20 dark:border-gray-800/20">
                <div className="flex items-center gap-3 mb-6">
                  <MinimalMonogramLogo size={32} />
                  <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                    Yohannes<span className="text-secondary">Belete</span>
                  </span>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-4">
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => {
                          if (item.submenu) {
                            setOpenSubmenu(
                              openSubmenu === item.label ? null : item.label
                            );
                          } else {
                            scrollToSection(item.href);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors ${
                          activeSection === item.href.substring(1)
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.submenu && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openSubmenu === item.label ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Mobile Submenu */}
                      {item.submenu && openSubmenu === item.label && (
                        <motion.div
                          className="ml-8 mt-1 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(subItem.href);
                                setIsMobileMenuOpen(false);
                              }}
                              className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <h3 className="font-heading text-lg text-gray-900 dark:text-white mb-2">
                    Ready to Start a Project?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Lets discuss how I can help bring your ideas to life.
                  </p>
                  <button
                    onClick={() => {
                      scrollToSection("#contact");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
