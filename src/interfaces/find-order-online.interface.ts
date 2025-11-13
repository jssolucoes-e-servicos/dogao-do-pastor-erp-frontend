
import { ICustomerFullWithAddress } from "./curtomer-full-with-address.interface";
import { IOrderOnline } from "./order-online";
export interface IOrderOnlineStartResponse {
  presale: IOrderOnline;
  customer: ICustomerFullWithAddress | null;
} 