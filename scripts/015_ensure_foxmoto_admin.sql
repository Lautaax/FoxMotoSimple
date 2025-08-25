-- Script para asegurar que foxmotorepuestos@gmail.com sea admin
-- Creando script para hacer admin al usuario foxmotorepuestos@gmail.com

-- Primero verificamos si el usuario existe en auth.users y lo creamos si no existe
DO $$
DECLARE
    user_exists boolean;
    user_uuid uuid;
BEGIN
    -- Verificar si el usuario ya existe
    SELECT EXISTS(
        SELECT 1 FROM auth.users 
        WHERE email = 'foxmotorepuestos@gmail.com'
    ) INTO user_exists;
    
    IF NOT user_exists THEN
        -- Crear el usuario si no existe
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'foxmotorepuestos@gmail.com',
            crypt('Foxmoto1.', gen_salt('bf')),
            now(),
            now(),
            now(),
            '',
            '',
            '',
            ''
        );
    END IF;
    
    -- Obtener el UUID del usuario
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = 'foxmotorepuestos@gmail.com';
    
    -- Insertar o actualizar en admin_users
    INSERT INTO admin_users (
        id,
        user_id,
        email,
        full_name,
        role,
        is_active,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_uuid,
        'foxmotorepuestos@gmail.com',
        'Fox Motorepuestos Admin',
        'super_admin',
        true,
        now(),
        now()
    )
    ON CONFLICT (email) 
    DO UPDATE SET
        role = 'super_admin',
        is_active = true,
        updated_at = now();
    
    -- Crear perfil de usuario si no existe
    INSERT INTO user_profiles (
        id,
        user_id,
        customer_type,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_uuid,
        'regular',
        now(),
        now()
    )
    ON CONFLICT (user_id) 
    DO NOTHING;
    
END $$;
