# SS Tools Platform

Discord-integrated web platform built with Next.js, TypeScript and Supabase, featuring OAuth authentication, role-based access control and secure server-side authorization.

> This repository is a sanitized portfolio edition of a private project. It contains no production credentials, private user data, deployment secrets or production-specific configuration.

## Overview

SS Tools Platform is a web application designed around Discord-based authentication and protected user areas. The project demonstrates a secure authentication flow, server-side authorization, role separation and a Supabase-backed data layer.

The portfolio edition focuses on the architecture and engineering decisions behind the platform while keeping production data and infrastructure private.

## Key features

- Discord OAuth authentication through Supabase Auth
- Protected application routes
- Role-based access control for users and administrators
- Centralized server-side authorization guards
- Supabase SSR integration for authenticated server rendering
- PostgreSQL-backed profiles and roles
- Row Level Security-ready data model
- Safe internal redirect validation during OAuth callbacks
- Environment-based configuration with no committed secrets

## Tech stack

- **Next.js 16** — application framework
- **React 19** — user interface
- **TypeScript** — type-safe application code
- **Tailwind CSS 4** — styling
- **Supabase Auth** — Discord OAuth and session management
- **Supabase PostgreSQL** — application data
- **Supabase SSR** — server/client authentication integration

## Authentication flow

```text
Discord
   |
   | OAuth
   v
Supabase Auth
   |
   | authenticated session
   v
Next.js application
   |
   +--> student --> /app
   |
   +--> admin ----> /admin
                      |
                      v
                 requireAdmin()
                      |
                      v
               PostgreSQL / RLS
```

The OAuth callback accepts only internal redirect paths before completing navigation, reducing the risk of open redirect abuse.

## Authorization

Authentication and authorization are intentionally separated.

- `requireUser()` verifies that a valid authenticated user exists.
- `requireAdmin()` verifies the authenticated user's role before granting access to administrative areas.
- Authorization checks run server-side and are not based only on client-side UI state.

More details are available in [`docs/authentication.md`](docs/authentication.md).

## Project structure

```text
ss-tools-platform/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── app/
│   │   ├── auth/
│   │   └── login/
│   ├── components/
│   ├── lib/
│   │   ├── auth/
│   │   └── supabase/
│   └── types/
├── supabase/
│   └── migrations/
├── docs/
│   ├── architecture.md
│   └── authentication.md
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

> Source code will be added incrementally after each sanitization and review step.

## Security considerations

This public edition is intentionally separated from the original private repository and does not preserve its Git history.

The repository is prepared to exclude:

- `.env` files and credentials
- Discord client secrets
- Supabase secret/service-role keys
- production URLs and internal infrastructure details
- user records or personally identifiable information
- local database files
- generated build artifacts
- deployment-specific configuration

Only public/publishable configuration values should ever be used in browser-accessible environment variables.

## Environment variables

Copy `.env.example` to `.env.local` and provide your own Supabase project values:

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Discord OAuth credentials should be configured through your authentication provider and must never be committed to the repository.

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Documentation

- [`Architecture`](docs/architecture.md)
- [`Authentication and authorization`](docs/authentication.md)

## Status

This repository is being prepared as a public portfolio-safe edition. Functionality is migrated from the original private project only after review and sanitization.
