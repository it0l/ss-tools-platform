-- SS Tools Platform
-- Public portfolio-safe schema for profiles, roles and Row Level Security.

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to authenticated;

do $$
begin
  create type public.app_role as enum ('student', 'admin');
exception
  when duplicate_object then null;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) between 1 and 80),
  username text check (username is null or char_length(username) between 1 and 80),
  avatar_url text check (avatar_url is null or char_length(avatar_url) <= 2048),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Roles are deliberately stored separately from editable profile data.
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

drop trigger if exists user_roles_set_updated_at on public.user_roles;
create trigger user_roles_set_updated_at
before update on public.user_roles
for each row execute function private.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, username, avatar_url)
  values (
    new.id,
    nullif(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'), ''),
    nullif(coalesce(new.raw_user_meta_data ->> 'user_name', new.raw_user_meta_data ->> 'preferred_username'), ''),
    nullif(coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture'), '')
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'student'::public.app_role)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = (select auth.uid())
      and role = 'admin'::public.app_role
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

drop policy if exists profiles_select_own_or_admin on public.profiles;
drop policy if exists profiles_update_own_or_admin on public.profiles;
drop policy if exists user_roles_select_own_or_admin on public.user_roles;

create policy profiles_select_own_or_admin
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id or (select private.is_admin()));

create policy profiles_update_own_or_admin
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id or (select private.is_admin()))
with check ((select auth.uid()) = id or (select private.is_admin()));

create policy user_roles_select_own_or_admin
on public.user_roles
for select
to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()));

revoke all on table public.profiles from anon;
revoke all on table public.user_roles from anon;
revoke all on table public.profiles from authenticated;
revoke all on table public.user_roles from authenticated;

grant select on table public.profiles to authenticated;
grant update (display_name, username, avatar_url) on public.profiles to authenticated;
grant select on table public.user_roles to authenticated;
