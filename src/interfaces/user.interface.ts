import { ICell } from "./cell.interface";
import { ISeller } from "./seller.interface";
export interface IUser {
  id: string;
  name: string;
  username: string;
  Seller: ISeller[];
  Cell: ICell[];
  CellNetwork: ICellNetwork[];
  DeliveryPerson: IDeliveryPerson[];
  userRoles: IUserRole[];
  roles: string[];
  permissions: [];
}

interface IUserRole {
  id: string;
  userId: string;
  roleId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  role: IRole;
}

interface IRole {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface IDeliveryPerson {
  id: string;
  name: string;
  phone: string;
  userId: string;
  online: boolean;
  inRoute: boolean;
  pushSubscription: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ICellNetwork {
  id: string;
  name: string;
  supervisorName: string;
  phone: string;
  userId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
