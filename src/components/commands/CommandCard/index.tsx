
import { Card, CardContent } from "@/components/ui/card";
import { ICommand } from "@/interfaces/command";

interface CommandCardProps { command: ICommand; }

export default function CommandCard({ command }: CommandCardProps) {
  return (
    <Card className="w-full max-w-xs min-w-[220px] p-0">
      <CardContent className="py-4 px-5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {command.order?.deliveryTime &&
              new Date(command.order.deliveryTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span
            className={[
              "px-2 py-0.5 rounded-full text-xs font-bold",
              command.order?.deliveryOption === "delivery"
                ? "bg-blue-100 text-blue-800"
                : command.order?.deliveryOption === "pickup"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-emerald-100 text-emerald-800"
            ].join(" ")}
          >
            {command.order?.deliveryOption === 'delivery'
              ? 'Entrega'
              : command.order?.deliveryOption === 'pickup'
                ? 'Retirada'
                : 'Programada'}
          </span>
        </div>
        <div className="font-bold text-base truncate">{command.order?.customer?.name || 'Sem nome'}</div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-primary font-semibold">{command.order?.preOrderItems?.length ?? 1}x Dogão</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {command.order?.customer?.phone && <div>Telefone: {command.order.customer.phone}</div>}
          {command.order?.customer?.addresses?.[0] && (
            <div>
              Endereço: {command.order.customer.addresses[0].street},{' '}
              {command.order.customer.addresses[0].number} -{' '}
              {command.order.customer.addresses[0].neighborhood}
            </div>
          )}
        </div>
        <a
          href={`/comandas/${command.id}`}
          className="text-blue-600 hover:underline text-xs mt-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Comanda
        </a>
      </CardContent>
    </Card>
  );
}
