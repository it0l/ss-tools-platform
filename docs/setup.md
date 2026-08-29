# Local setup

This portfolio edition is intentionally disconnected from the original production environment. Use your own Supabase project and Discord OAuth application when running it.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Provide only the public Supabase project values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Never commit service-role keys, Discord client secrets or production environment files.

## 3. Apply the database migration

Use the SQL migration in `supabase/migrations/` against your own Supabase project. It creates:

- `profiles`
- `user_roles`
- the `student` and `admin` role enum
- automatic profile creation for new authenticated users
- server/database authorization helpers
- Row Level Security policies

## 4. Configure Discord OAuth

Enable Discord as an authentication provider in your Supabase project and configure the provider credentials in the Supabase dashboard, not in browser code.

Add your local callback URL to the allowed redirect URLs:

```text
http://localhost:3000/auth/callback
```

## 5. Start the application

```bash
npm run dev
```

Open `http://localhost:3000`.

## Administrator testing

New users receive the `student` role by default. To test `/admin`, assign an authenticated test user the `admin` role from a trusted administrative database context. Do not expose a client-side role escalation endpoint.
