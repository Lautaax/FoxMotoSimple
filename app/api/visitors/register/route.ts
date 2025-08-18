import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { getGeoLocation } from "@/lib/geo-service"

// Ruta al archivo de datos (en una implementación real usaríamos una base de datos)
const DATA_FILE = path.join(process.cwd(), "data", "visitors.json")

// Asegurarse de que el directorio data existe
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Cargar datos existentes o crear un archivo nuevo
const loadData = () => {
  ensureDataDir()

  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      totalVisits: 0,
      dailyVisits: {},
      onlineUsers: {},
      locations: [],
      visitorData: {},
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2))
    return initialData
  }

  const fileContent = fs.readFileSync(DATA_FILE, "utf-8")
  return JSON.parse(fileContent)
}

// Guardar datos en el archivo
const saveData = (data: any) => {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// Obtener la fecha actual en formato YYYY-MM-DD
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0]
}

// Limpiar usuarios online inactivos (más de 2 minutos sin actividad)
const cleanupOnlineUsers = (onlineUsers: Record<string, number>) => {
  const now = Date.now()
  const twoMinutesAgo = now - 2 * 60 * 1000

  const updatedOnlineUsers: Record<string, number> = {}

  Object.entries(onlineUsers).forEach(([userId, lastSeen]) => {
    if (lastSeen > twoMinutesAgo) {
      updatedOnlineUsers[userId] = lastSeen
    }
  })

  return updatedOnlineUsers
}

// Obtener la IP del cliente
const getClientIp = () => {
  const headersList = headers()

  // Intentar obtener la IP real detrás de proxies
  const forwardedFor = headersList.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  // Intentar con otros headers comunes
  const realIp = headersList.get("x-real-ip")
  if (realIp) {
    return realIp
  }

  // Si no se puede determinar, usar una IP de placeholder
  return "127.0.0.1"
}

export async function POST() {
  try {
    // Obtener o crear ID de visitante
    const cookieStore = cookies()
    let visitorId = cookieStore.get("visitor_id")?.value

    if (!visitorId) {
      visitorId = uuidv4()
      // En una implementación real, estableceríamos la cookie con httpOnly y secure
    }

    // Cargar datos existentes
    const data = loadData()

    // Incrementar contador total
    data.totalVisits += 1

    // Actualizar visitas diarias
    const today = getCurrentDate()
    data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1

    // Actualizar usuarios online
    data.onlineUsers[visitorId] = Date.now()

    // Inicializar visitorData si no existe
    if (!data.visitorData) {
      data.visitorData = {}
    }

    // Verificar si ya tenemos datos de geolocalización para este visitante
    if (!data.visitorData[visitorId]) {
      // Obtener IP del cliente
      const clientIp = getClientIp()

      // Obtener geolocalización
      const geoLocation = await getGeoLocation(clientIp).catch((error) => {
        console.error("Error al obtener geolocalización:", error)
        return null
      })

      if (geoLocation) {
        // Guardar datos del visitante
        data.visitorData[visitorId] = {
          firstVisit: Date.now(),
          lastVisit: Date.now(),
          visits: 1,
          location: geoLocation,
        }

        // Añadir a la lista de ubicaciones
        if (!data.locations) {
          data.locations = []
        }

        data.locations.push(geoLocation)
      } else {
        // Si no pudimos obtener la geolocalización, al menos registramos la visita
        data.visitorData[visitorId] = {
          firstVisit: Date.now(),
          lastVisit: Date.now(),
          visits: 1,
          location: null,
        }
      }
    } else {
      // Actualizar datos del visitante existente
      data.visitorData[visitorId].lastVisit = Date.now()
      data.visitorData[visitorId].visits += 1
    }

    // Limpiar usuarios inactivos
    data.onlineUsers = cleanupOnlineUsers(data.onlineUsers)

    // Guardar datos actualizados
    saveData(data)

    // Establecer cookie de visitante
    const response = NextResponse.json({ success: true })
    response.cookies.set("visitor_id", visitorId, {
      maxAge: 60 * 60 * 24 * 365, // 1 año
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error registrando visita:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
