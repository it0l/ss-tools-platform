import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const requireUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return { supabase, user };
});

export const requireAdmin = cache(async () => {
  const { supabase, user } = await requireUser();
  const { data: userRole, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error || userRole?.role !== "admin") {
    redirect("/app?error=forbidden");
  }

  return { supabase, user, role: "admin" as const };
});
