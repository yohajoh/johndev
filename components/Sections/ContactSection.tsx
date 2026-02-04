"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Users,
  MessageSquare,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { MagneticElement } from "../Cursor/CustomCursor";
import { InteractiveButton } from "../Cursor/CustomCursor";
import { CONTACT_INFO } from "@/lib/constants";
import { cn, isValidEmail } from "@/lib/utils";
import { sendContactForm, ContactFormData } from "@/lib/api/contact";

// Professional earthy color palette (no blues/pinks/purples)
const colors = {
  primary: "#059669", // Emerald
  secondary: "#D97706", // Amber
  accent: "#DC2626", // Red
  dark: "#111827", // Gray 900
  light: "#F9FAFB", // Gray 50
  muted: "#6B7280", // Gray 500
  highlight: "#7C3AED", // Violet (only for highlights)
  success: "#10B981", // Green
};

interface ElegantBorderProps {
  children: React.ReactNode;
  className?: string;
}

const ElegantBorder = ({ children, className = "" }: ElegantBorderProps) => {
  return (
    <div className={className ? `relative ${className}` : "relative"}>
      {/* Corner accents - hidden on mobile for cleaner look */}
      <div className="hidden sm:block absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400/30 rounded-tl-md" />
      <div className="hidden sm:block absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/30 rounded-tr-md" />
      <div className="hidden sm:block absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-md" />
      <div className="hidden sm:block absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/30 rounded-br-md" />
      
      {/* Content container */}
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg border border-gray-700/30 rounded-lg sm:rounded-xl">
        {children}
      </div>
    </div>
  );
};

// Creative background with mobile optimizations
const CreativeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient - earthy tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/20" />
      
      {/* Subtle grid pattern - reduced opacity on mobile */}
      <div 
        className="absolute inset-0 opacity-3 sm:opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, ${colors.primary}20 98%),
            linear-gradient(0deg, transparent 98%, ${colors.secondary}20 98%)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Geometric shapes - simplified for mobile */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48">
        <div 
          className="absolute inset-0 border border-emerald-500/5"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'float 25s ease-in-out infinite',
          }}
        />
      </div>
      
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-64 sm:h-64">
        <div 
          className="absolute inset-0 border border-amber-500/5"
          style={{
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            animation: 'float 30s ease-in-out infinite reverse',
          }}
        />
      </div>
      
      {/* Subtle orbs - reduced blur on mobile */}
      <div className="absolute top-1/4 right-1/3 w-40 h-40 sm:w-64 sm:h-64">
        <div className="absolute inset-0 bg-emerald-500/3 rounded-full blur-xl sm:blur-3xl" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 sm:w-96 sm:h-96">
        <div className="absolute inset-0 bg-amber-500/2 rounded-full blur-xl sm:blur-3xl" />
      </div>
    </div>
  );
};

// Mobile-optimized form field
const CreativeFormField = ({
  id,
  name,
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
}) => {
  const isTextArea = type === "textarea";
  const hasError = !!error;
  const isActive = activeField === id;

  const fieldProps = {
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    className: cn(
      "w-full px-4 py-3 rounded-lg transition-all duration-300 font-medium text-base sm:text-sm",
      "bg-gray-800/30 border",
      "placeholder:text-gray-500 placeholder:text-sm",
      "focus:outline-none focus:ring-1",
      "backdrop-blur-sm",
      hasError
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : isActive
        ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20"
        : "border-gray-600/50 hover:border-emerald-500/30 focus:border-emerald-500/50"
    ),
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `${id}-error` : undefined,
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Icon className="w-4 h-4 text-emerald-400" />
          {label}
        </label>
      </div>

      <div className="relative">
        {isTextArea ? (
          <textarea {...fieldProps} rows={rows} />
        ) : (
          <input {...fieldProps} type={type} />
        )}

        {/* Active indicator - hidden on mobile */}
        {isActive && !hasError && (
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500" />
        )}

        {/* Error indicator */}
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-400 flex items-center gap-2 animate-fade-in"
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
  const [errorMessage, setErrorMessage] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  // Memoize contact info
  const memoizedContactInfo = useMemo(() => CONTACT_INFO || [], []);

  // Intersection Observer with mobile threshold
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
        threshold: 0.05, // Lower threshold for mobile
        rootMargin: "30px",
      }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Form validation
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

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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
        setErrorMessage("Please fix the errors in the form");
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
        }, 3000);
        return;
      }

      setIsSubmitting(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const formData: ContactFormData = {
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
          subject: formState.subject.trim() || undefined,
        };

        const result = await sendContactForm(formData);

        if (result.success) {
          setIsSuccess(true);
          setFormState({ name: "", email: "", subject: "", message: "" });
          setErrors({});
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          setErrorMessage(result.error || "Failed to send message");
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
            setErrorMessage("");
          }, 5000);
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
        }, 5000);
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

  // Field definitions
  const formFields = useMemo(
    () => [
      {
        id: "name",
        name: "name",
        label: "Your Name",
        icon: Users,
        type: "text",
        placeholder: "John Doe",
      },
      {
        id: "email",
        name: "email",
        label: "Email Address",
        icon: Mail,
        type: "email",
        placeholder: "john@example.com",
      },
      {
        id: "subject",
        name: "subject",
        label: "Subject (Optional)",
        icon: Zap,
        type: "text",
        placeholder: "Project Inquiry or General Question",
      },
      {
        id: "message",
        name: "message",
        label: "Your Message",
        icon: MessageSquare,
        type: "textarea",
        placeholder: "Tell me about your project...",
        rows: 4, // Reduced rows for mobile
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Creative Background */}
      <CreativeBackground />

      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header - Mobile optimized */}
        <div
          className={cn(
            "text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <MagneticElement strength={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 sm:mb-6">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-emerald-400">
                Get In Touch
              </span>
            </div>
          </MagneticElement>

          <h1
            id="contact-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6"
          >
            Ready to{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400">
                Collaborate?
              </span>
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 rounded-full" />
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
            Let's discuss your project and explore how we can work together to create something exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Left column - Contact form */}
          <div
            className={cn(
              "transition-all duration-700 delay-150",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            )}
          >
            <ElegantBorder>
              <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    Send a Message
                  </h2>
                  <p className="text-sm sm:text-base text-gray-400">
                    I'll respond within 24 hours
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 lg:space-y-6"
                  noValidate
                >
                  <div className="space-y-3 sm:space-y-4">
                    {formFields.map((field) => (
                      <CreativeFormField
                        key={field.id}
                        {...field}
                        value={formState[field.id as keyof typeof formState]}
                        error={errors[field.id]}
                        activeField={activeField}
                        onChange={handleChange}
                        onFocus={() => handleFieldFocus(field.id)}
                        onBlur={handleFieldBlur}
                      />
                    ))}
                  </div>

                  {/* Submit button - Mobile optimized */}
                  <div className="pt-2 sm:pt-3 lg:pt-4">
                    <InteractiveButton
                      type="submit"
                      className="w-full group relative overflow-hidden rounded-lg active:scale-[0.98] transition-transform"
                      disabled={isSubmitting}
                    >
                      {/* Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-amber-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity" />
                      
                      {/* Button content */}
                      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="font-semibold text-sm sm:text-base">Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                            <span className="font-semibold text-sm sm:text-base">Send Message</span>
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                          </>
                        )}
                      </div>
                    </InteractiveButton>
                  </div>

                  {/* Status messages */}
                  <div className="min-h-[50px] sm:min-h-[60px]">
                    {isSuccess && (
                      <div className="p-3 sm:p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <div className="flex items-start gap-2 sm:gap-3 text-emerald-400">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm sm:text-base">Message sent successfully!</p>
                            <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                              I'll get back to you soon.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {isError && (
                      <div className="p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-start gap-2 sm:gap-3 text-red-400">
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm sm:text-base">
                              {errorMessage || "Submission failed!"}
                            </p>
                            <p className="text-xs sm:text-sm opacity-80 mt-0.5">
                              Please check and try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </ElegantBorder>
          </div>

          {/* Right column - Contact info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact methods - Mobile optimized */}
            <div
              className={cn(
                "transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
            >
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Direct Contact
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {memoizedContactInfo.map((info) => {
                  const Icon = info.icon;
                  const getIconColor = () => {
                    switch(info.type) {
                      case 'email': return 'text-emerald-400';
                      case 'telephone': return 'text-amber-400';
                      case 'location': return 'text-gray-400';
                      default: return 'text-emerald-400';
                    }
                  };

                  return (
                    <MagneticElement key={info.type} strength={0.1}>
                      <div className="group">
                        <ElegantBorder>
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-800/20 transition-colors"
                          >
                            <div className="relative flex-shrink-0">
                              <div className={cn(
                                "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center",
                                info.type === 'email' ? 'bg-emerald-500/10' :
                                info.type === 'telephone' ? 'bg-amber-500/10' :
                                'bg-gray-500/10'
                              )}>
                                <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6", getIconColor())} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs sm:text-sm text-gray-400 truncate">
                                {info.label}
                              </div>
                              <div className="font-medium text-white group-hover:text-emerald-400 transition-colors text-sm sm:text-base truncate">
                                {info.value}
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                          </a>
                        </ElegantBorder>
                      </div>
                    </MagneticElement>
                  );
                })}
              </div>
            </div>

            {/* Availability & Info - Stacked on mobile */}
            <div className="space-y-3 sm:space-y-4">
              {/* Response time */}
              <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
                      Response Time
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                      I typically respond within 24 hours on weekdays.
                    </p>
                  </div>
                </div>
              </div>

              {/* Project discussion */}
              <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
                      Let's Build Together
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Whether it's a new project or collaboration, I'm excited to hear about your ideas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
