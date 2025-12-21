"use client";

import { useEffect } from "react";
import { X, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { NAVIGATION, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import MonogramLogo from "@/components/UI/MonogramLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle navigation click
  const handleNavigationClick = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg transition-opacity duration-500"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-background via-card to-background",
          "border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out transform-gpu",
          "flex flex-col"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MonogramLogo size={45} />
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Yohannes Belete
                </h2>
                <p className="text-xs text-muted-foreground">
                  Senior Developer
                </p>
              </div>
            </div>

            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Navigation links */}
        <nav
          className="flex-1 overflow-y-auto p-6"
          aria-label="Mobile navigation"
        >
          <div className="space-y-2">
            {NAVIGATION.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => handleNavigationClick(item.href)}
                  variant="ghost"
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-left justify-start"
                  aria-label={`Navigate to ${item.name}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon
                      className="w-5 h-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-muted-foreground -rotate-90"
                    aria-hidden="true"
                  />
                </Button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Contact info */}
          <div className="mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.type}
                    href={info.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    aria-label={info.label}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="font-medium text-foreground">
                        {info.value}
                      </div>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social links */}
          <div className="mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Connect
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
                      social.color,
                      "hover:scale-105 hover:shadow-lg"
                    )}
                    aria-label={social.label}
                  >
                    <Icon
                      className={cn("w-5 h-5 mb-1", social.textColor)}
                      aria-hidden="true"
                    />
                    <span
                      className={cn("text-xs font-medium", social.textColor)}
                    >
                      {social.platform}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer with CTA */}
        <div className="p-6 border-t border-white/10">
          <Button
            onClick={() => {
              handleNavigationClick("#contact");
              onClose();
            }}
            variant="primary"
            className="w-full group"
            icon={
              <MessageSquare
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                aria-hidden="true"
              />
            }
            iconPosition="left"
          >
            Get in Touch
            <div
              className="w-2 h-2 rounded-full bg-white/50 animate-pulse ml-2"
              aria-hidden="true"
            />
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Available for freelance projects & full-time opportunities
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
