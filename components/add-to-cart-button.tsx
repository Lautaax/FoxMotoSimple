"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from "@/hooks/use-cart";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
}

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
}

export function AddToCartButton({ product, disabled = false, size = "default" }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(product, quantity);
      // Mostrar notificación de éxito
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-3">
      {/* Selector de cantidad */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#7A7A7A]">Cantidad:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0 border-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-white">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="h-8 w-8 p-0 border-[#7A7A7A] hover:bg-[#7A7A7A]/10"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Botón agregar al carrito */}
      <Button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        size={size}
        className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAdding ? "Agregando..." : "Agregar al carrito"}
      </Button>
    </div>
  );
}
