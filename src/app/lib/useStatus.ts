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

export interface StatusData {
  checkedAt: number;
  services: ServiceStatus[];
}

/** /api/status(서버가 1분마다 직접 확인한 값)를 1분마다 다시 읽음 */
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
