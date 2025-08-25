"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  product_price: number;
  subtotal: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

interface OrdersTableProps {
  orders: Order[];
}

const statusColors = {
  pending: "bg-yellow-900 text-yellow-300",
  confirmed: "bg-blue-900 text-blue-300",
  processing: "bg-purple-900 text-purple-300",
  shipped: "bg-orange-900 text-orange-300",
  delivered: "bg-green-900 text-green-300",
  cancelled: "bg-red-900 text-red-300",
};

const statusLabels = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error al actualizar el estado de la orden");
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800">
            <TableHead className="text-gray-300">Número</TableHead>
            <TableHead className="text-gray-300">Cliente</TableHead>
            <TableHead className="text-gray-300">Items</TableHead>
            <TableHead className="text-gray-300">Total</TableHead>
            <TableHead className="text-gray-300">Estado</TableHead>
            <TableHead className="text-gray-300">Fecha</TableHead>
            <TableHead className="text-gray-300">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-gray-800">
              <TableCell className="font-medium text-white">
                {order.order_number}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-white">{order.customer_name}</p>
                  <p className="text-sm text-gray-400">{order.customer_email}</p>
                  {order.customer_phone && (
                    <p className="text-sm text-gray-400">{order.customer_phone}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.order_items.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-sm">
                      <span className="text-white">{item.product_name}</span>
                      <span className="text-gray-400"> x{item.quantity}</span>
                    </div>
                  ))}
                  {order.order_items.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{order.order_items.length - 2} más
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium text-white">
                ${order.total_amount.toLocaleString('es-AR')}
              </TableCell>
              <TableCell>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-400">
                {new Date(order.created_at).toLocaleDateString('es-AR')}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                  disabled={updatingStatus === order.id}
                >
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="processing">Procesando</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
