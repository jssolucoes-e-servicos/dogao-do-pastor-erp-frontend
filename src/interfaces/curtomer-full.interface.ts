//interfaces/curtomer-full.interface.ts
import { ICustomerBasic } from "./customer-basic.interace";
export interface ICustomerFull extends ICustomerBasic {
  id: string;
  active: boolean,
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}