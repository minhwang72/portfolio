'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Sparkles, X } from 'lucide-react';
import { useAsk } from '../lib/useAsk';

const examples = ['대표 프로젝트는?', '이 질문창은 어떻게 동작하나요?', '쓰는 기술은?', '연락처 알려 주세요'];
const spring = { type: 'spring' as const, stiffness: 380, damping: 34 };

/**
 * 따라오는 질문창. 히어로의 질문창(#hero-ask)이 화면에서 사라지면 아래쪽 알약으로 나타나고,
 * 누르거나 질문하면 같은 요소가 답변 창으로 펼쳐진다(layoutId 공유). ⌘K / Ctrl+K 로도 열림.
 */
export default function AskDock() {
  const { messages, loading, send } = useAsk();
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [q, setQ] = useState('');
  const [pending, setPending] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // 히어로 질문창이 보이는 동안은 알약을 숨김
  // (스크롤 때마다 위치로 판단 — 히어로가 늦게 그려져도 맞게 동작)
  useEffect(() => {
    const check = () => {
      const el = document.getElementById('hero-ask');
      setDocked(!el || el.getBoundingClientRect().bottom < 56);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // openAsk() 이벤트, ⌘K, ESC
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const text = (e as CustomEvent<string | undefined>).detail;
      if (text) setPending(text);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('open-ask', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-ask', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // 대기 중인 질문은 다음 렌더에서 보냄(최신 대화 상태로 보내려고)
  useEffect(() => {
    if (pending && !loading) {
      send(pending);
      setPending(null);
    }
  }, [pending, loading, send]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const submit = () => {
    if (!q.trim()) return;
    send(q);
    setQ('');
  };

  return (
    <>
      {/* 알약 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <AnimatePresence>
          {docked && !open && (
            <motion.button
              layoutId="ask"
              transition={spring}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={() => setOpen(true)}
              style={{ borderRadius: 999 }}
              className="pointer-events-auto flex w-full max-w-[420px] items-center gap-3 border border-line/70 bg-bg/75 px-4 py-3 text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
              aria-label="황민에게 질문하기"
            >
              <Sparkles className="h-4 w-4 flex-none text-accent" />
              <span className="flex-1 truncate text-[15px] text-sub">황민에게 무엇이든 물어보세요</span>
              <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-sub sm:inline">⌘K</kbd>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 답변 창 */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              layoutId="ask"
              transition={spring}
              style={{ borderRadius: 28 }}
              className="relative flex max-h-[78vh] w-full max-w-[640px] flex-col overflow-hidden border border-line/70 bg-bg/90 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <Sparkles className="h-4 w-4 text-accent" /> 황민에게 묻기
                </span>
                <button onClick={() => setOpen(false)} className="rounded-full p-1.5 text-sub hover:bg-surface" aria-label="닫기">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-[120px] flex-1 overflow-y-auto px-5 py-4">
                {messages.length === 0 ? (
                  <div>
                    <p className="text-[15px] leading-relaxed text-sub">포트폴리오 문서를 찾아보고 Claude가 답해요. 어디서 찾았는지도 함께 보여 드려요.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {examples.map((e) => (
                        <button key={e} onClick={() => send(e)} className="rounded-full bg-surface px-3.5 py-2 text-sm text-fg hover:bg-line/60">
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {messages.map((m, i) =>
                      m.role === 'user' ? (
                        <p key={i} className="text-lg font-semibold tracking-tight text-fg">
                          {m.content}
                        </p>
                      ) : (
                        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                          {m.content ? (
                            <p className="whitespace-pre-wrap text-[15px] leading-[1.75] text-fg/90">
                              {m.content}
                              {loading && i === messages.length - 1 && <span className="typing-cursor" />}
                            </p>
                          ) : (
                            <span className="inline-flex gap-1.5 py-1">
                              <span className="typing-dot" />
                              <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                              <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
                            </span>
                          )}
                          {m.sources && m.sources.length > 0 && (
                            <div className="mt-3 flex flex-wrap items-center gap-1.5">
                              <span className="text-xs text-sub">출처</span>
                              {m.sources.map((s) => (
                                <a
                                  key={s.title}
                                  href={s.href}
                                  target={s.href.startsWith('#') ? undefined : '_blank'}
                                  rel="noopener noreferrer"
                                  onClick={() => s.href.startsWith('#') && setOpen(false)}
                                  className="rounded-full border border-line px-2.5 py-1 text-xs text-sub hover:border-accent hover:text-accent"
                                >
                                  {s.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )
                    )}
                    <div ref={endRef} />
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="m-3 mt-0 flex items-center gap-2 rounded-full bg-surface py-1.5 pl-5 pr-1.5"
              >
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="질문을 입력하세요"
                  aria-label="질문"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-fg placeholder:text-sub focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!q.trim() || loading}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-fg text-bg transition-opacity disabled:opacity-25"
                  aria-label="보내기"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
