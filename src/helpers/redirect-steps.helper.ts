import { findOrderOnline } from "@/actions/order-online/find";
import { OrderStatsEnum, PreOrderStepEnum } from "@/enums";
import { IOrderOnline } from "@/interfaces";
import { redirect } from "next/navigation";

interface RedirectStepsHelperProps {
  presaleId:string;
  page: string;
}

export async function RedirectStepsHelper({presaleId, page}: RedirectStepsHelperProps): Promise<IOrderOnline> {
  const preorder = await findOrderOnline(presaleId) ;
  if (!preorder) { redirect('/off-line')};
  processRedirects(presaleId,preorder.status,preorder.step, page);
  return preorder
} 


function processRedirects(presaleId:string,status:string,step:string, page:string){
  if (status === OrderStatsEnum.digitation){
      if (step !== page){
        console.log('step !== page');
        switch (step) {
        case PreOrderStepEnum.customer:
          redirect(`/comprar/${presaleId}`);
        case PreOrderStepEnum.order:
          redirect(`/comprar/${presaleId}/pedido`);
        case PreOrderStepEnum.delivery:
          redirect(`/comprar/${presaleId}/endereco`);
        case PreOrderStepEnum.payment:
          redirect(`/comprar/${presaleId}/pagamento`);
        case PreOrderStepEnum.pix:
          redirect(`/comprar/${presaleId}/pagamento/pix`);
        case PreOrderStepEnum.card:
          redirect(`/comprar/${presaleId}/pagamento/cartao`);
        case PreOrderStepEnum.analysis:
          redirect(`/comprar/${presaleId}/analise`);
        case PreOrderStepEnum.tanks:
          redirect(`/comprar/${presaleId}/obrigado`);
        default:
          break;
      } 
    }
  } else {
    if (status === OrderStatsEnum.pending_payment) {
      if (step !== page){
        switch (step) {
          case PreOrderStepEnum.payment:
            redirect(`/comprar/${presaleId}/pagamento`);
          case PreOrderStepEnum.pix:
            redirect(`/comprar/${presaleId}/pagamento/pix`);
          case PreOrderStepEnum.card:
            redirect(`/comprar/${presaleId}/pagamento/cartao`);
          case PreOrderStepEnum.tanks:
            redirect(`/comprar/${presaleId}/obrigado`);
          default:
            break;
        }
      }
    } else if (status === OrderStatsEnum.payd) {
      if (step !== page){
        redirect(`/comprar/${presaleId}/obrigado`);
      }
    } else {
      redirect(`/acompanhar-pedido/${presaleId}`);
    }
  }
}