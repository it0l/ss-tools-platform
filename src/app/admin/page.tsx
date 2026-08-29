import { requireAdmin } from "@/lib/auth/guards";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          SS Tools Platform
        </p>
        <h1 className="mt-3 text-4xl font-bold">Administrative area</h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
          This route demonstrates server-side role authorization. Access is granted only after the authenticated user is verified as an administrator in the database.
        </p>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
          <p className="text-sm text-zinc-500">Authorization status</p>
          <p className="mt-2 font-medium text-emerald-400">Administrator verified server-side</p>
        </section>
      </div>
    </main>
  );
}
