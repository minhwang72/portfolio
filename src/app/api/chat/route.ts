import { GoogleGenAI } from '@google/genai';
import { getSystemPrompt } from '../../lib/portfolio-data';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1000;
const RATE_LIMIT = 20; // 요청 수
const RATE_WINDOW_MS = 60_000; // 1분

// ponytail: 단일 컨테이너 배포라 인메모리로 충분. 다중 인스턴스가 되면 Redis로 옮길 것.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';
    if (isRateLimited(ip)) {
      return new Response('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.', { status: 429 });
    }

    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('메시지가 필요합니다.', { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response('대화가 너무 깁니다. 새로 시작해 주세요.', { status: 400 });
    }
    if (
      messages.some(
        (m) =>
          (m.role !== 'user' && m.role !== 'model') ||
          typeof m.content !== 'string' ||
          m.content.length === 0 ||
          m.content.length > MAX_CONTENT_LENGTH
      )
    ) {
      return new Response('메시지 형식이 올바르지 않습니다.', { status: 400 });
    }

    const contents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemPrompt(),
      },
      contents,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('서버 오류가 발생했습니다.', { status: 500 });
  }
}
