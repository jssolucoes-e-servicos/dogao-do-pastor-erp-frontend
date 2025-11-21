// src/components/commands/CommandManualForm/index.tsx
'use client';

import HotDogModal from "@/components/modals/hotdog-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ISellerWithCell } from "@/interfaces";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// Novo componente interno para os itens personalizados
function DogaoItemsForm({ items, onChange }: { items: { removedIngredients: string[] }[], onChange: (i: { removedIngredients: string[] }[]) => void }) {
  const [modalOpen, setModalOpen] = useState(false);

  function groupItems(items: { removedIngredients: string[] }[]) {
    const groups: Record<string, { key: string, removedIngredients: string[], quantity: number }> = {};
    items.forEach(item => {
      const key = item.removedIngredients.slice().sort().join('|') || 'completo';
      if (groups[key]) groups[key].quantity += 1;
      else groups[key] = { key, removedIngredients: item.removedIngredients, quantity: 1 };
    });
    return Object.values(groups);
  }
  const grouped = useMemo(() => groupItems(items), [items]);

  function handleAddDogao(removedIngredients: string[]) {
    onChange([...items, { removedIngredients }]);
    setModalOpen(false);
  }
  function handleIncrement(group) {
    onChange([...items, { removedIngredients: group.removedIngredients }]);
  }
  function handleDecrement(group) {
    const idx = items.map(i => i.removedIngredients.join('|')).lastIndexOf(group.key);
    if (idx > -1) {
      const copy = [...items];
      copy.splice(idx, 1);
      onChange(copy);
    }
  }
  function handleRemoveGroup(group) {
    onChange(items.filter(i => i.removedIngredients.join('|') !== group.key));
  }

  return (
    <div className="mb-3">
      {/* Lista dos dogões agrupados */}
      <div className="flex flex-col gap-3">
        {grouped.length === 0 && (
          <div className="text-muted-foreground text-center">Nenhum dogão adicionado.</div>
        )}
        {grouped.map(group => (
          <div key={group.key} className="flex items-center gap-4 bg-muted rounded px-3 py-2">
            <span className="font-bold">
              {group.quantity}x{" "}
              {group.removedIngredients.length
                ? `Dogão Personalizado (sem: ${group.removedIngredients.join(', ')})`
                : "Dogão Completo"}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="ghost" size="icon" onClick={() => handleDecrement(group)} disabled={group.quantity <= 1}>
                <Minus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleIncrement(group)}>
                <Plus className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveGroup(group)}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Botão para abrir modal de customização */}
      <Button type="button" className="w-full mt-4" onClick={() => setModalOpen(true)}>
        Adicionar Dogão
      </Button>
      <HotDogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddDogao}
      />
    </div>
  );
}

// Combobox de vendedor filtrável (pequeno, só para esta tela)
function VendedorCombobox({ value, options, onChange }: {
  value: string, options: { label: string, value: string }[], onChange: (v: string) => void
}) {
  const [input, setInput] = useState('');
  const filtered = input
    ? options.filter(opt => opt.label.toLowerCase().includes(input.toLowerCase()))
    : options;
  return (
    <div className="relative">
      <Input
        value={input || value}
        onChange={e => setInput(e.target.value)}
        onBlur={() => setInput('')}
        placeholder="Pesquisar vendedor..."
        className="mb-1"
      />
      <div className="absolute bg-white z-20 shadow-lg rounded w-full max-h-48 overflow-y-auto">
        {filtered.map(opt => (
          <div
            key={opt.value}
            onMouseDown={() => { onChange(opt.value); setInput(opt.label); }}
            className={`px-3 py-1 cursor-pointer hover:bg-primary/10 ${value === opt.value ? 'font-bold' : ''}`}>
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommandManualForm({ sellers }: { sellers: ISellerWithCell[] }) {
  const [form, setForm] = useState({
    customerName: "",
    cpf: "",
    phone: "",
    vendedorTag: "",
    deliveryOption: "delivery",
    scheduledTime: "",
    address: { street: "", number: "", neighborhood: "", city: "" },
    observation: "",
    items: [] as { removedIngredients: string[] }[],
  });
  const [searching, setSearching] = useState(false);

  async function handleBlurCliente() {
    if (!form.phone && !form.cpf) return;
    setSearching(true);
    const params = new URLSearchParams();
    if (form.phone) params.set("phone", form.phone);
    if (form.cpf) params.set("cpf", form.cpf);
    const res = await fetch(`/api/clientes/search?${params}`);
    if (res.ok) {
      const cliente = await res.json();
      if (cliente) setForm(f => ({
        ...f,
        customerName: cliente.name,
        phone: cliente.phone,
        cpf: cliente.cpf,
        address: cliente.address || f.address
      }));
    }
    setSearching(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (['street', 'number', 'neighborhood', 'city'].includes(name)) {
      setForm(f => ({
        ...f,
        address: { ...f.address, [name]: value }
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.vendedorTag || form.items.length === 0) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      toast.success("Comanda registrada com sucesso!");
      setForm({
        customerName: "", cpf: "", phone: "", vendedorTag: "", deliveryOption: "delivery",
        scheduledTime: "", address: { street: "", number: "", neighborhood: "", city: "" },
        observation: "", items: [],
      });
    } else {
      toast.error("Não foi possível cadastrar a comanda!");
    }
  }

  const showAddress = form.deliveryOption === "delivery";
  const showHorario = ["delivery", "scheduled"].includes(form.deliveryOption);

  const vendedorOptions = useMemo(() =>
    sellers.map(v => ({ label: `${v.name} - ${v.tag}`, value: v.tag })), [sellers]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardContent className="py-6 px-7">
          <h1 className="text-2xl font-bold mb-5">Nova Comanda (Manual)</h1>
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
              <div className="w-1/3">
                <label className="block mb-1 font-medium">Vendedor</label>
                <VendedorCombobox
                  value={form.vendedorTag}
                  options={vendedorOptions}
                  onChange={vendedorTag => setForm(f => ({ ...f, vendedorTag }))}
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
              <div className="grid grid-cols-2 items-end gap-2">
                <div>
                  <label className="block mb-1 font-medium">Rua</label>
                  <Input name="street" value={form.address.street}
                    onChange={handleChange} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Número</label>
                  <Input name="number" value={form.address.number}
                    onChange={handleChange} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Bairro</label>
                  <Input name="neighborhood" value={form.address.neighborhood}
                    onChange={handleChange} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Cidade</label>
                  <Input name="city" value={form.address.city}
                    onChange={handleChange} />
                </div>
              </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
