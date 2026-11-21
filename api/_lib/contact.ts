import type { IncomingMessage } from 'node:http';
import { Resend } from 'resend';

export interface ServerRequestLike extends IncomingMessage {
  body?: unknown;
  ip?: string;
}

export interface ServerResponseLike {
  status: (code: number) => ServerResponseLike;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  inquiryMode?: unknown;
  message?: unknown;
  website?: unknown; // Honeypot field
}

interface RateLimitEntry {
  timestamps: number[];
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEADER_INJECTION_REGEX = /[\r\n]/g;

function cleanSingleLine(value: string): string {
  return value.replace(HEADER_INJECTION_REGEX, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req: ServerRequestLike): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Opportunistic cleanup so map stays bounded
  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore.entries()) {
      const recent = entry.timestamps.filter((ts) => ts > windowStart);
      if (recent.length === 0) {
        rateLimitStore.delete(key);
      } else {
        entry.timestamps = recent;
      }
    }
  }

  const existing = rateLimitStore.get(clientIp);
  const recentTimestamps = (existing?.timestamps ?? []).filter((ts) => ts > windowStart);

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientIp, { timestamps: recentTimestamps });
    return true;
  }

  recentTimestamps.push(now);
  rateLimitStore.set(clientIp, { timestamps: recentTimestamps });
  return false;
}

async function readBody(req: ServerRequestLike): Promise<Record<string, unknown> | null> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Array.isArray(req.body)) {
      return req.body as Record<string, unknown>;
    }
    if (typeof req.body === 'string') {
      try {
        const parsed = JSON.parse(req.body);
        return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
          ? (parsed as Record<string, unknown>)
          : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  // Fallback stream reader for raw Node IncomingMessage if middleware did not pre-parse
  if (req.readableEnded) {
    return null;
  }

  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    const maxBytes = 32 * 1024;

    req.on('data', (chunk: Buffer | string) => {
      const buf = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
      totalBytes += buf.length;
      if (totalBytes > maxBytes) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(buf);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(null);
        return;
      }
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        resolve(
          typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
            ? (parsed as Record<string, unknown>)
            : null
        );
      } catch {
        resolve(null);
      }
    });

    req.on('error', () => resolve(null));
  });
}

function buildEmailHtml(params: {
  name: string;
  email: string;
  inquiryLabel: string;
  message: string;
  submittedAtUtc: string;
}): string {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeInquiry = escapeHtml(params.inquiryLabel);
  const safeMessage = escapeHtml(params.message).replace(/\r?\n/g, '<br />');
  const safeTimestamp = escapeHtml(params.submittedAtUtc);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>New Portfolio Inquiry</title>
  </head>
  <body style="margin:0;padding:24px;background-color:#F8F7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background-color:#FFFFFF;border:1px solid #E5E3DF;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background-color:#111111;border-bottom:2px solid #F04B1A;">
          <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#F04B1A;">
            Portfolio Contact Form
          </p>
          <h1 style="margin:0;font-size:20px;line-height:1.3;font-weight:700;color:#FFFFFF;">
            New Inquiry from ${safeName}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;width:130px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#666666;vertical-align:top;">
                Name
              </td>
              <td style="padding:8px 0;font-size:14px;color:#111111;font-weight:500;">
                ${safeName}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;width:130px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#666666;vertical-align:top;border-top:1px solid #F0EFEA;">
                Email
              </td>
              <td style="padding:8px 0;font-size:14px;color:#111111;border-top:1px solid #F0EFEA;">
                <a href="mailto:${safeEmail}" style="color:#F04B1A;text-decoration:none;font-weight:500;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;width:130px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#666666;vertical-align:top;border-top:1px solid #F0EFEA;">
                Inquiry Type
              </td>
              <td style="padding:8px 0;font-size:14px;color:#111111;font-weight:500;border-top:1px solid #F0EFEA;">
                ${safeInquiry}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;width:130px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#666666;vertical-align:top;border-top:1px solid #F0EFEA;">
                Submitted
              </td>
              <td style="padding:8px 0;font-size:13px;color:#555555;border-top:1px solid #F0EFEA;">
                ${safeTimestamp}
              </td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:18px 20px;background-color:#F8F7F4;border:1px solid #E5E3DF;border-radius:12px;">
            <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#666666;">
              Message
            </p>
            <p style="margin:0;font-size:14px;line-height:1.65;color:#111111;">
              ${safeMessage}
            </p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px;background-color:#F8F7F4;border-top:1px solid #E5E3DF;font-size:12px;color:#666666;">
          Reply directly to this email to respond to ${safeName} (${safeEmail}).
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText(params: {
  name: string;
  email: string;
  inquiryLabel: string;
  message: string;
  submittedAtUtc: string;
}): string {
  return [
    'New Portfolio Inquiry',
    '======================',
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    `Inquiry Type: ${params.inquiryLabel}`,
    `Submitted: ${params.submittedAtUtc}`,
    '',
    'Message:',
    params.message,
  ].join('\n');
}

export async function handleContactRequest(
  req: ServerRequestLike,
  res: ServerResponseLike
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  const rawBody = (await readBody(req)) as ContactPayload | null;
  if (!rawBody) {
    res.status(400).json({
      ok: false,
      error: 'Invalid request body. Please check your details and try again.',
    });
    return;
  }

  // Honeypot check: silently accept bot submissions without triggering email delivery
  if (typeof rawBody.website === 'string' && rawBody.website.trim().length > 0) {
    res.status(200).json({ ok: true, message: 'Thank you for reaching out.' });
    return;
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.status(429).json({
      ok: false,
      error: 'Too many inquiries sent from this connection. Please wait a few minutes or email rimshashafique1997@gmail.com directly.',
    });
    return;
  }

  const rawName = typeof rawBody.name === 'string' ? cleanSingleLine(rawBody.name) : '';
  const rawEmail = typeof rawBody.email === 'string' ? rawBody.email.trim() : '';
  const rawTopic = typeof rawBody.topic === 'string' ? cleanSingleLine(rawBody.topic) : '';
  const rawMode =
    rawBody.inquiryMode === 'hiring' || rawBody.inquiryMode === 'product'
      ? rawBody.inquiryMode
      : undefined;
  const rawMessage = typeof rawBody.message === 'string' ? rawBody.message.trim() : '';

  const fieldErrors: Record<string, string> = {};

  if (rawName.length < 2 || rawName.length > 120) {
    fieldErrors.name = 'Please enter your name (at least 2 characters).';
  }

  if (
    !rawEmail ||
    rawEmail.length > 254 ||
    HEADER_INJECTION_REGEX.test(rawEmail) ||
    !EMAIL_REGEX.test(rawEmail)
  ) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (!rawTopic || rawTopic.length > 120) {
    fieldErrors.topic = 'Please select an inquiry topic.';
  }

  if (rawMessage.length < 5 || rawMessage.length > 5000) {
    fieldErrors.message = 'Please enter a message (at least 5 characters).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    const firstError =
      fieldErrors.name ||
      fieldErrors.email ||
      fieldErrors.topic ||
      fieldErrors.message ||
      'Please check the required fields.';
    res.status(400).json({ ok: false, error: firstError, fieldErrors });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_EMAIL?.trim() || 'rimshashafique1997@gmail.com';
  const fromEmail =
    process.env.EMAIL_FROM?.trim() || 'Rimsha Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not configured on the server.');
    res.status(503).json({
      ok: false,
      error:
        'The contact form email service is not configured yet. Please reach out directly at rimshashafique1997@gmail.com.',
    });
    return;
  }

  const inquiryLabel = rawMode
    ? `${rawTopic} (${rawMode === 'hiring' ? 'Hiring' : 'Product'})`
    : rawTopic;

  const submittedAtUtc = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date());

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: rawEmail,
      subject: `New Portfolio Inquiry — ${rawName}`,
      html: buildEmailHtml({
        name: rawName,
        email: rawEmail,
        inquiryLabel,
        message: rawMessage,
        submittedAtUtc,
      }),
      text: buildEmailText({
        name: rawName,
        email: rawEmail,
        inquiryLabel,
        message: rawMessage,
        submittedAtUtc,
      }),
    });

    if (error || !data?.id) {
      console.error('[contact] Failed to deliver inquiry via Resend:', error?.name ?? 'UnknownError');
      res.status(502).json({
        ok: false,
        error:
          'Unable to send your message right now. Please try again in a moment or email rimshashafique1997@gmail.com directly.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      id: data.id,
      message: 'Your message has been sent successfully.',
    });
  } catch (err) {
    const message = err instanceof Error ? err.name : 'UnknownError';
    console.error('[contact] Unexpected error while sending email:', message);
    res.status(500).json({
      ok: false,
      error:
        'Something went wrong while sending your message. Please try again or email rimshashafique1997@gmail.com directly.',
    });
  }
}
