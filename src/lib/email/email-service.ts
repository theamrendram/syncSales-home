import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/**
 * Initialize the email transporter
 * This should be called once when the application starts
 */
export function initializeEmailService() {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Get the email transporter instance
 */
export function getEmailTransporter(): Transporter {
  if (!transporter) {
    return initializeEmailService();
  }
  return transporter;
}

/**
 * Send an email using the transporter
 */
export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}) {
  const emailTransporter = getEmailTransporter();

  const mailOptions = {
    from: options.from || process.env.SMTP_USER || "noreply@syncsales.com",
    to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text || stripHtml(options.html),
    replyTo: options.replyTo,
    cc: options.cc ? (Array.isArray(options.cc) ? options.cc.join(", ") : options.cc) : undefined,
    bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc.join(", ") : options.bcc) : undefined,
  };

  try {
    const info = await emailTransporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

/**
 * Verify email service configuration
 */
export async function verifyEmailService(): Promise<boolean> {
  try {
    const emailTransporter = getEmailTransporter();
    await emailTransporter.verify();
    return true;
  } catch (error) {
    console.error("Email service verification failed:", error);
    return false;
  }
}

/**
 * Strip HTML tags from HTML string to create plain text version
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, "")
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

