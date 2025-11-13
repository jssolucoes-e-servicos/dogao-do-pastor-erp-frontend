
import { SellersListForm } from "@/components/list-forms/sellers-list-form"
import { Fragment } from "react"

export default function CRMPage() {
  return (
  <Fragment>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Vendedores</h1>
          <p className="text-muted-foreground">Visualizar e gerenciar os vendedores cadastrados</p>
        </div>
      </div>
      <SellersListForm />
    </div>
  </Fragment>)
}
