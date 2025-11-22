/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CommandCard from '@/components/commands/CommandCard';
import { Button } from '@/components/ui/button';
import { fetcherGet } from '@/lib/fetcher';
import useSWR from 'swr';


export default function DeliveryQueuePage() {
  const { data, isLoading, error, mutate } = useSWR('commands?status=PRODUCED&type=delivery', fetcherGet);

  if (isLoading) return <div>Carregando entregas...</div>;
  if (error) return <div>Erro ao buscar dados.</div>;
  if (!data || data.length === 0) return <div>Nenhum pedido para entrega.</div>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Fila de Entregas</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {data.map((command: any) => (
          <div key={command.id} className="relative">
            <CommandCard command={command} />
            <Button
              size="sm"
              variant="default"
              className="absolute top-2 right-2"
              onClick={async () => {
                // Exemplo: abrir modal para montar rota/atribuir entregador
                // Aqui, só marcando como expedição para simplificar:
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands/${command.id}/to-expedition`, { method: 'PATCH' });
                mutate();
              }}
            >
              Enviar para expedição
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
