/** 운영 중 표시(초록 점). up=false 면 빨강 */
export default function Live({ up = true, pulse = false }: { up?: boolean; pulse?: boolean }) {
  return <span className={`inline-block h-2 w-2 flex-none rounded-full ${up ? 'bg-live' : 'bg-down'} ${pulse && up ? 'live-dot' : ''}`} />;
}
