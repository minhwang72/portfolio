// 이력서(/resume, /resume.pdf) 내용.
// 근거: Obsidian '이력서 초안 v0.2'(2026-10-29), 경력사항 문서(2025.12), 포트폴리오 데이터.
// 공개 문서라 전화번호·고객사 이름은 넣지 않는다. 초안의 '확인 필요' 항목은 뺐다.

export const resume = {
  name: '황민',
  title: '풀스택 엔지니어 (AI · 자동화)',
  summary: [
    '웹·앱 풀스택 개발자로 시작해, 지금은 AI센터에서 사내 웹앱 개발과 서버 관리를 맡으면서 그룹사 업무 자동화(RPA) 운영을 기술 지원하고 있습니다.',
    '공통 모듈 표준화로 월 장애를 약 90건에서 10건 수준으로 줄였고, 그룹웨어 전면 전환 때 막힌 메일 연동을 새 공통 모듈로 대체해 약 1개월 만에 계열사 자동화를 정상화했습니다.',
    '퇴근 후에는 집 서버 한 대로 직접 만든 서비스들을 운영하고, 토스 앱인토스 미니앱 3개를 출시했습니다. LLM RAG, n8n, MCP를 실무와 개인 프로젝트에 적용하고 있습니다.',
  ],
  skills: [
    { area: '웹 · 앱', items: 'Next.js, React, TypeScript, Kotlin · Spring Boot, Django, Express, Flutter' },
    { area: '서버 · 운영', items: 'Linux 서버, Docker, nginx, GitHub Actions, MariaDB · MySQL, AWS (Kubernetes는 사용 경험)' },
    { area: 'AI · 자동화', items: 'Claude · Gemini API, RAG, MCP, n8n, UiPath Studio · Orchestrator, YOLO · OpenCV' },
  ],
  jobs: [
    {
      company: '코코아소프트',
      role: 'AI센터 책임연구원',
      period: '2025.06 — 재직 중',
      blocks: [
        {
          title: '그룹사 업무 자동화 운영 기술 지원',
          items: [
            '8개 계열사 업무 자동화(RPA) 운영을 기술 지원하는 코디네이터. 계열사마다 운영 담당자가 있고, 그들이 해결하기 어려운 장애·기술 이슈를 맡아 해결하며 공통 모듈을 관리',
            '과제마다 제각각이던 예외처리(Try-Catch·Retry)를 보강하고 공통 모듈을 표준화해 월 장애를 약 90건에서 10건 수준으로 줄임',
            '반복되던 브라우저 연동 장애를 해결하려고 자동화 솔루션 버전 업그레이드(23.10 → 24)를 기획·수행',
          ],
        },
        {
          title: '그룹웨어 전면 전환 대응 (2025.12)',
          items: [
            '보안 강화로 메일 API·라이브러리·DRM이 함께 막혀 계열사 자동화가 멈출 위기',
            '본사 IT팀과 협의해 새 그룹웨어 API를 확보하고 메일 공통 모듈을 새로 개발. 지원하지 않는 기능은 DB에서 수신자를 조회하는 방식으로 우회',
            '공통 모듈로 계열사에 배포해 약 1개월 만에 정상화, 같은 유형 장애 재발 없음',
          ],
        },
        {
          title: '사내 웹앱 · 서버',
          items: [
            '자동화 개발자 중심 조직에서 사내 웹앱 대부분을 기획부터 배포까지 맡고 사내 서버(Docker·nginx·DB)를 관리',
            '운영 모니터링 대시보드(Next.js), 멀티테넌트 업무 웹앱(Express·MySQL), 사내 자격시험 CBT(Next.js·MariaDB)',
          ],
        },
        {
          title: 'AI 자동화',
          items: [
            '홈페이지 챗봇을 단순 응답에서 n8n 웹훅 + LLM 기반 RAG로 전환해 배포',
            'n8n + LLM 공수 산정 자동화 개발 중(영상·녹음·사진 입력별로 프롬프트 분리)',
            'MCP 기반 자동화 솔루션 구동 시스템 설계·개발, 새 자동화 도구 사내 첫 검증과 교육 영상 제작',
          ],
        },
        {
          title: '자동화 구축 프로젝트 기술 지원',
          items: ['과제 34개 규모 구축 프로젝트에 격일 상주로 기술 지원. 버전 관리 병합 문제를 해결하고 일정이 밀린 과제 3개를 직접 개발'],
        },
      ],
    },
    {
      company: 'HEXAVEIL',
      role: '주임연구원',
      period: '2023.03 — 2025.05',
      blocks: [
        {
          title: '웹·앱 풀스택 개발 (고객사 외주 개발)',
          items: [
            '커머스·플랫폼 서비스의 백엔드 API 개발과 운영(Kotlin·Spring Boot, Django), PG 결제·본인인증 연동',
            'Flutter(Android/iOS) 앱과 React·Next.js 웹 프론트엔드 개발, 한국어·베트남어 다국어(i18n)',
            'Docker·Kubernetes 환경에서 GitHub Actions·TeamCity로 배포 (Kubernetes는 사용 경험 수준)',
          ],
        },
      ],
      projects: [
        { name: '파킹프렌즈', role: '앱 · 서버 개발', period: '2024.11 — 2025.05' },
        { name: '보안 브라우저 확장 프로그램', role: '확장 프로그램 개발', period: '2024.10 — 2024.11' },
        { name: '영양알고케어', role: '웹 · 앱 개발', period: '2024.09 — 2024.10' },
        { name: '공정관리 시스템', role: '개발 · 유지보수', period: '2024.05' },
        { name: '픽키즈 (Pickids)', role: '앱 개발', period: '2023.12 — 2024.04' },
        { name: '클린벨', role: '개발 · 유지보수', period: '2023.12' },
        { name: '아테나 (강사 매칭)', role: '앱 · API 개발', period: '2023.09 — 2023.11' },
      ],
    },
  ],
  personal: [
    { name: '뮤직시트 (MuT)', desc: '악보 사진을 원하는 키의 새 악보로. 음높이는 좌표 계산(YOLO·OpenCV), 음가·코드는 LLM 판독으로 나누고 박자가 맞는 마디만 MusicXML로 재조판. 악보 4종 내부 측정 음높이 727/727, 코드 141/141', tech: 'Python, YOLO, OpenCV, Claude API', link: 'conti.eungming.com' },
    { name: '앱인토스 미니앱 3종', desc: '정책메이트(청년정책 매칭), 오늘운(사주 운세), 애니믹스(퍼즐 게임) 토스 출시·운영. 오늘운·애니믹스는 Google Play에도 출시. 출시 경험을 정리한 전자책 판매', tech: 'React, TypeScript, Node.js', link: '토스 앱 · Google Play' },
    { name: 'MOID', desc: '블록형 모바일 청첩장 SaaS. 로그인 없는 시안 빌더, 결제 후 워터마크 해제, RSVP API, CI/CD', tech: 'Next.js, Prisma, AWS S3, GitHub Actions', link: 'moid.co.kr' },
    { name: 'Balance Desk', desc: 'KIS Open API 기반 ISA 계좌 대시보드. 목표 비중 이탈 알림, 거래 원장 대조, 자동 매수', tech: 'Next.js, MySQL, Redis, MCP, Docker', link: '비공개' },
    { name: 'CBT 학습 플랫폼', desc: '정보처리기사 필기 2020~2025 전 회차 파싱·적재, 랜덤 출제·오답 노트', tech: 'Next.js, Prisma, MySQL, Docker', link: 'cbt.eungming.com' },
    { name: '포트폴리오 · 집 서버 운영', desc: '집 서버 한 대에서 Docker·nginx로 서비스 여러 개 운영(컨테이너 17개). 포트폴리오는 서비스 상태를 1분마다 확인해 보여 주고, RAG 질문창(임베딩 검색 + Claude 답변 + 출처)을 제공', tech: 'Next.js, Docker, nginx, n8n, Claude API', link: 'pf.eungming.com' },
  ],
  certs: [
    { name: 'Claude Certified Architect – Foundations', issuer: 'Anthropic', date: '2026.09' },
    { name: '네트워크관리사 2급', issuer: '한국정보통신자격협회', date: '2025.07' },
  ],
  education: [{ name: '한국방송통신대학교 컴퓨터과학과', state: '재학 중' }],
};
