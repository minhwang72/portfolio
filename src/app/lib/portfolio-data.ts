/** 경력 기간 계산 — 화면(Career)과 챗봇 프롬프트가 같은 값을 쓰도록 여기서 공유한다. */
export const formatDuration = (years: number, months: number): string => {
  if (years === 0 && months === 0) return '';
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
};

export const calculateDuration = (startDate: Date, endDate: Date) => {
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30.44);
  return { days, years, months, formatted: formatDuration(years, months) };
};

export const CAREER_DATES = {
  hexaveil: { start: new Date('2023-03-27'), end: new Date('2025-05-16') },
  cocoasoft: { start: new Date('2025-06-16'), end: null },
} as const;

export function getCareerDurations() {
  const hexa = calculateDuration(CAREER_DATES.hexaveil.start, CAREER_DATES.hexaveil.end);
  const cocoa = calculateDuration(CAREER_DATES.cocoasoft.start, new Date());
  const totalDays = hexa.days + cocoa.days;
  const total = formatDuration(
    Math.floor(totalDays / 365),
    Math.floor((totalDays % 365) / 30.44)
  );
  return { hexa, cocoa, total };
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  url?: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    name: 'Claude Certified Architect - Foundations',
    issuer: 'Anthropic',
    issued: '2026.09',
    expires: '2027.09',
    url: 'https://www.credly.com/badges/59b07b26-51a1-43df-b080-a2ff6b39bbd4/public_url',
    description:
      'Claude 기반 AI 애플리케이션 설계·구현 역량 인증. 에이전트 아키텍처, 컨텍스트 설계, 도구 연동을 포함한다.',
  },
  {
    name: '네트워크관리사 2급',
    issuer: '한국정보통신자격협회',
    issued: '2025.07',
    description: 'TCP/IP, 네트워크 구축·운영 및 장애 대응 실무 자격.',
  },
];


export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  isPrivate?: boolean;
  badge?: string;
  /** 화면에는 안 나오고 챗봇 검색 자료로만 쓰는 상세 설명 */
  detail?: string;
  /** 화면: 큰 화면 캡처와 함께 보여 줄 대표 작업 */
  feature?: { image: string; story: string; facts?: string[] };
  /** 화면: 목록에 쓰는 한 줄(없으면 목록에서 뺌) */
  line?: string;
  /** 화면: 프로젝트 카드 썸네일 */
  thumb?: string;
  /** 화면: 카드 강조색(히어로 지도의 행성 색과 같게) */
  color?: string;
}

/** 프로젝트 목록 — 화면(Projects)과 챗봇 검색 자료가 같은 데이터를 쓴다. */
export const projects: Project[] = [
  {
    title: '뮤직시트 (MuT)',
    color: '#8b5cf6',
    description:
      '악보 사진을 넣으면 원하는 키로 바꾼 새 악보를 만들어 주는 서비스. 1세대(CONTI)는 Gemini에 악보 이미지를 통째로 맡겼지만 음표·박자를 자주 틀려, 2세대는 CV 검출 + AI 판독 + MusicXML 재조판 파이프라인으로 다시 설계했습니다. 악보 4종 내부 측정에서 음높이 727/727, 코드 141/141 일치(전체 악보 일반화 평가는 진행 중).',
    tags: ['Python', 'YOLO', 'OpenCV', 'Claude API', 'MusicXML', 'Verovio'],
    github: 'https://github.com/minhwang72/mut',
    demo: 'https://conti.eungming.com',
    isPrivate: true,
    badge: '개발 중 · 초대 계정',
    line: '악보 사진을 원하는 키의 새 악보로. AI 통째 판독을 좌표 계산 + AI 판독 + 재조판으로 다시 설계해 음높이 727/727, 코드 141/141 일치(내부 측정)',
    thumb: '/images/work/mut.png',
    feature: {
      image: '/images/work/mut.png',
      story:
        '악보 사진을 올리면 원하는 키로 바꾼 새 악보를 만들어 줍니다. 처음엔 AI에게 이미지를 통째로 맡겼다가 박자를 자주 틀려서, 음높이는 좌표 계산으로, 음가·코드는 AI 판독으로 나누고 박자가 맞는 마디만 다시 조판하도록 고쳐 만들었습니다.',
      facts: ['727/727 음높이 일치', '141/141 코드 일치'],
    },
    detail: `- 1세대 CONTI: Next.js + Gemini로 악보 이미지에서 코드·가사를 뽑아 키를 바꾸고 셋리스트를 관리하는 도구. LLM이 음표 위치·박자를 추측해 틀리는 문제가 반복됨
- 2세대 MuT로 전환: 원본 픽셀을 옮기는 방식은 임시표를 다시 계산할 수 없어 버리고, 악보를 MusicXML로 다시 만든 뒤 Verovio(브라우저 WASM)로 재조판
- 역할 분담: 음높이는 CV(음표 머리 y좌표와 오선 간격으로 계산), 음가·마디·반복 기호는 LLM, 코드는 LLM, 원조성은 조표의 ♯/♭ 개수, 이조는 자체 코어 엔진
- 로컬 모드: YOLO 검출 + Tesseract로 유료 API 호출 없이 판독. 오픈소스 판독기(homr)로 교차 검증
- 박자가 맞지 않거나 확정할 수 없는 마디는 결과를 내보내지 않고 사용자 확인 대상으로 남김(틀린 악보를 그럴듯하게 내지 않음)
- 측정은 독립 검수 전 내부 표본 기준이며, 사진·손글씨 등 일반화 성능은 아직 평가 중`,
  },
  {
    title: 'Balance Desk',
    color: '#14b8a6',
    thumb: '/images/work/stock.png',
    description:
      'KIS Open API 기반 ISA 포트폴리오 대시보드. 실시간 잔고·수익률·자산 배분 현황을 시각화하고, 목표 비중 대비 드리프트 알림, 거래 내역 원장, 매매 API까지 통합한 개인 자산관리 도구입니다.',
    tags: ['Next.js', 'TypeScript', 'KIS Open API', 'MCP', 'MySQL', 'Docker'],
    github: 'https://github.com/minhwang72/isa-portal',
    demo: 'https://stock.eungming.com',
    isPrivate: true,
    line: 'KIS Open API로 ISA 계좌의 잔고·비중을 보고 목표에서 벗어나면 알려 주는 대시보드',
  },
  {
    title: 'CBT 학습 플랫폼',
    color: '#f59e0b',
    thumb: '/images/work/cbt.png',
    description:
      '정보처리기사 필기 기출문제 CBT 서비스. 2020~2025년 전 회차 문제를 파싱·정제하여 DB에 적재하고, 랜덤 출제·오답 노트·회차별 풀기를 지원하는 학습 플랫폼입니다.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'Docker'],
    github: 'https://github.com/minhwang72/cbt',
    demo: 'https://cbt.eungming.com',
    isPrivate: true,
    line: '정보처리기사 기출 6년치를 정리해 넣은 시험 연습 사이트',
  },
  {
    title: 'MOID',
    color: '#f43f5e',
    description:
      '모바일 청첩장 SaaS MVP. 블록형 빌더로 청첩장을 만들고 공개 URL로 공유합니다. 로그인 전 무료 시안 빌더, 결제 전 워터마크 정책, RSVP 저장 API, GitHub Actions CI/CD를 갖춘 프로덕션 준비 구조입니다.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'AWS S3', 'GitHub Actions'],
    github: 'https://github.com/minhwang72/moid',
    demo: 'https://moid.co.kr',
    isPrivate: true,
    feature: {
      image: '/images/work/moid.png',
      story: '모바일 청첩장을 블록처럼 쌓아 만들고 공유하는 서비스입니다. 로그인 없이 시안을 만들어 보고, 결제하면 워터마크가 사라집니다.',
    },
    line: '블록을 쌓아 만드는 모바일 청첩장. 로그인 없이 시안을 만들고, 결제하면 워터마크가 사라져요',
    thumb: '/images/work/moid.png',
  },
  {
    title: '오늘운',
    color: '#fb923c',
    thumb: '/images/work/oneulun.png',
    description:
      '앱인토스 미니앱 · 사주 기반 일일 운세. 생년월일로 사주 원국을 계산하고 오늘 날짜와의 관계로 운세를 산출합니다. 개인정보 보호를 위해 사주 계산은 전량 클라이언트에서 처리하며 서버로 전송하지 않습니다.',
    tags: ['React', 'TypeScript', '앱인토스', '사주 알고리즘'],
    github: 'https://github.com/minhwang72/oneulun',
    isPrivate: true,
    line: '토스 앱 안에서 도는 사주 운세 미니앱. 계산은 전부 휴대폰에서만',
  },
  {
    title: '포트폴리오',
    color: '#6366f1',
    thumb: '/images/work/pf.png',
    description:
      '현재 보고 계신 포트폴리오. 집 서버에서 운영 중인 서비스의 실제 상태(응답 속도)를 프로젝트 옆에 보여 주고, RAG 챗봇은 프로필·프로젝트 문서를 임베딩으로 검색해 관련 내용만 근거로 Claude가 답하며 출처를 함께 보여줍니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude API', 'Gemini Embedding', 'RAG'],
    github: 'https://github.com/minhwang72/portfolio',
    demo: 'https://pf.eungming.com',
    badge: '현재 페이지',
    line: '질문하면 포트폴리오 문서를 찾아 Claude가 답하고, 어디서 찾았는지 보여 줍니다',
    detail: `- 문서를 항목(자기소개·기술·프로젝트·경력·자격증) 단위로 나눠 gemini-embedding-001로 임베딩, 서버 메모리에 보관
- 질문을 임베딩해 코사인 유사도 상위 문서만 프롬프트에 넣고 Claude Haiku 5.5로 스트리밍 답변(질문 1건 약 1원 미만)
- 답변 아래에 참고한 문서를 출처로 표시, 문서 수가 적어 별도 벡터 DB 없이 메모리 검색
- 남용 방지: IP당 분당 10회·하루 100회, 사이트 전체 하루 상한, 대화 길이·답변 길이 상한
- 운영 표시: 서버가 1분마다 각 서비스에 실제 요청을 보내 응답 여부·응답 시간을 기록해 프로젝트 옆에 보여 줌`,
  },
  {
    title: '웨딩 초대장 시리즈',
    description:
      '지인들의 결혼식을 위해 제작한 모바일 청첩장 시리즈 (4개). 카카오맵 연동, 계좌 복사, 방명록, 사진 갤러리 등을 포함한 맞춤 제작 웹 청첩장입니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', '카카오맵 API'],
    github: 'https://github.com/minhwang72/monsil-invitation',
    // 2026-10-30 taetaecouple 인증서 오류로 링크 제외
  },
  {
    title: 'KAIROS',
    description:
      'NPC들이 스스로 살아가고 성장하는 지속형 세계 시뮬레이션 게임. LLM 기반 NPC 인지 시스템, 틱 루프 엔진, 경제·정치·사회 시뮬레이션을 설계 중입니다.',
    tags: ['Next.js', 'TypeScript', 'Claude API', 'Docker', '시뮬레이션'],
    github: 'https://github.com/minhwang72/kairos',
    isPrivate: true,
    badge: '기획 중',
  },
];

export const CONTACT = {
  email: 'zxcyui6181@gmail.com',
  github: 'https://github.com/minhwang72',
  linkedin: 'https://www.linkedin.com/in/min-hwang-071b18316/',
};

/** 챗봇이 질문마다 꼭 알아야 하는 기본 정보(검색과 상관없이 항상 넣음) */
export function getCoreProfile(): string {
  const { total } = getCareerDurations();
  return `이름: 황민 / 풀스택 & AI 엔지니어 / 서울 구로구
총 경력 ${total}. 현재 코코아소프트 AI센터 책임연구원(2025.06~), 이전 HEXAVEIL 주임연구원(2023.03~2025.05)
대표 프로젝트: 뮤직시트(MuT) — 악보 사진을 원하는 키의 새 악보로 바꾸는 CV + AI 파이프라인
연락처: 이메일 ${CONTACT.email}, GitHub ${CONTACT.github}, LinkedIn ${CONTACT.linkedin}`;
}

export interface Experience {
  key: 'cocoa' | 'hexa';
  company: string;
  role: string;
  period: string;
  summary: string;
  /** 화면에 보이는 핵심 3~4줄 */
  highlights: string[];
  /** 챗봇 검색 자료용 상세(화면에도 목록으로 보여 줌) */
  details: string[];
  /** 그 회사에서 쓴 기술 */
  tech: string[];
}

export const experience: Experience[] = [
  {
    key: 'cocoa',
    company: '코코아소프트',
    role: 'AI센터 책임연구원',
    period: '2025.06 ~ 현재',
    summary: 'AI센터에서 사내 웹앱 개발과 서버 관리를 맡고, LLM·MCP로 업무 자동화를 만듭니다.',
    highlights: [
      '사내 웹앱 개발과 서버 관리 전담',
      'n8n 웹훅 + LLM 기반 RAG 홈페이지 챗봇 배포',
      'MCP(Model Context Protocol) 기반 업무 자동화 시스템 설계·개발',
      'n8n + LLM 공수 산정 자동화 개발',
    ],
    details: [
      'AI센터에서 사내 웹앱 개발과 서버 관리를 전담',
      'n8n 웹훅 + LLM 기반 RAG 홈페이지 챗봇 배포',
      'n8n + LLM 공수 산정 자동화 개발 중',
      'MCP(Model Context Protocol) 기반 업무 자동화 시스템 설계·개발',
      '고객사 이름은 공개하지 않음',
    ],
    tech: ['Next.js', 'n8n', 'Claude · Gemini API', 'MCP', 'Linux 서버'],
  },
  {
    key: 'hexa',
    company: 'HEXAVEIL',
    role: '주임연구원',
    period: '2023.03 ~ 2025.05',
    summary: '커머스 서비스의 백엔드 API부터 웹·모바일 앱까지 풀스택으로 개발했습니다.',
    highlights: [
      'Kotlin·Spring Boot, Django 백엔드 API',
      'React·Next.js 웹, Flutter(Android/iOS) 앱',
      'PG 결제·본인인증 연동, 한국어/베트남어 다국어 서비스',
    ],
    details: [
      '웹·앱 풀스택 개발: Kotlin/Spring Boot·Django 백엔드 API, React·Next.js 웹 프론트엔드, Flutter(Android/iOS) 앱',
      '커머스 서비스의 PG 결제·본인인증 연동',
      '한국어/베트남어 다국어(i18n) 서비스 개발',
      'Docker·Kubernetes 환경에서 GitHub Actions·TeamCity로 배포 (Kubernetes는 사용 경험 수준)',
    ],
    tech: ['Kotlin', 'Spring Boot', 'Django', 'React', 'Next.js', 'Flutter', 'Docker', 'GitHub Actions', 'TeamCity'],
  },
];

/** 상태판에 올리는 공개 서비스 — 홈서버(monsil)에서 직접 운영 중 */
export const services = [
  { name: '포트폴리오', host: 'pf.eungming.com', url: 'https://pf.eungming.com' },
  { name: '뮤직시트 (MuT)', host: 'conti.eungming.com', url: 'https://conti.eungming.com' },
  { name: 'Balance Desk', host: 'stock.eungming.com', url: 'https://stock.eungming.com' },
  { name: 'CBT 학습 플랫폼', host: 'cbt.eungming.com', url: 'https://cbt.eungming.com' },
  { name: 'MOID', host: 'moid.co.kr', url: 'https://moid.co.kr' },
  { name: '기술 블로그', host: 'eungming.com', url: 'https://eungming.com' },
];

/** 기술 — 배지 대신 '어디에 썼는지'와 함께 */
export const stack = [
  {
    area: 'Backend',
    items: ['Kotlin · Spring Boot', 'Django', 'Next.js API', 'MySQL · MariaDB', 'Prisma'],
    usedIn: '커머스 API, Balance Desk, CBT',
    points: ['Kotlin·Spring Boot, Django로 커머스 API 개발, PG 결제·본인인증 연동', 'Next.js API + Prisma·MySQL로 사이드 서비스 백엔드', 'KIS Open API를 연동한 계좌 대시보드'],
  },
  {
    area: 'Frontend · App',
    items: ['TypeScript', 'React · Next.js', 'Tailwind CSS', 'Flutter'],
    usedIn: '커머스 웹·앱, 앱인토스 미니앱, 이 사이트',
    points: ['React·Next.js 웹과 Flutter(Android/iOS) 앱 개발', '토스 앱인토스 미니앱 3개', '한국어·베트남어 다국어(i18n) 서비스'],
  },
  {
    area: 'AI',
    items: ['Claude API', 'Gemini API', 'MCP', 'RAG', 'YOLO · OpenCV'],
    usedIn: '뮤직시트(MuT), 이 사이트의 질문창, MCP 기반 업무 자동화',
    points: ['임베딩 검색 + Claude 답변 + 출처 표시 RAG 질문창', 'YOLO·OpenCV 검출과 LLM 판독을 나눠 맡긴 악보 인식', 'MCP 기반 사내 업무 자동화 시스템 설계'],
  },
  {
    area: 'Ops · Automation',
    items: ['Docker', 'nginx', 'GitHub Actions', 'Linux 홈서버', 'n8n'],
    usedIn: '집 서버로 서비스 직접 운영, 사내 서버 관리',
    points: ['집 서버 한 대에서 Docker·nginx로 서비스 여러 개 운영, DB 공유', 'GitHub Actions로 빌드·배포 자동화', '1분 간격 상태 확인, 요청 한도 같은 운영 장치'],
  },
];

export interface KnowledgeDoc {
  title: string;
  /** 출처로 보여 줄 링크(페이지 섹션 또는 외부 주소) */
  href: string;
  text: string;
}

/** 챗봇 검색 자료 — 항목 하나가 검색 단위 */
export function getKnowledgeDocs(): KnowledgeDoc[] {
  const { hexa, cocoa } = getCareerDurations();
  return [
    {
      title: '자기소개',
      href: '#top',
      text: `웹·앱 풀스택 엔지니어. 커머스 서비스의 백엔드 API(Kotlin·Spring Boot, Django)부터 웹 프론트엔드(React·Next.js), 모바일 앱(Flutter)까지 개발했습니다.
지금은 AI센터에서 사내 웹앱 개발과 서버 관리를 맡고 있고, 퇴근 후에는 집 서버 한 대로 서비스 여섯 개를 직접 만들고 운영합니다.
MCP(Model Context Protocol) 기반 AI 자동화 시스템을 설계하고, Gemini·Claude 등 LLM API를 활용한 지능형 서비스를 개발하고 있습니다.
기술을 배우는 데 그치지 않고 실제 서비스에 적용하며, 문제를 직접 해결하는 과정에서 가장 큰 보람을 느낍니다.
학력: 방송통신대학교 컴퓨터과학과`,
    },
    {
      title: '기술 스택',
      href: '#stack',
      text: `Language: Dart, Java, JavaScript, Kotlin, Python, TypeScript
Frontend: Flutter, Next.js, React, Tailwind CSS
Backend: Django, Firebase, MariaDB, MySQL, Spring Boot
DevOps: AWS, Docker, Git, GitHub Actions, TeamCity, 개인 홈서버(nginx·Docker로 여러 서비스 운영)
AI / ML: Google Gemini API, Claude API, MCP(Model Context Protocol), LangChain, RAG, YOLO·OpenCV(악보 인식)
Automation: n8n, MCP
Tools & IDE: Android Studio, Cursor, Claude Code, Figma, IntelliJ IDEA, VS Code, Zeplin`,
    },
    ...experience.map((e) => ({
      title: `경력: ${e.company} ${e.role} (${e.period}, ${e.key === 'cocoa' ? cocoa.formatted : hexa.formatted})`,
      href: '#experience',
      text: [e.summary, ...e.details.map((d) => `- ${d}`)].join('\n'),
    })),
    {
      title: '자격증',
      href: '#contact',
      text: certifications
        .map((c) => `- ${c.name} (${c.issuer}, ${c.issued} 취득${c.expires ? `, ${c.expires} 만료` : ''}): ${c.description}`)
        .join('\n'),
    },
    ...projects.map((p) => ({
      title: `프로젝트: ${p.title}`,
      href: p.demo && !p.demo.includes('pf.eungming.com') ? p.demo : '#work',
      text: [
        p.badge && `상태: ${p.badge}`,
        p.description,
        p.detail,
        `기술: ${p.tags.join(', ')}`,
        p.demo && `사이트: ${p.demo}`,
        p.isPrivate ? '저장소: 비공개' : `GitHub: ${p.github}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })),
  ];
}
