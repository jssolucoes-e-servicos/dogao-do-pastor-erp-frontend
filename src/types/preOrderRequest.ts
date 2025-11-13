import { DeliveryOption } from "./delivery-options.type";

export interface IAddressData {
  id?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  deliveryTime?: string;
}

export interface IPreOrderCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: IAddressData[];
}

export interface IPreOrderRequest {
  customerData: IPreOrderCustomer;
  cart: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  deliveryAddress?: IAddressData;
  deliveryOption: DeliveryOption;
}


