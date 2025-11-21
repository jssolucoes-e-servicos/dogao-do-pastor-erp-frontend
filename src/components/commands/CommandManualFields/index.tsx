'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISellerWithCell } from "@/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import { AddressSelect } from "../AddressSelect";
import DogaoItemsForm from "../DogaoItemsForm";

export default function CommandManualFields({
  seller,
  onResetSeller,
}: {
  seller: ISellerWithCell;
  onResetSeller: () => void;
}) {
  const [form, setForm] = useState({
    customerName: "",
    cpf: "",
    phone: "",
    deliveryOption: "delivery",
    scheduledTime: "",
    address: { id: "", street: "", number: "", neighborhood: "", city: "", state: "", zipCode: "", complement: "" },
    addresses: [],
    observation: "",
    items: [] as { removedIngredients: string[] }[],
  });
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [searching, setSearching] = useState(false);

  async function handleBlurCliente() {
    if (!form.phone && !form.cpf) return;
    setSearching(true);
    const params = new URLSearchParams();
    if (form.phone) params.set("phone", form.phone);
    if (form.cpf) params.set("cpf", form.cpf);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/search?${params}`);
    if (res.ok) {
      const cliente = await res.json();
      if (cliente) setForm(f => ({
        ...f,
        customerName: cliente.name,
        phone: cliente.phone,
        cpf: cliente.cpf,
        addresses: cliente.addresses || [],
        address: cliente.addresses?.[0] || { id: "", street: "", number: "", neighborhood: "", city: "", state: "", zipCode: "", complement: "" }
      }));
    }
    setSearching(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (['street', 'number', 'neighborhood', 'city', 'state', 'zipCode', 'complement', 'id'].includes(name)) {
      setForm(f => ({ ...f, address: { ...f.address, [name]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleSelectAddress(id: string) {
    const addr = form.addresses.find(a => a.id === id);
    if (addr) setForm(f => ({ ...f, address: addr }));
    setIsCreatingAddress(false);
  }

  function handleCreateAddress() {
    setIsCreatingAddress(true);
    setForm(f => ({
      ...f,
      address: { id: "", street: "", number: "", neighborhood: "", city: "", state: "", zipCode: "", complement: "" }
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName || !form.phone || !seller || form.items.length === 0) {
      toast.error("Preencha todos os campos obrigatórios!");
      console.log(form);
      console.log(seller);
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        sellerId: seller.id,
        sellerTag: seller.tag,
      }),
    });
    if (res.ok) {
      toast.success("Comanda registrada com sucesso!");
      setForm({
        customerName: "", cpf: "", phone: "", deliveryOption: "delivery",
        scheduledTime: "", address: { id: "", street: "", number: "", neighborhood: "", city: "", state: "", zipCode: "", complement: "" },
        addresses: [], observation: "", items: [],
      });
      setIsCreatingAddress(false);
    } else {
      toast.error("Não foi possível cadastrar a comanda!");
    }
  }

  const showAddress = ["delivery", "donate"].includes(form.deliveryOption);
  const showHorario = ["delivery", "scheduled", "donate"].includes(form.deliveryOption);

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-primary">Vendedor: {seller.name} ( {seller.tag} )</span>
        <Button variant="ghost" onClick={onResetSeller} type="button">
          Trocar vendedor
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 items-center">
          <div className="w-2/3">
            <label className="block mb-1 font-medium">Nome do cliente</label>
            <Input
              required
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              disabled={searching}
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">CPF (opcional)</label>
            <Input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              onBlur={handleBlurCliente}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-2/3">
            <label className="block mb-1 font-medium">Telefone</label>
            <Input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlurCliente}
              type="tel"
              disabled={searching}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Modalidade</label>
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            name="deliveryOption"
            value={form.deliveryOption}
            onChange={handleChange}
            required
          >
            <option value="delivery">Entrega</option>
            <option value="pickup">Retirada</option>
            <option value="scheduled">Retirada Programada</option>
            <option value="donate">Doação</option>
          </select>
        </div>
        {showHorario && (
          <div>
            <label className="block mb-1 font-medium">Horário da retirada/entrega</label>
            <Input
              name="scheduledTime"
              value={form.scheduledTime}
              onChange={handleChange}
              type="time"
              required
            />
          </div>
        )}
        {showAddress && (
          <AddressSelect
            addresses={form.addresses}
            address={form.address}
            onSelect={handleSelectAddress}
            onCreate={handleCreateAddress}
            isCreating={isCreatingAddress}
            onChange={handleChange}
          />
        )}
        <div>
          <label className="block mb-1 font-medium">Observações</label>
          <Input
            name="observation"
            value={form.observation}
            onChange={handleChange}
            placeholder="Observação para produção ou entrega"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Dogões</label>
          <DogaoItemsForm
            items={form.items}
            onChange={items => setForm(f => ({ ...f, items }))}
          />
        </div>
        <Button
          type="submit"
          className="w-full font-bold mt-4"
        >
          Salvar Comanda
        </Button>
      </form>
    </div>
  );
}
