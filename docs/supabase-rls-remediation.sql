-- ============================================================
-- PASTE-READY: lock down the publicly-readable `leads` PII table
-- Run in the Supabase SQL editor for project rhxxzvhemrzxvndolajg.
-- The contact form only INSERTs (Footer.tsx:56-66) and never reads
-- back, so this does NOT break the form.
-- ============================================================

-- 1. Turn RLS ON (and FORCE it so even the table owner is gated)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads FORCE  ROW LEVEL SECURITY;

-- 2. Nuke every existing policy on leads (clears any permissive SELECT)
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
           WHERE schemaname='public' AND tablename='leads'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.leads', p.policyname);
  END LOOP;
END $$;

-- 3. Allow ONLY anonymous INSERT (the public contact form).
CREATE POLICY "anon can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. NO SELECT/UPDATE/DELETE policy for anon or authenticated, so those
--    are denied by default for everyone except service_role (which
--    bypasses RLS). Read leads from the dashboard / a service-role server.

-- 5. Lock table-level grants so anon literally only has INSERT.
REVOKE ALL ON public.leads FROM anon, authenticated;
GRANT  INSERT ON public.leads TO anon;

-- ---- OPTIONAL: let a logged-in Supabase Auth admin read leads in-browser
-- CREATE TABLE IF NOT EXISTS public.admin_users (uid uuid PRIMARY KEY);
-- ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;  -- no policies = no anon access
-- -- INSERT INTO public.admin_users (uid) VALUES ('<your-auth-uid>');
-- GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
-- CREATE POLICY "admins can read leads"   ON public.leads FOR SELECT TO authenticated
--   USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.uid = auth.uid()));
-- CREATE POLICY "admins can update leads" ON public.leads FOR UPDATE TO authenticated
--   USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.uid = auth.uid()))
--   WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.uid = auth.uid()));
-- CREATE POLICY "admins can delete leads" ON public.leads FOR DELETE TO authenticated
--   USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.uid = auth.uid()));

-- ============================================================
-- team & portfolio: confirm PUBLIC-READ-ONLY (anon can never write)
-- ============================================================
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team FORCE  ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read team" ON public.team;
CREATE POLICY "public read team" ON public.team FOR SELECT TO anon, authenticated USING (true);
REVOKE ALL ON public.team FROM anon, authenticated;
GRANT  SELECT ON public.team TO anon, authenticated;

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio FORCE  ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read portfolio" ON public.portfolio;
CREATE POLICY "public read portfolio" ON public.portfolio FOR SELECT TO anon, authenticated USING (true);
REVOKE ALL ON public.portfolio FROM anon, authenticated;
GRANT  SELECT ON public.portfolio TO anon, authenticated;

-- ============================================================
-- DEFENCE-IN-DEPTH: input constraints on leads (anti-abuse/oversize)
-- ============================================================
ALTER TABLE public.leads
  ALTER COLUMN name  SET NOT NULL,
  ALTER COLUMN email SET NOT NULL,
  ADD CONSTRAINT leads_name_len   CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT leads_brand_len  CHECK (brand_name IS NULL OR char_length(brand_name) <= 120),
  ADD CONSTRAINT leads_email_ok   CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 254),
  ADD CONSTRAINT leads_phone_ok   CHECK (char_length(phone) <= 24),
  ADD CONSTRAINT leads_service_ok CHECK (service_interest IN
     ('Full Brand Development','Recipe & Menu Engineering','Operations & Staffing','Digital Strategy & AI','Franchise Management'));

-- ============================================================
-- DPDP RETENTION: timestamp + scheduled purge (pick window with business)
-- ============================================================
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'purge-old-leads',
  '0 3 * * *',
  $$ DELETE FROM public.leads WHERE created_at < now() - interval '18 months'; $$
);

-- ============================================================
-- VERIFY (run after the above)
-- ============================================================
-- (a) RLS on+forced:
SELECT relrowsecurity, relforcerowsecurity FROM pg_class WHERE oid='public.leads'::regclass; -- both true
-- (b) only the INSERT policy on leads (+ optional admin ones):
SELECT policyname, cmd, roles FROM pg_policies WHERE tablename='leads';
-- (c) from a plain terminal with the PUBLIC anon key:
--   READ must NOT return rows:
--   curl -s -o /dev/null -w '%{http_code}\n' 'https://rhxxzvhemrzxvndolajg.supabase.co/rest/v1/leads?select=*' \
--     -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>"   ->  200 with [] (empty) or 401/403
--   INSERT (form path) must still work:
--   curl -s -o /dev/null -w '%{http_code}\n' -X POST 'https://rhxxzvhemrzxvndolajg.supabase.co/rest/v1/leads' \
--     -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>" -H 'Content-Type: application/json' \
--     -d '{"name":"t","email":"t@t.com","brand_name":"t","service_interest":"Full Brand Development","phone":"+91 0"}'  ->  201
-- (d) submit the live contact form once and confirm success.