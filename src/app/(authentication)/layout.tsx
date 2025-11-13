import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Dogão do Pastor - ERP",
  description: "Sistema ERP - Gestão de Lancerias",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning suppressContentEditableWarning>
      <body className="min-h-screen bg-background text-foreground">
        {/*  <AuthProvider> */}
        {children}
        <Toaster richColors position="bottom-right" />
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
