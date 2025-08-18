"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Award,
  Wrench,
  Instagram,
  Facebook,
  Package,
  Truck,
  ShoppingCart,
} from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { ImageCarousel } from "@/components/image-carousel"
import { GoogleMyBusiness } from "@/components/google-my-business"
import { SocialStats } from "@/components/social-stats"
import { LocalSeoFooter } from "@/components/local-seo-footer"
import { AnimatedSection } from "@/components/animated-section"
import { VisitorCounter } from "@/components/visitor-counter"

const brands = [
  { name: "FAR", logo: "/brands/far-logo.png" },
  { name: "Orange", logo: "/brands/orange-logo.png" },
  { name: "Osaca", logo: "/brands/osaca-logo.png" },
  { name: "DID", logo: "/brands/did-logo.png" },
  { name: "Choho", logo: "/brands/choho-logo.png" },
  { name: "Metzeler", logo: "/brands/metzeler-logo.png" },
  { name: "Motul", logo: "/brands/motul-logo.png" },
  { name: "Wander", logo: "/brands/wander-logo.png" },
]

const products = [
  {
    name: "Cadenas",
    description: "Cadenas de transmisión de alta calidad para todas las marcas de motos",
    image: "/products/chains.png",
    features: ["DID", "FAR", "Orange", "Resistentes", "Garantía"],
  },
  {
    name: "Neumáticos",
    description: "Neumáticos para todo tipo de motos y condiciones de manejo",
    image: "/products/tires.png",
    features: ["Metzeler", "Pirelli", "Michelin", "Calidad", "Durabilidad"],
  },
  {
    name: "Aceites",
    description: "Aceites y lubricantes premium para el mejor rendimiento",
    image: "/products/oils.png",
    features: ["Motul", "Castrol", "Shell", "Sintético", "Mineral"],
  },
  {
    name: "Accesorios",
    description: "Amplia gama de accesorios y repuestos para tu moto",
    image: "/products/accessories.png",
    features: ["Variedad", "Calidad", "Originales", "Compatibles", "Garantía"],
  },
]

const testimonials = [
  {
    name: "Carlos Mendez",
    rating: 5,
    comment: "Excelente atención y productos de calidad. Siempre encuentro lo que necesito para mi moto.",
    location: "Bahía Blanca",
  },
  {
    name: "María González",
    rating: 5,
    comment: "Muy buenos precios y el servicio técnico es de primera. Recomiendo Fox Motorepuestos.",
    location: "Punta Alta",
  },
  {
    name: "Roberto Silva",
    rating: 5,
    comment: "Años comprando acá y nunca me defraudaron. Personal muy capacitado y honesto.",
    location: "Ingeniero White",
  },
]

const carouselImages = [
  { src: "/carousel/workshop.png", alt: "Taller de Fox Motorepuestos" },
  { src: "/carousel/motorcycle-parts.jpg", alt: "Repuestos de motos" },
  { src: "/carousel/store-front.png", alt: "Frente de la tienda Fox Motorepuestos" },
  { src: "/carousel/mechanic.jpg", alt: "Mecánico trabajando en una moto" },
  { src: "/carousel/accessories.png", alt: "Accesorios para motos" },
]

export default function Home() {
  const handleWhatsAppWholesale = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("Hola Fox MotoRespuestos quiero comprar como mayorista")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("¡Hola! Me interesa consultar sobre repuestos para motos. ¿Podrían ayudarme?")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <header className="bg-[#1C1C1C] border-b border-[#7A7A7A]/20 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={40} height={40} className="h-8 w-auto" />
              <span className="text-lg font-bold">
                Fox <span className="text-[#D32F2F]">Motorepuestos</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#inicio" className="hover:text-[#D32F2F] transition-colors">
                Inicio
              </a>
              <a href="#marcas" className="hover:text-[#D32F2F] transition-colors">
                Marcas
              </a>
              <a href="#productos" className="hover:text-[#D32F2F] transition-colors">
                Productos
              </a>
              <a href="#servicios" className="hover:text-[#D32F2F] transition-colors">
                Servicios
              </a>
              <a href="#nosotros" className="hover:text-[#D32F2F] transition-colors">
                Nosotros
              </a>
              <a href="#contacto" className="hover:text-[#D32F2F] transition-colors">
                Contacto
              </a>
            </nav>

            {/* Contact Info & Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+542915221351"
                className="flex items-center gap-2 text-sm hover:text-[#D32F2F] transition-colors"
              >
                <Phone className="h-4 w-4" />
                291 522-1351
              </a>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/foxmotorep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#E4405F]/10 transition-colors group"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="h-4 w-4 text-[#7A7A7A] group-hover:text-[#E4405F] transition-colors" />
                </a>
                <a
                  href="https://facebook.com/foxmotorepuestosbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#1877F2]/10 transition-colors group"
                  aria-label="Síguenos en Facebook"
                >
                  <Facebook className="h-4 w-4 text-[#7A7A7A] group-hover:text-[#1877F2] transition-colors" />
                </a>
              </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-motorcycle.png"
            alt="Motorcycle Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C] via-[#1C1C1C]/80 to-transparent" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
                Ventas Mayoristas y Minoristas
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Tu moto merece lo <span className="text-[#D32F2F]">mejor</span>
              </h1>
              <p className="text-xl text-[#7A7A7A] mb-8 leading-relaxed">
                Especialistas en repuestos de calidad y servicio técnico especializado en Bahía Blanca y zona.
                <span className="text-white font-medium"> Ventas mayoristas para distribuidores y talleres.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleWhatsAppContact}
                  className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 transition-all duration-300 hover:shadow-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsAppWholesale}
                  className="border-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent hover:border-[#D32F2F] hover:text-[#D32F2F]"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Ventas Mayoristas
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#2A2A2A]/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">50+</div>
                <div className="text-[#7A7A7A]">Marcas disponibles</div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">10K+</div>
                <div className="text-[#7A7A7A]">Repuestos vendidos</div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">100%</div>
                <div className="text-[#7A7A7A]">Productos garantizados</div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <VisitorCounter />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-[#2A2A2A]/30">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros <span className="text-[#D32F2F]">servicios</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Ofrecemos soluciones completas tanto para clientes particulares como para distribuidores y talleres.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10 group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-[#D32F2F]/10 p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-[#D32F2F]/20 transition-colors">
                    <ShoppingCart className="h-8 w-8 text-[#D32F2F]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Venta Minorista
                  </h3>
                  <p className="text-[#7A7A7A] mb-4">
                    Atención personalizada para motociclistas particulares con asesoramiento técnico especializado.
                  </p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>• Asesoramiento personalizado</li>
                    <li>• Instalación gratuita</li>
                    <li>• Garantía en todos los productos</li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10 group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-[#D32F2F]/10 p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-[#D32F2F]/20 transition-colors">
                    <Package className="h-8 w-8 text-[#D32F2F]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Venta Mayorista
                  </h3>
                  <p className="text-[#7A7A7A] mb-4">
                    Distribución a gran escala para talleres, distribuidores y comercios del rubro.
                  </p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>• Precios especiales por volumen</li>
                    <li>• Entrega programada</li>
                    <li>• Facturación empresarial</li>
                  </ul>
                  <Button
                    onClick={handleWhatsAppWholesale}
                    className="mt-4 bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white"
                    size="sm"
                  >
                    Consultar Mayorista
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10 group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-[#D32F2F]/10 p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-[#D32F2F]/20 transition-colors">
                    <Wrench className="h-8 w-8 text-[#D32F2F]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Servicio Técnico
                  </h3>
                  <p className="text-[#7A7A7A] mb-4">
                    Instalación profesional y mantenimiento especializado para todas las marcas de motos.
                  </p>
                  <ul className="text-sm text-[#7A7A7A] space-y-1">
                    <li>• Mecánicos especializados</li>
                    <li>• Diagnóstico gratuito</li>
                    <li>• Garantía en el trabajo</li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="marcas" className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trabajamos con las <span className="text-[#D32F2F]">mejores marcas</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Representamos marcas líderes en el mercado de repuestos para motos, garantizando calidad y confiabilidad
                en cada producto.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <AnimatedSection key={brand.name} delay={index * 0.1}>
                <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10">
                  <CardContent className="p-6 flex items-center justify-center">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} Logo`}
                      width={120}
                      height={60}
                      className="h-12 w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                    />
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20 bg-[#2A2A2A]/30">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros <span className="text-[#D32F2F]">productos</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Amplio catálogo de repuestos y accesorios para todo tipo de motocicletas. Disponibles al por mayor y
                menor.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.name} delay={index * 0.1}>
                <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10 group">
                  <CardContent className="p-6">
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#D32F2F] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[#7A7A7A] mb-4">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestro <span className="text-[#D32F2F]">taller</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Conoce nuestras instalaciones y el equipo de trabajo que hace posible brindarte el mejor servicio.
              </p>
            </div>
          </AnimatedSection>
          <ImageCarousel images={carouselImages} />
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-[#2A2A2A]/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Sobre <span className="text-[#D32F2F]">nosotros</span>
                </h2>
                <p className="text-[#7A7A7A] text-lg mb-6 leading-relaxed">
                  Fox Motorepuestos es una empresa especializada en la venta de repuestos y accesorios para motocicletas
                  de todas las marcas y cilindradas en Bahía Blanca y zona.
                </p>
                <p className="text-[#7A7A7A] text-lg mb-6 leading-relaxed">
                  Nos hemos consolidado como referentes en el sector, trabajando con las mejores marcas del mercado para
                  ofrecerte productos de calidad a precios competitivos.
                </p>
                <p className="text-white text-lg mb-8 leading-relaxed font-medium">
                  Ofrecemos ventas mayoristas con precios especiales para distribuidores, talleres y comercios del
                  rubro, con entrega programada y facturación empresarial.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3">
                      <Award className="h-6 w-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Calidad garantizada</div>
                      <div className="text-sm text-[#7A7A7A]">Productos originales</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3">
                      <Users className="h-6 w-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Atención personalizada</div>
                      <div className="text-sm text-[#7A7A7A]">Asesoramiento experto</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3">
                      <Truck className="h-6 w-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Ventas mayoristas</div>
                      <div className="text-sm text-[#7A7A7A]">Precios especiales</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3">
                      <Star className="h-6 w-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Confianza</div>
                      <div className="text-sm text-[#7A7A7A]">Referentes del sector</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <Image
                  src="/carousel/store-front.png"
                  alt="Fox Motorepuestos Store"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#D32F2F] text-white p-6 rounded-lg shadow-xl">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm">Marcas disponibles</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lo que dicen nuestros <span className="text-[#D32F2F]">clientes</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#D32F2F] text-[#D32F2F]" />
                      ))}
                    </div>
                    <p className="text-[#7A7A7A] mb-4 italic">"{testimonial.comment}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-[#7A7A7A]">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Google My Business & Social Stats */}
      <section className="py-20 bg-[#2A2A2A]/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <GoogleMyBusiness />
            <SocialStats />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#D32F2F]">Contactanos</span>
              </h2>
              <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
                Estamos aquí para ayudarte. Contactanos por cualquier consulta, presupuesto o para información sobre
                ventas mayoristas.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                    <Phone className="h-6 w-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Teléfono</h3>
                    <a href="tel:+542915221351" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                      291 522-1351
                    </a>
                    <p className="text-sm text-[#7A7A7A] mt-1">Consultas mayoristas y minoristas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                    <Mail className="h-6 w-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:foxmotorepuestos@gmail.com"
                      className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors"
                    >
                      foxmotorepuestos@gmail.com
                    </a>
                    <p className="text-sm text-[#7A7A7A] mt-1">Presupuestos y consultas técnicas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                    <MapPin className="h-6 w-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dirección</h3>
                    <p className="text-[#7A7A7A]">
                      Manzana de las Luces 475
                      <br />
                      Bahía Blanca, Buenos Aires
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                    <Clock className="h-6 w-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Horarios</h3>
                    <div className="text-[#7A7A7A] space-y-1">
                      <p>Lunes a Viernes: 9:00 - 20:00</p>
                      <p>Sábados: 9:00 - 19:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                    <Package className="h-6 w-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Ventas Mayoristas</h3>
                    <p className="text-[#7A7A7A]">Precios especiales para distribuidores y talleres</p>
                    <p className="text-sm text-[#7A7A7A] mt-1">Consulta por volúmenes mínimos</p>
                    <Button
                      onClick={handleWhatsAppWholesale}
                      className="mt-2 bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white"
                      size="sm"
                    >
                      Consultar por WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Envíanos un mensaje</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-3 py-2 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent"
                          placeholder="Tu teléfono"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-type" className="block text-sm font-medium mb-2">
                        Tipo de consulta
                      </label>
                      <select
                        id="inquiry-type"
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="minorista">Consulta minorista</option>
                        <option value="mayorista">Consulta mayorista</option>
                        <option value="servicio">Servicio técnico</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent"
                        placeholder="¿En qué podemos ayudarte?"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80 transition-all duration-300">
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] border-t border-[#7A7A7A]/20">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={40} height={40} className="h-8 w-auto" />
                <span className="text-lg font-bold">
                  Fox <span className="text-[#D32F2F]">Motorepuestos</span>
                </span>
              </div>
              <p className="text-[#7A7A7A] mb-6 max-w-md">
                Especialistas en repuestos de motos en Bahía Blanca. Ventas mayoristas y minoristas. Trabajamos con las
                mejores marcas para brindarte calidad y confianza.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/foxmotorep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#7A7A7A]/20 p-3 hover:bg-[#E4405F]/20 transition-colors hover:scale-110 transform duration-200"
                >
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                </a>
                <a
                  href="https://facebook.com/foxmotorepuestosbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#7A7A7A]/20 p-3 hover:bg-[#1877F2]/20 transition-colors hover:scale-110 transform duration-200"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#inicio" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#marcas" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Marcas
                  </a>
                </li>
                <li>
                  <a href="#productos" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <Link href="/estadisticas" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Estadísticas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#7A7A7A]">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+542915221351" className="hover:text-[#D32F2F] transition-colors">
                    291 522-1351
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[#7A7A7A]">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:foxmotorepuestos@gmail.com" className="hover:text-[#D32F2F] transition-colors">
                    foxmotorepuestos@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-[#7A7A7A]">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>
                    Manzana de las Luces 475
                    <br />
                    Bahía Blanca, Buenos Aires
                  </span>
                </li>
                <li className="flex items-center gap-2 text-[#7A7A7A]">
                  <Package className="h-4 w-4" />
                  <span>Ventas mayoristas disponibles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <LocalSeoFooter />

        <div className="border-t border-[#7A7A7A]/20 py-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#7A7A7A] text-sm">© 2024 Fox Motorepuestos. Todos los derechos reservados.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                  Política de Privacidad
                </a>
                <a href="#" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                  Términos de Servicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
