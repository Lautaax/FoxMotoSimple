-- Crear usuario administrador foxmotorepuestos@gmail.com
-- Este script crea el usuario en auth.users y lo registra como admin

-- Primero insertar en auth.users (tabla de autenticación de Supabase)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'foxmotorepuestos@gmail.com',
  crypt('Foxmoto1', gen_salt('bf')), -- Encriptar contraseña con bcrypt
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Fox Motorepuestos Admin"}',
  false,
  'authenticated',
  'authenticated',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Luego insertar en admin_users usando el user_id del usuario creado
INSERT INTO public.admin_users (
  id,
  user_id,
  email,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) 
SELECT 
  gen_random_uuid(),
  u.id,
  'foxmotorepuestos@gmail.com',
  'Fox Motorepuestos Admin',
  'super_admin',
  true,
  NOW(),
  NOW()
FROM auth.users u 
WHERE u.email = 'foxmotorepuestos@gmail.com'
ON CONFLICT (email) DO UPDATE SET
  is_active = true,
  role = 'super_admin',
  updated_at = NOW();

-- Crear perfil de usuario regular también (por si accede a la tienda)
INSERT INTO public.user_profiles (
  id,
  user_id,
  customer_type,
  company_name,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  u.id,
  'regular',
  'Fox Motorepuestos',
  NOW(),
  NOW()
FROM auth.users u 
WHERE u.email = 'foxmotorepuestos@gmail.com'
ON CONFLICT (user_id) DO NOTHING;
