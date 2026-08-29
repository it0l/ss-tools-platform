# Authentication and Authorization

## Discord OAuth

Users authenticate with Discord through Supabase Auth. The application does not require Discord client secrets to be exposed to browser code.

The expected flow is:

```text
User
  |
  | Sign in with Discord
  v
Supabase Auth
  |
  | OAuth exchange
  v
Discord
  |
  | authorization result
  v
Supabase callback
  |
  | authenticated session
  v
Next.js application
```

## Session handling

Supabase SSR is used so authenticated sessions are available to server-side application code. Protected routes verify authentication before rendering private application areas.

## Server-side authorization

The application separates authentication from authorization.

### `requireUser()`

This guard requires a valid authenticated Supabase user. Unauthenticated requests are redirected to the login flow.

### `requireAdmin()`

This guard first requires a valid user and then checks the user's role in the database. Access is granted only when the role matches the administrative requirement.

This approach keeps privileged authorization logic on the server instead of trusting client-side state.

## Role model

The initial public edition demonstrates two application roles:

- `student` — authenticated access to the standard application area
- `admin` — authenticated access to administrative areas

Role assignments are stored separately from the authentication identity, allowing authorization policy to evolve without changing the OAuth provider.

## Redirect validation

OAuth callbacks may accept a local destination to return the user to the intended application page. Redirect destinations must remain internal paths and should reject protocol-relative or external URLs.

Example policy:

```ts
if (!next.startsWith("/") || next.startsWith("//")) {
  next = "/app";
}
```

This prevents an authentication callback from being used as an open redirect to an external domain.

## Secrets policy

The repository must never contain:

- Discord client secrets
- Supabase service-role or secret keys
- production `.env` files
- authentication cookies or session tokens
- real user records

Only publishable project configuration belongs in browser-accessible environment variables. Production credentials should be managed by the deployment provider or authentication platform.
