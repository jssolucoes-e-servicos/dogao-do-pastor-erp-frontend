"use client"
import { CellsStatistics } from "@/components/cards-statistics-pages/cells-statistics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICell } from '@/interfaces';
import { fetcherGet } from "@/lib/fetcher";
import { Search } from "lucide-react";
import { Fragment, useState } from "react";
import useSWR from "swr";

export function CellsListForm(){
  const { data, error, isLoading } = useSWR<ICell[]>(`cells`, fetcherGet);

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
      (register.leaderName || "").includes(searchTerm) ||
      (register.network.name || "").includes(searchTerm),
  )

  return (<Fragment>
    <CellsStatistics cells={data}/>

    {/* Busca */}
    <Card>
      <CardHeader>
        <CardTitle>Buscar Clientes</CardTitle>
        <CardDescription>Pesquisar por nome, telefone ou CPF</CardDescription>
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
        <CardTitle>Lista de Células ({filteredRegisters.length})</CardTitle>
        <CardDescription>Todas as células cadastradas no sistema</CardDescription>
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
                <TableHead>Líder</TableHead>
                <TableHead>Rede</TableHead>
                <TableHead>Data Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegisters.map((register) => (
                <TableRow key={register.id}>
                  <TableCell className="font-medium">{register.name}</TableCell>
                  <TableCell>{register.leaderName}</TableCell>
                  <TableCell>{register.network.name}</TableCell>
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