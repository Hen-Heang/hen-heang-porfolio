-- Pin search_path (advisor: function_search_path_mutable)
create or replace function public.portfolio_is_owner()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((select auth.jwt() ->> 'email'), '') = 'henheang15@gmail.com'
$$;

-- Public bucket already serves objects by URL; drop the broad SELECT policy
-- so anonymous clients cannot list the bucket contents (advisor: public_bucket_allows_listing)
drop policy if exists "public read portfolio storage" on storage.objects;
