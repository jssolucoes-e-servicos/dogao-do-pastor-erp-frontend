// src/components/commands/DogaoItemsForm/index.tsx

'use client';

import HotDogModal from '@/components/modals/hotdog-modal';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Item {
  removedIngredients: string[];
}

interface GroupedItem {
  key: string;
  removedIngredients: string[];
  quantity: number;
}

interface DogaoItemsFormProps {
  items: Item[];
  onChange: (newItems: Item[]) => void;
}

function groupItems(items: Item[]): GroupedItem[] {
  const groups: Record<string, GroupedItem> = {};
  items.forEach(item => {
    const key = item.removedIngredients.slice().sort().join('|') || 'completo';
    if (groups[key]) {
      groups[key].quantity += 1;
    } else {
      groups[key] = {
        key,
        removedIngredients: item.removedIngredients,
        quantity: 1,
      };
    }
  });
  return Object.values(groups);
}

export default function DogaoItemsForm({ items, onChange }: DogaoItemsFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState<string[]>();

  const grouped = useMemo(() => groupItems(items), [items]);

  // Adicionar dogão novo com ingredientes removidos
  function handleAddDogao(removedIngredients: string[]) {
    onChange([...items, { removedIngredients }]);
    setModalOpen(false);
    setLastRemoved(undefined);
  }

  // Incrementa um dogão igual ao grupo (idêntico)
  function handleIncrement(group: GroupedItem) {
    onChange([...items, { removedIngredients: group.removedIngredients }]);
  }

  // Decrementa um dogão do grupo
  function handleDecrement(group: GroupedItem) {
    // Remove apenas o último da combinação!
    const idx = items.map(i => (i.removedIngredients.join('|'))).lastIndexOf(group.key);
    if (idx > -1) {
      const copy = [...items];
      copy.splice(idx, 1);
      onChange(copy);
    }
  }

  // Remove todos do grupo
  function handleRemoveGroup(group: GroupedItem) {
    onChange(items.filter(i => i.removedIngredients.join('|') !== group.key));
  }

  return (
    <div className="mb-3">
      {/* Lista dos grupos */}
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
      {/* Botão para abrir modal */}
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
