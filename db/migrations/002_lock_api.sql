-- Supabase exposes the public schema through its web API with the public anon key.
-- RLS on with no policies blocks that API. The site connects as postgres, which bypasses RLS.
alter table cms_users enable row level security;
alter table pages enable row level security;
alter table revisions enable row level security;
alter table media enable row level security;
alter table audit_log enable row level security;
alter table _migrations enable row level security;
