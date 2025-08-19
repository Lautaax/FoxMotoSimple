"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Users, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

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
]

export function SocialStats() {
  const [currentPost, setCurrentPost] = useState(0)

  const handleInstagramClick = () => {
    window.open("https://instagram.com/foxmotorep", "_blank")
  }

  const handleFacebookClick = () => {
    window.open("https://facebook.com/foxmotorepuestosbb", "_blank")
  }

  return (
    <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-[#D32F2F]" />
          Redes Sociales
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Media Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#E4405F]/10 to-[#E4405F]/5 rounded-lg p-4 border border-[#E4405F]/20">
            <div className="flex items-center gap-3 mb-2">
              <Instagram className="h-5 w-5 text-[#E4405F]" />
              <span className="text-white font-medium">Instagram</span>
            </div>
            <div className="text-2xl font-bold text-white">2.1K</div>
            <div className="text-sm text-[#7A7A7A]">Seguidores</div>
          </div>

          <div className="bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 rounded-lg p-4 border border-[#1877F2]/20">
            <div className="flex items-center gap-3 mb-2">
              <Facebook className="h-5 w-5 text-[#1877F2]" />
              <span className="text-white font-medium">Facebook</span>
            </div>
            <div className="text-2xl font-bold text-white">1.8K</div>
            <div className="text-sm text-[#7A7A7A]">Me gusta</div>
          </div>
        </div>

        {/* Recent Instagram Post */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Últimas publicaciones</h4>
          <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={instagramPosts[currentPost].image || "/placeholder.svg"}
                alt="Instagram post"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                <Instagram className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-[#7A7A7A] text-sm mb-3">{instagramPosts[currentPost].caption}</p>
              <div className="flex items-center gap-4 text-[#7A7A7A] text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{instagramPosts[currentPost].likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{instagramPosts[currentPost].comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Navigation */}
          <div className="flex justify-center gap-2">
            {instagramPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPost(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentPost ? "bg-[#E4405F]" : "bg-[#7A7A7A]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleInstagramClick}
            className="flex-1 bg-gradient-to-r from-[#E4405F] to-[#E4405F]/80 hover:from-[#E4405F]/90 hover:to-[#E4405F]/70 text-white border-0"
            size="sm"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Seguir
          </Button>
          <Button
            onClick={handleFacebookClick}
            className="flex-1 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
            size="sm"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Me gusta
          </Button>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#7A7A7A]/20">
          <div className="text-center">
            <div className="text-lg font-bold text-[#D32F2F]">156</div>
            <div className="text-xs text-[#7A7A7A]">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[#D32F2F]">4.2K</div>
            <div className="text-xs text-[#7A7A7A]">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[#D32F2F]">89%</div>
            <div className="text-xs text-[#7A7A7A]">Engagement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
