"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Bookmark, MoreHorizontal, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Datos simulados para el feed de Instagram
const MOCK_INSTAGRAM_POSTS = [
  {
    id: "post1",
    imageUrl: "/social/instagram-post-1.jpg",
    caption:
      "Nueva colección de cadenas DID disponibles en nuestra tienda. ¡Ven a visitarnos! #motos #repuestos #calidad",
    likes: 45,
    comments: 3,
    date: "2 días",
  },
  {
    id: "post2",
    imageUrl: "/social/instagram-post-2.jpg",
    caption: "Aceites Motul para todo tipo de motos. El mejor cuidado para tu motor. #motul #aceite #mantenimiento",
    likes: 38,
    comments: 5,
    date: "4 días",
  },
  {
    id: "post3",
    imageUrl: "/social/instagram-post-3.jpg",
    caption: "Nuevos cascos disponibles. Seguridad y estilo para tus viajes. #seguridad #cascos #motos",
    likes: 62,
    comments: 7,
    date: "1 semana",
  },
  {
    id: "post4",
    imageUrl: "/social/instagram-post-4.jpg",
    caption: "Promoción especial en neumáticos. ¡Aprovecha! #neumaticos #ofertas #motos",
    likes: 29,
    comments: 2,
    date: "1 semana",
  },
]

interface InstagramFeedProps {
  username: string
  initialPosts?: number
  className?: string
}

export function InstagramFeed({ username = "foxmotorep", initialPosts = 2, className }: InstagramFeedProps) {
  const [visiblePosts, setVisiblePosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)

  // Función para cargar más posts
  const loadMorePosts = () => {
    setLoading(true)
    // Simulamos una carga con un timeout
    setTimeout(() => {
      setVisiblePosts(Math.min(visiblePosts + 2, MOCK_INSTAGRAM_POSTS.length))
      setLoading(false)
    }, 1000)
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header del feed */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-[2px] rounded-full">
            <div className="bg-[#1C1C1C] rounded-full p-1">
              <Image src="/fox-logo.png" alt={`@${username}`} width={24} height={24} className="rounded-full" />
            </div>
          </div>
          <span className="font-medium">@{username}</span>
        </div>
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7A7A7A] hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {MOCK_INSTAGRAM_POSTS.slice(0, visiblePosts).map((post) => (
          <div key={post.id} className="bg-[#252525] rounded-lg overflow-hidden">
            {/* Imagen del post */}
            <div className="relative aspect-square">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.caption.substring(0, 30) + "..."}
                fill
                className="object-cover"
              />
            </div>

            {/* Acciones del post */}
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-[#7A7A7A] hover:text-[#FD1D1D] transition-colors">
                    <Heart className="h-5 w-5" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-[#7A7A7A] hover:text-white transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#7A7A7A] hover:text-white transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <button className="text-[#7A7A7A] hover:text-white transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Caption */}
              <p className="text-sm mb-1">{post.caption}</p>
              <p className="text-xs text-[#7A7A7A]">Hace {post.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de cargar más */}
      {visiblePosts < MOCK_INSTAGRAM_POSTS.length && (
        <Button
          variant="outline"
          className="w-full mt-4 border-[#7A7A7A]/20 text-[#7A7A7A] hover:text-white hover:bg-[#303030]"
          onClick={loadMorePosts}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Cargar más publicaciones"}
        </Button>
      )}
    </div>
  )
}
