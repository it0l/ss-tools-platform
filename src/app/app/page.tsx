import { signOut } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function AppPage() {
  const { supabase, user } = await requireUser();

  const [{ data: profile }, { data: userRole }] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, username")
      .eq("id", user.id)
      .single(),
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single(),
  ]);

  const displayName =
    profile?.display_name ?? profile?.username ?? user.email ?? "Discord user";

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
              SS Tools Platform
            </p>
            <h1 className="mt-3 text-3xl font-bold">Authenticated area</h1>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-red-500 hover:text-red-400"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <p className="text-sm text-zinc-500">Signed in as</p>
          <h2 className="mt-2 text-2xl font-semibold">{displayName}</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Session</p>
              <p className="mt-2 font-medium text-emerald-400">Authenticated</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Role</p>
              <p className="mt-2 font-medium uppercase text-red-400">
                {userRole?.role ?? "student"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
