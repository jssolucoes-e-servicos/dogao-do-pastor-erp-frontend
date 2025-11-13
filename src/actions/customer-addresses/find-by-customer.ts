"use server";

import { ICustomerAddressFull } from "@/interfaces";
import { redirect } from "next/navigation";

export const findCustomerAddressByCustomer = async (customerId: string): Promise<ICustomerAddressFull[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer-address/find-by-customer/${customerId}`, {
      cache: "no-store", // sempre buscar fresh
    });
    const data: ICustomerAddressFull[] = await res.json();
    //console.info('findCustomerAddressByCustomer:', data);
    return data
  } catch (error) {
    console.error(error);
    redirect('/off-line');
  }
};