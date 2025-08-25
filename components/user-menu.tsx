"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, ShoppingBag, UserCircle, Crown, Settings, Package, Users, ClipboardList } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserData {
  id: string
  email: string
}

interface UserProfile {
  customer_type: "regular" | "wholesale"
  company_name?: string
}

interface AdminData {
  role: string
  is_active: boolean
}

export function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser({ id: user.id, email: user.email || "" })

        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("customer_type, company_name")
          .eq("user_id", user.id)
          .single()

        setProfile(profileData)

        const { data: adminInfo } = await supabase
          .from("admin_users")
          .select("role, is_active")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .single()

        setAdminData(adminInfo)
      } else {
        setUser(null)
        setProfile(null)
        setAdminData(null)
      }

      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" })

        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("customer_type, company_name")
          .eq("user_id", session.user.id)
          .single()

        setProfile(profileData)

        const { data: adminInfo } = await supabase
          .from("admin_users")
          .select("role, is_active")
          .eq("user_id", session.user.id)
          .eq("is_active", true)
          .single()

        setAdminData(adminInfo)
      } else {
        setUser(null)
        setProfile(null)
        setAdminData(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/tienda")
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <UserCircle className="h-4 w-4" />
      </Button>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="justify-start sm:justify-center">
          <Link href="/tienda/auth/login">Iniciar Sesión</Link>
        </Button>
        <Button size="sm" asChild className="justify-start sm:justify-center">
          <Link href="/tienda/auth/sign-up">Registrarse</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="justify-start sm:justify-center">
          <User className="h-4 w-4 mr-2" />
          <div className="flex flex-col items-start">
            <span className="truncate max-w-32">{user.email}</span>
            <div className="flex gap-1 mt-1">
              {profile?.customer_type === "wholesale" && (
                <Badge className="bg-orange-600/10 text-orange-500 border-orange-500/20 text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  Mayorista
                </Badge>
              )}
              {adminData && (
                <Badge className="bg-red-600/10 text-red-500 border-red-500/20 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {adminData && (
          <>
            <div className="px-2 py-1.5 text-sm">
              <div className="flex items-center gap-2 text-red-500">
                <Settings className="h-4 w-4" />
                <span className="font-medium">Administrador</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Rol: {adminData.role}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/tienda/admin/dashboard">
                <Settings className="h-4 w-4 mr-2" />
                Panel Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/tienda/admin/products">
                <Package className="h-4 w-4 mr-2" />
                Gestionar Productos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/tienda/admin/orders">
                <ClipboardList className="h-4 w-4 mr-2" />
                Ver Pedidos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/tienda/admin/customers">
                <Users className="h-4 w-4 mr-2" />
                Manejar Usuarios
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {profile?.customer_type === "wholesale" && (
          <>
            <div className="px-2 py-1.5 text-sm">
              <div className="flex items-center gap-2 text-orange-500">
                <Crown className="h-4 w-4" />
                <span className="font-medium">Cliente Mayorista</span>
              </div>
              {profile.company_name && <p className="text-xs text-gray-500 mt-1">{profile.company_name}</p>}
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href="/tienda/perfil">
            <UserCircle className="h-4 w-4 mr-2" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/tienda/pedidos">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Mis Pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
