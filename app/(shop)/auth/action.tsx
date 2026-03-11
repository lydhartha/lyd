"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AuthState = {
  errors?: string;
};

export async function authenticate(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState | undefined> {
  const mode = String(formData.get("mode") || "");
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();

  if (!email || !password) {
    return { errors: "Email and password are required." };
  }

  if (password.length < 6) {
    return { errors: "Password must be at least 6 characters." };
  }

  const supabase = await createSupabaseServerClient();

  if (mode === "signup") {
    if (!firstName || !lastName) {
      return { errors: "First and last name are required." };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      return { errors: error.message };
    }

    redirect(`/verify-email?email=${encodeURIComponent(email)}`);
  }

  if (mode === "login") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const message = error.message.toLowerCase();
      const errorCode = (error as { code?: string }).code;
      const emailNotConfirmed =
        errorCode === "email_not_confirmed" ||
        message.includes("email not confirmed") ||
        message.includes("confirm your email") ||
        message.includes("verify your email");

      if (emailNotConfirmed) {
        redirect(`/verify-email?email=${encodeURIComponent(email)}`);
      }

      return { errors: "Invalid email or password." };
    }

    const userId = data.user?.id;
    if (!userId) {
      return { errors: "Login failed. Please try again." };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (profile?.role === "admin") {
      redirect("/admin/dashboard");
    }

    redirect("/");
  }

  return { errors: "Invalid auth mode." };
}