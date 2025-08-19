"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Phone, ExternalLink } from "lucide-react"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    name: "Carlos Mendez",
    rating: 5,
    comment: "Excelente atención y productos de calidad. Siempre encuentro lo que necesito para mi moto.",
    date: "Hace 2 semanas",
    avatar: "/avatar-hombre-1.png",
  },
  {
    id: 2,
    name: "María González",
    rating: 5,
    comment: "Muy buenos precios y el servicio técnico es de primera. Recomiendo Fox Motorepuestos.",
    date: "Hace 1 mes",
    avatar: "/avatar-mujer-1.png",
  },
  {
    id: 3,
    name: "Roberto Silva",
    rating: 5,
    comment: "Años comprando acá y nunca me defraudaron. Personal muy capacitado y honesto.",
    date: "Hace 3 semanas",
    avatar: "/avatar-hombre-2.png",
  },
]

export function GoogleMyBusiness() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleGoogleMapsClick = () => {
    window.open("https://maps.google.com/?q=Fox+Motorepuestos+Bahía+Blanca", "_blank")
  }

  const handleGoogleReviewsClick = () => {
    window.open("https://g.page/r/foxmotorepuestosbb/review", "_blank")
  }

  return (
    <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Image src="/google-g-logo.png" alt="Google" width={32} height={32} className="h-8 w-8" />
          <div>
            <CardTitle className="text-white text-lg">Fox Motorepuestos</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-[#7A7A7A]">4.9 (127 reseñas)</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Business Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#7A7A7A]">
            <MapPin className="h-4 w-4 text-[#D32F2F]" />
            <span className="text-sm">Manzana de las Luces 475, Bahía Blanca</span>
          </div>
          <div className="flex items-center gap-3 text-[#7A7A7A]">
            <Clock className="h-4 w-4 text-[#D32F2F]" />
            <span className="text-sm">Abierto • Cierra a las 20:00</span>
          </div>
          <div className="flex items-center gap-3 text-[#7A7A7A]">
            <Phone className="h-4 w-4 text-[#D32F2F]" />
            <span className="text-sm">291 522-1351</span>
          </div>
        </div>

        {/* Current Review */}
        <div className="bg-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Image
              src={reviews[currentReview].avatar || "/placeholder.svg"}
              alt={reviews[currentReview].name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white text-sm">{reviews[currentReview].name}</span>
                <div className="flex items-center gap-1">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-[#7A7A7A] text-sm mb-2">{reviews[currentReview].comment}</p>
              <span className="text-xs text-[#7A7A7A]">{reviews[currentReview].date}</span>
            </div>
          </div>
        </div>

        {/* Review Navigation */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentReview ? "bg-[#D32F2F]" : "bg-[#7A7A7A]"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleGoogleMapsClick}
            variant="outline"
            size="sm"
            className="flex-1 border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Ver en Maps
          </Button>
          <Button
            onClick={handleGoogleReviewsClick}
            variant="outline"
            size="sm"
            className="flex-1 border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Escribir reseña
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
