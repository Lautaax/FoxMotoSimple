import type React from "react"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import { CartIcon } from "@/components/cart-icon"
import { Toaster } from "@/components/toaster"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function TiendaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <header className="border-b border-gray-800 bg-[#1C1C1C]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1C1C1C]/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/tienda" className="text-lg md:text-xl font-bold text-orange-500">
                Fox Motorepuestos
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/tienda" className="text-sm hover:text-orange-500 transition-colors">
                  Inicio
                </Link>
                <Link href="/tienda/catalogo" className="text-sm hover:text-orange-500 transition-colors">
                  Catálogo
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <CartIcon />
              <div className="hidden sm:block">
                <UserMenu />
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#1C1C1C] border-gray-800">
                  <div className="flex flex-col space-y-6 mt-6">
                    <Link href="/tienda" className="text-lg hover:text-orange-500 transition-colors">
                      Inicio
                    </Link>
                    <Link href="/tienda/catalogo" className="text-lg hover:text-orange-500 transition-colors">
                      Catálogo
                    </Link>
                    <div className="pt-4 border-t border-gray-800">
                      <UserMenu />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      {children}
      <Toaster />
    </div>
  )
}
