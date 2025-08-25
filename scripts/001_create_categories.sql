-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Políticas para categorías (lectura pública, escritura solo admin)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);
CREATE POLICY "categories_delete_admin" ON public.categories FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
);

-- Insertar categorías iniciales
INSERT INTO public.categories (name, description) VALUES
('Neumáticos', 'Neumáticos para todo tipo de vehículos'),
('Frenos', 'Sistemas de frenos y componentes'),
('Motor', 'Repuestos y accesorios para motor'),
('Suspensión', 'Amortiguadores y componentes de suspensión'),
('Eléctrico', 'Componentes eléctricos y electrónicos'),
('Carrocería', 'Repuestos para carrocería y exterior')
ON CONFLICT (name) DO NOTHING;
