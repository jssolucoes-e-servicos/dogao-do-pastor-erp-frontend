'use client';
import CommandCard from '@/components/commands/CommandCard';
import { Button } from '@/components/ui/button';
import { fetcherGet } from '@/lib/fetcher';
import useSWR from 'swr';

export default function ProductionQueuePage() {
  const { data, isLoading, error, mutate } = useSWR('commands?status=IN_PRODUCTION', fetcherGet);

  if (isLoading) return <div>Carregando produção...</div>;
  if (error) return <div>Erro ao buscar dados.</div>;
  if (!data || data.length === 0) return <div>Nenhuma comanda em produção.</div>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Fila de Produção</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {data.map((command: any) => (
          <div key={command.id} className="relative">
            <CommandCard command={command} />
            <Button
              size="sm"
              className="absolute top-2 right-2"
              onClick={async () => {
                await fetch(`/commands/${command.id}/finish-production`, { method: 'PATCH' });
                mutate();
              }}
            >
              Finalizar produção
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
