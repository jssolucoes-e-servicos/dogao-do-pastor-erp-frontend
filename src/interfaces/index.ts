//interfaces/index.ts

import { ICellNetwork } from './cell-network.inteface';
import { ICell } from './cell.interface';
import { ICotentStepAddressOrderType } from './content-step-address-order-type.interface';
import { ICustomerFullWithAddress } from './curtomer-full-with-address.interface';
import { ICustomerFull } from './curtomer-full.interface';
import { ICustomerAddressBasic } from './customer-address-basic.interface';
import { ICustomerAddressFull } from './customer-address-full.interface';
import { ICustomerBasic } from './customer-basic.interace';
import { ICustomerRetrieve } from './customer-retrive.interface';
import { IOrderOnlineStartResponse } from './find-order-online.interface';
import { IOrderItemSend } from './order-items-send.interface';
import { IOrderOnline } from './order-online';
import { IOrderOnlineItem } from './order-online-item.interface';
import { ISeller } from './seller.interface';
import { IStepAddressOrderType } from './step-address-order-type.interface';

export type {
  ICell, ICellNetwork, ICotentStepAddressOrderType, ICustomerAddressBasic, ICustomerAddressFull, ICustomerBasic, ICustomerFull, ICustomerFullWithAddress, ICustomerRetrieve, IOrderItemSend, IOrderOnline, IOrderOnlineItem, IOrderOnlineStartResponse, ISeller, IStepAddressOrderType
};

