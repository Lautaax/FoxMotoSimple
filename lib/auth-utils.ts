import { createClient } from "@/lib/supabase/server";

export async function getCurrentAdmin() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (adminError || !adminData) {
    return null;
  }

  return {
    user,
    admin: adminData
  };
}

export async function requireAdmin() {
  const adminData = await getCurrentAdmin();
  
  if (!adminData) {
    throw new Error("Acceso no autorizado");
  }
  
  return adminData;
}
