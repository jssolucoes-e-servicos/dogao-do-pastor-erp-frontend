export interface ICustomer {
  name?: string;
  phone?: string;
  addresses?: IAddress[];
}

export interface IAddress {
  id?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  complement?: string;
}

export interface IPreOrderItem {
  removedIngredients: string[];
}

export interface IOrder {
  id: string;
  customer: ICustomer;
  quantity: number;
  deliveryOption: string;
  deliveryTime: string;
  preOrderItems: IPreOrderItem[];
}

export interface ICommand {
  id: string;
  sequentialId: string;
  order: IOrder;
  // Adicione outros campos do Command conforme necessidade
}
