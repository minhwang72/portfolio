'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';

interface Source {
  title: string;
  href: string;
}

interface Message {
  role: 'user' | 'model';
  content: string;
  sources?: Source[];
}

const allSuggestions = [
  '기술 스택은?',
  'AI 관련해서 뭘 해보셨나요?',
  '경력이 어떻게 되나요?',
  '프로젝트를 소개해주세요',
  '뮤직시트(MuT)는 어떻게 만들었나요?',
  '이 챗봇은 어떻게 동작하나요?',
  '현재 어떤 일을 하고 있나요?',
  '서버 운영 경험이 있나요?',
  '보유 자격증이 뭔가요?',
  '연락처를 알려주세요',
];

/** 어디서든 챗봇을 열고(질문이 있으면 바로 보냄) — Header·Hero 의 질문창에서 사용 */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent('open-chat', { detail: question }));
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [suggestions] = useState(() => {
    const shuffled = [...allSuggestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Lock body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Handle mobile keyboard via visualViewport API
  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const handleResize = () => {
      setViewportHeight(vv.height);
      // Scroll input into view when keyboard opens
      setTimeout(() => {
        textareaRef.current?.scrollIntoView({ block: 'nearest' });
      }, 50);
    };

    handleResize();
    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
      setViewportHeight(null);
    };
  }, [isOpen]);

  const [isWaiting, setIsWaiting] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setIsLoading(true);
    setIsWaiting(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 서버로는 역할·내용만 보냄(출처 목록 제외)
        body: JSON.stringify({ messages: newMessages.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok) {
        // 한도 초과(429)·형식 오류(400)는 서버가 보낸 안내문을 그대로 보여 줌
        const reason = res.status < 500 ? await res.text() : '';
        setIsWaiting(false);
        setMessages((prev) => [...prev, { role: 'model', content: reason || '죄송합니다, 오류가 발생했습니다. 다시 시도해주세요.' }]);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('스트림 읽기 실패');

      let sources: Source[] = [];
      try {
        sources = JSON.parse(decodeURIComponent(res.headers.get('X-Sources') ?? '')).slice(0, 4);
      } catch {
        // 출처가 없어도 답변은 보여 줌
      }

      const decoder = new TextDecoder();
      let accumulated = '';

      setIsWaiting(false);
      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', content: accumulated, sources };
          return updated;
        });
      }
    } catch {
      setIsWaiting(false);
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: '죄송합니다, 오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // openChat() 이벤트: 패널을 열고, 질문이 있으면 다음 렌더에서 보냄(최신 messages로 보내려고 상태로 넘김)
  const [pending, setPending] = useState<string | null>(null);
  useEffect(() => {
    const onOpen = (e: Event) => {
      setIsOpen(true);
      const q = (e as CustomEvent<string | undefined>).detail;
      if (q) setPending(q);
    };
    window.addEventListener('open-chat', onOpen);
    return () => window.removeEventListener('open-chat', onOpen);
  }, []);
  useEffect(() => {
    if (pending && !isLoading) {
      setPending(null);
      sendMessage(pending);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, isLoading]);

  const handleSubmit = () => {
    const value = textareaRef.current?.value.trim() || input.trim();
    sendMessage(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-ink shadow-lg shadow-black/40 hover:brightness-110 transition-all duration-300 flex items-center justify-center"
          aria-label="챗봇 열기"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Side panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            ref={panelRef}
            className="fixed top-0 right-0 z-50 w-full sm:w-[400px] bg-panel border-l border-line shadow-2xl shadow-black/60 flex flex-col"
            style={{ height: viewportHeight ? `${viewportHeight}px` : '100dvh' }}
            onTouchMove={(e) => {
              // Allow scroll inside messages area, prevent elsewhere
              const target = e.target as HTMLElement;
              if (!target.closest('.chat-messages')) {
                e.preventDefault();
              }
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <div>
                <h3 className="font-mono text-sm text-fg"><span className="text-accent">&gt;</span> ask about min</h3>
                <p className="text-xs text-dim mt-0.5">포트폴리오 문서를 검색해 Claude가 답합니다</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-panel2 transition-colors"
                aria-label="패널 닫기"
              >
                <X className="w-5 h-5 text-mute" />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages flex-1 overflow-y-auto px-5 py-4 space-y-4 overscroll-contain">
              {messages.length === 0 && (
                <div className="text-center mt-12">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm text-fg mb-1">안녕하세요!</p>
                  <p className="text-sm text-mute mb-6">포트폴리오에 대해 궁금한 점을 물어보세요.</p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="block w-full text-left px-4 py-2.5 rounded-lg border border-line text-sm text-mute hover:border-accent/60 hover:text-fg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-accent text-ink rounded-br-md'
                        : 'bg-panel2 text-fg/90 rounded-bl-md border border-line'
                    }`}
                  >
                    {msg.content}
                    {/* Typing dots - before any content arrives */}
                    {isLoading && i === messages.length - 1 && msg.role === 'model' && !msg.content && (
                      <span className="inline-flex items-center gap-1.5 py-0.5">
                        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                        <span className="typing-dot" style={{ animationDelay: '200ms' }} />
                        <span className="typing-dot" style={{ animationDelay: '400ms' }} />
                      </span>
                    )}
                    {/* 참고한 문서(RAG 검색 결과) — 답변이 끝난 뒤 표시 */}
                    {msg.sources && msg.sources.length > 0 && !(isLoading && i === messages.length - 1) && (
                      <div className="mt-3 pt-2 border-t border-line flex flex-wrap gap-1.5 whitespace-normal">
                        <span className="text-[11px] text-dim mr-0.5">출처</span>
                        {msg.sources.map((s) => (
                          <a
                            key={s.title}
                            href={s.href}
                            target={s.href.startsWith('#') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            onClick={() => s.href.startsWith('#') && setIsOpen(false)}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-panel border border-line text-mute hover:border-accent/60 hover:text-accent transition-colors"
                          >
                            {s.title}
                          </a>
                        ))}
                      </div>
                    )}
                    {/* Blinking cursor - while streaming content */}
                    {isLoading && i === messages.length - 1 && msg.role === 'model' && msg.content && (
                      <span className="typing-cursor" />
                    )}
                  </div>
                </div>
              ))}

              {/* Waiting indicator - shown after user sends, before stream starts */}
              {isWaiting && (
                <div className="flex justify-start">
                  <div className="bg-panel2 border border-line rounded-2xl rounded-bl-md px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 py-0.5">
                      <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                      <span className="typing-dot" style={{ animationDelay: '200ms' }} />
                      <span className="typing-dot" style={{ animationDelay: '400ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-line">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  rows={1}
                  className="flex-1 resize-none bg-ink border border-line rounded-xl px-4 py-3 text-sm text-fg placeholder-dim focus:outline-none focus:border-accent/60 transition-all"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-accent hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed text-ink transition-colors flex-shrink-0"
                  aria-label="메시지 전송"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
