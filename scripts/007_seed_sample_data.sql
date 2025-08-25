-- Insertar productos de ejemplo
INSERT INTO public.products (name, description, price, stock, category_id, sku, brand, model) VALUES
(
  'Neumático Michelin Energy XM2',
  'Neumático de alta eficiencia energética para automóviles',
  85000.00,
  50,
  (SELECT id FROM public.categories WHERE name = 'Neumáticos' LIMIT 1),
  'MICH-XM2-185-65-15',
  'Michelin',
  'Energy XM2 185/65 R15'
),
(
  'Pastillas de Freno Bosch',
  'Pastillas de freno cerámicas de alta calidad',
  45000.00,
  30,
  (SELECT id FROM public.categories WHERE name = 'Frenos' LIMIT 1),
  'BOSCH-PAD-CERAMIC',
  'Bosch',
  'Ceramic Brake Pads'
),
(
  'Filtro de Aceite Mann',
  'Filtro de aceite para motores de gasolina y diésel',
  12000.00,
  100,
  (SELECT id FROM public.categories WHERE name = 'Motor' LIMIT 1),
  'MANN-OIL-FILTER',
  'Mann Filter',
  'W 712/75'
),
(
  'Amortiguador Monroe',
  'Amortiguador hidráulico para suspensión delantera',
  95000.00,
  25,
  (SELECT id FROM public.categories WHERE name = 'Suspensión' LIMIT 1),
  'MONROE-SHOCK-FRONT',
  'Monroe',
  'OESpectrum G16540'
),
(
  'Batería Bosch S4',
  'Batería de 12V 60Ah para automóviles',
  120000.00,
  15,
  (SELECT id FROM public.categories WHERE name = 'Eléctrico' LIMIT 1),
  'BOSCH-S4-60AH',
  'Bosch',
  'S4 Silver 60Ah'
),
(
  'Espejo Retrovisor Derecho',
  'Espejo retrovisor eléctrico lado derecho',
  75000.00,
  20,
  (SELECT id FROM public.categories WHERE name = 'Carrocería' LIMIT 1),
  'MIRROR-RIGHT-ELEC',
  'Original',
  'Electric Mirror Right'
)
ON CONFLICT (sku) DO NOTHING;
