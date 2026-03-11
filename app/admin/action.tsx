"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function adminLogout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth");
}