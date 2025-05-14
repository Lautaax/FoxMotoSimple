import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Mail,
  Instagram,
  Facebook,
  Wrench,
  ShoppingBag,
  Truck,
  CreditCard,
  Share2,
  ExternalLink,
} from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { ImageCarousel } from "@/components/image-carousel"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SocialCard } from "@/components/social-card"
import { FollowerCounter } from "@/components/follower-counter"
import { SocialStats } from "@/components/social-stats"
import { InstagramFeed } from "@/components/instagram-feed"

export default function Home() {
  // Imágenes para el carrusel
  const carouselImages = [
    {
      src: "/carousel/workshop.png",
      alt: "Taller de Fox Motorepuestos",
    },
    {
      src: "/carousel/motorcycle-parts.jpg",
      alt: "Repuestos de motos",
    },
    {
      src: "/carousel/store-front.png",
      alt: "Frente de la tienda Fox Motorepuestos",
    },
    {
      src: "/carousel/mechanic.jpg",
      alt: "Mecánico trabajando en una moto",
    },
    {
      src: "/carousel/accessories.png",
      alt: "Accesorios para motos",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
      {/* Botón de WhatsApp */}
      <WhatsAppButton phoneNumber="542915347003" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#7A7A7A]/20 bg-[#1C1C1C]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1C1C1C]/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={50} height={50} className="h-10 w-auto" />
            <span className="text-xl font-bold">
              Fox <span className="text-[#D32F2F]">Motorepuestos</span>
            </span>
          </div>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex gap-6">
            <Link href="#inicio" className="text-sm font-medium hover:text-[#D32F2F] transition-colors">
              Inicio
            </Link>
            <Link href="#marcas" className="text-sm font-medium hover:text-[#D32F2F] transition-colors">
              Marcas
            </Link>
            <Link href="#productos" className="text-sm font-medium hover:text-[#D32F2F] transition-colors">
              Productos
            </Link>
            <Link href="#nosotros" className="text-sm font-medium hover:text-[#D32F2F] transition-colors">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-sm font-medium hover:text-[#D32F2F] transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+542915347003" className="hidden md:flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-[#D32F2F]" />
              <span>291 534-7003</span>
            </a>

            {/* Menú hamburguesa para móviles */}
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/hero-motorcycle.png"
            alt="Motorcycle Parts"
            width={1920}
            height={1080}
            className="h-[70vh] w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container px-4 md:px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Fox <span className="text-[#D32F2F]">Motorepuestos</span>
              </h1>
              <p className="max-w-[700px] mx-auto text-xl md:text-2xl text-gray-200 mb-8">
                Todo lo que necesitas para tu moto en un solo lugar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-lg px-8 py-6">
                  Tienda (Próximamente)
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Bar */}
        <section className="bg-[#7A7A7A] py-4">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-5 w-5 text-[#D32F2F]" />
                <span>Manzana de las Luces 475, Bahía Blanca</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-[#D32F2F]" />
                <span>291 534-7003</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Clock className="h-5 w-5 text-[#D32F2F]" />
                <span>Lun-Vie: 9:00-21:00 | Sáb: 9:00-19:00 | Dom: 10:00-18:00</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section id="marcas" className="py-16 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-2">
                Marcas Destacadas
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trabajamos con las mejores marcas</h2>
              <p className="max-w-[700px] text-[#7A7A7A] md:text-lg">
                Ofrecemos productos de calidad de las marcas más reconocidas del mercado
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/far-logo.png" alt="Far" width={100} height={50} className="max-h-12 w-auto" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image
                  src="/brands/orange-logo.png"
                  alt="The Orange"
                  width={100}
                  height={50}
                  className="max-h-12 w-auto"
                />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/osaca-logo.png" alt="Osaca" width={100} height={50} className="max-h-12 w-auto" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/did-logo.png" alt="DID" width={100} height={50} className="max-h-12 w-auto" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/choho-logo.png" alt="Choho" width={100} height={50} className="max-h-12 w-auto" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image
                  src="/brands/metzeler-logo.png"
                  alt="Metzeler"
                  width={100}
                  height={50}
                  className="max-h-12 w-auto"
                />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/motul-logo.png" alt="Motul" width={100} height={50} className="max-h-12 w-auto" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-24 w-full">
                <Image src="/brands/wander-logo.png" alt="Wander" width={100} height={50} className="max-h-12 w-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="productos" className="py-16 bg-[#252525]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-2">
                Nuestros Productos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Categorías de Productos</h2>
              <p className="max-w-[700px] text-[#7A7A7A] md:text-lg">Encuentra todo lo que necesitas para tu moto</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src="/products/chains.png"
                    alt="Cadenas y Transmisión"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Cadenas y Transmisión</h3>
                  <p className="text-[#7A7A7A] mb-4">Cadenas, piñones, coronas y kits de transmisión</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src="/products/tires.png"
                    alt="Neumáticos"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Neumáticos</h3>
                  <p className="text-[#7A7A7A] mb-4">Cubiertas para todo tipo de motos y terrenos</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src="/products/oils.png"
                    alt="Aceites y Lubricantes"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Aceites y Lubricantes</h3>
                  <p className="text-[#7A7A7A] mb-4">Aceites de motor, transmisión y lubricantes especiales</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src="/products/accessories.png"
                    alt="Accesorios"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Accesorios</h3>
                  <p className="text-[#7A7A7A] mb-4">Espejos, manillares, puños y más accesorios</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="nosotros" className="py-16 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-4">
                  Sobre Nosotros
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Fox Motorepuestos</h2>
                <p className="text-[#7A7A7A] mb-6 text-lg">
                  Somos una empresa dedicada a la venta de repuestos y accesorios para motos de todas las marcas y
                  cilindradas. Con años de experiencia en el mercado, nos hemos consolidado como un referente en Bahía
                  Blanca y la zona.
                </p>
                <p className="text-[#7A7A7A] mb-8 text-lg">
                  Trabajamos con las mejores marcas del mercado para ofrecerte productos de calidad a precios
                  competitivos. Nuestro equipo está capacitado para asesorarte y ayudarte a encontrar exactamente lo que
                  necesitas para tu moto.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-2">
                      <Wrench className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Calidad Garantizada</h3>
                      <p className="text-sm text-[#7A7A7A]">Productos originales y alternativos de primera calidad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-2">
                      <ShoppingBag className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Amplio Stock</h3>
                      <p className="text-sm text-[#7A7A7A]">Gran variedad de repuestos disponibles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-2">
                      <Truck className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Envíos</h3>
                      <p className="text-sm text-[#7A7A7A]">Realizamos envíos a todo el país</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#D32F2F]/10 p-2">
                      <CreditCard className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Múltiples Pagos</h3>
                      <p className="text-sm text-[#7A7A7A]">Aceptamos efectivo, transferencias y tarjetas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrusel de imágenes */}
              <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <ImageCarousel images={carouselImages} />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 bg-[#252525]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-2">
                Contacto
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">¿Necesitas ayuda? Contáctanos</h2>
              <p className="max-w-[700px] text-[#7A7A7A] md:text-lg">
                Estamos aquí para ayudarte a encontrar lo que necesitas para tu moto
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-[#1C1C1C] p-8 rounded-lg border border-[#7A7A7A]/20">
                <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                      <MapPin className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Dirección</h4>
                      <p className="text-[#7A7A7A]">Manzana de las Luces 475</p>
                      <p className="text-[#7A7A7A]">Bahía Blanca, Buenos Aires</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                      <Phone className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Teléfono</h4>
                      <p className="text-[#7A7A7A]">291 534-7003</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                      <Mail className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-[#7A7A7A]">info@foxmotorepuestos.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#D32F2F]/10 p-3 mt-1">
                      <Clock className="h-5 w-5 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Horario de Atención</h4>
                      <p className="text-[#7A7A7A]">Lunes a Viernes: 9:00 - 21:00</p>
                      <p className="text-[#7A7A7A]">Sábados: 9:00 - 19:00</p>
                      <p className="text-[#7A7A7A]">Domingos: 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                {/* Nueva sección destacada de redes sociales */}
                <div className="mt-8 border-t border-[#7A7A7A]/20 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="h-5 w-5 text-[#D32F2F]" />
                    <h4 className="font-bold text-lg">Síguenos en redes sociales</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#252525] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-[1px] rounded-full">
                            <div className="bg-[#252525] rounded-full p-1">
                              <Instagram className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <span className="font-medium">Instagram</span>
                        </div>
                        <FollowerCounter count={1250} animated={false} className="flex-row gap-1" />
                      </div>
                      <SocialCard
                        platform="instagram"
                        username="foxmotorep"
                        url="https://instagram.com/foxmotorep"
                        description="Novedades, productos y más"
                      />
                    </div>

                    <div className="bg-[#252525] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#1877F2] p-[1px] rounded-full">
                            <div className="bg-[#252525] rounded-full p-1">
                              <Facebook className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <span className="font-medium">Facebook</span>
                        </div>
                        <FollowerCounter count={2340} animated={false} className="flex-row gap-1" />
                      </div>
                      <SocialCard
                        platform="facebook"
                        username="foxmotorepuestosbb"
                        url="https://facebook.com/foxmotorepuestosbb"
                        description="Ofertas y eventos especiales"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C1C1C] p-4 rounded-lg border border-[#7A7A7A]/20 h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-62.2!3d-38.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQyJzAwLjAiUyA2MsKwMTInMDAuMCJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Ubicación de Fox Motorepuestos"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Nueva sección de redes sociales */}
        <section className="py-16 bg-[#1C1C1C]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-2">
                Comunidad
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Conéctate con nosotros</h2>
              <p className="max-w-[700px] text-[#7A7A7A] md:text-lg">
                Sigue nuestras redes sociales para estar al día con las últimas novedades, ofertas y eventos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Instagram Card */}
              <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-[2px] rounded-xl">
                <div className="bg-[#1C1C1C] rounded-xl p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-[2px] rounded-full">
                      <div className="bg-[#1C1C1C] rounded-full p-2">
                        <Instagram className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">Instagram</h3>
                      <p className="text-[#7A7A7A]">@foxmotorep</p>
                    </div>
                  </div>

                  {/* Estadísticas de Instagram */}
                  <SocialStats platform="instagram" className="mb-6" />

                  {/* Feed de Instagram */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Publicaciones recientes</h4>
                    <InstagramFeed username="foxmotorep" initialPosts={2} />
                  </div>

                  <a
                    href="https://instagram.com/foxmotorep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Seguir en Instagram
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="bg-gradient-to-r from-[#1877F2] to-[#3b5998] p-[2px] rounded-xl">
                <div className="bg-[#1C1C1C] rounded-xl p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-[#1877F2] to-[#3b5998] p-[2px] rounded-full">
                      <div className="bg-[#1C1C1C] rounded-full p-2">
                        <Facebook className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">Facebook</h3>
                      <p className="text-[#7A7A7A]">@foxmotorepuestosbb</p>
                    </div>
                  </div>

                  {/* Estadísticas de Facebook */}
                  <SocialStats platform="facebook" className="mb-6" />

                  <p className="text-[#7A7A7A] mb-6">
                    Conéctate con nosotros en Facebook para recibir actualizaciones, ofertas especiales, eventos y más
                    información sobre nuestros productos.
                  </p>

                  <div className="bg-[#252525] rounded-md overflow-hidden relative h-[180px] mb-6">
                    <Image src="/social/facebook-cover.png" alt="Facebook cover" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div>
                        <h4 className="font-bold text-white">Fox Motorepuestos</h4>
                        <p className="text-sm text-gray-300">Tienda de repuestos para motos</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://facebook.com/foxmotorepuestosbb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1877F2] to-[#3b5998] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Seguir en Facebook
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] border-t border-[#7A7A7A]/20 py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/fox-logo.png" alt="Fox Motorepuestos Logo" width={40} height={40} className="h-8 w-auto" />
                <span className="text-lg font-bold">
                  Fox <span className="text-[#D32F2F]">Motorepuestos</span>
                </span>
              </div>
              <p className="text-[#7A7A7A] mb-4">
                Todo lo que necesitas para tu moto en un solo lugar. Repuestos, accesorios y más.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/foxmotorep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A7A7A] hover:text-[#FD1D1D] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://facebook.com/foxmotorepuestosbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A7A7A] hover:text-[#1877F2] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#inicio" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#marcas" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Marcas
                  </Link>
                </li>
                <li>
                  <Link href="#productos" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="#nosotros" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#D32F2F] mt-0.5" />
                  <span className="text-[#7A7A7A]">Manzana de las Luces 475, Bahía Blanca</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#D32F2F] mt-0.5" />
                  <span className="text-[#7A7A7A]">291 534-7003</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#D32F2F] mt-0.5" />
                  <span className="text-[#7A7A7A]">info@foxmotorepuestos.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#D32F2F] mt-0.5" />
                  <span className="text-[#7A7A7A]">Lun-Vie: 9:00-21:00 | Sáb: 9:00-19:00 | Dom: 10:00-18:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#7A7A7A]/20 mt-8 pt-8 text-center text-[#7A7A7A]">
            <p>&copy; {new Date().getFullYear()} Fox Motorepuestos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
