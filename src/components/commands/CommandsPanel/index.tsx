'use client';

import { useState } from 'react';
import CommandList from '../CommandList';
import CommandTabs from '../CommandTabs';

export default function CommandsPanel() {
  const [tab, setTab] = useState<'delivery' | 'pickup' | 'scheduled'>('delivery');

  return (
    <section className="w-full flex flex-col gap-2">
      <CommandTabs selected={tab} onSelect={setTab} />
      <CommandList filter={tab} />
    </section>
  );
}
