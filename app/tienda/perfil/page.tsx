import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { User, ShoppingBag, Mail, Crown, Building, Phone, MapPin, Hash } from 'lucide-react'
import { PersonalInfoForm } from "@/components/personal-info-form"

export default async function PerfilPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/tienda/auth/login")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", data.user.id)
    .single()

  // Obtener estadísticas del usuario
  const { data: orders } = await supabase
    .from("orders")
    .select("id, total_amount, status, created_at")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

  const totalOrders = orders?.length || 0
  const totalSpent = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          {profile?.customer_type === "wholesale" && (
            <Badge className="bg-orange-600/10 text-orange-500 border-orange-500/20">
              <Crown className="h-4 w-4 mr-1" />
              Cliente Mayorista
            </Badge>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PersonalInfoForm profile={profile} userId={data.user.id} />

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Estadísticas de Compras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{data.user.email}</span>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Miembro desde: {new Date(data.user.created_at).toLocaleDateString()}
              </div>

              <div className="flex justify-between">
                <span>Total de Pedidos:</span>
                <span className="font-semibold">{totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Gastado:</span>
                <span className="font-semibold">${totalSpent.toFixed(2)}</span>
              </div>

              {profile?.customer_type === "wholesale" && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="font-medium text-orange-500 mb-3 flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Información Mayorista
                  </h4>
                  <div className="space-y-2 text-sm">
                    {profile.company_name && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{profile.company_name}</span>
                      </div>
                    )}
                    {profile.tax_id && (
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span>RUT/CUIT: {profile.tax_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {profile?.customer_type === "wholesale" && (
                <div className="mt-4 p-3 bg-orange-600/10 border border-orange-500/20 rounded-lg">
                  <h4 className="font-medium text-orange-500 mb-2">Beneficios Mayorista</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Precios especiales en todos los productos</li>
                    <li>• Descuentos por volumen</li>
                    <li>• Atención personalizada</li>
                  </ul>
                </div>
              )}

              <Button asChild className="w-full mt-4">
                <Link href="/tienda/pedidos">Ver Historial de Pedidos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pedidos Recientes */}
        {orders && orders.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">Pedido #{order.id.slice(0, 8)}</div>
                      <div className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${Number(order.total_amount).toFixed(2)}</div>
                      <div
                        className={`text-sm ${
                          order.status === "completed"
                            ? "text-green-400"
                            : order.status === "pending"
                              ? "text-yellow-400"
                              : "text-gray-400"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Completado"
                          : order.status === "pending"
                            ? "Pendiente"
                            : order.status === "processing"
                              ? "Procesando"
                              : order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
