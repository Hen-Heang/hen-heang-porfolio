-- Portfolio tables recreated in the money-flow Supabase project (lqjjabfmaweztxkvfrsq)
-- after the original dedicated portfolio project was deleted.
-- Writes are restricted to the portfolio owner by email, NOT just "authenticated",
-- because this shared project has other real authenticated users.

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  technologies text[] not null default '{}',
  image text,
  github text,
  demo text,
  overview text,
  features text[],
  technical_details text,
  challenges text[],
  solutions text[],
  role text,
  duration text,
  team_size text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.portfolio_skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null unique,
  sort_order integer default 0
);

create table if not exists public.portfolio_skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.portfolio_skill_categories(id) on delete cascade,
  name text not null,
  level integer check (level between 1 and 5),
  experience text,
  sort_order integer default 0,
  unique(category_id, name)
);

create table if not exists public.portfolio_experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text,
  summary text,
  highlights text[],
  stack text[],
  sort_order integer default 0,
  unique(company, period)
);

create table if not exists public.portfolio_education (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  institution text not null,
  description text,
  sort_order integer default 0,
  unique(title, institution)
);

create table if not exists public.portfolio_achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  type text default 'certificate' check (type in ('certificate', 'graduation', 'award')),
  description text,
  image text,
  link text,
  sort_order integer default 0,
  unique(title, issuer)
);

create table if not exists public.portfolio_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  date date,
  read_time text,
  category text,
  tags text[] default '{}',
  image text,
  author text,
  featured boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.portfolio_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS on everything
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_skill_categories enable row level security;
alter table public.portfolio_skills enable row level security;
alter table public.portfolio_experience enable row level security;
alter table public.portfolio_education enable row level security;
alter table public.portfolio_achievements enable row level security;
alter table public.portfolio_blog_posts enable row level security;
alter table public.portfolio_contact_messages enable row level security;

-- Owner check: JWT email claim is issued by Supabase Auth (not user-editable metadata)
create or replace function public.portfolio_is_owner()
returns boolean
language sql
stable
security invoker
as $$
  select coalesce((select auth.jwt() ->> 'email'), '') = 'henheang15@gmail.com'
$$;

-- Public read
create policy "public read" on public.portfolio_projects for select using (true);
create policy "public read" on public.portfolio_skill_categories for select using (true);
create policy "public read" on public.portfolio_skills for select using (true);
create policy "public read" on public.portfolio_experience for select using (true);
create policy "public read" on public.portfolio_education for select using (true);
create policy "public read" on public.portfolio_achievements for select using (true);
create policy "public read published" on public.portfolio_blog_posts for select using (published = true);

-- Owner-only writes (and owner can read unpublished posts / contact messages)
create policy "owner all" on public.portfolio_projects for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_skill_categories for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_skills for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_experience for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_education for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_achievements for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner all" on public.portfolio_blog_posts for all to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());

-- Contact messages: anyone can submit, only owner can read/manage
create policy "public insert messages" on public.portfolio_contact_messages
  for insert with check (true);
create policy "owner read messages" on public.portfolio_contact_messages
  for select to authenticated using (public.portfolio_is_owner());
create policy "owner update messages" on public.portfolio_contact_messages
  for update to authenticated
  using (public.portfolio_is_owner()) with check (public.portfolio_is_owner());
create policy "owner delete messages" on public.portfolio_contact_messages
  for delete to authenticated using (public.portfolio_is_owner());
