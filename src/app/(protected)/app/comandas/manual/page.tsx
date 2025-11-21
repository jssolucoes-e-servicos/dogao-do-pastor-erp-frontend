// app/comandas/page.tsx
import { CommandManualPage } from '@/components/commands/CommandManualPage';
import { Fragment } from 'react';
export default async function CommandsPage() {

  const sellers = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers`).then(res => res.json());


  if (!sellers) {
    return <div>Falha ao carregar listagem de vendedores, atualize a página.</div>;
  }

  return (
    <Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Comanda - Venda offline</h1>
            <p className="text-muted-foreground">Cadastro de Comanda offline</p>
          </div>
        </div>
        <CommandManualPage sellers={sellers} />
      </div>
    </Fragment>)
}
