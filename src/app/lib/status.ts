import { services } from './portfolio-data';

const CACHE_MS = 60_000; // 방문자가 많아도 서비스마다 1분에 한 번만 확인
const HISTORY = 30; // 서비스별 최근 기록 수(재시작하면 비어서 다시 쌓임)

type Check = { at: number; ms: number | null }; // ms null = 응답 없음·오류

// ponytail: 기록은 서버 메모리에만. 재시작 후에도 남겨야 하면 파일·DB로 옮길 것
const history = new Map<string, Check[]>();
let lastRun = 0;
let running: Promise<void> | null = null;

async function probe(url: string): Promise<number | null> {
  const t = Date.now();
  try {
    // 로그인 페이지로 넘기는 서비스(307)도 서버가 응답했으면 정상
    const res = await fetch(url, { redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(5000) });
    return res.status < 500 ? Date.now() - t : null;
  } catch {
    return null;
  }
}

async function runChecks() {
  const now = Date.now();
  const results = await Promise.all(services.map((s) => probe(s.url)));
  services.forEach((s, i) => {
    const list = [...(history.get(s.host) ?? []), { at: now, ms: results[i] }];
    history.set(s.host, list.slice(-HISTORY));
  });
  lastRun = now;
}

/** 서비스 상태(1분 캐시). /api/status 와 /api/badge 가 같이 씀 */
export async function getStatus() {
  if (Date.now() - lastRun > CACHE_MS) {
    running ??= runChecks().finally(() => (running = null));
    await running;
  }
  return {
    checkedAt: lastRun,
    services: services.map((s) => {
      const list = history.get(s.host) ?? [];
      const last = list[list.length - 1];
      return {
        name: s.name,
        host: s.host,
        url: s.url,
        up: last?.ms != null,
        ms: last?.ms ?? null,
        history: list.map((c) => c.ms),
      };
    }),
  };
}
