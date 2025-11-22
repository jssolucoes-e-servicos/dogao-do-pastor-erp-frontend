
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ISellerWithCell } from '@/interfaces';
import { useState } from 'react';

export function CommandSellerSelect({ sellers, onSelect }: { sellers: ISellerWithCell[], onSelect: (sellerSelected: ISellerWithCell) => void }) {
  const [input, setInput] = useState('');
  const [focus, setFocus] = useState(false);

  const filtered = input
    ? sellers.filter(s => `${s.name} ${s.tag}`.toLowerCase().includes(input.toLowerCase()))
    : sellers;

  return (
    <div className="max-w-md mx-auto pt-4">
      <h2 className="text-xl font-bold mb-4">Selecionar vendedor</h2>
      <label className="block mb-1 font-medium">Vendedor</label>
      <div className="relative">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 120)}
          placeholder="Digite nome ou tag do vendedor"
        />
        {focus && (
          <div className="absolute bg-white border border-border rounded z-10 w-full shadow-lg max-h-60 overflow-y-auto">
            {filtered.length === 0 && <div className="px-4 py-2 text-muted-foreground">Nenhum vendedor encontrado</div>}
            {filtered.map(s => (
              <div
                key={s.tag}
                onMouseDown={() => { onSelect(s); setInput(''); }}
                className="px-4 py-2 cursor-pointer text-black hover:bg-accent hover:text-white transition-colors"
              >
                {s.name} <span className="text-sm text-muted-foreground">({s.tag})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button className="mt-6 w-full font-semibold" type="button" disabled={!input || !filtered.some(s => s.tag === input)} onClick={() => {
        const v = sellers.find(s => `${s.name} - ${s.tag}` === input || s.tag === input);
        if (v) onSelect(v);
      }}>Continuar</Button>
    </div>
  );
}
