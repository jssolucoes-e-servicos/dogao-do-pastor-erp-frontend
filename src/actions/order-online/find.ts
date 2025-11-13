"use server";

import { IOrderOnline } from "@/interfaces";
import { redirect } from "next/navigation";

export const findOrderOnline = async (id: string): Promise<IOrderOnline | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order-online/${id}`, {
      cache: "no-store", // sempre buscar fresh
    });

    let data: IOrderOnline | null = await res.json();
    if (data === undefined) 
      data = null;
    return data
  } catch (error) {
    console.error(error);
    redirect('off-line');
  }
};
