interface FreeTrialRequestData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Generate HTML email template for free trial requests
 */
export function generateFreeTrialRequestEmail(data: FreeTrialRequestData): string {
  const { name, email, subject, message } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #f59e0b 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
            font-weight: 500;
          }
          .content {
            padding: 30px 20px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #333;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 3px solid #f59e0b;
            font-size: 15px;
            word-wrap: break-word;
          }
          .message-value {
            white-space: pre-wrap;
            min-height: 100px;
          }
          .trial-info {
            background: linear-gradient(135deg, #e7f3ff 0%, #fff4e6 100%);
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin-top: 20px;
            border-radius: 6px;
            font-size: 14px;
          }
          .trial-info h3 {
            margin: 0 0 10px 0;
            color: #1e40af;
            font-size: 16px;
          }
          .trial-info ul {
            margin: 10px 0;
            padding-left: 20px;
            color: #333;
          }
          .trial-info li {
            margin: 5px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
            font-size: 12px;
            color: #6c757d;
            text-align: center;
          }
          .footer p {
            margin: 5px 0;
          }
          .reply-note {
            background: #e7f3ff;
            border-left: 4px solid #3b82f6;
            padding: 12px;
            margin-top: 20px;
            border-radius: 4px;
            font-size: 13px;
            color: #004085;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>🎉 New Free Trial Request</h2>
            <div class="badge">7-Day Free Trial</div>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name</span>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
              <span class="label">Email</span>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            <div class="field">
              <span class="label">Subject</span>
              <div class="value">${escapeHtml(subject)}</div>
            </div>
            <div class="field">
              <span class="label">Message</span>
              <div class="value message-value">${escapeHtml(message)}</div>
            </div>
            <div class="trial-info">
              <h3>📋 Free Trial Details</h3>
              <ul>
                <li>Full access to all Professional features</li>
                <li>7 days completely free</li>
                <li>No credit card required</li>
                <li>Setup assistance included</li>
              </ul>
            </div>
            <div class="reply-note">
              💬 You can reply directly to this email to respond to ${escapeHtml(name)} and set up their free trial.
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the SyncSales free trial request form.</p>
            <p>&copy; ${new Date().getFullYear()} SyncSales. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate plain text email for free trial requests
 */
export function generateFreeTrialRequestEmailText(data: FreeTrialRequestData): string {
  const { name, email, subject, message } = data;

  return `
New Free Trial Request

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Free Trial Details:
- Full access to all Professional features
- 7 days completely free
- No credit card required
- Setup assistance included

---
This email was sent from the SyncSales free trial request form.
You can reply directly to this email to respond to ${name} and set up their free trial.
  `.trim();
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

