'use client';

import { useEffect, useState } from 'react';

export interface ServiceStatus {
  name: string;
  host: string;
  url: string;
  up: boolean;
  ms: number | null;
  history: (number | null)[];
}

interface StatusData {
  checkedAt: number;
  services: ServiceStatus[];
}

/** /api/status 를 1분마다 다시 읽음. 다른 컴포넌트(KPI·프로젝트 목록)도 같은 값을 쓰도록 훅으로 둠 */
export function useStatus() {
  const [data, setData] = useState<StatusData | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch('/api/status')
        .then((r) => r.json())
        .then((d: StatusData) => alive && setData(d))
        .catch(() => {});
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);
  return data;
}

function Spark({ values }: { values: (number | null)[] }) {
  const slots = [...Array(Math.max(0, 20 - values.length)).fill(undefined), ...values.slice(-20)];
  const max = Math.max(200, ...values.filter((v): v is number => v != null));
  return (
    <div className="flex h-5 items-end gap-[2px]" aria-hidden>
      {slots.map((v, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm ${v === undefined ? 'bg-line' : v === null ? 'bg-down' : 'bg-live/70'}`}
          style={{ height: v == null ? '30%' : `${Math.max(15, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

const time = (t: number) =>
  new Date(t).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Seoul' });

export default function StatusBoard({ data }: { data: StatusData | null }) {
  const up = data?.services.filter((s) => s.up).length ?? 0;
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className={`h-2 w-2 rounded-full ${data ? 'bg-live live-dot' : 'bg-dim'}`} />
          <span className="text-fg">monsil</span>
          <span className="text-dim">/ production</span>
        </div>
        <span className="font-mono text-[11px] text-dim">{data ? `checked ${time(data.checkedAt)} KST` : 'checking…'}</span>
      </div>

      <ul className="divide-y divide-line/70">
        {(data?.services ?? []).map((s) => (
          <li key={s.host}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 hover:bg-panel2 transition-colors sm:grid-cols-[auto_1fr_auto_auto]">
              <span className={`h-1.5 w-1.5 rounded-full ${s.up ? 'bg-live' : 'bg-down'}`} />
              <span className="min-w-0">
                <span className="block truncate text-sm text-fg">{s.name}</span>
                <span className="block truncate font-mono text-[11px] text-dim">{s.host}</span>
              </span>
              <span className="hidden sm:block">
                <Spark values={s.history} />
              </span>
              <span className={`w-14 text-right font-mono text-xs ${s.up ? 'text-mute' : 'text-down'}`}>{s.up ? `${s.ms}ms` : 'down'}</span>
            </a>
          </li>
        ))}
        {!data && <li className="px-4 py-10 text-center font-mono text-xs text-dim">서비스 상태를 확인하는 중…</li>}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-dim">
        <span>
          {data ? (
            <>
              <span className="text-live">{up}</span>/{data.services.length} up
            </>
          ) : (
            '—'
          )}
        </span>
        <span>홈서버에서 1분마다 직접 확인한 실제 값</span>
      </div>
    </div>
  );
}
