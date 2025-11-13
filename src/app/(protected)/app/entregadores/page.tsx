"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, Plus, Search, Star, Truck } from "lucide-react"
import { useState } from "react"

interface Entregador {
  id: string
  nome: string
  telefone: string
  veiculo: string
  status: "disponivel" | "ocupado" | "offline"
  avaliacoes: number
  entregas: number
}

const mockEntregadores: Entregador[] = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "(11) 99999-1111",
    veiculo: "Moto Honda CG 160",
    status: "disponivel",
    avaliacoes: 4.8,
    entregas: 245,
  },
  {
    id: "2",
    nome: "Maria Santos",
    telefone: "(11) 99999-2222",
    veiculo: "Bicicleta Elétrica",
    status: "ocupado",
    avaliacoes: 4.9,
    entregas: 189,
  },
  {
    id: "3",
    nome: "Pedro Costa",
    telefone: "(11) 99999-3333",
    veiculo: "Moto Yamaha Factor",
    status: "offline",
    avaliacoes: 4.6,
    entregas: 312,
  },
]

export default function EntregadoresPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEntregadores = mockEntregadores.filter(
    (entregador) =>
      entregador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entregador.telefone.includes(searchTerm) ||
      entregador.veiculo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponivel":
        return <Badge className="bg-green-600 text-white">Disponível</Badge>
      case "ocupado":
        return <Badge className="bg-primary text-primary-foreground">Em Entrega</Badge>
      case "offline":
        return <Badge variant="secondary">Offline</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const disponiveisCount = mockEntregadores.filter((e) => e.status === "disponivel").length
  const ocupadosCount = mockEntregadores.filter((e) => e.status === "ocupado").length

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Entregadores</h1>
          <p className="text-sm text-muted-foreground">
            {mockEntregadores.length} entregador{mockEntregadores.length !== 1 ? "es" : ""} cadastrado
            {mockEntregadores.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Entregador
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar por nome, telefone ou veículo..."
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
                <p className="text-sm text-muted-foreground">Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">{disponiveisCount}</p>
              </div>
              <Truck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Entrega</p>
                <p className="text-2xl font-bold text-primary">{ocupadosCount}</p>
              </div>
              <Truck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-card-foreground">{mockEntregadores.length}</p>
              </div>
              <Truck className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntregadores.map((entregador) => (
          <Card key={entregador.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground flex items-center justify-between">
                {entregador.nome}
                {getStatusBadge(entregador.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {entregador.telefone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                {entregador.veiculo}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{entregador.avaliacoes}</span>
                </div>
                <div className="text-sm text-muted-foreground">{entregador.entregas} entregas</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntregadores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm ? "Nenhum entregador encontrado para a busca." : "Nenhum entregador cadastrado ainda."}
          </p>
        </div>
      )}
    </div>
  )
}

