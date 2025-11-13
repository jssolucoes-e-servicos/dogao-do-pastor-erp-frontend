import { ICellNetwork } from "./cell-network.inteface";
import { ISeller } from "./seller.interface";

export interface ICell {
  id: string;
  name: string;
  leaderName: string;
  networkId: string;
  network: ICellNetwork;
  networkName: string;
  sellers?: ISeller[]  | null | undefined;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
