import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "")

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  // Format as +XX XXX XXX-XXXX for international
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`
  }

  return phone
}

export function generateWhatsAppURL(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "")
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function formatCurrency(amount: number, currency = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function isBusinessOpen(): boolean {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours()

  // Monday to Friday: 9:00 - 20:00
  if (day >= 1 && day <= 5) {
    return hour >= 9 && hour < 20
  }

  // Saturday: 9:00 - 19:00
  if (day === 6) {
    return hour >= 9 && hour < 19
  }

  // Sunday: Closed
  return false
}

export function getBusinessStatus(): { isOpen: boolean; message: string } {
  const isOpen = isBusinessOpen()
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()

  if (isOpen) {
    if (day >= 1 && day <= 5) {
      return { isOpen: true, message: `Abierto hasta las 20:00` }
    } else if (day === 6) {
      return { isOpen: true, message: `Abierto hasta las 19:00` }
    }
  }

  // Closed - show next opening time
  if (day === 0) {
    // Sunday
    return { isOpen: false, message: "Cerrado - Abre lunes a las 9:00" }
  } else if (day === 6 && hour >= 19) {
    // Saturday after hours
    return { isOpen: false, message: "Cerrado - Abre lunes a las 9:00" }
  } else if (hour < 9) {
    // Before opening
    return { isOpen: false, message: "Cerrado - Abre a las 9:00" }
  } else {
    // After hours on weekday
    return { isOpen: false, message: "Cerrado - Abre mañana a las 9:00" }
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  const cleaned = phone.replace(/\D/g, "")
  return phoneRegex.test(cleaned) && cleaned.length >= 10
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
