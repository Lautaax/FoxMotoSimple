"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Package, Instagram, Facebook, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppWholesale = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("Hola Fox MotoRespuestos quiero comprar como mayorista")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("¡Hola! Me interesa consultar sobre repuestos para motos. ¿Podrían ayudarme?")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:text-[#D32F2F]">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-[#1C1C1C] border-[#7A7A7A]/20">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={32} height={32} className="h-6 w-auto" />
              <span className="text-lg font-bold text-white">
                Fox <span className="text-[#D32F2F]">Motorepuestos</span>
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 mb-8">
              <button
                onClick={() => handleNavClick("#inicio")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavClick("#marcas")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Marcas
              </button>
              <button
                onClick={() => handleNavClick("#productos")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Productos
              </button>
              <button
                onClick={() => handleNavClick("#servicios")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => handleNavClick("#nosotros")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleNavClick("#contacto")}
                className="text-left text-white hover:text-[#D32F2F] transition-colors py-2"
              >
                Contacto
              </button>
              <Link
                href="/tienda"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-left text-white hover:text-[#D32F2F] transition-colors py-2 font-medium"
              >
                <ShoppingCart className="h-4 w-4" />
                Tienda Online
              </Link>
            </nav>

            {/* Contact Buttons */}
            <div className="space-y-3 mb-8">
              <Button onClick={handleWhatsAppContact} className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white">
                <Phone className="mr-2 h-4 w-4" />
                Contactar Ahora
              </Button>
              <Button
                onClick={handleWhatsAppWholesale}
                variant="outline"
                className="w-full border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 hover:border-[#D32F2F] hover:text-[#D32F2F] bg-transparent"
              >
                <Package className="mr-2 h-4 w-4" />
                Ventas Mayoristas
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="text-center">
                <a
                  href="tel:+542915221351"
                  className="flex items-center justify-center gap-2 text-[#7A7A7A] hover:text-[#D32F2F] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  291 522-1351
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center gap-4 mt-auto">
              <a
                href="https://instagram.com/foxmotorep"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#7A7A7A]/20 hover:bg-[#E4405F]/20 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5 text-[#E4405F]" />
              </a>
              <a
                href="https://facebook.com/foxmotorepuestosbb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#7A7A7A]/20 hover:bg-[#1877F2]/20 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
