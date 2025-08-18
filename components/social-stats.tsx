"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Facebook, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import { AnimatedSection } from "./animated-section"

const instagramPosts = [
  {
    id: 1,
    image: "/social/instagram-2.png",
    likes: 45,
    comments: 8,
    caption: "Nuevos neumáticos Metzeler disponibles! 🏍️ #Metzeler #Neumaticos",
  },
  {
    id: 2,
    image: "/social/instagram-3.png",
    likes: 32,
    comments: 5,
    caption: "Cadenas DID de alta calidad para tu moto 🔗 #DID #Cadenas",
  },
  {
    id: 3,
    image: "/social/facebook-cover.png",
    likes: 67,
    comments: 12,
    caption: "¡Visitanos en nuestro local! Manzana de las Luces 475 📍",
  },
]

export function SocialStats() {
  return (
    <AnimatedSection delay={0.1}>
      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Redes Sociales</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-[#E4405F]" />
              <div>
                <div className="font-semibold">1.2K</div>
                <div className="text-xs text-[#7A7A7A]">Seguidores</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-[#1877F2]" />
              <div>
                <div className="font-semibold">850</div>
                <div className="text-xs text-[#7A7A7A]">Me gusta</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E4405F]/10 mb-2 mx-auto">
                <Heart className="h-5 w-5 text-[#E4405F]" />
              </div>
              <div className="font-semibold">2.1K</div>
              <div className="text-xs text-[#7A7A7A]">Likes totales</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2]/10 mb-2 mx-auto">
                <MessageCircle className="h-5 w-5 text-[#1877F2]" />
              </div>
              <div className="font-semibold">340</div>
              <div className="text-xs text-[#7A7A7A]">Comentarios</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D32F2F]/10 mb-2 mx-auto">
                <Share2 className="h-5 w-5 text-[#D32F2F]" />
              </div>
              <div className="font-semibold">180</div>
              <div className="text-xs text-[#7A7A7A]">Compartidos</div>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h4 className="font-semibold mb-4">Posts recientes</h4>
            <div className="space-y-4">
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex gap-3 p-3 rounded-lg bg-[#2A2A2A]/50 hover:bg-[#2A2A2A] transition-colors"
                >
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Instagram post"
                    width={60}
                    height={60}
                    className="rounded-lg object-cover h-15 w-15"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-[#7A7A7A] mb-2 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-4 text-xs text-[#7A7A7A]">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex gap-3">
            <a
              href="https://instagram.com/foxmotorep"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-[#E4405F] to-[#C13584] text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Instagram className="h-4 w-4" />
              Seguir
            </a>
            <a
              href="https://facebook.com/foxmotorepuestosbb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#1877F2] text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Facebook className="h-4 w-4" />
              Me gusta
            </a>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
