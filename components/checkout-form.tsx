"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, CreditCard, Truck, Phone } from "lucide-react"

interface CheckoutFormProps {
  items: any[]
  total: number
  onSuccess: () => void
}

export function CheckoutForm({ items, total, onSuccess }: CheckoutFormProps) {
  const router = useRouter()
  const { clearCart } = useCart()
  const { toast } = useToast()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderNumber = `ORD-${Date.now()}`

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_number: orderNumber,
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone || null,
            customer_address: formData.customerAddress || null,
            total_amount: total,
            status: "pending",
            notes: formData.notes || null,
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      await clearCart()

      toast({
        variant: "success",
        title: "¡Pedido creado exitosamente!",
        description: `Número de orden: ${orderNumber}. Te contactaremos pronto.`,
      })

      setCurrentStep(3)

      setTimeout(() => {
        router.push("/tienda")
        onSuccess()
      }, 3000)
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        variant: "destructive",
        title: "Error al crear el pedido",
        description: "Por favor intenta nuevamente o contacta con nosotros.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isFormValid = formData.customerName && formData.customerEmail

  if (currentStep === 3) {
    return (
      <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">¡Pedido Confirmado!</h2>
          <p className="text-[#7A7A7A] mb-6">
            Hemos recibido tu pedido correctamente. Te contactaremos pronto para coordinar el pago y la entrega.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-[#7A7A7A]">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Te llamaremos</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Coordinaremos entrega</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? "bg-[#D32F2F] text-white" : "bg-[#7A7A7A] text-gray-300"
            }`}
          >
            1
          </div>
          <span className="ml-2 text-sm text-white">Información</span>
        </div>
        <div className="w-16 h-0.5 bg-[#7A7A7A]"></div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? "bg-[#D32F2F] text-white" : "bg-[#7A7A7A] text-gray-300"
            }`}
          >
            2
          </div>
          <span className="ml-2 text-sm text-white">Confirmación</span>
        </div>
      </div>

      {currentStep === 1 && (
        <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Información de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="text-white">
                    Nombre completo *
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerPhone" className="text-white">
                    Teléfono
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white"
                    placeholder="291 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress" className="text-white">
                    Dirección
                  </Label>
                  <Input
                    id="customerAddress"
                    value={formData.customerAddress}
                    onChange={(e) => handleInputChange("customerAddress", e.target.value)}
                    className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white"
                    placeholder="Para envío o referencia"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-white">
                  Notas adicionales
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white"
                  placeholder="Comentarios sobre el pedido, horarios de entrega, etc."
                  rows={3}
                />
              </div>

              <Button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={!isFormValid}
                className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80"
              >
                Continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
          <CardHeader>
            <CardTitle className="text-white">Confirmar Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Info Summary */}
            <div className="bg-[#1C1C1C] rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#7A7A7A]">Nombre:</span>
                  <span className="text-white ml-2">{formData.customerName}</span>
                </div>
                <div>
                  <span className="text-[#7A7A7A]">Email:</span>
                  <span className="text-white ml-2">{formData.customerEmail}</span>
                </div>
                {formData.customerPhone && (
                  <div>
                    <span className="text-[#7A7A7A]">Teléfono:</span>
                    <span className="text-white ml-2">{formData.customerPhone}</span>
                  </div>
                )}
                {formData.customerAddress && (
                  <div>
                    <span className="text-[#7A7A7A]">Dirección:</span>
                    <span className="text-white ml-2">{formData.customerAddress}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#1C1C1C] rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Resumen del Pedido</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-[#D32F2F]/10 text-[#D32F2F]">
                        {item.quantity}x
                      </Badge>
                      <span className="text-white">{item.product.name}</span>
                    </div>
                    <span className="text-white font-medium">
                      ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#7A7A7A]/20 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#D32F2F]">${total.toLocaleString("es-AR")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1 border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
              >
                Volver
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-[#D32F2F] hover:bg-[#D32F2F]/80"
              >
                {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
              </Button>
            </div>

            <div className="text-sm text-[#7A7A7A] text-center bg-[#1C1C1C] rounded-lg p-3">
              <p>Al confirmar tu pedido, nos pondremos en contacto contigo para coordinar el pago y la entrega.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
