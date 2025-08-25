import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, Eye } from "lucide-react"

export default async function PedidosPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/tienda/auth/login")
  }

  // Obtener pedidos del usuario con items
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        product_name,
        quantity,
        product_price,
        subtotal
      )
    `)
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-8 w-8" />
            Mis Pedidos
          </h1>
          <Button variant="outline" asChild>
            <Link href="/tienda/perfil">Volver al Perfil</Link>
          </Button>
        </div>

        {!orders || orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tienes pedidos aún</h3>
              <p className="text-gray-400 mb-6">Cuando realices tu primera compra, aparecerá aquí.</p>
              <Button asChild>
                <Link href="/tienda/catalogo">Explorar Productos</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pedido #{order.order_number || order.id.slice(0, 8)}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    Realizado el {new Date(order.created_at).toLocaleDateString()} a las{" "}
                    {new Date(order.created_at).toLocaleTimeString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Información del pedido */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-2">Información de Entrega</h4>
                        <div className="text-sm space-y-1">
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
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Resumen del Pedido</h4>
                        <div className="text-sm space-y-1">
                          <div>
                            <strong>Total:</strong> ${Number(order.total_amount).toFixed(2)}
                          </div>
                          <div>
                            <strong>Items:</strong> {order.order_items?.length || 0} productos
                          </div>
                          {order.notes && (
                            <div>
                              <strong>Notas:</strong> {order.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Items del pedido */}
                    {order.order_items && order.order_items.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Productos</h4>
                        <div className="space-y-2">
                          {order.order_items.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                              <div>
                                <div className="font-medium">{item.product_name}</div>
                                <div className="text-sm text-gray-400">
                                  Cantidad: {item.quantity} × ${Number(item.product_price).toFixed(2)}
                                </div>
                              </div>
                              <div className="font-semibold">${Number(item.subtotal).toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="flex gap-2 pt-4 border-t border-gray-700">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tienda/pedidos/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Link>
                      </Button>
                      {order.status === "completed" && (
                        <Button variant="outline" size="sm">
                          Volver a Comprar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
