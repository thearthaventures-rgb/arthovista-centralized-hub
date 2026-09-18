# ArthoVista Service Hub — Supabase / Vercel Deployment

## Supabase tables

- Company Registration → `public.leads`
- Manufacturing Companies → `public.leads_mfg_companies`
- Startup India → `public.leads_startup_india`

## Required Vercel environment variables

Add these two variables to Production, Preview, and Development as needed:

```text
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
```

Do not add the secret key to frontend files and do not use a `NEXT_PUBLIC_` variable for it.

## Backend endpoints

```text
POST /api/company-registration/enquiry
POST /api/manufacturing/enquiry
POST /api/startup-india/enquiry
```

All three endpoints use the same server-side Supabase Secret Key. The Startup India page no longer sends leads directly from the browser to Supabase and contains no Supabase key.

## Optional environment variables

Manufacturing notification email:

```text
RESEND_API_KEY
COMMERCIAL_ENQUIRY_EMAIL
COMMERCIAL_EMAIL_FROM
```

Optional origin allow-list:

```text
WEBSITE_ALLOWED_ORIGINS=arthovistaservices.sbs
```

The manufacturing endpoint also supports its existing optional rate-limit variables. No `SUPABASE_SERVICE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `SUPABASE_TABLE` variable is required for the standard setup.

## Local development

`npm run dev` serves the static pages. The Vercel `/api` functions require Vercel's serverless runtime, so test the live deployment or use `vercel dev` for local API testing.

## Google Tag Manager

Google Tag Manager container `GTM-WR9CZMLF` is installed in the `<head>` and immediately after the opening `<body>` tag on all four HTML entry pages:
- `/`
- `/company-registration/`
- `/manufacturing/`
- `/startup-india/`

After deployment, use Google Tag Manager Preview mode to verify the container loads on each route before publishing tags.

