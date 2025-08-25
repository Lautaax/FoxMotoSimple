"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface PersonalInfoFormProps {
  profile: any
  userId: string
}

export function PersonalInfoForm({ profile, userId }: PersonalInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
  })
  const { toast } = useToast()
  const supabase = createClient()

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from("user_profiles").upsert({
        user_id: userId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Información actualizada",
        description: "Tu información personal ha sido guardada correctamente.",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la información. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      city: profile?.city || "",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={loading}>
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-1" />
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="first_name">Nombre</Label>
            {isEditing ? (
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Tu nombre"
              />
            ) : (
              <div className="p-2 text-sm text-gray-300">{formData.first_name || "No especificado"}</div>
            )}
          </div>

          <div>
            <Label htmlFor="last_name">Apellido</Label>
            {isEditing ? (
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Tu apellido"
              />
            ) : (
              <div className="p-2 text-sm text-gray-300">{formData.last_name || "No especificado"}</div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Número de Teléfono
          </Label>
          {isEditing ? (
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+54 11 1234-5678"
            />
          ) : (
            <div className="p-2 text-sm text-gray-300">{formData.phone || "No especificado"}</div>
          )}
        </div>

        <div>
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Dirección
          </Label>
          {isEditing ? (
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Tu dirección completa"
            />
          ) : (
            <div className="p-2 text-sm text-gray-300">{formData.address || "No especificado"}</div>
          )}
        </div>

        <div>
          <Label htmlFor="city">Ciudad</Label>
          {isEditing ? (
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Tu ciudad"
            />
          ) : (
            <div className="p-2 text-sm text-gray-300">{formData.city || "No especificado"}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
