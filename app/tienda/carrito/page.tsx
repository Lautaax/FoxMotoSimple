"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from "@/components/cart-item"
import { CheckoutForm } from "@/components/checkout-form"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { items, isLoading, total, itemCount } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D32F2F]"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] text-white">
        <div className="container px-4 md:px-6 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-[#7A7A7A] mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-[#7A7A7A] text-lg mb-8">Agrega algunos productos para comenzar tu compra</p>
            <Link href="/tienda/catalogo">
              <Button className="bg-[#D32F2F] hover:bg-[#D32F2F]/80">Ver Catálogo</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/tienda/catalogo" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Carrito de Compras</h1>
            <p className="text-[#7A7A7A]">
              {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu carrito
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="space-y-6">
            <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
              <CardHeader>
                <CardTitle className="text-white">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Envío</span>
                  <span>A calcular</span>
                </div>
                <div className="border-t border-[#7A7A7A]/20 pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toLocaleString("es-AR")}</span>
                  </div>
                </div>

                {!showCheckout ? (
                  <Button onClick={() => setShowCheckout(true)} className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80">
                    Proceder al Checkout
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowCheckout(false)}
                    variant="outline"
                    className="w-full border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10"
                  >
                    Volver al Carrito
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Información adicional */}
            <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">Información de Envío</h3>
                <p className="text-sm text-[#7A7A7A] mb-2">• Envíos a Bahía Blanca y zona</p>
                <p className="text-sm text-[#7A7A7A] mb-2">• Retiro en local sin costo</p>
                <p className="text-sm text-[#7A7A7A]">• Consulta por envíos a otras localidades</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulario de checkout */}
        {showCheckout && (
          <div className="mt-8">
            <CheckoutForm items={items} total={total} onSuccess={() => setShowCheckout(false)} />
          </div>
        )}
      </div>
    </div>
  )
}
