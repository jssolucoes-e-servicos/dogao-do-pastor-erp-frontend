import CommandCard from '../CommandCard';

interface CommandGroupProps {
  time: string;
  commands: any[];
}

export default function CommandGroup({ time, commands }: CommandGroupProps) {
  return (
    <section className="command-group">
      <h2 className="group-header text-lg font-bold text-primary mb-3">
        Produzir às {time}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {commands.map(command => (
          <CommandCard key={command.id} command={command} />
        ))}
      </div>
    </section>
  );
}
