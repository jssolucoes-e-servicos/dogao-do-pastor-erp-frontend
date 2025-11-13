import { IOrderOnline } from './order-online';
export interface IOrderOnlineItem {
  id: string;
  orderOnlineId: string;
  OrderOnline?: IOrderOnline | null | undefined;
  removedIngredients: string[];
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}