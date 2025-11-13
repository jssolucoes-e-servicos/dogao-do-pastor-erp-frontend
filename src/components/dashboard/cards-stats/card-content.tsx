import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface IDashboardCardContent {
    title: string
    value: string | number
    icon: LucideIcon 
    color: string
    badge?: string
    href?: string
}

export function DashboardCardContent({
    title,
    value,
    icon: Icon,
    color,
    badge,
    href,
  }: IDashboardCardContent) {

   // console.log(`DashboardCardContent-${title}`, value)
    const Content = (
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
            {title}
            {badge && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {badge}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-card-foreground">
              {value}
              </div>
            </div>
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    )

    return href ? (
      <Link href={href} className="block">
        {Content}
      </Link>
    ) : (
      Content
    )
  }