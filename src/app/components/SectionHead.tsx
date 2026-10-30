/** 섹션 머리: 왼쪽 제목, 오른쪽 한 줄 설명, 아래 얇은 선 */
export default function SectionHead({ title, note }: { title: string; note?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-1.5 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className="text-[26px] font-bold tracking-[-0.04em] text-fg sm:text-[32px]">{title}</h2>
      {note && <p className="flex items-center gap-1.5 text-[13px] text-sub">{note}</p>}
    </div>
  );
}
