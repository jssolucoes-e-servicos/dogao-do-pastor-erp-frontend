export interface ICustomerRetrieve {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  cpf: string;
  knowsChurch?: boolean;
  allowsChurch?: boolean;
  firstRegister: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}