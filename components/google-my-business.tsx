"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Phone, ExternalLink } from "lucide-react"
import Image from "next/image"
import { AnimatedSection } from "./animated-section"

const reviews = [
  {
    name: "Juan Carlos Pérez",
    rating: 5,
    comment: "Excelente atención y productos de primera calidad. Siempre encuentro lo que necesito para mi Honda.",
    date: "Hace 2 semanas",
    avatar: "/avatar-hombre-1.png",
  },
  {
    name: "María Elena Rodríguez",
    rating: 5,
    comment: "Muy buenos precios y el servicio técnico es impecable. Recomiendo Fox Motorepuestos al 100%.",
    date: "Hace 1 mes",
    avatar: "/avatar-mujer-1.png",
  },
  {
    name: "Roberto Silva",
    rating: 5,
    comment: "Años comprando acá y nunca me defraudaron. Personal capacitado y honesto en sus recomendaciones.",
    date: "Hace 3 semanas",
    avatar: "/avatar-hombre-2.png",
  },
]

export function GoogleMyBusiness() {
  return (
    <AnimatedSection>
      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/google-g-logo.png" alt="Google" width={24} height={24} className="h-6 w-6" />
            <CardTitle className="text-xl">Google My Business</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#FFC107] text-[#FFC107]" />
                ))}
              </div>
              <span className="text-2xl font-bold ml-2">4.9</span>
            </div>
            <Badge variant="secondary" className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
              127 reseñas
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#7A7A7A]">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Manzana de las Luces 475, Bahía Blanca</span>
            </div>
            <div className="flex items-center gap-2 text-[#7A7A7A]">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Abierto • Cierra a las 20:00</span>
            </div>
            <div className="flex items-center gap-2 text-[#7A7A7A]">
              <Phone className="h-4 w-4" />
              <span className="text-sm">291 522-1351</span>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h4 className="font-semibold mb-4">Reseñas recientes</h4>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-[#7A7A7A]/10 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      width={32}
                      height={32}
                      className="rounded-full h-8 w-8"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-[#FFC107] text-[#FFC107]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#7A7A7A] text-sm mb-1">{review.comment}</p>
                      <span className="text-xs text-[#7A7A7A]">{review.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More Link */}
          <div className="pt-4">
            <a
              href="https://g.page/foxmotorepuestosbb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D32F2F] hover:text-[#D32F2F]/80 transition-colors text-sm font-medium"
            >
              Ver todas las reseñas
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
