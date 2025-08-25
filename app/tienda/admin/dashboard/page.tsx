import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Obtener estadísticas básicas
  const [{ count: productsCount }, { count: categoriesCount }, { count: ordersCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-500">{productsCount || 0}</p>
            <p className="text-gray-400">Total de productos</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">{categoriesCount || 0}</p>
            <p className="text-gray-400">Categorías activas</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Órdenes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{ordersCount || 0}</p>
            <p className="text-gray-400">Total de órdenes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/tienda/admin/products"
              className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="text-white font-medium">Gestionar Productos</h3>
              <p className="text-gray-400 text-sm">Agregar, editar o eliminar productos</p>
            </Link>
            <Link
              href="/tienda/admin/orders"
              className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="text-white font-medium">Ver Órdenes</h3>
              <p className="text-gray-400 text-sm">Gestionar pedidos de clientes</p>
            </Link>
            <Link
              href="/tienda/admin/import"
              className="block p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h3 className="text-white font-medium">Importar Excel</h3>
              <p className="text-gray-400 text-sm">Cargar productos desde archivo Excel</p>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Información del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Versión:</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Última actualización:</span>
              <span className="text-white">Hoy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estado:</span>
              <span className="text-green-500">Activo</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
