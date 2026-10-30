export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-[11px] text-dim sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} Hwang Min</span>
        <span>Next.js · 홈서버 monsil에서 직접 운영</span>
      </div>
    </footer>
  );
}
