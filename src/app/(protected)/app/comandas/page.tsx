// app/comandas/page.tsx
import CommandsPanel from '@/components/commands/CommandsPanel';
import { Fragment } from 'react';
export default function CommandsPage() {
  return (
    <Fragment>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Comandas</h1>
            <p className="text-muted-foreground">Visualizar e gerenciar os comandas cadastradas</p>
          </div>
        </div>
        <CommandsPanel />
      </div>
    </Fragment>)
}
