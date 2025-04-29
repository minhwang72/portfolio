import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import DotNavigation from "./components/DotNavigation";
import ScrollToTop from './components/ScrollToTop';

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pf.eungming.com'),
  title: "황민 포트폴리오 | Min Hwang Portfolio",
  description: "풀스택 개발자 황민의 포트폴리오 사이트입니다. 웹 개발, React, Next.js, TypeScript, Node.js, Python 등의 기술 스택을 보유하고 있습니다.",
  keywords: "풀스택 개발자, 웹 개발자, React, Next.js, TypeScript, Node.js, Python, 포트폴리오, 황민, Min Hwang",
  authors: [{ name: "Min Hwang", url: "https://pf.eungming.com" }],
  creator: "Min Hwang",
  publisher: "Min Hwang",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "황민 포트폴리오 | Min Hwang Portfolio",
    description: "풀스택 개발자 황민의 포트폴리오 사이트입니다. 웹 개발, React, Next.js, TypeScript, Node.js, Python 등의 기술 스택을 보유하고 있습니다.",
    url: "https://pf.eungming.com",
    siteName: "Min Hwang Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "황민 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "황민 포트폴리오 | Min Hwang Portfolio",
    description: "풀스택 개발자 황민의 포트폴리오 사이트입니다.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://pf.eungming.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="naver-site-verification" content="your-naver-site-verification-code" />
        <meta name="google-site-verification" content="your-google-site-verification-code" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={notoSansKR.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <DotNavigation />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
