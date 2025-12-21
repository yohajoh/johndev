export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: string[];
  rateLimit?: {
    remaining: number;
    reset: number;
  };
  retryAfter?: number;
}

/**
 * Send contact form data to the API
 */
export async function sendContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to send message",
        errors: result.errors,
        retryAfter: result.retryAfter,
      };
    }

    return {
      success: true,
      message: result.message || "Message sent successfully!",
      rateLimit: result.rateLimit,
    };
  } catch (error) {
    console.error("API call error:", error);

    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

/**
 * Check if the API is healthy
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/contact");
    return response.ok;
  } catch {
    return false;
  }
}
