-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  sku TEXT UNIQUE,
  brand TEXT,
  model TEXT,
  year_from INTEGER,
  year_to INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);

-- Habilitar RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Políticas para productos (lectura pública, escritura solo admin)
CREATE POLICY "products_select_active" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "products_insert_admin" ON public.products FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "products_update_admin" ON public.products FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "products_delete_admin" ON public.products FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
