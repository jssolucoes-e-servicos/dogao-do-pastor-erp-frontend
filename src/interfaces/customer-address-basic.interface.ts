//interfaces/customer-address-basic.interface.ts
export interface ICustomerAddressBasic {
  customerId: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string | null | undefined;
}