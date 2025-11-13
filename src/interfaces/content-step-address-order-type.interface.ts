//interfaces/content-step-address-order-type.interface.ts
import { DeliveryOption } from "@/types/delivery-options.type";
import { Dispatch, SetStateAction } from "react";
export interface ICotentStepAddressOrderType {
  deliveryOption: DeliveryOption;
  setDeliveryOption: Dispatch<SetStateAction<DeliveryOption>>;
}