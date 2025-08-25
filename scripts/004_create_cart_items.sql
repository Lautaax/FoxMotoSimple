-- Crear tabla de items del carrito
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL, -- Para carritos de usuarios no registrados
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Para usuarios registrados
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, product_id),
  UNIQUE(user_id, product_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON public.cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON public.cart_items(product_id);

-- Habilitar RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Políticas para cart_items (usuarios pueden ver/gestionar su propio carrito)
CREATE POLICY "cart_items_select_own" ON public.cart_items FOR SELECT USING (
  auth.uid() = user_id OR session_id = current_setting('app.session_id', true)
);
CREATE POLICY "cart_items_insert_own" ON public.cart_items FOR INSERT WITH CHECK (
  auth.uid() = user_id OR session_id = current_setting('app.session_id', true)
);
CREATE POLICY "cart_items_update_own" ON public.cart_items FOR UPDATE USING (
  auth.uid() = user_id OR session_id = current_setting('app.session_id', true)
);
CREATE POLICY "cart_items_delete_own" ON public.cart_items FOR DELETE USING (
  auth.uid() = user_id OR session_id = current_setting('app.session_id', true)
);
