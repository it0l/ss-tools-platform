# Architecture

## Overview

SS Tools Platform is structured as a Next.js application with Supabase providing authentication and PostgreSQL-backed application data.

The public portfolio edition keeps the production environment isolated and documents only the reusable architecture and application patterns.

## High-level architecture

```text
+------------------+
|     Discord      |
+--------+---------+
         |
         | OAuth
         v
+------------------+
|  Supabase Auth   |
+--------+---------+
         |
         | session
         v
+------------------------------+
|        Next.js 16            |
|                              |
|  Server Components / Routes  |
|  Auth guards                 |
|  Protected application UI   |
+---------------+--------------+
                |
                v
+------------------------------+
| Supabase PostgreSQL / RLS    |
| profiles                     |
| user_roles                   |
| application data             |
+------------------------------+
```

## Main responsibilities

### Next.js

Next.js owns routing, rendering and server-side authorization boundaries. Protected areas should never rely only on hiding client-side interface elements.

### Supabase Auth

Supabase Auth handles the OAuth exchange with Discord and session lifecycle. The application consumes the authenticated session through the Supabase SSR integration.

### PostgreSQL

Application records, profiles and role assignments are persisted in PostgreSQL. Row Level Security can provide an additional database-level authorization layer alongside server-side application checks.

## Trust boundaries

The application treats browser state as untrusted. Authorization decisions for protected resources are performed on the server using the authenticated Supabase user and database-backed roles.

Secrets, service-role credentials and production infrastructure values are intentionally excluded from this repository.

## Portfolio edition

This repository is rebuilt independently from the private production repository. It does not copy the original Git history, which prevents historical configuration or removed credentials from being unintentionally republished.
