# SS Tools Platform

Discord-integrated web platform built with Next.js, TypeScript and Supabase, featuring OAuth authentication, role-based access control and secure server-side authorization.

> This repository is a sanitized portfolio edition of a private project. It contains no production credentials, private user data, deployment secrets or original production Git history.

## Overview

SS Tools Platform demonstrates a secure Discord authentication architecture with protected user areas, database-backed roles and PostgreSQL Row Level Security.

The public edition was rebuilt separately from the private project so the engineering patterns can be shown without publishing production data or infrastructure configuration.

## Key features

- Discord OAuth authentication through Supabase Auth
- Supabase SSR session handling
- Protected `/app` and `/admin` routes
- Centralized `requireUser()` and `requireAdmin()` server guards
- Database-backed `student` and `admin` roles
- PostgreSQL Row Level Security policies
- Roles stored separately from user-editable profile fields
- Automatic profile/role creation after first authentication
- Safe internal redirect validation during OAuth callbacks
- Sanitized environment configuration with no committed secrets

## Tech stack

- **Next.js 16** — application framework
- **React 19** — user interface
- **TypeScript** — type-safe application code
- **Tailwind CSS 4** — styling
- **Supabase Auth** — Discord OAuth and session management
- **Supabase PostgreSQL** — profiles and authorization data
- **Supabase SSR** — authenticated server/client integration

## Authentication flow

```text
User
  |
  | Continue with Discord
  v
Supabase Auth <----> Discord OAuth
  |
  | authenticated session
  v
Next.js
  |
  +--> /app ------> requireUser()
  |
  +--> /admin ----> requireAdmin()
                         |
                         v
                 user_roles + RLS
```

The OAuth callback accepts only internal redirect paths before completing navigation, reducing the risk of open redirect abuse.

## Authorization model

Authentication and authorization are deliberately separated.

- `requireUser()` validates the authenticated Supabase user on the server.
- `requireAdmin()` additionally reads the user's role from PostgreSQL.
- `user_roles` is separate from the editable `profiles` table.
- RLS adds a database-level boundary in addition to application-level guards.
- New authenticated users receive the `student` role by default.

## Project structure

```text
ss-tools-platform/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   ├── admin/
│   │   ├── app/
│   │   ├── auth/
│   │   ├── login/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── auth/
│   │   └── supabase/
│   ├── types/
│   └── proxy.ts
├── supabase/
│   └── migrations/
├── docs/
│   ├── architecture.md
│   ├── authentication.md
│   └── setup.md
├── .env.example
├── .gitignore
├── SECURITY.md
├── package.json
└── README.md
```

## Database security

The included migration creates the public portfolio schema with:

- `profiles`
- `user_roles`
- `app_role` enum
- automatic `updated_at` handling
- automatic profile creation for authenticated users
- an internal admin-check function
- RLS policies for profile and role reads/updates
- restricted table grants

Authenticated users can update only their own normal profile fields. Role assignment is not exposed as an editable profile field.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then configure your own public Supabase values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Discord provider credentials belong in the authentication provider configuration and must never be committed to this repository.

## Running locally

```bash
npm install
npm run dev
```

For the complete setup, including the database migration and Discord provider configuration, see [`docs/setup.md`](docs/setup.md).

## Security

This repository intentionally excludes:

- production `.env` files
- Discord client secrets or bot tokens
- Supabase secret/service-role keys
- authentication sessions or cookies
- real user records
- production database exports
- production URLs and infrastructure configuration
- the original private repository's Git history

See [`SECURITY.md`](SECURITY.md) for the repository security policy.

## Documentation

- [`Architecture`](docs/architecture.md)
- [`Authentication and authorization`](docs/authentication.md)
- [`Local setup`](docs/setup.md)

## Portfolio edition

This repository is designed to demonstrate the authentication, authorization and database-security architecture of the original project while remaining safe to publish independently.
