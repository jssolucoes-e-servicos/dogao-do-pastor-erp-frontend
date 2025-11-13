import { MainLayout } from "@/components/main-layout"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/auth-context"
import "@/styles/globals.css"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "CRM System",
  description: "Sistema de CRM para gestão de clientes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning suppressContentEditableWarning>
      <body className="min-h-screen bg-background text-foreground ">
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster richColors position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  )
}