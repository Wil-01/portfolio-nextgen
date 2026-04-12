-- ============================================================
-- PORTFOLIO CMS — Schema Supabase
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ============================================================

-- Projects
create table if not exists public.projects (
  id          uuid        default gen_random_uuid() primary key,
  order_index integer     default 0,
  category    text        not null check (category in ('professionnel','personnel','académique')),
  title       text        not null default '',
  company     text,
  stack       text[]      default '{}',
  description text        default '',
  image_url   text,
  video_url   text,
  github_link text,
  demo_link   text,
  axes        text[]      default '{}',
  gradient    text        default 'linear-gradient(135deg,#6366f1 0%,#4338ca 100%)',
  context     text        default '',
  what_i_did  text[]      default '{}',
  learned     text        default '',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Skill categories
create table if not exists public.skill_categories (
  id          uuid        default gen_random_uuid() primary key,
  order_index integer     default 0,
  label       text        not null default '',
  skills      text[]      default '{}',
  badge_cls   text        default '',
  head_cls    text        default '',
  created_at  timestamptz default now()
);

-- Experiences (work + education)
create table if not exists public.experiences (
  id           uuid        default gen_random_uuid() primary key,
  order_index  integer     default 0,
  type         text        not null check (type in ('experience','education')),
  period       text        not null default '',
  is_current   boolean     default false,
  title        text        not null default '',
  organization text        not null default '',
  location     text,
  points       text[]      default '{}',
  tags         text[]      default '{}',
  created_at   timestamptz default now()
);

-- RLS
alter table public.projects         enable row level security;
alter table public.skill_categories enable row level security;
alter table public.experiences      enable row level security;

-- Public SELECT (visiteurs du portfolio)
create policy "public_read_projects"    on public.projects         for select using (true);
create policy "public_read_skills"      on public.skill_categories for select using (true);
create policy "public_read_experiences" on public.experiences      for select using (true);

-- Authenticated INSERT / UPDATE / DELETE (admin uniquement)
create policy "auth_insert_projects"  on public.projects         for insert with check (auth.role() = 'authenticated');
create policy "auth_update_projects"  on public.projects         for update using (auth.role() = 'authenticated');
create policy "auth_delete_projects"  on public.projects         for delete using (auth.role() = 'authenticated');

create policy "auth_insert_skills"    on public.skill_categories for insert with check (auth.role() = 'authenticated');
create policy "auth_update_skills"    on public.skill_categories for update using (auth.role() = 'authenticated');
create policy "auth_delete_skills"    on public.skill_categories for delete using (auth.role() = 'authenticated');

create policy "auth_insert_experiences" on public.experiences    for insert with check (auth.role() = 'authenticated');
create policy "auth_update_experiences" on public.experiences    for update using (auth.role() = 'authenticated');
create policy "auth_delete_experiences" on public.experiences    for delete using (auth.role() = 'authenticated');

-- Storage bucket for media (images / videos)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

create policy "public_read_media"  on storage.objects for select using (bucket_id = 'media');
create policy "auth_upload_media"  on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "auth_delete_media"  on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
