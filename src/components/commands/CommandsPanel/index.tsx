'use client';

import { useState } from 'react';
import CommandList from '../CommandList';
import CommandTabs from '../CommandTabs';

type CommandTab = 'delivery' | 'pickup' | 'scheduled';

export default function CommandsPanel() {
  const [tab, setTab] = useState<CommandTab>('delivery');

  return (
    <section className="w-full flex flex-col gap-2">
      <CommandTabs selected={tab} onSelect={setTab} />
      <CommandList filter={tab} />
    </section>
  );
}
