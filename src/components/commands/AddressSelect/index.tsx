
'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAddress } from '@/interfaces/command';

export function AddressSelect({
  addresses,
  address,
  onSelect,
  onCreate,
  isCreating,
  onChange
}: {
  addresses: IAddress[];
  address: IAddress;
  onSelect: (id: string) => void;
  onCreate: () => void;
  isCreating: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      {addresses.length > 0 && !isCreating && (
        <>
          <Label>Endereço cadastrado</Label>
          <select
            value={address.id || ""}
            onChange={e => {
              if (e.target.value === "new") onCreate();
              else onSelect(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Selecione um endereço</option>
            {addresses.map(a => (
              <option key={a.id} value={a.id}>
                {a.street}, {a.number} - {a.neighborhood}
              </option>
            ))}
            <option value="new">Cadastrar novo endereço</option>
          </select>
        </>
      )}
      {(addresses.length === 0 || isCreating) && (
        <div className="space-y-2">
          <Label>Novo endereço</Label>
          <Input name="street" placeholder="Rua" value={address.street || ""} onChange={onChange} />
          <Input name="number" placeholder="Número" value={address.number || ""} onChange={onChange} />
          <Input name="neighborhood" placeholder="Bairro" value={address.neighborhood || ""} onChange={onChange} />
          <Input name="city" placeholder="Cidade" value={address.city || ""} onChange={onChange} />
          <Input name="state" placeholder="Estado" value={address.state || ""} onChange={onChange} />
          <Input name="zipCode" placeholder="CEP" value={address.zipCode || ""} onChange={onChange} />
          <Input name="complement" placeholder="Complemento" value={address.complement || ""} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
