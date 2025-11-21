export interface ISellerWithCell {
  id: string;
  cellId: string;
  name: string;
  phone: string;
  tag: string;
  userId: string;
  active: boolean,
  createdAt: string;
  updatedAt: string;
  deletedAt: null,
  cell: {
    id: string;
    name: string;
    networkId: string;
    leaderName: string;
    phone: string;
    userId: string;
    active: boolean,
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }
}