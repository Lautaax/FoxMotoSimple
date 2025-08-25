"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  user_id: string
  customer_type: "regular" | "wholesale"
  company_name?: string
  tax_id?: string
  phone?: string
  address?: string
}

export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      try {
        // Obtener usuario actual
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Obtener perfil del usuario
          const { data: profileData } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

          setProfile(profileData)
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user)
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single()
        setProfile(profileData)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return {
    user,
    profile,
    loading,
    isWholesale: profile?.customer_type === "wholesale",
  }
}
