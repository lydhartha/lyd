import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  const userEmail = profile?.email ?? user.email ?? "No email available";
  const userRole = profile?.role ?? "unknown";

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-lg border border-black/10 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-black/50">
            Authenticated User
          </p>
          <p className="mt-2 text-base font-semibold text-black">{userEmail}</p>
          <p className="mt-1 text-xs text-black/60">ID: {user.id}</p>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-black/50">
            Role
          </p>
          <p className="mt-2 text-base font-semibold capitalize text-black">
            {userRole}
          </p>
        </section>
      </div>
    </div>
  );
}