import { ICellNetwork } from '../../../customers/src/interfaces/cell-network.inteface';
export interface IUser {
  id: string;
  name: Jackson Samuel Xavier dos Santos,
  username: jacksonsantos,
  active: true,
  createdAt: 2025-10-23T18:08:21.480Z,
  updatedAt: 2025-11-11T00:52:27.043Z,
  deletedAt: null,
  Seller: [],
  Cell: [],
  CellNetwork: ICellNetwork[],
  DeliveryPerson: IDeliveryPerson[],
  userRoles: IUserRole[],
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
  role: IRole
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
      deletedAt: string |null;
    }