export default function SectionHead({ no, label, title, desc }: { no: string; label: string; title: string; desc?: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-accent">
        {no} <span className="text-dim">/ {label}</span>
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 max-w-2xl text-mute">{desc}</p>}
    </div>
  );
}
