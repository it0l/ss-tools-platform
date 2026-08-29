# Security Policy

## Public repository scope

This repository is a sanitized portfolio edition and must remain isolated from production credentials, private user data and production-only infrastructure configuration.

Do not commit:

- `.env` files other than `.env.example`
- Discord client secrets or bot tokens
- Supabase secret/service-role keys
- authentication cookies or session tokens
- private user records
- production database exports
- certificates or private keys

## Reporting a vulnerability

If you identify a security issue, avoid publishing credentials, personal data or an exploit containing real production information in a public issue. Report the minimum technical detail necessary to reproduce the problem safely.

## Authorization model

Privileged routes use server-side role checks and PostgreSQL Row Level Security. Client-side UI state must never be treated as an authorization boundary.
