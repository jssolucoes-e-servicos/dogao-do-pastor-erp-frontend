//interfaces/customer-address-full.interface.ts
import { ICustomerAddressBasic } from './customer-address-basic.interface';
export interface ICustomerAddressFull extends ICustomerAddressBasic {
  id: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}