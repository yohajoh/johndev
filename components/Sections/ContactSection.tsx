"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  MessageSquare,
  Zap,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { InteractiveButton } from "../Cursor/CustomCursor";
import { CONTACT_INFO, SOCIAL_LINKS, WORKING_HOURS } from "@/lib/constants";
import { cn, isValidEmail } from "@/lib/utils";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Animation for contact items
  const getAnimationDelay = (index: number) => {
    return `${index * 100}ms`;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-background to-gray-900/10"
      aria-labelledby="contact-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10 dot-pattern"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Animated lines */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            style={{
              top: `${i * 10}%`,
              transform: `translateX(${
                Math.sin(Date.now() / 3000 + i) * 50
              }px)`,
            }}
          />
        ))}
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <MagneticElement strength={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Get In Touch
              </span>
            </div>
          </MagneticElement>

          <h2
            id="contact-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Let's{" "}
            <span className="text-gradient-primary relative">
              Connect
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss potential collaboration?
            I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Contact form */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-100",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <div className="p-8 rounded-3xl gradient-border backdrop-blur-sm bg-gradient-to-br from-card/80 to-background/80">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                Send a Message
              </h3>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and I'll get back to you as soon as
                possible.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Users className="w-4 h-4 text-primary" />
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.name
                          ? "border-red-500/50 focus:border-red-500"
                          : activeField === "name"
                          ? "border-primary/50"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="John Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : activeField === "email"
                          ? "border-primary/50"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="john@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.subject
                          ? "border-red-500/50 focus:border-red-500"
                          : activeField === "subject"
                          ? "border-primary/50"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="Project Inquiry"
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300 resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50",
                        errors.message
                          ? "border-red-500/50 focus:border-red-500"
                          : activeField === "message"
                          ? "border-primary/50"
                          : "border-white/10 hover:border-white/20"
                      )}
                      placeholder="Tell me about your project..."
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <div className="absolute right-3 top-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <InteractiveButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Send Message
                      <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                    </>
                  )}
                </InteractiveButton>

                {/* Success/Error messages */}
                <div className="transition-all duration-300">
                  {isSuccess && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500"
                      role="alert"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <div>
                        <p className="font-medium">
                          Message sent successfully!
                        </p>
                        <p className="text-sm opacity-80">
                          I'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {isError && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Something went wrong!</p>
                        <p className="text-sm opacity-80">
                          Please try again later.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right column - Contact info */}
          <div className="space-y-8">
            {/* Contact information */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-200",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              )}
            >
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {CONTACT_INFO.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <MagneticElement key={info.type} strength={0.1}>
                      <a
                        href={info.href}
                        target={
                          info.href?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={cn(
                          "group flex items-center gap-4 p-4 rounded-2xl",
                          "bg-gradient-to-br from-card/50 to-background/50 border border-white/10",
                          "hover:border-primary/30 transition-all duration-300",
                          "reveal-up"
                        )}
                        style={{ transitionDelay: getAnimationDelay(index) }}
                        aria-label={info.label}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">
                            {info.label}
                          </div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </a>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>

            {/* Working hours */}
            <div
              className={cn(
                "p-6 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-white/10",
                "transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              )}
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Working Hours
              </h3>

              <div className="space-y-3">
                {WORKING_HOURS.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-all duration-300",
                      schedule.available
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-white/5 opacity-60"
                    )}
                    style={{ transitionDelay: `${index * 50 + 300}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {schedule.day}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "text-sm",
                        schedule.available
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {schedule.hours}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response time */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Average Response Time
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Within 24 hours on business days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              className={cn(
                "transition-all duration-1000 ease-out delay-400",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              )}
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Connect with Me
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <MagneticElement key={social.platform} strength={0.2}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex flex-col items-center justify-center p-4 rounded-2xl",
                          "bg-gradient-to-br from-card/50 to-background/50 border border-white/10",
                          "hover:border-primary/30 transition-all duration-300",
                          "reveal-up"
                        )}
                        style={{
                          transitionDelay: getAnimationDelay(index + 3),
                        }}
                        aria-label={social.label}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center mb-2",
                            social.color,
                            "group-hover:scale-110 transition-transform duration-300"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", social.textColor)} />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          {social.platform}
                        </span>
                      </a>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>

            {/* Call to action */}
            <div
              className={cn(
                "p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 border border-white/10",
                "transition-all duration-1000 ease-out delay-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="text-center">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  Ready to Start Your Project?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Let's schedule a call to discuss your requirements in detail.
                </p>
                <InteractiveButton
                  onClick={() =>
                    window.open("https://calendly.com/your-link", "_blank")
                  }
                  variant="primary"
                  className="group"
                >
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Schedule a Call
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                </InteractiveButton>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className={cn(
            "mt-16 rounded-3xl overflow-hidden gradient-border",
            "transition-all duration-1000 ease-out delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                  San Francisco, CA
                </h4>
                <p className="text-muted-foreground">
                  Based in the heart of Silicon Valley
                </p>
              </div>
            </div>

            {/* Map grid */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-secondary to-accent blur-3xl" />
      </div>

      {/* Animated particles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
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
    </section>
  );
};

export default ContactSection;
