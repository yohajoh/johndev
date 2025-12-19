"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ExternalLink,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { InteractiveButton } from "../Cursor/CustomCursor";
import { CONTACT_INFO, SOCIAL_LINKS, WORKING_HOURS } from "@/lib/constants";
import { cn, isValidEmail } from "@/lib/utils";

// Gradient border wrapper component
const GradientBorderCard = ({
  children,
  className = "",
  innerClassName = "",
  intensity = "normal",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  intensity?: "normal" | "high";
}) => {
  const borderIntensity = intensity === "high" ? "0.3" : "0.15";

  return (
    <div className={cn("relative rounded-3xl p-[2px]", className)}>
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent"
        style={{
          opacity: borderIntensity,
          filter: `blur(${intensity === "high" ? "8px" : "4px"})`,
        }}
        aria-hidden="true"
      />

      {/* Glowing shadow effect */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent"
        style={{
          opacity: `${intensity === "high" ? "0.1" : "0.05"}`,
          filter: `blur(${intensity === "high" ? "40px" : "20px"})`,
          transform: "translateZ(0)",
        }}
        aria-hidden="true"
      />

      {/* Inner content */}
      <div
        className={cn(
          "relative rounded-3xl bg-gradient-to-br from-card/90 via-background/90 to-card/90",
          "backdrop-blur-sm border border-white/5",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

// Optimized background effects component
const ContactBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient with shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-gray-900/10 shadow-2xl" />

      {/* Subtle animated mesh gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(14, 165, 233, 0.1) 0px, transparent 50%)
          `,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Glowing orbs with proper shadows */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl"
          style={{
            animation: "pulse 8s ease-in-out infinite",
            boxShadow: "0 0 100px 50px rgba(168, 85, 247, 0.1)",
          }}
        />
      </div>

      {/* Animated lines (CSS-only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            style={{
              top: `${i * 10}%`,
              animation: `lineFloat ${20 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable form field component with gradient focus effect
const GradientFormField = ({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  error,
  activeField,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  rows,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  error?: string;
  activeField: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
  rows?: number;
}) => {
  const isTextArea = type === "textarea";
  const hasError = !!error;
  const isActive = activeField === id;

  const fieldProps = {
    id,
    name: id,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    className: cn(
      "w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:shadow-lg focus:shadow-primary/20",
      "placeholder:text-muted-foreground/50 backdrop-blur-sm",
      hasError
        ? "border-red-500/50 focus:border-red-500"
        : isActive
        ? "border-primary/50"
        : "border-white/10 hover:border-white/20 hover:shadow-md"
    ),
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `${id}-error` : undefined,
  };

  return (
    <div className="space-y-2 relative">
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground flex items-center gap-2"
      >
        <div className="relative">
          <Icon className="w-4 h-4 text-primary relative z-10" />
          {isActive && (
            <div
              className="absolute -inset-1 bg-primary/20 rounded-full blur-md animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>
        {label}
      </label>

      {/* Gradient border effect on focus */}
      {isActive && !hasError && (
        <div
          className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse"
          aria-hidden="true"
        />
      )}

      <div className="relative">
        {isTextArea ? (
          <textarea {...fieldProps} rows={rows} />
        ) : (
          <input {...fieldProps} type={type} />
        )}

        {/* Error indicator */}
        {hasError && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className="relative">
              <AlertCircle className="w-5 h-5 text-red-500 relative z-10" />
              <div
                className="absolute inset-0 bg-red-500/20 rounded-full blur-sm"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* Active field glow */}
        {isActive && !hasError && (
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-500 animate-fade-in flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
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

  // Memoize constants
  const memoizedContactInfo = useMemo(() => CONTACT_INFO || [], []);
  const memoizedSocialLinks = useMemo(() => SOCIAL_LINKS || [], []);
  const memoizedWorkingHours = useMemo(() => WORKING_HOURS || [], []);

  // Intersection Observer with cleanup
  useEffect(() => {
    if (!sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.unobserve(entry.target);
        }
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
    };
  }, []);

  // Form validation with memoization
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formState.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formState.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formState.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
        setErrors({});

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } catch (error) {
        setIsError(true);
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm]
  );

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field if exists
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Handle field focus
  const handleFieldFocus = useCallback((fieldId: string) => {
    setActiveField(fieldId);
  }, []);

  // Handle field blur
  const handleFieldBlur = useCallback(() => {
    setActiveField(null);
  }, []);

  // Animation delay calculator
  const getAnimationDelay = useCallback((index: number) => {
    return `${index * 100}ms`;
  }, []);

  // Schedule a call handler
  const handleScheduleCall = useCallback(() => {
    window.open(
      "https://calendly.com/your-link",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  // Field definitions for reusable rendering
  const formFields = useMemo(
    () => [
      {
        id: "name",
        label: "Your Name",
        icon: Users,
        type: "text",
        placeholder: "John Doe",
      },
      {
        id: "email",
        label: "Email Address",
        icon: Mail,
        type: "email",
        placeholder: "john@example.com",
      },
      {
        id: "message",
        label: "Your Message",
        icon: MessageSquare,
        type: "textarea",
        placeholder: "Tell me about your project...",
        rows: 5,
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 overflow-hidden bg-background"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* SEO Metadata */}
      <meta itemProp="name" content="Contact Yohannes Belete" />
      <meta
        itemProp="description"
        content="Get in touch with Yohannes Belete for project inquiries, collaboration opportunities, or technical consultations."
      />
      <link itemProp="url" href="https://yourdomain.com/#contact" />

      {/* Optimized Background */}
      <ContactBackground />

      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          role="banner"
        >
          <MagneticElement strength={0.1}>
            <GradientBorderCard
              className="inline-block mb-6 shadow-2xl shadow-primary/20"
              intensity="high"
            >
              <div className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Get In Touch
                  </span>
                </div>
              </div>
            </GradientBorderCard>
          </MagneticElement>

          <h1
            id="contact-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            itemProp="headline"
          >
            Let's{" "}
            <span className="text-gradient-primary relative">
              Connect
              <div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse shadow-lg shadow-primary/50"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            itemProp="description"
          >
            Have a project in mind or want to discuss potential collaboration?
            I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Contact form */}
          <div
            className={cn(
              "transition-all duration-700 ease-out delay-150",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            )}
          >
            <GradientBorderCard
              className="shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-500"
              intensity="high"
              innerClassName="p-8"
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Send a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and I'll get back to you as soon as
                possible.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-label="Contact form"
              >
                {formFields.map((field) => (
                  <GradientFormField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    icon={field.icon}
                    type={field.type}
                    value={formState[field.id as keyof typeof formState]}
                    error={errors[field.id]}
                    activeField={activeField}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus(field.id)}
                    onBlur={handleFieldBlur}
                    placeholder={field.placeholder}
                    rows={field.rows}
                  />
                ))}

                {/* Submit button with enhanced gradient */}
                <div className="pt-4">
                  <InteractiveButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full group relative overflow-hidden shadow-xl shadow-primary/30 hover:shadow-primary/40"
                    disabled={isSubmitting}
                    aria-label={
                      isSubmitting ? "Sending message..." : "Send message"
                    }
                  >
                    {/* Button gradient background */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />

                    {/* Button glow effect */}
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />

                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                            aria-hidden="true"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send
                            className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                            aria-hidden="true"
                          />
                          <span>Send Message</span>
                          <div
                            className="w-2 h-2 rounded-full bg-white/50 animate-pulse"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </div>
                  </InteractiveButton>
                </div>

                {/* Success/Error messages with gradient borders */}
                <div className="transition-all duration-300 min-h-[80px]">
                  {isSuccess && (
                    <GradientBorderCard
                      className="shadow-lg shadow-green-500/20 animate-fade-in"
                      innerClassName="p-4"
                    >
                      <div
                        className="flex items-center gap-3 text-green-500"
                        role="alert"
                        aria-live="polite"
                      >
                        <div className="relative">
                          <CheckCircle
                            className="w-5 h-5 relative z-10"
                            aria-hidden="true"
                          />
                          <div
                            className="absolute inset-0 bg-green-500/20 rounded-full blur-sm"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            Message sent successfully!
                          </p>
                          <p className="text-sm opacity-80">
                            I'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    </GradientBorderCard>
                  )}

                  {isError && (
                    <GradientBorderCard
                      className="shadow-lg shadow-red-500/20 animate-fade-in"
                      innerClassName="p-4"
                    >
                      <div
                        className="flex items-center gap-3 text-red-500"
                        role="alert"
                        aria-live="assertive"
                      >
                        <div className="relative">
                          <AlertCircle
                            className="w-5 h-5 relative z-10"
                            aria-hidden="true"
                          />
                          <div
                            className="absolute inset-0 bg-red-500/20 rounded-full blur-sm"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Submission failed!</p>
                          <p className="text-sm opacity-80">
                            Please check the form and try again.
                          </p>
                        </div>
                      </div>
                    </GradientBorderCard>
                  )}
                </div>
              </form>
            </GradientBorderCard>
          </div>

          {/* Right column - Contact info */}
          <div className="space-y-8">
            {/* Contact information */}
            <div
              className={cn(
                "transition-all duration-700 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                {memoizedContactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <MagneticElement key={info.type} strength={0.1}>
                      <GradientBorderCard
                        className="shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1"
                        innerClassName="p-4"
                      >
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
                          className="group flex items-center gap-4"
                          aria-label={info.label}
                          itemProp={
                            info.type === "email"
                              ? "email"
                              : info.type === "telephone"
                              ? "telephone"
                              : "url"
                          }
                        >
                          <div className="relative">
                            <div
                              className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center shadow-lg`}
                              aria-hidden="true"
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            {/* Icon glow effect */}
                            <div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-muted-foreground">
                              {info.label}
                            </div>
                            <div
                              className="font-medium text-foreground group-hover:text-primary transition-colors duration-300"
                              itemProp={
                                info.type === "email"
                                  ? "email"
                                  : info.type === "telephone"
                                  ? "telephone"
                                  : "name"
                              }
                            >
                              {info.value}
                            </div>
                          </div>
                          <ExternalLink
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      </GradientBorderCard>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>

            {/* Social links */}
            <div
              className={cn(
                "transition-all duration-700 ease-out delay-600",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Connect with Me
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {memoizedSocialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <MagneticElement key={social.platform} strength={0.2}>
                      <GradientBorderCard
                        className="shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1"
                        innerClassName="p-4"
                      >
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center"
                          style={{
                            transitionDelay: getAnimationDelay(index + 3),
                          }}
                          aria-label={`Follow me on ${social.platform}`}
                          itemProp="sameAs"
                        >
                          <div className="relative mb-2">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                                social.color,
                                "group-hover:scale-110 transition-transform duration-300"
                              )}
                              aria-hidden="true"
                            >
                              <Icon
                                className={cn("w-5 h-5", social.textColor)}
                              />
                            </div>
                            {/* Hover glow effect */}
                            <div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {social.platform}
                          </span>
                        </a>
                      </GradientBorderCard>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Location section */}
      </div>

      {/* Performance optimized particles */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ContactSection;

// <div
//           className={cn(
//             "mt-16 transition-all duration-700 ease-out delay-900",
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           )}
//         >
//           <GradientBorderCard
//             className="shadow-2xl shadow-primary/20"
//             intensity="high"
//           >
//             <div
//               className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800"
//               itemScope
//               itemType="https://schema.org/Place"
//             >
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <GradientBorderCard
//                     className="inline-block mb-4 shadow-2xl shadow-primary/20"
//                     intensity="high"
//                     innerClassName="p-4"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center">
//                       <MapPin className="w-8 h-8 text-primary" />
//                     </div>
//                   </GradientBorderCard>
//                   <h4
//                     className="font-heading text-xl font-bold text-foreground mb-2"
//                     itemProp="name"
//                   >
//                     San Francisco, CA
//                   </h4>
//                   <p className="text-muted-foreground" itemProp="description">
//                     Based in the heart of Silicon Valley
//                   </p>
//                 </div>
//               </div>

//               {/* Decorative map grid */}
//               <div className="absolute inset-0 opacity-5 pointer-events-none">
//                 {Array.from({ length: 10 }).map((_, i) => (
//                   <div
//                     key={`h-${i}`}
//                     className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
//                     style={{ top: `${i * 10}%` }}
//                   />
//                 ))}
//                 {Array.from({ length: 10 }).map((_, i) => (
//                   <div
//                     key={`v-${i}`}
//                     className="absolute w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"
//                     style={{ left: `${i * 10}%` }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </GradientBorderCard>
//         </div>
