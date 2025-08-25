-- Crear tabla de usuarios administradores
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Habilitar RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para admin_users (solo admins pueden ver y gestionar)
CREATE POLICY "admin_users_select_own" ON public.admin_users FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "admin_users_insert_super_admin" ON public.admin_users FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "admin_users_update_super_admin" ON public.admin_users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "admin_users_delete_super_admin" ON public.admin_users FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
);
