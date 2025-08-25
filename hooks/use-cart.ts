"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
    stock: number
    wholesale_price?: number
  }
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image_url: string | null
  wholesale_price?: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  const getSupabaseClient = () => {
    try {
      console.log("[v0] Verificando variables de entorno Supabase...")
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      console.log("[v0] SUPABASE_URL:", url ? `${url.substring(0, 20)}...` : "MISSING")
      console.log("[v0] SUPABASE_KEY:", key ? `${key.substring(0, 20)}...` : "MISSING")

      if (!url || !key) {
        throw new Error(`Variables de entorno faltantes: URL=${!!url}, KEY=${!!key}`)
      }

      console.log("[v0] Variables de entorno OK, creando cliente...")
      const client = createClient()

      console.log("[v0] Cliente creado:", !!client)

      return client
    } catch (error) {
      console.error("[v0] Error creando cliente Supabase:", error)
      throw error
    }
  }

  const getSessionId = () => {
    let sessionId = localStorage.getItem("cart_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("cart_session_id", sessionId)
    }
    return sessionId
  }

  const getLocalCart = (): CartItem[] => {
    try {
      const localCart = localStorage.getItem("local_cart")
      return localCart ? JSON.parse(localCart) : []
    } catch {
      return []
    }
  }

  const saveLocalCart = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem("local_cart", JSON.stringify(cartItems))
    } catch (error) {
      console.error("[v0] Error guardando carrito local:", error)
    }
  }

  const loadCart = async () => {
    try {
      console.log("[v0] Iniciando carga del carrito...")
      setIsLoading(true)
      setError(null)

      if (!navigator.onLine) {
        console.log("[v0] Sin conexión, usando carrito local")
        setIsOnline(false)
        setItems(getLocalCart())
        return
      }

      const supabase = getSupabaseClient()

      console.log("[v0] Probando conectividad básica con Supabase...")
      try {
        const { data: testData, error: testError } = await supabase.from("products").select("count").limit(1).single()

        if (testError) {
          console.log("[v0] Prueba de conectividad falló:", testError.message)
        } else {
          console.log("[v0] Conectividad básica OK")
        }
      } catch (testErr) {
        console.error("[v0] Error en prueba de conectividad:", testErr)
      }

      console.log("[v0] Obteniendo usuario...")
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError && userError.message !== "Auth session missing!") {
        console.error("[v0] Error real obteniendo usuario:", userError)
      } else if (!user) {
        console.log("[v0] Usuario no autenticado, usando sesión local")
      } else {
        console.log("[v0] Usuario autenticado:", user.email)
      }

      const sessionId = getSessionId()
      console.log("[v0] Session ID:", sessionId, "User:", !!user)

      console.log("[v0] Consultando items del carrito...")
      let cartQuery = supabase.from("cart_items").select("*")

      if (user) {
        cartQuery = cartQuery.eq("user_id", user.id)
      } else {
        cartQuery = cartQuery.eq("session_id", sessionId)
      }

      console.log("[v0] Ejecutando consulta del carrito...")
      console.log("[v0] Query configurada para:", user ? `user_id: ${user.id}` : `session_id: ${sessionId}`)

      const { data: cartItems, error: cartError } = await cartQuery

      if (cartError) {
        console.error("[v0] Error fetching cart items:", cartError)
        console.error("[v0] Error details:", {
          message: cartError.message,
          details: cartError.details,
          hint: cartError.hint,
          code: cartError.code,
        })
        console.log("[v0] Error de base de datos, usando carrito local")
        setIsOnline(false)
        setItems(getLocalCart())
        setError(`Error de base de datos - usando carrito local: ${cartError.message}`)
        return
      }

      console.log("[v0] Items del carrito obtenidos:", cartItems?.length || 0)
      setIsOnline(true)

      if (!cartItems || cartItems.length === 0) {
        console.log("[v0] Carrito vacío")
        setItems([])
        return
      }

      console.log("[v0] Consultando productos...")
      const productIds = cartItems.map((item) => item.product_id)
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, name, price, image_url, stock, wholesale_price")
        .in("id", productIds)

      if (productsError) {
        console.error("[v0] Error fetching products:", productsError)
        console.log("[v0] Error obteniendo productos, usando datos básicos")
      }

      console.log("[v0] Productos obtenidos:", products?.length || 0)

      const itemsWithProducts = cartItems.map((cartItem) => {
        const product = products?.find((p) => p.id === cartItem.product_id)
        return {
          ...cartItem,
          product: product || {
            id: cartItem.product_id,
            name: "Producto no encontrado",
            price: 0,
            image_url: null,
            stock: 0,
          },
        }
      })

      console.log("[v0] Carrito cargado exitosamente:", itemsWithProducts.length, "items")
      setItems(itemsWithProducts)

      saveLocalCart(itemsWithProducts)
    } catch (error) {
      console.error("[v0] Error loading cart:", error)

      console.log("[v0] Error general, usando carrito local como último recurso")
      setIsOnline(false)
      setItems(getLocalCart())

      const errorMessage = error instanceof Error ? error.message : "Error desconocido cargando carrito"
      setError(`Error de conexión - usando carrito local: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = async (product: Product, quantity = 1) => {
    try {
      console.log("[v0] Agregando item al carrito:", product.name, "cantidad:", quantity)
      setError(null)

      const supabase = getSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const sessionId = getSessionId()

      let existingQuery = supabase.from("cart_items").select("*")

      if (user) {
        existingQuery = existingQuery.eq("user_id", user.id).eq("product_id", product.id)
      } else {
        existingQuery = existingQuery.eq("session_id", sessionId).eq("product_id", product.id)
      }

      const { data: existing, error: existingError } = await existingQuery

      if (existingError) {
        throw new Error(`Error verificando item existente: ${existingError.message}`)
      }

      if (existing && existing.length > 0) {
        const newQuantity = existing[0].quantity + quantity
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
          .eq("id", existing[0].id)

        if (error) throw new Error(`Error actualizando cantidad: ${error.message}`)
      } else {
        const cartItem = {
          product_id: product.id,
          quantity,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...(user ? { user_id: user.id } : { session_id: sessionId }),
        }

        const { error } = await supabase.from("cart_items").insert([cartItem])

        if (error) throw new Error(`Error insertando item: ${error.message}`)
      }

      console.log("[v0] Item agregado exitosamente")
      await loadCart()
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      const errorMessage = error instanceof Error ? error.message : "Error agregando al carrito"
      setError(errorMessage)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      if (quantity <= 0) {
        await removeItem(itemId)
        return
      }

      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", itemId)

      if (error) throw new Error(`Error actualizando cantidad: ${error.message}`)

      await loadCart()
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
      const errorMessage = error instanceof Error ? error.message : "Error actualizando cantidad"
      setError(errorMessage)
      throw error
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw new Error(`Error removiendo item: ${error.message}`)

      await loadCart()
    } catch (error) {
      console.error("[v0] Error removing item:", error)
      const errorMessage = error instanceof Error ? error.message : "Error removiendo item"
      setError(errorMessage)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()
      const sessionId = getSessionId()

      let query = supabase.from("cart_items").delete()

      if (user) {
        query = query.eq("user_id", user.id)
      } else {
        query = query.eq("session_id", sessionId)
      }

      const { error } = await query

      if (error) throw new Error(`Error limpiando carrito: ${error.message}`)

      setItems([])
    } catch (error) {
      console.error("[v0] Error clearing cart:", error)
      const errorMessage = error instanceof Error ? error.message : "Error limpiando carrito"
      setError(errorMessage)
      throw error
    }
  }

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleOnline = () => {
      console.log("[v0] Conexión restaurada, recargando carrito")
      setIsOnline(true)
      loadCart()
    }

    const handleOffline = () => {
      console.log("[v0] Conexión perdida")
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    loadCart()
  }, [])

  return {
    items,
    isLoading,
    error,
    total,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    loadCart,
    isOnline,
  }
}
