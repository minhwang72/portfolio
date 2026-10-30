import Live from './Live';

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1104px] flex-col gap-2 px-5 pb-28 pt-7 text-xs text-sub sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} 황민</span>
      <span className="inline-flex items-center gap-1.5 font-mono tracking-normal">
        <Live /> served from monsil
      </span>
    </footer>
  );
}
