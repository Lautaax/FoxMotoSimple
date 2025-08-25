-- Agregar campo de precio mayorista a productos
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS wholesale_price NUMERIC(10,2);

-- Actualizar productos existentes con precio mayorista (20% descuento por defecto)
UPDATE public.products 
SET wholesale_price = ROUND(price * 0.8, 2)
WHERE wholesale_price IS NULL;

-- Función para calcular precio según tipo de cliente
CREATE OR REPLACE FUNCTION public.get_product_price(
    product_id UUID,
    user_id UUID DEFAULT NULL
)
RETURNS NUMERIC AS $$
DECLARE
    customer_type TEXT DEFAULT 'regular';
    regular_price NUMERIC;
    wholesale_price NUMERIC;
BEGIN
    -- Obtener tipo de cliente si está autenticado
    IF user_id IS NOT NULL THEN
        SELECT up.customer_type INTO customer_type
        FROM public.user_profiles up
        WHERE up.user_id = get_product_price.user_id;
    END IF;
    
    -- Obtener precios del producto
    SELECT p.price, p.wholesale_price INTO regular_price, wholesale_price
    FROM public.products p
    WHERE p.id = product_id;
    
    -- Retornar precio según tipo de cliente
    IF customer_type = 'wholesale' AND wholesale_price IS NOT NULL THEN
        RETURN wholesale_price;
    ELSE
        RETURN regular_price;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
