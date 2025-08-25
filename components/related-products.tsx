import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "./product-card";

interface RelatedProductsProps {
  categoryId: string | null;
  currentProductId: string;
}

export async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const supabase = await createClient();

  if (!categoryId) return null;

  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", currentProductId)
    .limit(4);

  if (!products || products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Productos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
