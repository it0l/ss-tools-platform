import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  let next = requestUrl.searchParams.get("next") ?? "/app";

  if (!next.startsWith("/") || next.startsWith("//")) {
    next = "/app";
  }

  if (!code) {
    return NextResponse.redirect(new URL("/auth/auth-code-error", requestUrl.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth/auth-code-error", requestUrl.origin));
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
