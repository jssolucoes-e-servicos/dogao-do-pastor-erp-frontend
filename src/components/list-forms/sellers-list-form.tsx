"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ISeller } from '@/interfaces';
import { fetcherGet } from "@/lib/fetcher";
import { Search } from "lucide-react";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { SellersStatistics } from "../cards-statistics-pages/sellers-statistics";

export function SellersListForm(){
  const { data, error, isLoading } = useSWR<ISeller[]>(`sellers`, fetcherGet);

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
      (register.phone || "").includes(searchTerm) ||
      (register.tag || "").includes(searchTerm) ||
      (register.cell?.name || "").includes(searchTerm),
  )

  return (<Fragment>
    <SellersStatistics sellers={data}/>

    {/* Busca */}
    <Card>
      <CardHeader>
        <CardTitle>Pesquisar</CardTitle>
        <CardDescription>Pesquisar por nome, telefone ou TAG</CardDescription>
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
        <CardTitle>Lista de Vendedores ({filteredRegisters.length})</CardTitle>
        <CardDescription>Todos os vendedores cadastrados no sistema</CardDescription>
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
                <TableHead>Telefone</TableHead>
                <TableHead>TAG</TableHead>
                <TableHead>Célula</TableHead>
                <TableHead>Data Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegisters.map((register) => (
                <TableRow key={register.id}>
                  <TableCell className="font-medium">{register.name}</TableCell>
                  <TableCell>{register.phone}</TableCell>
                  <TableCell>{register.tag}</TableCell>
                  <TableCell>{register.cell?.name}</TableCell>
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