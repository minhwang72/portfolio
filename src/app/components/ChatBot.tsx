'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const allSuggestions = [
  '어떤 기술을 사용하나요?',
  '경력이 어떻게 되나요?',
  '프로젝트를 소개해주세요',
  '현재 어떤 일을 하고 있나요?',
  '사용하는 프로그래밍 언어는?',
  '연락처를 알려주세요',
  '어떤 회사에서 일했나요?',
  '프론트엔드 기술 스택은?',
  '백엔드 경험이 있나요?',
];

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
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('API 요청 실패');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('스트림 읽기 실패');

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
          updated[updated.length - 1] = { role: 'model', content: accumulated };
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
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
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
            className="fixed top-0 right-0 z-50 w-full sm:w-[400px] bg-white border-l border-slate-200 shadow-2xl flex flex-col"
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
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-semibold text-slate-900">AI Assistant</h3>
                <p className="text-xs text-slate-400 mt-0.5">황민에 대해 무엇이든 물어보세요</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="패널 닫기"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages flex-1 overflow-y-auto px-5 py-4 space-y-4 overscroll-contain">
              {messages.length === 0 && (
                <div className="text-center mt-12">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-sm text-slate-500 mb-1">안녕하세요!</p>
                  <p className="text-sm text-slate-400 mb-6">포트폴리오에 대해 궁금한 점을 물어보세요.</p>
                  <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="block w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:border-teal-600 hover:text-teal-600 transition-colors"
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
                        ? 'bg-teal-600 text-white rounded-br-md'
                        : 'bg-slate-100 text-slate-700 rounded-bl-md'
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
                  <div className="bg-slate-100 text-slate-700 rounded-2xl rounded-bl-md px-4 py-2.5">
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
            <div className="px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  rows={1}
                  className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20 transition-all"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors flex-shrink-0"
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
