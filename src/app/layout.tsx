import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DotNavigation from "./components/DotNavigation";
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import Script from 'next/script';

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({ subsets: ['latin'] });

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-playfair',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-jetbrains',
});

// 구조화된 데이터 정의
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Min Hwang",
  "url": "https://pf.eungming.com",
  "jobTitle": "Fullstack & AI Engineer",
  "description": "Fullstack engineer building web and mobile services with Next.js and Spring Boot, running in-house apps and servers, and applying AI/LLM automation (RAG, n8n, MCP) to RPA operations. Based in Seoul, South Korea.",
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
    "Gemini API",
    "RPA Automation"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Korea National Open University"
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
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pf.eungming.com'),
  title: "Min Hwang | Fullstack & AI Engineer",
  description: "웹·앱 풀스택 엔지니어. 커머스 서비스 개발, 사내 웹앱·서버 운영, MCP·LLM을 활용한 AI 자동화를 다룹니다. Fullstack engineer in Seoul, South Korea.",
  keywords: [
    "백엔드 개발자", "서버 개발자", "풀스택 개발자", "웹 개발자",
    "Kotlin", "Spring Boot", "Spring", "Java", "JPA", "REST API",
    "Kubernetes", "k8s", "Docker", "AWS", "GitHub Actions", "CI/CD", "Nginx",
    "MariaDB", "MySQL", "PostgreSQL", "Redis",
    "React", "Next.js", "TypeScript", "Python", "Django", "Flutter",
    "Claude", "MCP", "LLM", "AI 자동화",
    "개발자 포트폴리오", "웹 포트폴리오", "프로젝트 소개", "웹서비스 개발", "앱 개발",
    "사이드 프로젝트", "오픈소스", "개인 서버", "자동화", "RPA", "UiPath",
    "황민", "Min Hwang", "Fullstack Developer", "Frontend Developer", "Backend Developer",
    "한국 개발자 포트폴리오", "Seoul Developer Portfolio"
  ],
  authors: [{ name: "Min Hwang", url: "https://pf.eungming.com" }],
  creator: "Min Hwang",
  publisher: "Min Hwang",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  icons: {
    icon: [
      { url: "https://pf.eungming.com/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "https://pf.eungming.com/favicon.svg",
    apple: "https://pf.eungming.com/favicon.svg",
  },
  verification: {
    google: "_6y4DjCJpX30-CdY9nGiBrTi4GBpxu1vjrXbxLDnq6M",
    other: {
      "naver-site-verification": "8bbd77d95e169bcaf54dc7840b0553693db295d6"
    }
  },
  alternates: {
    canonical: "https://pf.eungming.com",
  },
  category: "portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "https://pf.eungming.com/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Min Hwang Portfolio",
  },
  applicationName: "Min Hwang Portfolio",
  openGraph: {
    title: "Min Hwang | Full-Stack & AI Engineer",
    description: "Full-Stack & AI Engineer specializing in React, Next.js, AI/ML integration, and RPA automation. Building intelligent web applications with modern technologies. Based in Seoul, South Korea.",
    url: "https://pf.eungming.com",
    siteName: "Min Hwang Portfolio",
    images: [
      {
        url: "https://pf.eungming.com/images/profile/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Min Hwang - Full-Stack & AI Engineer",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Min Hwang | Full-Stack & AI Engineer",
    description: "Full-Stack & AI Engineer specializing in React, Next.js, AI/ML integration, and RPA automation. Building intelligent web applications with modern technologies.",
    images: ["https://pf.eungming.com/images/profile/profile.jpeg"],
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "https://pf.eungming.com/browserconfig.xml",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Min Hwang Portfolio",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
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
      <body className={`${inter.className} ${notoSansKR.className} ${playfair.variable} ${jetbrainsMono.variable}`}>
        {children}
        <DotNavigation />
        <ScrollToTop />
        <ChatBot />
      </body>
    </html>
  );
}
