import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate form data
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("Name is required");
  } else if (data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (data.name.trim().length > 100) {
    errors.push("Name must be less than 100 characters");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(data.email.trim())) {
    errors.push("Please enter a valid email address");
  }

  if (!data.message?.trim()) {
    errors.push("Message is required");
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  } else if (data.message.trim().length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // With this:
  rateLimit.forEach((timestamps: number[], key: string) => {
    const filtered = timestamps.filter((time: number) => time > windowStart);
    if (filtered.length === 0) {
      rateLimit.delete(key);
    } else {
      rateLimit.set(key, filtered);
    }
  });

  // Get or create timestamps for this IP
  const timestamps = rateLimit.get(ip) || [];
  const recentRequests = timestamps.filter(
    (time: number) => time > windowStart
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Add current request
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - recentRequests.length,
  };
}

// REAL-WORLD: Create email transporter based on environment
function createTransporter() {
  console.log("=== createTransporter Debug ===");
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY?.length);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  // Check if we should use Resend
  const hasResendKey =
    process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0;
  const isProduction = process.env.NODE_ENV === "production";
  const useResend = hasResendKey && isProduction;

  console.log("hasResendKey:", hasResendKey);
  console.log("isProduction:", isProduction);
  console.log("useResend:", useResend);

  if (useResend) {
    console.log("✅ Using Resend for production emails");
    const apiKey = process.env.RESEND_API_KEY!.trim();
    console.log(
      "Resend API key (first 10 chars):",
      apiKey.substring(0, 10) + "..."
    );

    return {
      sendMail: async (options: any) => {
        try {
          console.log("📤 Sending via Resend to:", options.to);

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: options.from,
              to: options.to,
              reply_to: options.replyTo || options.reply_to,
              subject: options.subject,
              html: options.html,
              text: options.text,
            }),
          });

          console.log("Resend response status:", res.status);

          const responseData = await res.json();
          console.log("Resend response:", responseData);

          if (!res.ok) {
            console.error("❌ Resend API error:", responseData);
            throw new Error(
              `Resend API error: ${responseData.message || res.statusText}`
            );
          }

          console.log("✅ Email sent successfully via Resend");
          return { messageId: responseData.id || "resend-" + Date.now() };
        } catch (error) {
          console.error("❌ Error in Resend sendMail:", error);
          throw error;
        }
      },
    };
  }

  console.log("⚠️ Using Gmail SMTP for development emails");

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    const error = new Error(
      "Gmail credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env.local"
    );
    console.error("❌", error.message);
    throw error;
  }

  console.log("✅ Gmail credentials available");

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// 🔥 SIMPLE & RELIABLE: Send emails sequentially
async function sendEmailsSequentially(
  name: string,
  email: string,
  message: string,
  subject: string
) {
  const startTime = Date.now();

  try {
    const transporter = createTransporter();
    const isProduction = process.env.NODE_ENV === "production";
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Yohannes Belete";
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "johndev.omera.tech";

    let fromAddress: string;
    if (isProduction && process.env.RESEND_API_KEY) {
      fromAddress = `"${siteName}" <contact@${domain}>`;
    } else {
      fromAddress = `"${siteName}" <${
        process.env.EMAIL_USER || "ybelete490@gmail.com"
      }>`;
    }

    const emailSubject =
      subject?.trim() || `New Contact Form Submission from ${name.trim()}`;

    // ============================================
    // EMAIL 1: To YOU (Portfolio Owner)
    // ============================================
    const emailToYouHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .container { background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e5e5e5; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #4f46e5; }
            .header h1 { color: #4f46e5; margin: 0; font-size: 24px; font-weight: 600; }
            .field { margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #4f46e5; }
            .field-label { display: block; font-weight: 600; color: #4f46e5; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .field-value { color: #334155; font-size: 16px; word-break: break-word; }
            .message-content { white-space: pre-wrap; line-height: 1.8; padding: 15px; background-color: #f1f5f9; border-radius: 6px; border: 1px solid #e2e8f0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 14px; color: #64748b; }
            .timestamp { font-size: 12px; color: #94a3b8; text-align: right; margin-top: 20px; }
            .highlight { background: linear-gradient(120deg, #a78bfa 0%, #4f46e5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
            .reply-note { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 15px; margin-top: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Message from Your Portfolio</h1>
              <p>Someone contacted you through your website</p>
            </div>
            
            <div class="field">
              <span class="field-label">From</span>
              <div class="field-value">
                <span class="highlight">${name.trim()}</span> &lt;${email.trim()}&gt;
              </div>
            </div>
            
            <div class="field">
              <span class="field-label">Subject</span>
              <div class="field-value">${emailSubject}</div>
            </div>
            
            <div class="field">
              <span class="field-label">Message</span>
              <div class="message-content">${message.trim()}</div>
            </div>
            
            <div class="reply-note">
              <strong>💡 Quick Reply:</strong><br>
              Simply click "Reply" in your email client to respond directly to ${name.trim()}. 
              The reply will go to their email address: <strong>${email.trim()}</strong>
            </div>
            
            <div class="timestamp">
              Received: ${new Date().toLocaleString("en-US", {
                timeZone: "UTC",
                dateStyle: "full",
                timeStyle: "long",
              })} UTC
            </div>
            
            <div class="footer">
              <p>This message was sent via the contact form on your portfolio website.</p>
              <p>Reply directly to this email to respond to the sender.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to YOU (Portfolio Owner)
    const mailToYou = {
      from: fromAddress,
      to: process.env.EMAIL_USER || "ybelete490@gmail.com",
      replyTo: email.trim(),
      subject: `[Portfolio] ${emailSubject}`,
      html: emailToYouHtml,
      text: `
NEW MESSAGE FROM YOUR PORTFOLIO
===============================

From: ${name.trim()} <${email.trim()}>
Subject: ${emailSubject}

Message:
${message.trim()}

---
IMPORTANT: Reply directly to this email to respond to ${name.trim()}.
The reply will be sent to: ${email.trim()}

This message was sent via your portfolio contact form.
      `.trim(),
    };

    // ============================================
    // EMAIL 2: Confirmation to the SENDER (ONLY IF OWNER EMAIL SUCCEEDS)
    // ============================================
    const senderConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Confirmation</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .container { background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e5e5e5; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #10b981; }
            .header h1 { color: #10b981; margin: 0; font-size: 24px; font-weight: 600; }
            .checkmark { font-size: 48px; color: #10b981; margin-bottom: 20px; }
            .message-preview { background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #4f46e5; }
            .info-box { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 15px; margin-top: 20px; font-size: 14px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 14px; color: #64748b; }
            .highlight { color: #4f46e5; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="checkmark">✅</div>
              <h1>Message Sent Successfully!</h1>
              <p>Your message has been delivered to Yohannes Belete</p>
            </div>
            
            <p>Hi <span class="highlight">${name.trim()}</span>,</p>
            
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            
            <div class="message-preview">
              <strong>Your Message:</strong><br>
              <div style="margin-top: 10px; white-space: pre-wrap;">${message.trim()}</div>
            </div>
            
            <div class="info-box">
              <strong>📧 What happens next?</strong><br>
              1. I'll review your message within 24 hours<br>
              2. You'll receive a personal response to: <strong>${email.trim()}</strong><br>
              3. Feel free to reply to any email from me to continue the conversation
            </div>
            
            <p>Best regards,<br>
            <strong>Yohannes Belete</strong><br>
            Senior Developer</p>
            
            <div class="footer">
              <p>This is an automated confirmation. Please don't reply to this email.</p>
              <p>If you need to send additional information, simply reply to my response when you receive it.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 🔥 STEP 1: Send to owner FIRST
    console.log("Step 1: Sending notification to owner...");
    await transporter.sendMail(mailToYou);
    console.log("✓ Owner notification sent successfully");

    // 🔥 STEP 2: Only send confirmation if owner email succeeded
    console.log("Step 2: Sending confirmation to sender...");

    // Email to SENDER (Confirmation)
    const mailToSender = {
      from: fromAddress,
      to: email.trim(),
      subject: `Message Confirmation: ${emailSubject}`,
      html: senderConfirmationHtml,
      text: `
MESSAGE CONFIRMATION
====================

Hi ${name.trim()},

Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.

Your Message:
${message.trim()}

---
What happens next?
1. I'll review your message within 24 hours
2. You'll receive a personal response to: ${email.trim()}
3. Feel free to reply to any email from me to continue the conversation

Best regards,
Yohannes Belete
Senior Developer

---
This is an automated confirmation. Please don't reply to this email.
If you need to send additional information, simply reply to my response when you receive it.
      `.trim(),
    };

    await transporter.sendMail(mailToSender);
    console.log("✓ Confirmation sent to sender");

    const elapsedTime = Date.now() - startTime;
    console.log(`✅ Both emails sent successfully in ${elapsedTime}ms`);

    return {
      success: true,
      message: "Both emails sent successfully",
      elapsedTime,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    const elapsedTime = Date.now() - startTime;

    // Type assertion
    const err = error as Error;

    // Check what failed
    if (err.message && err.message.includes("Owner notification sent")) {
      // Owner email succeeded but confirmation failed
      return {
        success: false,
        error: "Failed to send confirmation email",
        note: "Your message was delivered to me, but we couldn't send you a confirmation.",
        elapsedTime,
      };
    }

    return {
      success: false,
      error: "Failed to send your message",
      elapsedTime,
    };
  }
}

export async function POST(request: NextRequest) {
  const requestStart = Date.now();

  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(RATE_LIMIT_WINDOW / 1000).toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));

    // Validate required fields
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          error: validation.errors[0],
        },
        { status: 400 }
      );
    }

    console.log("Processing contact form submission from:", body.email);
    const { name, email, message, subject } = body;

    // 🔥 Send emails sequentially: Owner first, then confirmation
    const emailResult = await sendEmailsSequentially(
      name,
      email,
      message,
      subject || ""
    );

    const totalTime = Date.now() - requestStart;

    if (emailResult.success) {
      return NextResponse.json(
        {
          success: true,
          message:
            emailResult.message ||
            "Message sent successfully! You should receive a confirmation email shortly.",
          elapsedTime: emailResult.elapsedTime,
          totalTime: totalTime,
          rateLimit: {
            remaining: rateLimitCheck.remaining,
            reset: Date.now() + RATE_LIMIT_WINDOW,
          },
        },
        {
          status: 200,
          headers: {
            "X-RateLimit-Remaining": rateLimitCheck.remaining.toString(),
            "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
            "X-Response-Time": `${totalTime}ms`,
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || "Failed to send email",
          note:
            emailResult.note ||
            "Please try again or contact me directly at ybelete490@gmail.com",
          elapsedTime: emailResult.elapsedTime,
          totalTime: totalTime,
        },
        {
          status: 500,
          headers: {
            "X-RateLimit-Remaining": rateLimitCheck.remaining.toString(),
            "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error);
    const totalTime = Date.now() - requestStart;

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your request. Please try again later.",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
        elapsedTime: totalTime,
        totalTime: totalTime,
      },
      {
        status: 500,
        headers: {
          "X-Response-Time": `${totalTime}ms`,
        },
      }
    );
  }
}

// OPTIONAL: GET method for health check
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      status: "healthy",
      service: "contact-form-api",
      rateLimit: {
        window: `${RATE_LIMIT_WINDOW / 1000} seconds`,
        maxRequests: RATE_LIMIT_MAX_REQUESTS,
      },
      features: [
        "email_sending",
        "rate_limiting",
        "input_validation",
        "auto_reply",
        "html_emails",
        "sequential_sending",
      ],
      logic:
        "Sends to owner first, then sends confirmation only if owner email succeeds",
    },
    { status: 200 }
  );
}
