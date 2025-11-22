/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { CommandQueueStatisticsPending } from '@/components/commands/CommandQueueStatisticsPending';
import { Button } from '@/components/ui/button';
import { fetcherGet } from '@/lib/fetcher';
import useSWR from 'swr';

export default function PendingQueuePage() {
  const { data, isLoading, error, mutate } = useSWR<Record<string, any[]>>('commands/pending', fetcherGet);

  // data: agrupado por slot de horário
  const allCommands =
    data
      ? Object.values(data).flat()
      : [];

  return (
    <div className="max-w-5xl mx-auto py-6">
      <CommandQueueStatisticsPending commands={allCommands} />
      <h1 className="text-xl font-bold mb-1">Comandas Pendentes</h1>

      {isLoading && <div>Carregando fila...</div>}
      {error && <div>Erro ao buscar dados.</div>}
      {!isLoading && !error && allCommands.length === 0 && (
        <div>Nenhuma comanda pendente.</div>
      )}
      {console.log(data)}
      {data &&
        Object.entries(data).map(([slot, commands]: [string, any[]]) => (
          <section key={slot} className="mb-3">
            <div className="font-semibold text-md text-muted-foreground mb-1">
              Produzir às {slot}
            </div>
            <ul className="divide-y border rounded bg-background">
              {commands.map((command: any) => (
                <li key={command.id} className="flex items-center px-3 py-2 gap-3 hover:bg-accent group">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">
                      {command.order?.customer?.name || 'Sem nome'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {command.sequentialId && <>#{command.sequentialId} &middot; </>}
                      {command.order?.deliveryOption === 'delivery' && 'Delivery'}
                      {command.order?.deliveryOption === 'pickup' && 'Retirada'}
                      {command.order?.deliveryOption === 'donate' && 'Doação'}
                      {command.order?.deliveryOption === 'scheduled' && 'Programada'}
                      {command.order?.deliveryTime && (
                        <span> &middot; Entrega: {command.order.deliveryTime}</span>
                      )}
                      <span>
                        {command.order?.customer?.phone && (
                          <> &middot; {command.order.customer.phone}</>
                        )}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-auto"
                    onClick={async () => {
                      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands/${command.id}/start-production`, { method: 'PATCH' });
                      mutate();
                    }}
                  >
                    Iniciar produção
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
