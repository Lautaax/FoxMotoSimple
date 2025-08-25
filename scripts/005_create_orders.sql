-- Crear tabla de órdenes
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de items de órdenes
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL, -- Guardamos el nombre por si se elimina el producto
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para orders (usuarios ven sus órdenes, admins ven todas)
CREATE POLICY "orders_select_own_or_admin" ON public.orders FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "orders_insert_own" ON public.orders FOR INSERT WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);
CREATE POLICY "orders_update_admin" ON public.orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- Políticas para order_items
CREATE POLICY "order_items_select_via_order" ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders o 
    WHERE o.id = order_id 
    AND (o.user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
  )
);
CREATE POLICY "order_items_insert_via_order" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders o 
    WHERE o.id = order_id 
    AND (o.user_id = auth.uid() OR o.user_id IS NULL)
  )
);
