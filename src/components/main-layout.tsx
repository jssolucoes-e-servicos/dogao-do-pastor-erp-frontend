"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/contexts/auth-context"

interface MainLayoutProps {
  children: React.ReactNode
}



export function MainLayout({ children }: MainLayoutProps) {
  const { user } = useAuth();

  console.clear();
  console.log(user);
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 pt-16 md:pt-6">{children}</div>
      </main>
    </div>
  )
}
