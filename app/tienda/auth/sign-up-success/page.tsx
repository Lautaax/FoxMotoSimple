import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
              <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Please check your email and click the confirmation link to complete your registration.
              </p>
              <div className="text-center">
                <Link href="/tienda" className="text-sm text-blue-600 hover:underline">
                  Volver a la tienda
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
