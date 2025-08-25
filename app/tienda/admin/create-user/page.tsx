"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function CreateAdminUserPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const createAdminUser = async () => {
    setIsCreating(true)
    setMessage("")

    try {
      console.log("[v0] Iniciando creación de usuario admin...")

      const supabase = createClient()

      // Intentar crear el usuario usando signUp
      const { data, error } = await supabase.auth.signUp({
        email: "foxmotorepuestos@gmail.com",
        password: "Foxmoto1.",
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (error) {
        console.error("[v0] Error en signUp:", error)
        setMessage(`Error: ${error.message}`)
        setIsSuccess(false)
        return
      }

      console.log("[v0] Usuario creado:", data.user?.id)

      // Insertar en admin_users
      const { error: adminError } = await supabase.from("admin_users").insert({
        user_id: data.user?.id,
        email: "foxmotorepuestos@gmail.com",
        role: "super_admin",
      })

      if (adminError) {
        console.error("[v0] Error insertando admin:", adminError)
        setMessage(`Error creando admin: ${adminError.message}`)
        setIsSuccess(false)
        return
      }

      setMessage("Usuario admin creado exitosamente! Puedes usar: foxmotorepuestos@gmail.com / Foxmoto1.")
      setIsSuccess(true)
      console.log("[v0] Usuario admin creado exitosamente!")
    } catch (error) {
      console.error("[v0] Error general:", error)
      setMessage(`Error: ${error}`)
      setIsSuccess(false)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Usuario Admin</CardTitle>
          <CardDescription>Crear el usuario administrador principal para Fox Motorepuestos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> foxmotorepuestos@gmail.com
            </p>
            <p>
              <strong>Contraseña:</strong> Foxmoto1.
            </p>
          </div>

          <Button onClick={createAdminUser} disabled={isCreating} className="w-full">
            {isCreating ? "Creando..." : "Crear Usuario Admin"}
          </Button>

          {message && (
            <div
              className={`p-3 rounded text-sm ${
                isSuccess
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {isSuccess && (
            <div className="text-center">
              <Button asChild variant="outline">
                <a href="/tienda/admin/auth/login">Ir al Login Admin</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
