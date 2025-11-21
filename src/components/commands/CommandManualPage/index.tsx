'use client';
import CommandManualFields from '@/components/commands/CommandManualFields';
import { CommandSellerSelect } from '@/components/commands/CommandSellerSelect';
import { ISellerWithCell } from '@/interfaces';
import { useState } from 'react';

export function CommandManualPage({ sellers }: { sellers: ISellerWithCell[] }) {
  const [selectedSeller, setSelectedSeller] = useState<ISellerWithCell | null>(null);
  return selectedSeller
    ? <CommandManualFields seller={selectedSeller} onResetSeller={() => setSelectedSeller(null)} />
    : <CommandSellerSelect sellers={sellers} onSelect={setSelectedSeller} />;
}