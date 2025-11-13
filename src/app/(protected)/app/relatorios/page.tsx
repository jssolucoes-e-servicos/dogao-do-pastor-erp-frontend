"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Download, FileText, ShoppingBag, TrendingUp, Users } from "lucide-react"

const relatoriosDisponiveis = [
  {
    titulo: "Vendas Diárias",
    descricao: "Relatório de vendas do dia atual",
    icone: DollarSign,
    valor: "R$ 1.245,50",
    badge: "Hoje",
    cor: "text-green-600",
  },
  {
    titulo: "Clientes Cadastrados",
    descricao: "Total de clientes no sistema",
    icone: Users,
    valor: "156",
    badge: "Total",
    cor: "text-blue-600",
  },
  {
    titulo: "Pedidos do Mês",
    descricao: "Pedidos realizados no mês atual",
    icone: ShoppingBag,
    valor: "342",
    badge: "Este mês",
    cor: "text-purple-600",
  },
  {
    titulo: "Entregadores Ativos",
    descricao: "Entregadores disponíveis hoje",
    icone: TrendingUp,
    valor: "8",
    badge: "Ativos",
    cor: "text-orange-600",
  },
]

const relatoriosExportaveis = [
  {
    nome: "Relatório de Vendas - Mensal",
    periodo: "Janeiro 2024",
    formato: "PDF",
  },
  {
    nome: "Lista de Clientes",
    periodo: "Atualizado hoje",
    formato: "Excel",
  },
  {
    nome: "Histórico de Pedidos",
    periodo: "Últimos 30 dias",
    formato: "PDF",
  },
  {
    nome: "Performance de Entregadores",
    periodo: "Janeiro 2024",
    formato: "Excel",
  },
]

export default function RelatoriosPage() {
  const exportarRelatorio = (nome: string, formato: string) => {
    // Aqui seria implementada a lógica de exportação
    alert(`Exportando ${nome} em formato ${formato}`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-sm text-muted-foreground">Visualize e exporte relatórios do sistema</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Calendar className="w-4 h-4 mr-2" />
          Período Personalizado
        </Button>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {relatoriosDisponiveis.map((relatorio) => (
          <Card key={relatorio.titulo} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{relatorio.titulo}</p>
                  <p className={`text-2xl font-bold ${relatorio.cor}`}>{relatorio.valor}</p>
                  <p className="text-xs text-muted-foreground mt-1">{relatorio.descricao}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <relatorio.icone className={`w-8 h-8 ${relatorio.cor}`} />
                  <Badge variant="secondary" className="text-xs">
                    {relatorio.badge}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Relatórios para Exportação */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relatórios Disponíveis para Exportação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatoriosExportaveis.map((relatorio, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium text-card-foreground">{relatorio.nome}</h4>
                    <p className="text-sm text-muted-foreground">{relatorio.periodo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      relatorio.formato === "PDF" ? "border-red-500 text-red-600" : "border-green-500 text-green-600"
                    }
                  >
                    {relatorio.formato}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => exportarRelatorio(relatorio.nome, relatorio.formato)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relatórios em Tela */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Vendas por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hoje</span>
                <span className="font-medium text-green-600">R$ 1.245,50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Esta Semana</span>
                <span className="font-medium text-green-600">R$ 8.432,20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Este Mês</span>
                <span className="font-medium text-green-600">R$ 32.156,80</span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-sm font-medium">Total Geral</span>
                <span className="font-bold text-green-600 text-lg">R$ 156.789,45</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">X-Bacon</span>
                <Badge variant="secondary">89 vendas</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">X-Tudo</span>
                <Badge variant="secondary">76 vendas</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Batata Frita</span>
                <Badge variant="secondary">65 vendas</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">X-Salada</span>
                <Badge variant="secondary">54 vendas</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Coca-Cola</span>
                <Badge variant="secondary">43 vendas</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
