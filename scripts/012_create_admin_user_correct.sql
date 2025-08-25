-- Crear usuario administrador foxmotorepuestos@gmail.com correctamente
-- Este script debe ejecutarse desde el panel de Supabase SQL Editor

-- Primero, crear el usuario en auth.users usando la función admin
SELECT auth.create_user(
  'foxmotorepuestos@gmail.com'::text,
  'Foxmoto1.'::text,
  '{"full_name": "Fox Motorepuestos Admin"}'::jsonb,
  true -- email_confirmed
);

-- Obtener el user_id del usuario recién creado
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Buscar el user_id del usuario creado
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'foxmotorepuestos@gmail.com';
  
  -- Insertar en admin_users si el usuario existe
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.admin_users (
      user_id,
      email,
      full_name,
      role,
      is_active,
      created_at,
      updated_at
    ) VALUES (
      admin_user_id,
      'foxmotorepuestos@gmail.com',
      'Fox Motorepuestos Admin',
      'super_admin',
      true,
      NOW(),
      NOW()
    ) ON CONFLICT (user_id) DO UPDATE SET
      email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      is_active = EXCLUDED.is_active,
      updated_at = NOW();
    
    -- También crear perfil de usuario regular
    INSERT INTO public.user_profiles (
      user_id,
      customer_type,
      company_name,
      created_at,
      updated_at
    ) VALUES (
      admin_user_id,
      'regular',
      'Fox Motorepuestos',
      NOW(),
      NOW()
    ) ON CONFLICT (user_id) DO UPDATE SET
      company_name = EXCLUDED.company_name,
      updated_at = NOW();
      
    RAISE NOTICE 'Usuario administrador creado exitosamente con ID: %', admin_user_id;
  ELSE
    RAISE EXCEPTION 'No se pudo crear el usuario en auth.users';
  END IF;
END $$;
