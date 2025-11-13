

import { CustomersListForm } from "@/components/list-forms/customers-list-form"
import { Fragment } from "react"

export default function CRMPage() {
  return (
  <Fragment>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Clientes</h1>
          <p className="text-muted-foreground">Visualizar e gerenciar os clientes cadastrados</p>
        </div>
      </div>
      <CustomersListForm />
    </div>
  </Fragment>)
}
