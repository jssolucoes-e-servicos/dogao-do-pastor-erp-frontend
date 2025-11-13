"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Clock, DollarSign, MapPin, User } from "lucide-react"

const pedidosPendentes = [
  {
    id: "#001",
    cliente: "João Silva",
    endereco: "Rua das Flores, 123",
    itens: ["X-Bacon", "Batata Frita", "Coca-Cola"],
    valor: 35.5,
    horario: "19:30",
    tempoEspera: "5 min",
  },
  {
    id: "#005",
    cliente: "Carlos Lima",
    endereco: "Av. Central, 654",
    itens: ["X-Calabresa", "Suco Natural"],
    valor: 30.0,
    horario: "19:35",
    tempoEspera: "2 min",
  },
]

export default function FilaPendentesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fila - Pedidos Pendentes</h1>
          <p className="text-sm text-muted-foreground">
            {pedidosPendentes.length} pedido{pedidosPendentes.length !== 1 ? "s" : ""} aguardando preparo
          </p>
        </div>
        <Badge className="bg-yellow-600 text-white text-lg px-4 py-2">{pedidosPendentes.length}</Badge>
      </div>

      <div className="space-y-4">
        {pedidosPendentes.map((pedido) => (
          <Card key={pedido.id} className="bg-card border-border border-l-4 border-l-yellow-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  {pedido.horario} - {pedido.id}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{pedido.tempoEspera}</Badge>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ChefHat className="w-4 h-4 mr-2" />
                    Iniciar Preparo
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {pedido.cliente}
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-words">{pedido.endereco}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Itens:</p>
                <ul className="text-sm text-muted-foreground">
                  {pedido.itens.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-1 pt-2 border-t border-border">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">R$ {pedido.valor.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pedidosPendentes.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum pedido pendente no momento.</p>
        </div>
      )}
    </div>
  )
}

