"use client"
//import { getDashboardStats } from "@/actions/dashboard/stats";
import { fetcherGet } from "@/lib/fetcher";
import { Clock, DollarSign, ShoppingBag, TrendingUp, Truck, Users } from "lucide-react";
import { Fragment } from "react";
import useSWR from 'swr';
import { DashboardCardContent } from "./card-content";

interface DashboardStats {
  counters: {
    vouchers: number;
    availableVouchers: number;
    customers: number;
    orders: number;
    sellers: number;
    usedVouchers: number;
    saleDogs:number;
    availableDogs: number;
  };
}

export function CardsStats(){
const { data, error, isLoading } = useSWR<DashboardStats>(`dashboard`, fetcherGet
  
);

 // Exibir estado de carregamento
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Exibir estado de erro
  if (error) {
    return <div>Erro ao carregar os dados: {error.message}</div>;
  }

  // Se os dados não estiverem disponíveis, retorna uma mensagem (embora o 'isLoading' e 'error' já tratem a maioria dos casos)
  if (!data) {
    return <div>Nenhum dado disponível.</div>;
  }
  
  const viewCount = {
    vouchers: data.counters.vouchers,
    availableVouchers: data.counters.availableVouchers,
    customers: data.counters.customers,
    orders: data.counters.orders,
    sellers: data.counters.sellers,
    usedVouchers: data.counters.usedVouchers,
    saleDogs:data.counters.saleDogs,
    queue: {
      production: 0,
      delivery:0,
      finished:0,
    }
  }


    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <DashboardCardContent
              title="Total Clientes"
              value={viewCount.customers}
              icon={Users}
              color="bg-blue-500"
              href="/app/clientes"
            />
            <DashboardCardContent
              title="Vendedores"
              value={viewCount.sellers}
              icon={Truck}
              color="bg-green-500"
              href="/app/vendedores"
            />
            <DashboardCardContent
              title="Quantidade de Pedidos"
              value={viewCount.saleDogs}
              icon={ShoppingBag}
              color="bg-purple-500"
              href="/app/pedidos"
            />
            <DashboardCardContent
              title="Fila de produção"
              value={viewCount.queue.production}
              icon={Clock}
              color="bg-orange-500"
              badge="Urgente"
              href="/app/filas/producao"
            />
            <DashboardCardContent
              title="Dogs Dendidos"
              value={`R$ ${viewCount.saleDogs}`}
              icon={DollarSign}
              color="bg-emerald-500"
              href="/app/relatorios/dogs-vendidos"
            />
            <DashboardCardContent title="Entregues"
              value={viewCount.queue.finished} 
              icon={TrendingUp} color="bg-indigo-500" />
          </div>
        </Fragment>
    )
}