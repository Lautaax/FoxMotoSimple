"use client"
import { cn } from "@/lib/utils"
import { FollowerCounter } from "./follower-counter"

interface SocialStatsProps {
  platform: "instagram" | "facebook"
  className?: string
}

export function SocialStats({ platform, className }: SocialStatsProps) {
  // Datos simulados para cada plataforma
  const statsData = {
    instagram: {
      followers: 1250,
      posts: 87,
      engagement: "4.8%",
    },
    facebook: {
      followers: 2340,
      likes: 2100,
      engagement: "3.2%",
    },
  }

  const stats = statsData[platform]

  return (
    <div className={cn("flex justify-around py-3 px-2 bg-[#252525]/50 rounded-lg", className)}>
      {platform === "instagram" ? (
        <>
          <FollowerCounter count={stats.followers} label="seguidores" />
          <FollowerCounter count={stats.posts} label="publicaciones" />
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{stats.engagement}</span>
            <span className="text-xs text-[#7A7A7A]">engagement</span>
          </div>
        </>
      ) : (
        <>
          <FollowerCounter count={stats.followers} label="seguidores" />
          <FollowerCounter count={stats.likes} label="me gusta" />
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{stats.engagement}</span>
            <span className="text-xs text-[#7A7A7A]">engagement</span>
          </div>
        </>
      )}
    </div>
  )
}
