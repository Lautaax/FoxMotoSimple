-- Actualizar tabla de cart_items para incluir precio al momento de agregar
ALTER TABLE public.cart_items 
ADD COLUMN IF NOT EXISTS unit_price NUMERIC(10,2);

-- Función para actualizar precio en carrito según tipo de cliente
CREATE OR REPLACE FUNCTION public.update_cart_item_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcular precio según tipo de cliente
    NEW.unit_price := public.get_product_price(NEW.product_id, NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar precio automáticamente
DROP TRIGGER IF EXISTS update_cart_price ON public.cart_items;
CREATE TRIGGER update_cart_price
    BEFORE INSERT OR UPDATE ON public.cart_items
    FOR EACH ROW EXECUTE FUNCTION public.update_cart_item_price();

-- Vista para obtener información completa del carrito
CREATE OR REPLACE VIEW public.cart_items_with_details AS
SELECT 
    ci.*,
    p.name as product_name,
    p.image_url,
    p.stock,
    COALESCE(ci.unit_price, p.price) as current_price,
    (COALESCE(ci.unit_price, p.price) * ci.quantity) as subtotal,
    up.customer_type
FROM public.cart_items ci
JOIN public.products p ON ci.product_id = p.id
LEFT JOIN public.user_profiles up ON ci.user_id = up.user_id;
