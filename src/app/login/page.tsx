import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "./login-button";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/app");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">SS Tools Platform</p>
        <h1 className="mt-4 text-3xl font-bold">Secure Discord sign in</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Authenticate with Discord through Supabase Auth. Protected application routes are authorized server-side.
        </p>
        <div className="mt-8"><LoginButton /></div>
      </section>
    </main>
  );
}
