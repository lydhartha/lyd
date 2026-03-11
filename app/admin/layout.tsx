import { redirect } from "next/navigation";
import { adminLogout } from "./action";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold text-black/70">Admin Panel</p>
          <form action={adminLogout}>
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-6">{children}</main>
    </div>
  );
}