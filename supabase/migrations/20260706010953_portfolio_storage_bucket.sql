-- Public portfolio image bucket; writes restricted to the portfolio owner
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read portfolio storage"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "owner insert portfolio storage"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio' and public.portfolio_is_owner());

create policy "owner update portfolio storage"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio' and public.portfolio_is_owner())
  with check (bucket_id = 'portfolio' and public.portfolio_is_owner());

create policy "owner delete portfolio storage"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio' and public.portfolio_is_owner());
