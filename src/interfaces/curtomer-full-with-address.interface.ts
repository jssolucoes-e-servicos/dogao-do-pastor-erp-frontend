//interfaces/curtomer-full-with-address.interface.ts
import { ICustomerFull } from "./curtomer-full.interface";
import { ICustomerAddressFull } from "./customer-address-full.interface";

export interface ICustomerFullWithAddress extends ICustomerFull {
  addresses: ICustomerAddressFull[];
}