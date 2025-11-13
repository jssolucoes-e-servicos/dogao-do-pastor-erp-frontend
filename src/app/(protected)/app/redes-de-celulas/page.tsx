

import { CellsNetworksListForm } from "@/components/list-forms/networks-list-form"
import { Fragment } from "react"

export default function CRMPage() {
  return (
  <Fragment>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Rede de Células</h1>
          <p className="text-muted-foreground">Visualizar e gerenciar as redes de células cadastradas</p>
        </div>
      </div>
      <CellsNetworksListForm />
    </div>
  </Fragment>)
}
