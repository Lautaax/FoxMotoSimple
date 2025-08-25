import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star, Truck, Shield, Phone } from "lucide-react"

export default async function TiendaHomePage() {
  const supabase = await createClient()

  // Obtener productos destacados
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6)

  // Obtener categorías principales
  const { data: categories } = await supabase.from("categories").select("*").order("name").limit(4)

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C] py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20 text-sm">Tienda Online</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Repuestos de <span className="text-[#D32F2F]">Calidad</span> para tu Moto
                </h1>
                <p className="text-lg md:text-xl text-[#7A7A7A] leading-relaxed">
                  Encuentra todos los repuestos y accesorios que necesitas. Productos originales con garantía y envío a
                  todo el país.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white">
                  <Link href="/tienda/catalogo">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ver Catálogo
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
                >
                  <Link
                    href="https://wa.me/542915221351?text=Hola!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20productos."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Contactar
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#2A2A2A] rounded-2xl overflow-hidden">
                <Image
                  src="/moto-repuestos-tienda.png"
                  alt="Fox Motorepuestos"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-[#2A2A2A]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 text-center">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-[#D32F2F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Envío Rápido</h3>
                <p className="text-[#7A7A7A]">Envíos a Bahía Blanca y zona. Retiro en local sin costo.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-[#D32F2F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Garantía</h3>
                <p className="text-[#7A7A7A]">Productos originales con garantía del fabricante.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 text-center">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-[#D32F2F] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Calidad</h3>
                <p className="text-[#7A7A7A]">Más de 20 años de experiencia en el rubro.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explora por <span className="text-[#D32F2F]">Categorías</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Encuentra fácilmente lo que necesitas navegando por nuestras categorías principales.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/tienda/catalogo?categoria=${category.id}`}>
                  <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 group">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="aspect-square bg-[#7A7A7A]/10 rounded-lg mb-3 md:mb-4 overflow-hidden">
                        <Image
                          src={category.image_url || `/placeholder.svg?height=120&width=120&query=${category.name}`}
                          alt={category.name}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-white text-sm md:text-base">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-[#2A2A2A]/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Productos <span className="text-[#D32F2F]">Destacados</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Los productos más populares y recién llegados a nuestro catálogo.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredProducts.slice(0, 6).map((product) => (
                <Link key={product.id} href={`/tienda/catalogo/${product.id}`}>
                  <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 group">
                    <CardContent className="p-4 md:p-6">
                      <div className="aspect-square bg-[#7A7A7A]/10 rounded-lg mb-4 overflow-hidden">
                        <Image
                          src={product.image_url || `/placeholder.svg?height=200&width=200&query=${product.name}`}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        {product.categories && (
                          <Badge className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20 text-xs">
                            {product.categories.name}
                          </Badge>
                        )}
                        <h3 className="font-semibold text-white line-clamp-2 text-sm md:text-base">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-lg md:text-xl font-bold text-[#D32F2F]">
                            ${product.price.toLocaleString("es-AR")}
                          </p>
                          <p className={`text-xs md:text-sm ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                            {product.stock > 0 ? "En stock" : "Sin stock"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
              >
                <Link href="/tienda/catalogo">Ver Todos los Productos</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#D32F2F]/10 to-[#D32F2F]/5 border-[#D32F2F]/20">
            <CardContent className="p-6 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">¿No encontraste lo que buscas?</h2>
              <p className="text-[#7A7A7A] text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                Contáctanos por WhatsApp y te ayudamos a encontrar el repuesto exacto que necesitas para tu moto.
              </p>
              <Button asChild size="lg" className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white">
                <Link
                  href="https://wa.me/542915221351?text=Hola!%20Necesito%20ayuda%20para%20encontrar%20un%20repuesto%20espec%C3%ADfico."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar por WhatsApp
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
