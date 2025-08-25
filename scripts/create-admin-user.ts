import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  try {
    console.log("[v0] Creando usuario admin...")

    // Crear usuario en auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: "foxmotorepuestos@gmail.com",
      password: "Foxmoto1.",
      email_confirm: true,
    })

    if (authError) {
      console.error("[v0] Error creando usuario:", authError)
      return
    }

    console.log("[v0] Usuario creado en auth:", authData.user?.id)

    // Insertar en admin_users
    const { error: adminError } = await supabase.from("admin_users").insert({
      user_id: authData.user.id,
      email: "foxmotorepuestos@gmail.com",
      role: "super_admin",
      created_at: new Date().toISOString(),
    })

    if (adminError) {
      console.error("[v0] Error insertando admin:", adminError)
      return
    }

    console.log("[v0] Usuario admin creado exitosamente!")
    console.log("[v0] Email: foxmotorepuestos@gmail.com")
    console.log("[v0] Password: Foxmoto1.")
  } catch (error) {
    console.error("[v0] Error general:", error)
  }
}

createAdminUser()
