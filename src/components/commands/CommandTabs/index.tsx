// src/components/commands/CommandTabs/index.tsx

'use client';

interface CommandTabsProps {
  selected: string;
  onSelect: (tab: string) => void;
}

const tabs = [
  { label: 'Entregas', value: 'delivery' },
  { label: 'Retiradas', value: 'pickup' },
  { label: 'Retirada Programada', value: 'scheduled' }
];

export default function CommandTabs({ selected, onSelect }: CommandTabsProps) {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          type="button"
          className={[
            'px-5 py-2 rounded-t-md border-b-2 text-base font-semibold outline-none',
            selected === tab.value
              ? 'border-primary text-primary bg-background'
              : 'border-transparent text-muted-foreground hover:text-primary'
          ].join(' ')}
          onClick={() => onSelect(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
