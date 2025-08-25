-- Script para asegurar que foxmotorepuestos@gmail.com sea admin
-- Creando script para verificar y crear usuario admin si no existe

-- Primero verificamos si el usuario existe en auth.users
DO $$
DECLARE
    admin_user_id uuid;
    admin_exists boolean := false;
BEGIN
    -- Buscar el usuario por email
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'foxmotorepuestos@gmail.com';
    
    IF admin_user_id IS NOT NULL THEN
        admin_exists := true;
        RAISE NOTICE 'Usuario admin encontrado con ID: %', admin_user_id;
    ELSE
        RAISE NOTICE 'Usuario admin no encontrado, necesita ser creado manualmente';
    END IF;
    
    -- Si el usuario existe, asegurar que esté en admin_users
    IF admin_exists THEN
        -- Insertar o actualizar en admin_users
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
        )
        ON CONFLICT (user_id) 
        DO UPDATE SET
            role = 'super_admin',
            is_active = true,
            updated_at = NOW();
            
        -- Asegurar que tenga un perfil de usuario también
        INSERT INTO public.user_profiles (
            user_id,
            customer_type,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            'regular',
            NOW(),
            NOW()
        )
        ON CONFLICT (user_id) DO NOTHING;
        
        RAISE NOTICE 'Usuario admin configurado correctamente';
    END IF;
END $$;
