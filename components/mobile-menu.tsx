"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevenir scroll cuando el menú está abierto
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  // Cerrar el menú cuando se hace clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-[#D32F2F]/10 z-50 relative"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
      </Button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={toggleMenu}
      />

      {/* Menú lateral */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[300px] bg-[#1C1C1C] border-l border-[#7A7A7A]/20 p-6 z-50 shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={40} height={40} className="h-8 w-auto" />
              <span className="text-lg font-bold">
                Fox <span className="text-[#D32F2F]">Motorepuestos</span>
              </span>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <nav className="flex flex-col gap-2">
            {[
              { href: "#inicio", label: "Inicio", delay: "100" },
              { href: "#marcas", label: "Marcas", delay: "150" },
              { href: "#productos", label: "Productos", delay: "200" },
              { href: "#nosotros", label: "Nosotros", delay: "250" },
              { href: "#contacto", label: "Contacto", delay: "300" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 py-3 px-4 rounded-md hover:bg-[#D32F2F]/10 transition-all duration-300",
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                )}
                style={{
                  transitionDelay: isOpen ? `${item.delay}ms` : "0ms",
                }}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Información de contacto */}
          <div
            className={cn(
              "mt-8 border-t border-[#7A7A7A]/20 pt-6 transition-all duration-300",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: isOpen ? "350ms" : "0ms" }}
          >
            <div className="flex flex-col gap-4">
              <a href="tel:+542915347003" className="flex items-center gap-2 text-sm group">
                <div className="rounded-full bg-[#D32F2F]/10 p-2 group-hover:bg-[#D32F2F]/20 transition-colors">
                  <Phone className="h-4 w-4 text-[#D32F2F]" />
                </div>
                <span className="group-hover:text-[#D32F2F] transition-colors">291 534-7003</span>
              </a>
              <a href="mailto:info@foxmotorepuestos.com" className="flex items-center gap-2 text-sm group">
                <div className="rounded-full bg-[#D32F2F]/10 p-2 group-hover:bg-[#D32F2F]/20 transition-colors">
                  <Mail className="h-4 w-4 text-[#D32F2F]" />
                </div>
                <span className="group-hover:text-[#D32F2F] transition-colors">info@foxmotorepuestos.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm">
                <div className="rounded-full bg-[#D32F2F]/10 p-2">
                  <MapPin className="h-4 w-4 text-[#D32F2F]" />
                </div>
                <span>Manzana de las Luces 475, Bahía Blanca</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="rounded-full bg-[#D32F2F]/10 p-2">
                  <Clock className="h-4 w-4 text-[#D32F2F]" />
                </div>
                <span>Lun-Vie: 9:00-18:00 | Sáb: 9:00-13:00</span>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div
            className={cn(
              "mt-6 flex gap-4 transition-all duration-300",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
          >
            <a
              href="#"
              className="rounded-full bg-[#7A7A7A]/20 p-3 hover:bg-[#D32F2F]/20 transition-colors hover:scale-110 transform duration-200"
            >
              <Instagram className="h-5 w-5 text-[#D32F2F]" />
            </a>
            <a
              href="#"
              className="rounded-full bg-[#7A7A7A]/20 p-3 hover:bg-[#D32F2F]/20 transition-colors hover:scale-110 transform duration-200"
            >
              <Facebook className="h-5 w-5 text-[#D32F2F]" />
            </a>
          </div>

          {/* Botón de contacto */}
          <div
            className={cn(
              "mt-auto transition-all duration-300",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}
          >
            <Button
              className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80 transition-all duration-300 hover:shadow-lg"
              onClick={handleLinkClick}
            >
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
