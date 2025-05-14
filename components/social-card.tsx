"use client"

import { Facebook, Instagram, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialCardProps {
  platform: "instagram" | "facebook"
  username: string
  url: string
  description?: string
}

export function SocialCard({ platform, username, url, description }: SocialCardProps) {
  // Configuración específica para cada plataforma
  const platformConfig = {
    instagram: {
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
      hoverColor: "hover:text-[#FD1D1D]",
      label: "Instagram",
    },
    facebook: {
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-[#1877F2]",
      hoverColor: "hover:text-[#1877F2]",
      label: "Facebook",
    },
  }

  const config = platformConfig[platform]

  return (
    <div className="flex flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("group flex items-center gap-3 p-3 rounded-lg transition-all", "bg-[#252525] hover:bg-[#303030]")}
      >
        <div className={cn("rounded-full p-2 text-white", config.color)}>{config.icon}</div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white group-hover:text-white">@{username}</p>
              {description && <p className="text-xs text-[#7A7A7A]">{description}</p>}
            </div>
            <ExternalLink className="h-4 w-4 text-[#7A7A7A] group-hover:text-white transition-colors" />
          </div>
        </div>
      </a>
    </div>
  )
}
