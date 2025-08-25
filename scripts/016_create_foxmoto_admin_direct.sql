-- Script para crear directamente el usuario admin foxmotorepuestos@gmail.com
-- Este script asume que el usuario ya se registró en auth.users

-- Primero, insertar en admin_users si no existe
INSERT INTO admin_users (
  user_id,
  email,
  role,
  is_active,
  full_name,
  created_at,
  updated_at
)
SELECT 
  au.id,
  'foxmotorepuestos@gmail.com',
  'super_admin',
  true,
  'Fox Motorepuestos Admin',
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'foxmotorepuestos@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM admin_users 
  WHERE email = 'foxmotorepuestos@gmail.com'
);

-- También crear el perfil de usuario si no existe
INSERT INTO user_profiles (
  user_id,
  customer_type,
  company_name,
  phone,
  address,
  created_at,
  updated_at
)
SELECT 
  au.id,
  'regular',
  'Fox Motorepuestos',
  '',
  '',
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'foxmotorepuestos@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM user_profiles 
  WHERE user_id = au.id
);

-- Verificar que se creó correctamente
SELECT 
  au.email,
  au.created_at as user_created,
  admin.role,
  admin.is_active,
  admin.full_name
FROM auth.users au
LEFT JOIN admin_users admin ON au.id = admin.user_id
WHERE au.email = 'foxmotorepuestos@gmail.com';
