"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function CartIcon() {
  const pathname = usePathname()
  const { itemCount, isLoading } = useCart()

  const isAdminPage = pathname?.startsWith("/tienda/admin")

  // Si estamos en una página de admin, mostrar el ícono sin funcionalidad
  if (isAdminPage) {
    return (
      <Link href="/tienda/carrito">
        <Button variant="ghost" size="sm" className="relative text-[#7A7A7A] hover:text-white">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/tienda/carrito">
      <Button variant="ghost" size="sm" className="relative text-[#7A7A7A] hover:text-white">
        <ShoppingCart className="h-5 w-5" />
        {!isLoading && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
