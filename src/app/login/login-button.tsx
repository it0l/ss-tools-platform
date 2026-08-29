"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setLoading(true);
      setErrorMessage(null);
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=/app`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo,
          scopes: "identify email",
        },
      });

      if (error) throw error;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to start Discord login.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Continue with Discord"}
      </button>
      {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
    </div>
  );
}
