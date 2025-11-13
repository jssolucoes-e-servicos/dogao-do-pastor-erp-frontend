"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  LogOut,
  Menu,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Clientes",
    href: "/app/clientes",
    icon: Users,
  },
  {
    title: "Vendedores",
    href: "/app/vendedores",
    icon: Users,
  },
  {
    title: "Redes de Células",
    href: "/app/redes-de-celulas",
    icon: Users,
  },
  {
    title: "Células",
    href: "/app/celulas",
    icon: Users,
  },
  {
    title: "Entregadores",
    href: "/app/entregadores",
    icon: Truck,
  },
  {
    title: "Pedidos",
    href: "/app/pedidos",
    icon: ShoppingBag,
  },
  {
    title: "Filas",
    href: "/app/filas",
    icon: Clock,
    children: [
      { title: "Pendentes", href: "/app/filas/pendentes", icon: Clock, badge: "3" },
      { title: "Em Preparo", href: "/app/filas/preparo", icon: Clock, badge: "5" },
      { title: "Prontos", href: "/app/filas/prontos", icon: Clock, badge: "2" },
      { title: "Em Entrega", href: "/app/filas/entrega", icon: Clock, badge: "4" },
      { title: "Entregues", href: "/app/filas/entregues", icon: Clock },
    ],
  },
  {
    title: "PDV",
    href: "/app/pdv",
    icon: CreditCard,
  },
  {
    title: "Relatórios",
    href: "/app/relatorios",
    icon: FileText,
  },
]

interface SidebarContentProps {
  onItemClick?: () => void
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Filas"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const active = isActive(item.href)

    return (
      <div key={item.title}>
        {hasChildren ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10 px-3",
              level > 0 && "ml-4 w-[calc(100%-1rem)]",
              active && "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
            onClick={() => toggleExpanded(item.title)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        ) : (
          <Link href={item.href} onClick={onItemClick}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 px-3",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                active && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderNavItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-sidebar-accent-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">CRM Dogão</h2>
            <p className="text-xs text-sidebar-foreground/70">Sistema de Gestão</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">{navItems.map((item) => renderNavItem(item))}</nav>

      {/* User Info & Logout */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-sidebar-accent-foreground">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent onItemClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen border-r border-sidebar-border">
        <SidebarContent />
      </div>
    </>
  )
}
