import SectionHead from '../components/SectionHead';
import { stack } from '../lib/portfolio-data';

export default function Stack() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHead no="05" label="stack" title="쓰는 기술과 쓴 곳" />
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((s) => (
          <div key={s.area} className="flex flex-col bg-panel p-6">
            <p className="font-mono text-xs text-accent">{s.area}</p>
            <ul className="mt-4 flex-1 space-y-1.5">
              {s.items.map((i) => (
                <li key={i} className="text-sm text-fg">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-dim">→ {s.usedIn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
