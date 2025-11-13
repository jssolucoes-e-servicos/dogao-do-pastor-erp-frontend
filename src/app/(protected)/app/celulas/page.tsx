
import { CellsListForm } from "@/components/list-forms/cells-list-form"
import { Fragment } from "react"

export default function CRMPage() {
  return (
  <Fragment>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Células</h1>
          <p className="text-muted-foreground">Visualizar e gerenciar as células cadastradas</p>
        </div>
      </div>
      <CellsListForm />
    </div>
  </Fragment>)
}
