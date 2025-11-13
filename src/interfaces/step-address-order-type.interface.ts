//interfaces/step-address-order-type.interface.ts
import { DeliveryOption } from "@/types/delivery-options.type";
import { ICotentStepAddressOrderType } from "./content-step-address-order-type.interface";
export interface IStepAddressOrderType extends ICotentStepAddressOrderType {
  type: DeliveryOption;
}