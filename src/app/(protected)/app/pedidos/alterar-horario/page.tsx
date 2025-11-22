/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetcherGet } from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";

export interface ICustomer {
  id: string;
  name: string;
  phone?: string;
  // Outros campos se quiser
}

export interface IOrderOnline {
  id: string;
  customer?: ICustomer;
  deliveryTime?: string | null;
  // Outros campos relevantes se precisar adicionar
}

export default function AlteraHorarioPedidosPage() {
  const [search, setSearch] = useState('');
  const [modalPedido, setModalPedido] = useState<any | null>(null);
  const [novoHorario, setNovoHorario] = useState('');

  // Busca todos pedidos pagos/delivery
  const { data: pedidos, isLoading } = useSWR('order-online/delivery', fetcherGet);

  // Filtra pelo telefone digitado
  const pedidosFiltrados: IOrderOnline[] = pedidos && search
    ? pedidos.filter((p: IOrderOnline) => p.customer?.phone?.toLowerCase().includes(search.toLowerCase()))
    : [];

  async function salvarHorario() {
    if (!modalPedido) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}order-online/${modalPedido.id}/delivery-time`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deliveryTime: novoHorario })
    });
    setModalPedido(null);
    setNovoHorario('');
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Alterar horário de entrega</h1>
      <Input
        placeholder="Buscar pedido pelo telefone..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="mt-6 space-y-4">
        {isLoading && <div>Carregando pedidos...</div>}
        {pedidosFiltrados && pedidosFiltrados.length === 0 && <div>Nenhum pedido encontrado para este telefone.</div>}
        {pedidosFiltrados.map((pedido: IOrderOnline) => (
          <div key={pedido.id} className="bg-card rounded-lg p-4 flex justify-between items-center gap-2">
            <div>
              <div className="font-bold">{pedido.customer?.name}</div>
              <div>Telefone: {pedido.customer?.phone}</div>
              <div>Horário atual: <span className="font-mono">{pedido.deliveryTime || 'Não informado'}</span></div>
            </div>
            <Button variant="outline" onClick={() => { setModalPedido(pedido); setNovoHorario(''); }}>
              Mudar horário
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={!!modalPedido} onOpenChange={b => { if (!b) setModalPedido(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalPedido && `Alterar horário de entrega de ${modalPedido.customer?.name}`}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="time"
            value={novoHorario}
            onChange={e => setNovoHorario(e.target.value)}
            className="mb-3"
          />
          <Button onClick={salvarHorario} disabled={!novoHorario}>
            Salvar novo horário
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
