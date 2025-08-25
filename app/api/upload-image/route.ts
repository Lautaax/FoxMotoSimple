import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const filename = `products/${timestamp}-${randomString}.${extension}`

    // Subir a Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
