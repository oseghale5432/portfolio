import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || '0.0.0.0';
const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const submissionLog = new Map();

app.use(express.json({ limit: '1mb' }));

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress ?? 'unknown';
}

function enforceRateLimit(req) {
  const now = Date.now();
  const ip = getClientIp(req);
  const existing = submissionLog.get(ip);

  if (!existing || now - existing.windowStart > 15 * 60 * 1000) {
    submissionLog.set(ip, { windowStart: now, count: 1, lastAttempt: now });
    return null;
  }

  if (now - existing.lastAttempt < 30 * 1000) {
    return 'Please wait a bit before sending another message.';
  }

  if (existing.count >= 5) {
    return 'Too many messages sent from this connection. Try again later.';
  }

  submissionLog.set(ip, {
    ...existing,
    count: existing.count + 1,
    lastAttempt: now
  });

  return null;
}

function validatePayload(payload) {
  const fullName = String(payload.fullName ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const subject = String(payload.subject ?? '').trim();
  const message = String(payload.message ?? '').trim();
  const company = String(payload.company ?? '').trim();

  if (company) {
    return { error: 'Request rejected.' };
  }

  if (fullName.length < 2) {
    return { error: 'Please enter your full name.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (subject.length > 160) {
    return { error: 'Subject is too long.' };
  }

  if (message.length < 10) {
    return { error: 'Please enter a longer message.' };
  }

  if (message.length > 4000) {
    return { error: 'Message is too long.' };
  }

  return {
    fullName,
    email,
    subject: subject || 'Portfolio Contact',
    message
  };
}

function getMailerConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO || 'oseghale5432@gmail.com'
  };
}

function hasMailerConfig(config) {
  return Boolean(config.host && config.port && config.user && config.pass && config.from && config.to);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const limitError = enforceRateLimit(req);

  if (limitError) {
    return res.status(429).json({ message: limitError });
  }

  const validated = validatePayload(req.body ?? {});

  if ('error' in validated) {
    return res.status(400).json({ message: validated.error });
  }

  const mailerConfig = getMailerConfig();

  if (!hasMailerConfig(mailerConfig)) {
    return res.status(500).json({
      message: 'Mail service is not configured on the server yet.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: mailerConfig.host,
      port: mailerConfig.port,
      secure: mailerConfig.secure,
      auth: {
        user: mailerConfig.user,
        pass: mailerConfig.pass
      }
    });

    await transporter.sendMail({
      from: mailerConfig.from,
      to: mailerConfig.to,
      replyTo: validated.email,
      subject: `[Portfolio] ${validated.subject}`,
      text: [
        `Name: ${validated.fullName}`,
        `Email: ${validated.email}`,
        `Subject: ${validated.subject}`,
        '',
        validated.message
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(validated.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(validated.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(validated.subject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(validated.message)}</p>
        </div>
      `
    });

    return res.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return res.status(500).json({
      message: 'Unable to send your message right now. Please try again later.'
    });
  }
});

if (fs.existsSync(distDir) && fs.existsSync(indexHtmlPath)) {
  app.use(express.static(distDir));

  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(indexHtmlPath);
  });
}

app.listen(port, host, () => {
  console.log(`Portfolio server listening on http://${host}:${port}`);
});
