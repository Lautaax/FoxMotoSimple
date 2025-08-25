"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("foxmotorepuestos@gmail.com")
  const [password, setPassword] = useState("Foxmoto1.")
  const [fullName, setFullName] = useState("Fox Motorepuestos Admin")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      console.log("[v0] Iniciando creación de usuario admin...")

      // Crear usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/tienda/admin/dashboard`,
        },
      })

      if (authError) {
        console.log("[v0] Error en auth.signUp:", authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error("No se pudo crear el usuario")
      }

      console.log("[v0] Usuario creado en auth:", authData.user.id)

      // Insertar en admin_users
      const { error: adminError } = await supabase.from("admin_users").insert({
        user_id: authData.user.id,
        email: email,
        full_name: fullName,
        role: "super_admin",
        is_active: true,
      })

      if (adminError) {
        console.log("[v0] Error insertando en admin_users:", adminError)
        throw adminError
      }

      console.log("[v0] Usuario admin creado exitosamente")
      setSuccess("Usuario administrador creado exitosamente. Puedes iniciar sesión ahora.")

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/tienda/admin/auth/login")
      }, 2000)
    } catch (error: unknown) {
      console.log("[v0] Error en setup:", error)
      setError(error instanceof Error ? error.message : "Error al crear usuario admin")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Setup Administrador</CardTitle>
            <CardDescription className="text-gray-400">Crear el primer usuario administrador</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-800">{error}</div>
              )}
              {success && (
                <div className="text-green-400 text-sm bg-green-900/20 p-3 rounded border border-green-800">
                  {success}
                </div>
              )}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                {isLoading ? "Creando usuario..." : "Crear Administrador"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
