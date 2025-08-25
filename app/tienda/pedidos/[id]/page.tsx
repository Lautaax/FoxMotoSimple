import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PedidoDetallePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/tienda/auth/login")
  }

  // Obtener pedido específico con items
  const { data: order } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        product_name,
        quantity,
        product_price,
        subtotal,
        product_id
      )
    `)
    .eq("id", id)
    .eq("user_id", data.user.id)
    .single()

  if (!order) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "processing":
        return "Procesando"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5" />
      case "processing":
        return <Truck className="h-5 w-5" />
      case "pending":
        return <Package className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tienda/pedidos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Pedidos
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Pedido #{order.order_number || order.id.slice(0, 8)}</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Estado del Pedido */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Estado del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge className={`${getStatusColor(order.status)} w-full justify-center py-2`}>
                    {getStatusText(order.status)}
                  </Badge>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Fecha:</strong> {new Date(order.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Hora:</strong> {new Date(order.created_at).toLocaleTimeString()}
                    </div>
                    <div>
                      <strong>Total:</strong> ${Number(order.total_amount).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de Entrega */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Información de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <div>
                    <strong>Nombre:</strong> {order.customer_name}
                  </div>
                  <div>
                    <strong>Email:</strong> {order.customer_email}
                  </div>
                  <div>
                    <strong>Teléfono:</strong> {order.customer_phone}
                  </div>
                  <div>
                    <strong>Dirección:</strong> {order.customer_address}
                  </div>
                  {order.notes && (
                    <div>
                      <strong>Notas:</strong> {order.notes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productos del Pedido */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos ({order.order_items?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product_name}</h4>
                        <div className="text-sm text-gray-400 mt-1">
                          Precio unitario: ${Number(item.product_price).toFixed(2)}
                        </div>
                      </div>
                      <div className="text-center mx-4">
                        <div className="text-sm text-gray-400">Cantidad</div>
                        <div className="font-semibold">{item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Subtotal</div>
                        <div className="font-semibold">${Number(item.subtotal).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total del Pedido:</span>
                      <span>${Number(order.total_amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <div className="flex gap-4 mt-6">
              {order.status === "completed" && <Button className="flex-1">Volver a Comprar</Button>}
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/tienda/catalogo">Seguir Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
