import { CardsStats } from "@/components/dashboard/cards-stats/indes"
import { QuickActionCard } from "@/components/dashboard/quick-action-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Clock, ShoppingBag, Users } from "lucide-react"

export default async function Page() {

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-green-500 text-green-500">
            Sistema Online
          </Badge>
        </div>
      </div>

      <CardsStats/>
      

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Novo Pedido"
            description="Criar um novo pedido no PDV"
            icon={ShoppingBag}
            href="/pdv"
            color="bg-primary"
          />
          <QuickActionCard
            title="Gerenciar Filas"
            description="Acompanhar pedidos em preparo"
            icon={ChefHat}
            href="/filas/pendentes"
            color="bg-orange-500"
          />
          <QuickActionCard
            title="Cadastrar Cliente"
            description="Adicionar novo cliente"
            icon={Users}
            href="/clientes"
            color="bg-blue-500"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Atividade Recente</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {/* {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                      <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : ( */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Pedido #1234 foi entregue</p>
                    <p className="text-sm text-muted-foreground">há 5 minutos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Novo cliente cadastrado: João Silva</p>
                    <p className="text-sm text-muted-foreground">há 12 minutos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">3 pedidos aguardando preparo</p>
                    <p className="text-sm text-muted-foreground">há 18 minutos</p>
                  </div>
                </div>
              </div>
          {/*   )} */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
