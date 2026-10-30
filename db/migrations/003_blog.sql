-- Blog: posts written in the admin panel. Same draft/publish/history model as pages:
-- every save adds a post_revisions row; publishing moves posts.published_revision_id.

create table categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  created_at timestamptz not null default now()
);

insert into categories (name, slug) values
  ('Pace & Performance', 'pace-performance'),
  ('Technique', 'technique'),
  ('Strength', 'strength'),
  ('Coaching Insights', 'coaching-insights');

create table posts (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text not null default 'draft' check (status in ('draft', 'published', 'unpublished')),
  draft_revision_id bigint,
  published_revision_id bigint,
  published_at timestamptz, -- first publish; the date shown on the article
  created_by text,
  created_at timestamptz not null default now(),
  updated_by text,
  updated_at timestamptz not null default now()
);

create table post_revisions (
  id bigint generated always as identity primary key,
  post_id bigint not null references posts(id) on delete cascade,
  number int not null,
  title text not null,
  excerpt text not null default '',
  author text not null default '',
  -- restrict: a category in use can't be deleted, so no post loses its category
  category_id bigint not null references categories(id) on delete restrict,
  cover_image jsonb, -- { src, alt, width, height }; may be empty while drafting
  body jsonb not null default '{"type": "doc", "content": []}', -- editor document, never raw HTML
  seo jsonb not null default '{}', -- { metaTitle, metaDescription, ogImage, noindex }
  note text,
  created_by text,
  created_at timestamptz not null default now(),
  unique (post_id, number)
);

alter table posts
  add foreign key (draft_revision_id) references post_revisions(id),
  add foreign key (published_revision_id) references post_revisions(id);

create index post_revisions_post on post_revisions (post_id, number desc);
create index posts_published on posts (published_at desc) where status = 'published';

-- Same lock as 002: Supabase's public API can't read or change these tables.
alter table categories enable row level security;
alter table posts enable row level security;
alter table post_revisions enable row level security;
