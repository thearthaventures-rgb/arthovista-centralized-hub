/**
 * ArthoVista — Startup India enquiry API (Vercel serverless function)
 *
 * Browser submits to this endpoint; the Supabase secret key stays on the
 * server. Leads are stored in public.leads_startup_india.
 *
 * Required Vercel environment variables:
 *   SUPABASE_URL
 *   SUPABASE_SECRET_KEY
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || '';
const MAX_BYTES = 12000;
const RATE_LIMIT_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map();

const text = (v) => (typeof v === 'string' ? v.trim() : '');

function json(res, status, body) {
  return res.status(status).json(body);
}

function cleanBuckets(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0].trim().slice(0, 100);
}

function getOrigin(req) {
  return String(req.headers.origin || req.headers.referer || '');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  const allowed = (process.env.WEBSITE_ALLOWED_ORIGINS || '')
    .split(',').map((s) => s.trim()).filter(Boolean);
  const origin = getOrigin(req);
  const originHost = origin.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  if (allowed.length && originHost && !allowed.includes(originHost)) {
    return json(res, 403, { ok: false, message: 'Request origin not allowed.' });
  }

  const ip = clientIp(req);
  const now = Date.now();
  cleanBuckets(now);
  const bucket = buckets.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_WINDOW_MS;
  }
  bucket.count += 1;
  buckets.set(ip, bucket);
  if (bucket.count > RATE_LIMIT_MAX) {
    return json(res, 429, { ok: false, message: 'Too many enquiries. Please try again later.' });
  }

  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (raw.length > MAX_BYTES) {
    return json(res, 413, { ok: false, message: 'The enquiry is too large to submit.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return json(res, 400, { ok: false, message: 'Invalid submission payload.' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json(res, 400, { ok: false, message: 'Invalid submission payload.' });
  }

  if (text(body.website)) {
    return json(res, 200, { ok: true, hidden: true });
  }

  const name = text(body.name);
  const email = text(body.email);
  const phone = text(body.phone).replace(/\D/g, '');
  const company = text(body.company);
  const entityType = text(body.entityType);
  const businessStage = text(body.businessStage);
  const requirement = text(body.requirement);
  const message = text(body.message);

  if (name.length < 2 || name.length > 120) {
    return json(res, 422, { ok: false, message: 'Please enter your full name.' });
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return json(res, 422, { ok: false, message: 'Please enter a valid 10-digit Indian mobile number.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 180) {
    return json(res, 422, { ok: false, message: 'Please enter a valid email address.' });
  }
  if (company.length > 180 || entityType.length > 120 || businessStage.length > 120 || requirement.length > 500 || message.length > 3000) {
    return json(res, 422, { ok: false, message: 'One or more fields are too long.' });
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error('Startup India Supabase configuration is missing.');
    return json(res, 503, { ok: false, message: 'The enquiry service is not configured yet.' });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });

  const { data, error } = await supabase
    .from('leads_startup_india')
    .insert({
      name,
      email,
      phone,
      company: company || null,
      entity_type: entityType || null,
      business_stage: businessStage || null,
      requirement: requirement || null,
      message: message || null,
      source: 'startup-india-landing'
    })
    .select('id')
    .single();

  if (error) {
    console.error('Startup India Supabase insert failed:', error.message);
    return json(res, 502, { ok: false, message: 'The enquiry service could not record your submission. Please try again.' });
  }

  return json(res, 201, { ok: true, id: data?.id || null });
}
