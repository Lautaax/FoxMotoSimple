import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { groupLocationsByCountry } from "@/lib/geo-service"

// Mock data for demo purposes
const mockStats = {
  totalVisitors: 15847,
  todayVisitors: 234,
  onlineVisitors: 12,
}

// Ruta al archivo de datos
const DATA_FILE = path.join(process.cwd(), "data", "visitors.json")

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

export async function GET() {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(DATA_FILE)) {
      // In production, fetch from your database
      // For now, return mock data with some randomization
      const stats = {
        totalVisitors: mockStats.totalVisitors + Math.floor(Math.random() * 10),
        todayVisitors: mockStats.todayVisitors + Math.floor(Math.random() * 5),
        onlineVisitors: mockStats.onlineVisitors + Math.floor(Math.random() * 3),
      }

      return NextResponse.json(stats)
    }

    // Leer datos del archivo
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8")
    const data = JSON.parse(fileContent)

    // Limpiar usuarios inactivos
    data.onlineUsers = cleanupOnlineUsers(data.onlineUsers)

    // Guardar datos actualizados
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

    // Obtener estadísticas
    const today = getCurrentDate()
    const todayVisits = data.dailyVisits[today] || 0
    const onlineUsers = Object.keys(data.onlineUsers).length

    // Procesar datos de ubicación
    const locations = data.locations || []

    // Obtener los países más visitados
    const countryCounts = groupLocationsByCountry(locations)
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Obtener las ubicaciones más recientes (para usuarios online)
    const onlineUserIds = Object.keys(data.onlineUsers)
    const recentLocations = onlineUserIds
      .filter((id) => data.visitorData && data.visitorData[id] && data.visitorData[id].location)
      .map((id) => data.visitorData[id].location)
      .slice(0, 10)

    return NextResponse.json({
      totalVisitors: data.totalVisits,
      todayVisits,
      onlineUsers,
      topCountries,
      recentLocations,
    })
  } catch (error) {
    console.error("Error fetching visitor stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
