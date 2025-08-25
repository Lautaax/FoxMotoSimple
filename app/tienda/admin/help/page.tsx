import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, User, Shield } from "lucide-react"
import Link from "next/link"

export default function AdminHelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ayuda de Administración</h1>
        <p className="text-muted-foreground">Guía para acceder al panel de administración como usuario admin</p>
      </div>

      <div className="grid gap-6">
        {/* Estado de Autenticación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Estado de Autenticación
            </CardTitle>
            <CardDescription>Verifica tu estado actual de autenticación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span>Usuario no autenticado - usando sesión local</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Para acceder como administrador, necesitas autenticarte primero.
            </p>
          </CardContent>
        </Card>

        {/* Pasos para Autenticarse */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Pasos para Acceder como Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  1
                </Badge>
                <div>
                  <h3 className="font-semibold">Registrarse o Iniciar Sesión</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Usa el email: <code className="bg-muted px-1 rounded">foxmotorepuestos@gmail.com</code>
                  </p>
                  <div className="flex gap-2">
                    <Button asChild size="sm">
                      <Link href="/tienda/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/tienda/auth/sign-up">Registrarse</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  2
                </Badge>
                <div>
                  <h3 className="font-semibold">Verificar Permisos de Admin</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Una vez autenticado, el sistema verificará automáticamente si eres admin
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Si no aparece el badge "Admin", ejecuta el script SQL para configurar permisos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  3
                </Badge>
                <div>
                  <h3 className="font-semibold">Acceder al Panel Admin</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Una vez autenticado como admin, verás opciones adicionales en el menú de usuario
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/tienda/admin">Panel de Administración</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funcionalidades Admin */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades de Administrador</CardTitle>
            <CardDescription>Una vez autenticado como admin, tendrás acceso a:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Crear, editar y borrar productos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Ver y gestionar pedidos recibidos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Manejar usuarios y clientes mayoristas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Configurar precios mayoristas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
