import { fetcherGet } from '@/lib/fetcher';
import useSWR from 'swr';
import CommandGroup from '../CommandGroup';

// Função utilitária para faixa de produção
function getProductionSlot(dateString: string) {
  const d = new Date(dateString);
  d.setMinutes(d.getMinutes() - 30);
  d.setSeconds(0);
  d.setMilliseconds(0);
  const hour = d.getHours();
  const min = d.getMinutes() < 30 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
}

// Ajude a tipar conforme seu schema
interface CommandListProps {
  filter: string;
}

export default function CommandList({ filter }: CommandListProps) {
  const { data: comandas, error, isLoading } = useSWR(
    `commands?type=${filter}`,
    fetcherGet
  );

  if (isLoading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-destructive">Erro ao carregar comandas.</div>;
  if (!comandas || comandas.length === 0) return <div className="p-4">Nenhuma comanda encontrada.</div>;

  // Agrupamento
  const grouped: Record<string, any[]> = {};
  comandas.forEach(cmd => {
    const slot = getProductionSlot(cmd.order?.scheduledTime ?? cmd.order?.deliveryTime ?? cmd.createdAt);
    if (!grouped[slot]) grouped[slot] = [];
    grouped[slot].push(cmd);
  });

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([slot, list]) => (
        <CommandGroup key={slot} time={slot} commands={list} />
      ))}
    </div>
  );
}
