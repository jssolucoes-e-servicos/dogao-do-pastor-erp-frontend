import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface IQuickActionCard {
    title: string
    description: string
    icon: LucideIcon 
    href: string
    color: string
}
export function  QuickActionCard ({
    title,
    description,
    icon: Icon,
    href,
    color,
  }: IQuickActionCard) {
    return (
    <Link href={href}>
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
  }