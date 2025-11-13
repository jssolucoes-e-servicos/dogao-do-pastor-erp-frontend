"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, DollarSign, MapPin, Plus, Search, User } from "lucide-react"
import { useState } from "react"

interface Pedido {
  id: string
  cliente: string
  endereco: string
  itens: string[]
  valor: number
  status: "pendente" | "preparo" | "pronto" | "entrega" | "entregue"
  horario: string
  entregador?: string
}

const mockPedidos: Pedido[] = [
  {
    id: "#001",
    cliente: "João Silva",
    endereco: "Rua das Flores, 123",
    itens: ["X-Bacon", "Batata Frita", "Coca-Cola"],
    valor: 35.5,
    status: "pendente",
    horario: "19:30",
  },
  {
    id: "#002",
    cliente: "Maria Santos",
    endereco: "Av. Principal, 456",
    itens: ["X-Tudo", "Suco Natural"],
    valor: 28.0,
    status: "preparo",
    horario: "19:15",
  },
  {
    id: "#003",
    cliente: "Pedro Costa",
    endereco: "Rua do Comércio, 789",
    itens: ["X-Salada", "Batata Frita", "Refrigerante"],
    valor: 32.0,
    status: "pronto",
    horario: "19:00",
  },
  {
    id: "#004",
    cliente: "Ana Oliveira",
    endereco: "Rua Nova, 321",
    itens: ["X-Frango", "Onion Rings"],
    valor: 25.5,
    status: "entrega",
    horario: "18:45",
    entregador: "João Silva",
  },
]

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPedidos = mockPedidos.filter(
    (pedido) =>
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.endereco.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "preparo":
        return <Badge className="bg-yellow-600 text-white">Em Preparo</Badge>
      case "pronto":
        return <Badge className="bg-blue-600 text-white">Pronto</Badge>
      case "entrega":
        return <Badge className="bg-primary text-primary-foreground">Em Entrega</Badge>
      case "entregue":
        return <Badge className="bg-green-600 text-white">Entregue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalPedidos = mockPedidos.length
  const valorTotal = mockPedidos.reduce((acc, pedido) => acc + pedido.valor, 0)
  const pendentesCount = mockPedidos.filter((p) => p.status === "pendente").length

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""} hoje
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por ID, cliente ou endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-input border-border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <p className="text-2xl font-bold text-card-foreground">{totalPedidos}</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-green-600">R$ {valorTotal.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendentesCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPedidos.map((pedido) => (
          <Card key={pedido.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {pedido.horario} - {pedido.id}
                </span>
                {getStatusBadge(pedido.status)}
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
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-green-600">R$ {pedido.valor.toFixed(2)}</span>
                </div>
                {pedido.entregador && (
                  <div className="text-sm text-muted-foreground">Entregador: {pedido.entregador}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPedidos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm ? "Nenhum pedido encontrado para a busca." : "Nenhum pedido encontrado."}
          </p>
        </div>
      )}
    </div>
  )
}
