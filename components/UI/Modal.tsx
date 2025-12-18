"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, IconButton } from "@/components/UI/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventScroll = true,
  className,
  overlayClassName,
  contentClassName,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle body scroll
  useEffect(() => {
    if (isOpen && preventScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, preventScroll]);

  // Handle focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Save previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    } else {
      modalRef.current?.focus();
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handle tab key for focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);

      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-lg transition-all duration-500",
          "animate-in fade-in",
          overlayClassName
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full rounded-3xl overflow-hidden",
          "bg-gradient-to-br from-card to-gray-900/90 backdrop-blur-xl border border-white/10",
          "shadow-2xl shadow-black/30",
          "transition-all duration-500 transform-gpu",
          "animate-in fade-in zoom-in-95",
          sizeClasses[size],
          className
        )}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <div className="absolute top-4 right-4 z-10">
            <IconButton
              onClick={onClose}
              icon={<X className="w-5 h-5" aria-hidden="true" />}
              label="Close modal"
              variant="ghost"
              size="sm"
              className="rounded-full"
            />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div className="p-6 pb-4 border-b border-white/10">
            {title && (
              <h2
                id="modal-title"
                className="font-heading text-2xl font-bold text-foreground mb-2"
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                id="modal-description"
                className="text-muted-foreground text-sm"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("overflow-y-auto max-h-[70vh]", contentClassName)}>
          {children}
        </div>

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "danger" | "success";
  isLoading?: boolean;
}

export const ConfirmModal = ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  isLoading = false,
  ...modalProps
}: ConfirmModalProps) => {
  const variantClasses = {
    default: "bg-gradient-to-r from-primary to-secondary",
    danger: "bg-gradient-to-r from-red-600 to-red-700",
    success: "bg-gradient-to-r from-green-600 to-emerald-600",
  };

  return (
    <Modal {...modalProps}>
      <div className="p-6">
        <p className="text-foreground mb-6 text-center">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onCancel || modalProps.onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            variant="gradient"
            className={cn("flex-1", variantClasses[variant])}
            loading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Alert Modal
export const AlertModal = ({
  message,
  title = "Alert",
  buttonText = "OK",
  onClose,
  variant = "default",
  ...modalProps
}: Omit<
  ConfirmModalProps,
  "onConfirm" | "onCancel" | "confirmText" | "cancelText"
>) => {
  return (
    <Modal title={title} onClose={onClose} {...modalProps}>
      <div className="p-6">
        <p className="text-foreground mb-6 text-center">{message}</p>

        <div className="flex justify-center">
          <Button
            onClick={onClose}
            variant={variant === "danger" ? "danger" : "primary"}
            className="px-8"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
