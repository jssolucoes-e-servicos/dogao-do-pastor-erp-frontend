/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CommandCard from '@/components/commands/CommandCard';
import { Button } from '@/components/ui/button';
import { fetcherGet } from '@/lib/fetcher';
import useSWR from 'swr';

export default function PickupQueuePage() {
  const { data, isLoading, error, mutate } = useSWR('commands?status=PRODUCED&type=pickup', fetcherGet);

  if (isLoading) return <div>Carregando fila de retirada...</div>;
  if (error) return <div>Erro ao buscar dados.</div>;
  if (!data || data.length === 0) return <div>Nenhum pedido para retirada.</div>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Fila de Retirada</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {data.map((command: any) => (
          <div key={command.id} className="relative">
            <CommandCard command={command} />
            <Button
              size="sm"
              className="absolute top-2 right-2"
              onClick={async () => {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands/${command.id}/delivered`, { method: 'PATCH' });
                mutate();
              }}
            >Marcar como retirado</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
