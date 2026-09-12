# 🚀 Min Hwang's Developer Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <br />
  <img src="https://img.shields.io/github/license/minhwang72/portfolio?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/minhwang72/portfolio?style=for-the-badge" />
</div>

---

## 🌟 프로젝트 소개

**Min Hwang의 포트폴리오 웹사이트**입니다.  
Next.js 15와 TypeScript 기반으로 제작되었으며, Gemini AI 챗봇, 부드러운 애니메이션, 다크/라이트 모드를 지원합니다.

🔗 **라이브 데모**: [https://pf.eungming.com](https://pf.eungming.com)

---

## ✨ 주요 기능

- **Gemini AI 챗봇**: RAG 기반으로 황민에 대한 질문에 답변
- **반응형 디자인**: 모바일부터 와이드스크린까지 최적화
- **다크/라이트 모드**: 헤더 토글 버튼으로 즉시 전환
- **Framer Motion 애니메이션**: 스크롤 기반 부드러운 진입 효과
- **Dot 네비게이션**: 섹션 간 빠른 이동
- **SEO 최적화**: JSON-LD 구조화 데이터, sitemap, OG 태그
- **Docker 배포**: Standalone 빌드 + Nginx 리버스 프록시

---

## 🛠️ 사용 기술

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **AI**: Google Gemini 2.5 Flash API
- **배포**: Docker + 개인 서버 (monsil)

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── api/            # Gemini AI 챗봇 API 라우트
│   ├── components/     # 재사용 가능한 공통 컴포넌트
│   ├── lib/            # 포트폴리오 데이터, 애니메이션 설정
│   └── sections/       # Hero, About, Skills, Projects, Career, Contact
```

---

## 🚀 시작 방법

1. **저장소 클론**
```bash
git clone git@github.com:minhwang72/portfolio.git
```

2. **의존성 설치**
```bash
yarn install
```

3. **환경 변수 설정**
```bash
cp .env.example .env.local
# GEMINI_API_KEY 입력
```

4. **개발 서버 실행**
```bash
yarn dev
```

5. **프로덕션 빌드**
```bash
yarn build
```

---

## 🐳 Docker 배포

```bash
./pf.sh
```

---

## 📝 주요 섹션 구성

- **Hero**: 메인 인트로 (이름, 직함, 소개)
- **About**: 기본 프로필 및 자기소개
- **Skills**: 기술 스택 (shields.io 배지)
- **Projects**: 주요 프로젝트 (CONTI 등)
- **Career**: 경력 사항 (코코아소프트, HEXAVEIL)
- **Contact**: 연락처 및 소셜 링크

---

<div align="center">
  <sub>Made by Min Hwang</sub>
</div>
