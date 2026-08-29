import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">SS Tools Platform</p>
        <h1 className="mt-4 text-2xl font-bold">Authentication could not be completed</h1>
        <p className="mt-3 text-zinc-400">
          The OAuth request was cancelled, expired or returned an invalid authorization code.
        </p>
        <Link href="/login" className="mt-8 inline-flex rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500">
          Try again
        </Link>
      </section>
    </main>
  );
}
