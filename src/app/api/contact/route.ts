import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  generateContactFormEmail,
  generateContactFormEmailText,
  generateFreeTrialRequestEmail,
  generateFreeTrialRequestEmailText,
} from "@/lib/email/templates";

const RECIPIENT_EMAIL = "amrendramkumar@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, isFreeTrial } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Determine if this is a free trial request
    const isTrialRequest =
      isFreeTrial ||
      subject.toLowerCase().includes("free trial") ||
      subject.toLowerCase().includes("start free trial");

    // Generate email content based on type
    const emailHtml = isTrialRequest
      ? generateFreeTrialRequestEmail({ name, email, subject, message })
      : generateContactFormEmail({ name, email, subject, message });

    const emailText = isTrialRequest
      ? generateFreeTrialRequestEmailText({ name, email, subject, message })
      : generateContactFormEmailText({ name, email, subject, message });

    // Send email using the email service
    await sendEmail({
      to: RECIPIENT_EMAIL,
      subject: isTrialRequest
        ? `🎉 Free Trial Request: ${subject}`
        : `Contact Form: ${subject}`,
      html: emailHtml,
      text: emailText,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send email. Please try again later.",
      },
      { status: 500 },
    );
  }
}
