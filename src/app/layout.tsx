import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import DotNavigation from "./components/DotNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "황민 포트폴리오 | Min Hwang Portfolio",
  description: "풀스택 개발자 황민의 포트폴리오 사이트입니다. 웹 개발, React, Next.js, TypeScript, Node.js, Python 등의 기술 스택을 보유하고 있습니다.",
  keywords: "풀스택 개발자, 웹 개발자, React, Next.js, TypeScript, Node.js, Python, 포트폴리오, 황민, Min Hwang",
  authors: [{ name: "Min Hwang", url: "https://minhwang.dev" }],
  creator: "Min Hwang",
  publisher: "Min Hwang",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "황민 포트폴리오 | Min Hwang Portfolio",
    description: "풀스택 개발자 황민의 포트폴리오 사이트입니다. 웹 개발, React, Next.js, TypeScript, Node.js, Python 등의 기술 스택을 보유하고 있습니다.",
    url: "https://minhwang.dev",
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
    canonical: "https://minhwang.dev",
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
        <meta name="naver-site-verification" content="your-naver-site-verification-code" />
        <meta name="google-site-verification" content="your-google-site-verification-code" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <DotNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
