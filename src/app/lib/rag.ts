import { GoogleGenAI } from '@google/genai';
import { getKnowledgeDocs, type KnowledgeDoc } from './portfolio-data';

const EMBED_MODEL = 'gemini-embedding-001';
const DIM = 768;

type Indexed = KnowledgeDoc & { vec: number[] };

// ponytail: 문서가 수십 개라 벡터 DB 없이 서버 메모리에 둔다. 문서가 수백 개를 넘으면 sqlite-vec 등으로 옮길 것.
let index: Promise<Indexed[]> | null = null;

const norm = (v: number[]) => {
  const n = Math.hypot(...v) || 1;
  return v.map((x) => x / n);
};

async function embed(ai: GoogleGenAI, texts: string[], taskType: string): Promise<number[][]> {
  const res = await ai.models.embedContent({
    model: EMBED_MODEL,
    contents: texts,
    config: { taskType, outputDimensionality: DIM },
  });
  return (res.embeddings ?? []).map((e) => norm(e.values ?? []));
}

function getIndex(ai: GoogleGenAI): Promise<Indexed[]> {
  if (!index) {
    const docs = getKnowledgeDocs();
    index = embed(ai, docs.map((d) => `${d.title}\n${d.text}`), 'RETRIEVAL_DOCUMENT')
      .then((vecs) => docs.map((d, i) => ({ ...d, vec: vecs[i] })))
      .catch((e) => {
        index = null; // 다음 요청에서 다시 시도
        throw e;
      });
  }
  return index;
}

export type Hit = KnowledgeDoc & { score: number };

/** 질문과 가까운 문서 상위 k개(점수 포함). 임베딩이 실패하면 전체 문서를 점수 0으로 돌려준다(검색 없이 답하는 이전 방식). */
export async function retrieve(ai: GoogleGenAI, query: string, k = 4): Promise<Hit[]> {
  try {
    const [docs, [q]] = await Promise.all([getIndex(ai), embed(ai, [query], 'RETRIEVAL_QUERY')]);
    return docs
      .map((d) => ({ title: d.title, href: d.href, text: d.text, score: d.vec.reduce((s, x, i) => s + x * q[i], 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  } catch (e) {
    console.error('RAG 검색 실패, 전체 문서 사용:', e);
    return getKnowledgeDocs().map((d) => ({ ...d, score: 0 }));
  }
}
