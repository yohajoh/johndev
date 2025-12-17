"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Loader2,
  MessageSquare,
  User,
  Briefcase,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { MagneticElement } from "@/components/Cursor/CustomCursor";
import { toast } from "sonner";

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@yohannesbelete.dev",
    href: "mailto:hello@yohannesbelete.dev",
    description: "For inquiries and collaborations",
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
    iconColor: "text-red-500",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Available Mon-Fri, 9AM-6PM PST",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-500",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    href: null,
    description: "Open to remote work worldwide",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    iconColor: "text-green-500",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "< 24 hours",
    href: null,
    description: "Typically respond within a day",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    iconColor: "text-purple-500",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/yohannesbelete",
    label: "GitHub",
    color: "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yohannesbelete",
    label: "LinkedIn",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yohannesbelete",
    label: "Twitter",
    color: "hover:bg-sky-500 hover:text-white",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/yohannesbelete",
    label: "Instagram",
    color: "hover:bg-pink-600 hover:text-white",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@yohannesbelete",
    label: "YouTube",
    color: "hover:bg-red-600 hover:text-white",
  },
];

const WORK_HOURS = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
  { day: "Friday", hours: "9:00 AM - 5:00 PM" },
  { day: "Saturday", hours: "By appointment" },
  { day: "Sunday", hours: "Closed" },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContact, setActiveContact] = useState(0);

  // Rotate active contact method
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % CONTACT_METHODS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please check the form for errors");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
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

  const cubicBezier: [number, number, number, number] = [0.4, 0, 0.2, 1];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "backOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl animate-pulse-soft" />
      <div
        className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-secondary/10 to-transparent blur-3xl animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      />

      {/* Decorative Dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0
              ? "bg-primary/30"
              : i % 3 === 1
              ? "bg-secondary/30"
              : "bg-accent/30"
          }`}
          style={{
            left: `${5 + i * 6}%`,
            top: `${10 + (i % 5) * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

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
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-foreground text-sm font-medium rounded-full mb-4 border border-primary/20 dark:border-primary/30"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <h2 className="font-heading text-foreground mb-6">
            Lets <span className="text-gradient-primary">Connect</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? I&#39;d
            love to hear from you. Fill out the form below and I&#39;ll respond
            within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information - Left Column */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            variants={itemVariants}
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl text-foreground mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Information
              </h3>

              <div className="space-y-4">
                {CONTACT_METHODS.map((method, index) => (
                  <MagneticElement key={method.title} strength={0.1}>
                    <motion.a
                      href={method.href || undefined}
                      target={method.href ? "_blank" : undefined}
                      rel={method.href ? "noopener noreferrer" : undefined}
                      className={`block p-5 rounded-2xl border transition-all duration-300 ${
                        activeContact === index
                          ? "border-primary/40 bg-gradient-to-r from-primary/5 to-transparent shadow-lg"
                          : "border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-md"
                      }`}
                      custom={index}
                      // variants={cardVariants}
                      whileHover="hover"
                      onMouseEnter={() => setActiveContact(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}
                        >
                          <method.icon
                            className={`w-6 h-6 ${method.iconColor}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading text-lg text-foreground mb-1">
                            {method.title}
                          </h4>
                          <p
                            className={`text-sm font-medium mb-1 ${
                              method.href
                                ? "text-primary hover:text-primary/80 transition-colors"
                                : "text-muted-foreground"
                            }`}
                          >
                            {method.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                        {activeContact === index && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </div>
                    </motion.a>
                  </MagneticElement>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50">
              <h3 className="font-heading text-lg text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-secondary" />
                Follow Me
              </h3>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <MagneticElement key={social.label} strength={0.2}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground ${social.color} transition-all duration-300`}
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
          </motion.div>

          {/* Contact Form - Right 2 Columns */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              className="h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 border border-border/50 backdrop-blur-sm shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-2xl text-foreground mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for reaching out. I&#39;ll review your message and
                    get back to you within 24 hours.
                  </p>
                  <MagneticElement strength={0.2}>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Another Message
                    </motion.button>
                  </MagneticElement>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-foreground">
                        Send a Message
                      </h3>
                      <p className="text-muted-foreground">
                        Fill out the form below and I&#39;ll get back to you
                        ASAP
                      </p>
                    </div>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <User className="w-4 h-4 text-primary" />
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                              errors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-border/50 focus:border-primary"
                            }`}
                          />
                          {errors.name && (
                            <motion.p
                              className="absolute -bottom-5 left-0 text-xs text-red-500"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Mail className="w-4 h-4 text-primary" />
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                              errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-border/50 focus:border-primary"
                            }`}
                          />
                          {errors.email && (
                            <motion.p
                              className="absolute -bottom-5 left-0 text-xs text-red-500"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project Inquiry / Collaboration / Other"
                          className={`w-full px-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
                            errors.subject
                              ? "border-red-500 focus:border-red-500"
                              : "border-border/50 focus:border-primary"
                          }`}
                        />
                        {errors.subject && (
                          <motion.p
                            className="absolute -bottom-5 left-0 text-xs text-red-500"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Your Message
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Tell me about your project, timeline, and how I can help..."
                          className={`w-full px-4 py-3 bg-background/50 border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none ${
                            errors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-border/50 focus:border-primary"
                          }`}
                        />
                        {errors.message && (
                          <motion.p
                            className="absolute -bottom-5 left-0 text-xs text-red-500"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.message}
                          </motion.p>
                        )}
                        <div className="absolute bottom-2 right-2">
                          <span
                            className={`text-xs ${
                              formData.message.length > 450
                                ? "text-red-500"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formData.message.length}/500
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <MagneticElement strength={0.15}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative px-8 py-4 bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              <span>Send Message</span>
                            </>
                          )}
                        </div>

                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.button>
                    </MagneticElement>

                    <p className="text-xs text-center text-muted-foreground/70 pt-4 border-t border-border/30">
                      By submitting this form, you agree to be contacted
                      regarding your inquiry. Your information is secure and
                      will never be shared with third parties.
                    </p>
                  </form>
                </>
              )}
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                {
                  value: "24h",
                  label: "Avg Response Time",
                  color: "bg-blue-500/10 text-blue-600",
                },
                {
                  value: "100%",
                  label: "Client Satisfaction",
                  color: "bg-green-500/10 text-green-600",
                },
                {
                  value: "50+",
                  label: "Projects Completed",
                  color: "bg-purple-500/10 text-purple-600",
                },
                {
                  value: "5★",
                  label: "Avg Rating",
                  color: "bg-yellow-500/10 text-yellow-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default ContactSection;
