"use client"

import type React from "react"

import { useState } from "react"

interface NewsletterSignupProps {
  className?: string
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Por favor, ingresa un email válido")
      return
    }

    setStatus("loading")

    // Simulación de envío (reemplazar con tu lógica real)
    try {
      // Simular una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulación exitosa
      setStatus("success")
      setMessage("¡Gracias por suscribirte! Pronto recibirás nuestras novedades.")
      setEmail("")

      // Resetear después de 5 segundos
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      setStatus("error")
      setMessage("Ocurrió un error. Por favor intenta nuevamente.")
    }
  }

  return null
}
