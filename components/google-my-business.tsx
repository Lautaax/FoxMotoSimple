"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, MapPin, Clock, Phone, ExternalLink, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GoogleReview {
  author: string
  rating: number
  text: string
  date: string
  photoUrl?: string
}

// Datos simulados de reseñas de Google
const MOCK_REVIEWS: GoogleReview[] = [
  {
    author: "Carlos Rodríguez",
    rating: 5,
    text: "Excelente atención y variedad de repuestos. Encontré todo lo que necesitaba para mi Honda. Precios justos y buena calidad.",
    date: "hace 2 semanas",
    photoUrl: "/reviews/user1.jpg",
  },
  {
    author: "Laura Martínez",
    rating: 4,
    text: "Muy buena atención, tienen casi todo lo que se necesita. El personal es muy amable y conocedor.",
    date: "hace 1 mes",
    photoUrl: "/reviews/user2.jpg",
  },
  {
    author: "Martín González",
    rating: 5,
    text: "El mejor lugar para conseguir repuestos en Bahía. Siempre encuentro lo que busco y a buen precio.",
    date: "hace 2 meses",
    photoUrl: "/reviews/user3.jpg",
  },
]

export function GoogleMyBusiness() {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info")
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    // Calcular la calificación promedio
    const total = MOCK_REVIEWS.reduce((sum, review) => sum + review.rating, 0)
    setAverageRating(total / MOCK_REVIEWS.length)
  }, [])

  // Renderizar estrellas según la calificación
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4 mr-0.5 transition-transform",
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
              star <= rating && "hover:scale-110",
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden text-gray-800 shadow-md">
      {/* Header con logo de Google */}
      <div className="bg-[#4285F4] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <Image src="/google-g-logo.png" alt="Google" width={20} height={20} className="rounded-full" />
          </div>
          <span className="text-white font-medium">Google Mi Negocio</span>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 text-sm shadow-sm">
          <span className="font-bold">{averageRating.toFixed(1)}</span>
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-3 font-medium text-sm transition-all duration-200",
            activeTab === "info"
              ? "border-b-2 border-[#4285F4] text-[#4285F4]"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
          )}
          onClick={() => setActiveTab("info")}
        >
          Información
        </button>
        <button
          className={cn(
            "flex-1 py-3 font-medium text-sm transition-all duration-200",
            activeTab === "reviews"
              ? "border-b-2 border-[#4285F4] text-[#4285F4]"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
          )}
          onClick={() => setActiveTab("reviews")}
        >
          Reseñas
        </button>
      </div>

      {/* Contenido de la pestaña */}
      <div className="p-4">
        {activeTab === "info" ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <MapPin className="h-5 w-5 text-[#4285F4] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Dirección</h4>
                <p className="text-sm text-gray-600">Manzana de las Luces 475, Bahía Blanca, Buenos Aires</p>
                <a
                  href="https://maps.google.com/?q=Manzana+de+las+Luces+475,+Bahía+Blanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#4285F4] flex items-center gap-1 mt-1 hover:underline"
                >
                  Ver en Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <Clock className="h-5 w-5 text-[#4285F4] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Horario de atención</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    Lunes a Viernes: <span className="font-medium">9:00 - 21:00</span>
                  </p>
                  <p>
                    Sábados: <span className="font-medium">9:00 - 19:00</span>
                  </p>
                  <p>
                    Domingos: <span className="font-medium">10:00 - 18:00</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <Phone className="h-5 w-5 text-[#4285F4] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">Teléfono</h4>
                <a href="tel:+542915347003" className="text-sm text-[#4285F4] hover:underline">
                  291 534-7003
                </a>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-gray-200">
              <a
                href="https://business.google.com/add/info?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4285F4] flex items-center gap-1 hover:underline"
              >
                ¿Eres el propietario? Reclama este negocio
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-lg">
              <div className="flex">{renderStars(averageRating)}</div>
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} de 5 ({MOCK_REVIEWS.length} reseñas)
              </span>
            </div>

            {MOCK_REVIEWS.map((review, index) => (
              <div
                key={index}
                className="pb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative shadow-sm">
                    {review.photoUrl ? (
                      <Image
                        src={review.photoUrl || "/placeholder.svg"}
                        alt={review.author}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#4285F4] text-white font-medium">
                        {review.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="mb-2">{renderStars(review.rating)}</div>
                <p className="text-sm text-gray-700">{review.text}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors">
                    <ThumbsUp className="h-3 w-3" />
                    Útil
                  </button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full text-[#4285F4] border-[#4285F4] hover:bg-[#4285F4]/10 mt-2"
              onClick={() => window.open("https://g.page/r/foxmotorepuestosbb/review", "_blank")}
            >
              Escribir una reseña
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
