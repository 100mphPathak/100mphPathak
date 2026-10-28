-- CMS schema. Auth users live in neon_auth."user" (managed by Neon Auth).

create table cms_users (
  user_id uuid primary key references neon_auth."user"(id) on delete cascade,
  role text not null check (role in ('super_admin', 'content_admin', 'editor')),
  granted_by uuid,
  granted_at timestamptz not null default now()
);

create table pages (
  slug text primary key,
  title text not null,
  route text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published', 'unpublished')),
  draft_revision_id bigint,
  published_revision_id bigint,
  updated_by text,
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table revisions (
  id bigint generated always as identity primary key,
  page_slug text not null references pages(slug) on delete cascade,
  number int not null,
  content jsonb not null,
  seo jsonb not null default '{}',
  note text,
  created_by text,
  created_at timestamptz not null default now(),
  unique (page_slug, number)
);

alter table pages
  add foreign key (draft_revision_id) references revisions(id),
  add foreign key (published_revision_id) references revisions(id);

create table media (
  id bigint generated always as identity primary key,
  storage_key text not null unique,
  url text not null,
  filename text not null,
  mime text not null,
  size int not null,
  width int,
  height int,
  alt text not null default '',
  uploaded_by text,
  created_at timestamptz not null default now()
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor_id text,
  actor_email text,
  action text not null,
  resource_type text,
  resource_id text,
  details jsonb not null default '{}',
  at timestamptz not null default now()
);
create index audit_log_at on audit_log (at desc);
create index revisions_page on revisions (page_slug, number desc);

-- Audit log is append-only: block edits and deletes for everyone, including the app.
create function audit_log_readonly() returns trigger language plpgsql as $$
begin raise exception 'audit_log is append-only'; end $$;
create trigger audit_log_no_change before update or delete on audit_log
  for each row execute function audit_log_readonly();
