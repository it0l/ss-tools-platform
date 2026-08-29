import Link from "next/link";

const features = [
  "Discord OAuth with Supabase Auth",
  "Server-side route protection",
  "Database-backed roles",
  "PostgreSQL Row Level Security",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070707] text-zinc-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          SS Tools Platform
        </p>

        <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
          Discord authentication with server-side authorization.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          A portfolio-safe implementation built with Next.js, TypeScript and Supabase,
          focused on OAuth, protected routes, role-based access control and database-level security.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-500"
          >
            View authentication flow
          </Link>
          <a
            href="https://github.com/it0l/ss-tools-platform"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-200 transition hover:border-zinc-500"
          >
            GitHub repository
          </a>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm leading-6 text-zinc-300">{feature}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
