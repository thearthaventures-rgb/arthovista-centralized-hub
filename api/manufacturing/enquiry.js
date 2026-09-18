/**
 * ArthoVista — Manufacturing enquiry API (Vercel serverless function)
 *
 * Server-side boundary for the manufacturing lead form. It performs its own
 * validation (client validation is never the only line of defence), applies
 * lightweight rate limiting, stores the lead in Supabase, and optionally
 * forwards a notification email when Resend is configured.
 *
 * Environment variables (set in the hosting platform, never committed):
 *   SUPABASE_URL                — Supabase project URL (https://xxx.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY   — service_role key (SERVER-SIDE ONLY, never in
 *                                 the frontend/browser or public assets)
 *   SUPABASE_TABLE              — optional table name (default leads_mfg_companies)
 *   RESEND_API_KEY              — optional; enables the notification email
 *   COMMERCIAL_ENQUIRY_EMAIL    — destination mailbox for the notification
 *   COMMERCIAL_EMAIL_FROM       — optional verified sender address
 *   WEBSITE_ALLOWED_ORIGINS     — optional comma-separated origin allow-list
 *   COMMERCIAL_RATE_LIMIT_MAX   — optional max requests per IP per window (default 5)
 *   COMMERCIAL_RATE_WINDOW_MS   — optional rate window length (default 10 min)
 *
 * Design rule: the client never talks to Supabase directly — the service_role
 * key lives only in this serverless function. The endpoint returns a truthful
 * 503 until either Supabase or an email provider is configured; the frontend
 * shows the direct phone/WhatsApp fallback — never a fake success.
 */

import { createClient } from '@supabase/supabase-js';

// Simple in-memory token bucket keyed by IP. Good enough for a Vercel function's
// single warm instance; documented as best-effort protection.
const buckets = new Map();
const BUCKET_MAX = parsePositiveInt(process.env.COMMERCIAL_RATE_LIMIT_MAX, 5);
const BUCKET_WINDOW_MS = parsePositiveInt(process.env.COMMERCIAL_RATE_WINDOW_MS, 10 * 60 * 1000);

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || 'leads_mfg_companies';

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/* Lazy client — only created when both env vars exist. */
let supabase = null;
function getSupabase() {
  if (!supabase && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  }
  return supabase;
}

/* Drop stale buckets occasionally so the Map cannot grow without bound. */
function cleanBuckets(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method not allowed.' });
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (!(contentType.includes('application/json') || contentType.includes('application/x-www-form-urlencoded'))) {
    return res.status(415).json({ message: 'Unsupported media type.' });
  }

  // Origin allow-list (CSRF defence) when configured.
  const allowed = (process.env.WEBSITE_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.origin || req.headers.referer || '';
  const originHost = origin.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (allowed.length && originHost && !allowed.includes(originHost)) {
    return res.status(403).json({ message: 'Request origin not allowed.' });
  }

  // Rate limiting (best-effort).
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  cleanBuckets(now);
  const bucket = buckets.get(ip) || { count: 0, resetAt: now + BUCKET_WINDOW_MS };
  if (bucket.resetAt < now) {
    bucket.count = 0;
    bucket.resetAt = now + BUCKET_WINDOW_MS;
  }
  bucket.count += 1;
  buckets.set(ip, bucket);
  if (bucket.count > BUCKET_MAX) {
    return res.status(429).json({ message: 'Too many enquiries. Please try again later.' });
  }

  // Payload size guard.
  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (raw.length > 12000) {
    return res.status(413).json({ message: 'The enquiry is too large to submit.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return res.status(400).json({ message: 'Invalid submission payload.' });
  }
  if (typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ message: 'Invalid submission payload.' });
  }

  // Honeypot field — bots fill it, humans do not.
  if (body.website) {
    return res.status(200).json({ message: 'Your enquiry was submitted successfully. Our team will contact you shortly.' });
  }

  const required = ['name', 'mobile', 'email', 'company', 'biztype'];
  const missing = required.filter((key) => !String(body[key] || '').trim());
  if (missing.length) {
    return res.status(422).json({ message: 'Please complete all required fields.' });
  }

  const email = String(body.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(422).json({ message: 'Please enter a valid email address.' });
  }

  const mobile = String(body.mobile || '').replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(422).json({ message: 'Please enter a valid mobile number.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.COMMERCIAL_ENQUIRY_EMAIL;
  const client = getSupabase();
  if (!client && (!apiKey || !to)) {
    return res.status(503).json({ message: 'The enquiry service is not configured yet.' });
  }

  // Supabase is the source of truth for the lead (if configured).
  if (client) {
    const { error: dbError } = await client
      .from(SUPABASE_TABLE)
      .insert({
        name: String(body.name || '').trim(),
        mobile: String(body.mobile || '').trim(),
        email,
        company: String(body.company || '').trim(),
        biztype: String(body.biztype || '').trim(),
        requirement: String(body.requirement || '').trim() || null,
        message: String(body.message || '').trim() || null,
        ip: String(ip).split(',')[0].trim().slice(0, 45) || null,
        referrer: origin || null,
        status: 'new'
      });
    if (dbError) {
      return res.status(502).json({
        message: 'The enquiry service could not record your submission. Please contact ArthoVista directly.'
      });
    }
  }

  // Notification email (optional) — failures surface honestly to the sender.
  if (apiKey && to) {
    const subject = `ArthoVista Manufacturing enquiry — ${body.company}`;

    const lines = Object.entries(body)
      .filter(([key]) => !['website'].includes(key))
      .map(([key, value]) => `<p><strong>${escapeHtml(titleCase(key))}</strong><br>${escapeHtml(String(value ?? ''))}</p>`)
      .join('');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.COMMERCIAL_EMAIL_FROM || 'ArthoVista Website <onboarding@resend.dev>',
        to: [to],
        subject,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6">${lines}</div>`
      })
    });

    if (!response.ok) {
      return res.status(502).json({
        message: 'The enquiry service could not accept the submission. Please contact ArthoVista directly.'
      });
    }
  }

  return res.status(200).json({
    message: 'Your enquiry was submitted successfully. Our team will contact you shortly.'
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function titleCase(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}