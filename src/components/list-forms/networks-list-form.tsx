"use client"
import { NetworksStatistics } from "@/components/cards-statistics-pages/networks-statistics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICellNetwork } from '@/interfaces';
import { fetcherGet } from "@/lib/fetcher";
import { Search } from "lucide-react";
import { Fragment, useState } from "react";
import useSWR from "swr";

export function CellsNetworksListForm(){
  const { data, error, isLoading } = useSWR<ICellNetwork[]>(`cells-networks`, fetcherGet);

  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  if (!data) {
    return <div>Nenhum dado disponível.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

   const filteredRegisters = data.filter(
    (register) =>
      (register.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (register.supervisorName || "").includes(searchTerm) ||
      (register.phone || "").includes(searchTerm),
  )

  return (<Fragment>
    <NetworksStatistics networks={data}/>

    {/* Busca */}
    <Card>
      <CardHeader>
        <CardTitle>Pesquisar</CardTitle>
        <CardDescription>Pesquisar por nome, telefone ou Supervisor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Digite nome, telefone ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </CardContent>
    </Card>

    {/* Lista de Clientes */}
    <Card>
      <CardHeader>
        <CardTitle>Lista de Redes ({filteredRegisters.length})</CardTitle>
        <CardDescription>Todas as redes cadastradas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {filteredRegisters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {data.length === 0
                ? "Nenhum registro cadastrado"
                : "Nenhum registro encontrado com os filtros aplicados"}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Qtd. Células</TableHead>
                <TableHead>Data Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegisters.map((register) => (
                <TableRow key={register.id}>
                  <TableCell className="font-medium">{register.name}</TableCell>
                  <TableCell>{register.supervisorName}</TableCell>
                  <TableCell>{register.phone}</TableCell>
                  <TableCell>{register.cells?.length|| 'nenhuma'}</TableCell>
                  <TableCell>{new Date(register.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  </Fragment>)
}