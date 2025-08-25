import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Verificar autenticación
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/tienda/admin/auth/login")
  }

  // Verificar permisos de administrador
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single()

  if (adminError || !adminData) {
    redirect("/tienda/admin/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar adminData={adminData} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
