"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, Upload, LogOut, Users } from 'lucide-react'

interface AdminData {
  id: string
  email: string
  full_name: string | null
  role: string
}

interface AdminSidebarProps {
  adminData: AdminData
}

const navigation = [
  {
    name: "Dashboard",
    href: "/tienda/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Productos",
    href: "/tienda/admin/products",
    icon: Package,
  },
  {
    name: "Órdenes",
    href: "/tienda/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Clientes",
    href: "/tienda/admin/customers",
    icon: Users,
  },
  {
    name: "Importar Excel",
    href: "/tienda/admin/import",
    icon: Upload,
  },
]

export function AdminSidebar({ adminData }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "/api/auth/logout"
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">
          Fox <span className="text-orange-500">Admin</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">{adminData.full_name || adminData.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
