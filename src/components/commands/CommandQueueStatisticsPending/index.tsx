
import { ICommand } from "@/interfaces/command";
import { Dog, Package, ShoppingBasket, Truck } from "lucide-react";

export function CommandQueueStatisticsPending({ commands }: { commands: ICommand[] }) {
  const totalCommands = commands.length;
  // Soma quantidade de dogs em todas as comandas
  const totalDogs = commands.reduce((acc, c) =>
    acc + (c.order?.quantity || 1), 0
  );
  // Soma quantity de todos os pedidos de delivery (para entregar)
  const toDelivery = commands
    .filter((c) => c.order?.deliveryOption === "delivery")
    .reduce((acc, c) => acc + (c.order?.quantity || 1), 0);

  // Soma quantity de pickup, donate e scheduled (para retirada ou doação)
  const toPickup = commands
    .filter((c) =>
      ["pickup", "donate", "scheduled"].includes(c.order?.deliveryOption)
    )
    .reduce((acc, c) => acc + (c.order?.quantity || 1), 0);

  return (
    <section className="grid gap-2 grid-cols-4 mb-2">
      <div className="bg-card rounded p-3 flex items-center gap-3 shadow-sm">
        <ShoppingBasket className="h-5 w-5 text-muted-foreground" />
        <div>
          <div className="text-xs text-muted-foreground leading-4">Comandas</div>
          <div className="font-bold text-lg">{totalCommands}</div>
        </div>
      </div>
      <div className="bg-card rounded p-3 flex items-center gap-3 shadow-sm">
        <Dog className="h-5 w-5 text-green-700" />
        <div>
          <div className="text-xs text-muted-foreground leading-4">Dogs</div>
          <div className="font-bold text-lg">{totalDogs}</div>
        </div>
      </div>
      <div className="bg-card rounded p-3 flex items-center gap-3 shadow-sm">
        <Truck className="h-5 w-5 text-blue-700" />
        <div>
          <div className="text-xs text-muted-foreground leading-4">Para entregar</div>
          <div className="font-bold text-lg">{toDelivery}</div>
        </div>
      </div>
      <div className="bg-card rounded p-3 flex items-center gap-3 shadow-sm">
        <Package className="h-5 w-5 text-yellow-700" />
        <div>
          <div className="text-xs text-muted-foreground leading-4">Para retirada / doação</div>
          <div className="font-bold text-lg">{toPickup}</div>
        </div>
      </div>
    </section>
  );
}
