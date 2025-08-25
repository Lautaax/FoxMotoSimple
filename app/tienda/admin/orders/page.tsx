import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersTable } from "@/components/admin/orders-table";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Obtener órdenes con items
  const { data: orders, error } = await supabase
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
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error al cargar órdenes: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Gestión de Órdenes</h1>
        <p className="text-gray-400">Administra los pedidos de clientes</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders || []} />
        </CardContent>
      </Card>
    </div>
  );
}
