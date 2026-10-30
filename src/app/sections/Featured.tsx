import { ArrowUpRight } from 'lucide-react';
import SectionHead from '../components/SectionHead';

// 대표 사례: 뮤직시트(MuT). 수치·설명은 portfolio-data.ts 의 projects[0] 와 같은 출처(mut README 실측)
const pipeline = [
  { step: '입력', what: '악보 사진', who: '사용자' },
  { step: '검출', what: '오선 · 음표 머리 · 조표', who: 'YOLO · OpenCV' },
  { step: '판독', what: '음가 · 마디 · 코드', who: 'Claude 또는 로컬 모델' },
  { step: '검산', what: '박자 안 맞는 마디는 내보내지 않음', who: '자체 규칙' },
  { step: '이조', what: '온음계 단수 + 반음', who: '코어 엔진' },
  { step: '출력', what: 'MusicXML → 재조판', who: 'Verovio' },
];

const results = [
  { value: '727/727', label: '음높이 일치' },
  { value: '141/141', label: '코드 판독 일치' },
  { value: '0회', label: '로컬 모드 유료 API 호출' },
];

export default function Featured() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHead no="01" label="featured case" title="뮤직시트 (MuT)" desc="악보 사진을 넣으면 원하는 키로 바꾼 새 악보를 만들어 주는 서비스. 같은 문제를 두 번 풀었습니다." />

      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {[
          {
            k: '문제',
            v: '1세대 CONTI는 Gemini에 악보 이미지를 통째로 맡겼습니다. 코드·가사는 잘 읽었지만 음표 위치와 박자를 추측해 자주 틀렸고, 틀린 악보도 그럴듯하게 나왔습니다.',
          },
          {
            k: '접근',
            v: 'LLM이 잘하는 일과 못하는 일을 나눴습니다. 음높이는 좌표 계산으로, 음가·코드는 AI 판독으로, 결과는 박자 검산을 통과한 마디만 MusicXML로 다시 조판합니다.',
          },
          {
            k: '결과',
            v: '악보 4종 내부 측정에서 음높이·코드 모두 전부 일치. 확정할 수 없는 마디는 사용자 확인으로 넘겨 "틀린 악보를 그럴듯하게" 내지 않습니다.',
          },
        ].map((c) => (
          <div key={c.k} className="bg-panel p-6">
            <p className="font-mono text-xs text-accent">{c.k}</p>
            <p className="mt-3 text-sm leading-relaxed text-mute">{c.v}</p>
          </div>
        ))}
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {pipeline.map((p, i) => (
          <li key={p.step} className="relative rounded-lg border border-line bg-panel/60 p-3">
            <p className="font-mono text-[11px] text-dim">
              {String(i + 1).padStart(2, '0')} · {p.step}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-fg">{p.what}</p>
            <p className="mt-1 font-mono text-[11px] text-accent/80">{p.who}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-6 rounded-xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {results.map((r) => (
            <div key={r.label}>
              <dd className="font-mono text-2xl font-semibold text-live">{r.value}</dd>
              <dt className="text-xs text-mute">{r.label}</dt>
            </div>
          ))}
        </dl>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <a
            href="https://conti.eungming.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-1.5 text-sm text-fg hover:border-accent/60 transition-colors"
          >
            conti.eungming.com <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <p className="text-[11px] text-dim">초대 계정 전용 · 수치는 독립 검수 전 내부 표본 기준</p>
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-dim">Python · YOLO · OpenCV · Claude API · MusicXML · Verovio(WASM)</p>
    </div>
  );
}
