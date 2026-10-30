import type { Metadata, Viewport } from "next";
import "./globals.css";
import AskDock from './components/AskDock';
import Script from 'next/script';

// 처음 그릴 때 저장된 테마(없으면 시스템 설정)를 바로 적용해 깜빡임 방지
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

// 구조화된 데이터 정의
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "황민",
  "alternateName": "Hwang Min",
  "url": "https://pf.eungming.com",
  "jobTitle": "풀스택 엔지니어 (AI · 자동화)",
  "description": "웹·앱 풀스택 엔지니어. 사내 웹앱·서버와 업무 자동화 운영 지원, LLM·RAG·MCP 자동화, 집 서버에서 직접 만든 서비스를 운영합니다. 서울.",
  "worksFor": {
    "@type": "Organization",
    "name": "CocoaSoft"
  },
  "sameAs": [
    "https://github.com/minhwang72",
    "https://www.linkedin.com/in/min-hwang-071b18316/"
  ],
  "knowsAbout": [
    "Kotlin",
    "Spring Boot",
    "Java",
    "Backend Development",
    "REST API",
    "JPA",
    "Kubernetes",
    "Docker",
    "AWS",
    "MySQL",
    "MariaDB",
    "TypeScript",
    "Next.js",
    "React",
    "Python",
    "AI/ML",
    "LLM",
    "MCP",
    "Claude API",
    "Gemini API"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "한국방송통신대학교"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Claude Certified Architect - Foundations",
      "credentialCategory": "certificate",
      "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
      "url": "https://www.credly.com/badges/59b07b26-51a1-43df-b080-a2ff6b39bbd4/public_url"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Network Administrator Level 2",
      "credentialCategory": "certificate",
      "recognizedBy": { "@type": "Organization", "name": "Korea Information & Communication Qualification Association" }
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seoul",
    "addressCountry": "KR"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
};

const TITLE = "황민 | 풀스택 엔지니어 (AI · 자동화) 포트폴리오";
const DESC = "직접 만들고, 끝까지 운영합니다. 풀스택 엔지니어 황민(Hwang Min)의 포트폴리오 — 집 서버에서 운영 중인 서비스, 토스 앱인토스 미니앱, 경력과 이력서(PDF).";

export const metadata: Metadata = {
  metadataBase: new URL("https://pf.eungming.com"),
  title: TITLE,
  description: DESC,
  keywords: [
    "황민", "Hwang Min", "Min Hwang", "풀스택 개발자", "풀스택 엔지니어", "개발자 포트폴리오", "개발자 이력서",
    "Next.js", "React", "TypeScript", "Kotlin", "Spring Boot", "Django", "Flutter",
    "Docker", "nginx", "GitHub Actions", "MySQL", "MariaDB",
    "Claude API", "RAG", "MCP", "n8n", "LLM 자동화", "업무 자동화", "RPA", "앱인토스", "토스 미니앱",
  ],
  authors: [{ name: "황민 (Hwang Min)", url: "https://pf.eungming.com" }],
  creator: "황민",
  publisher: "황민",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], shortcut: "/favicon.svg", apple: "/favicon.svg" },
  verification: {
    google: "_6y4DjCJpX30-CdY9nGiBrTi4GBpxu1vjrXbxLDnq6M",
    other: { "naver-site-verification": "8bbd77d95e169bcaf54dc7840b0553693db295d6" },
  },
  alternates: { canonical: "https://pf.eungming.com" },
  category: "portfolio",
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/manifest.json",
  applicationName: "황민 포트폴리오",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://pf.eungming.com",
    siteName: "황민 포트폴리오",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "황민 — 직접 만들고, 끝까지 운영합니다" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="naver-site-verification" content="8bbd77d95e169bcaf54dc7840b0553693db295d6" />
        <meta name="google-site-verification" content="_6y4DjCJpX30-CdY9nGiBrTi4GBpxu1vjrXbxLDnq6M" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-bg text-fg">
        {children}
        <AskDock />
      </body>
    </html>
  );
}
