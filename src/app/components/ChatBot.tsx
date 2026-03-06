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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const sendMessage = async (text: string) => {
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

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
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: '죄송합니다, 오류가 발생했습니다. 다시 시도해주세요.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    sendMessage(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* 토글 버튼 - 패널 닫혀있을 때만 표시 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-stone-800 hover:bg-stone-700 text-[#C4A882] border border-[#C4A882]/30 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="챗봇 열기"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* 사이드 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-40 h-full w-full sm:w-[380px] bg-[#0A0A0C]/95 backdrop-blur-md border-l border-[#1E1E22] flex flex-col"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-[#1E1E22]">
              <div>
                <h3 className="text-lg font-semibold text-white">AI 어시스턴트</h3>
                <p className="text-xs text-stone-500">황민에 대해 무엇이든 물어보세요</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="패널 닫기"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-stone-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">안녕하세요! 황민의 포트폴리오에 대해</p>
                  <p className="text-sm">궁금한 점을 물어보세요.</p>
                  <div className="mt-6 space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="block w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-[#C4A882]/10 text-sm text-stone-400 hover:text-[#C4A882] transition-colors"
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
                        ? 'bg-stone-700 text-white rounded-br-md'
                        : 'bg-white/5 text-stone-300 rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                    {isLoading && i === messages.length - 1 && msg.role === 'model' && !msg.content && (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-[#1E1E22]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  rows={1}
                  className="flex-1 resize-none bg-white/5 border border-[#1E1E22] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C4A882]/50 transition-colors"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-[#C4A882] transition-colors flex-shrink-0"
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
