export default function Footer() {
  return (
    <footer className="dark bg-[#2e1065] pb-28 text-sub">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-2 border-t border-line px-5 pt-6 text-xs sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} 황민 · Hwang Min</span>
        <span>Next.js · 집 서버 monsil에서 직접 운영</span>
      </div>
    </footer>
  );
}
