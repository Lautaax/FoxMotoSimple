import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Ruta al archivo de datos
const DATA_FILE = path.join(process.cwd(), "data", "visitors.json")

export async function POST() {
  try {
    // Obtener o crear ID de visitante
    const cookieStore = cookies()
    let visitorId = cookieStore.get("visitor_id")?.value

    if (!visitorId) {
      visitorId = uuidv4()
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ success: false, error: "Datos no encontrados" }, { status: 404 })
    }

    // Leer datos del archivo
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8")
    const data = JSON.parse(fileContent)

    // Actualizar timestamp del usuario
    data.onlineUsers[visitorId] = Date.now()

    // Guardar datos actualizados
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

    // Establecer cookie de visitante
    const response = NextResponse.json({ success: true })
    response.cookies.set("visitor_id", visitorId, {
      maxAge: 60 * 60 * 24 * 365, // 1 año
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error en ping de visitante:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
