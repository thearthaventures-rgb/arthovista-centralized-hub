-- ArthoVista Service Hub
-- Run only if you want to ensure browser roles cannot directly read/write lead tables.
-- Server-side Supabase Secret Key calls bypass RLS.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_mfg_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_startup_india ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service insert" ON public.leads;

REVOKE ALL ON TABLE public.leads FROM anon, authenticated;
REVOKE ALL ON TABLE public.leads_mfg_companies FROM anon, authenticated;
REVOKE ALL ON TABLE public.leads_startup_india FROM anon, authenticated;
