/** 서비스 상태 텍스트(초록 점 대신): OK · 61ms / DOWN */
export default function Status({ up = true, ms, className = '' }: { up?: boolean; ms?: number | null; className?: string }) {
  return (
    <span className={`font-mono text-xs tracking-normal ${up ? 'text-sub' : 'text-down'} ${className}`}>
      {up ? `OK${ms != null ? ` · ${ms}ms` : ''}` : 'DOWN'}
    </span>
  );
}
