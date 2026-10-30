'use client';

import { useCallback, useState } from 'react';

export interface Source {
  title: string;
  href: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  sources?: Source[];
}

/** /api/chat(RAG) 대화 상태. 답변은 스트리밍으로 쌓고, 참고 문서는 X-Sources 헤더에서 받음 */
export function useAsk() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || loading) return;
      const next: Message[] = [...messages, { role: 'user', content: q }];
      setMessages([...next, { role: 'model', content: '' }]);
      setLoading(true);

      const put = (content: string, sources?: Source[]) =>
        setMessages((prev) => [...prev.slice(0, -1), { role: 'model', content, sources }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // 서버로는 역할·내용만(출처 목록 제외)
          body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
        });
        if (!res.ok || !res.body) {
          // 한도 초과(429)·형식 오류(400)는 서버 안내문을 그대로 보여 줌
          put((res.status < 500 && (await res.text())) || '죄송합니다, 오류가 발생했습니다. 다시 시도해 주세요.');
          return;
        }
        let sources: Source[] = [];
        try {
          sources = JSON.parse(decodeURIComponent(res.headers.get('X-Sources') ?? '')).slice(0, 4);
        } catch {
          // 출처가 없어도 답변은 보여 줌
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          put(acc);
        }
        put(acc, sources);
      } catch {
        put('죄송합니다, 오류가 발생했습니다. 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const reset = useCallback(() => setMessages([]), []);
  return { messages, loading, send, reset };
}

/** 어디서든 질문 창 열기(질문이 있으면 바로 보냄) */
export function openAsk(question?: string) {
  window.dispatchEvent(new CustomEvent('open-ask', { detail: question }));
}
