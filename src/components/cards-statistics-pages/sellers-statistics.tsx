import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISeller } from "@/interfaces";
import { Users } from "lucide-react";
import { Fragment } from "react";

interface SellersStatisticsProps {
  sellers: ISeller[];
}
export function SellersStatistics({sellers}:SellersStatisticsProps){
  return (
    <Fragment>
      <div className="grid gap-2 md:grid-cols-3 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">Vendedores Cadastrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground sm:hidden" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.length}</div>
          </CardContent>
        </Card>

       {/*  <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conhecem a Igreja</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.filter((c) => c.knowsChurch).length}</div>
            <p className="text-xs text-muted-foreground">
              {sellers.length > 0
                ? ((sellers.filter((c) => c.knowsChurch).length / sellers.length) * 100).toFixed(
                    1,
                  )
                : 0}
              % do total
            </p>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autorizam Contato</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellers.filter((c) => c.allowsChurch).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {sellers.length > 0
                ? (
                    (sellers.filter((c) => c.allowsChurch).length / sellers.length) *
                    100
                  ).toFixed(1)
                : 0}
              % do total
            </p>
          </CardContent>
        </Card> */}
      </div>
  </Fragment>)
}