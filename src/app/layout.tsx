import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import DotNavigation from "./components/DotNavigation";
import ScrollToTop from './components/ScrollToTop';
import { Inter } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://pf.eungming.com'),
  title: "Min Hwang | Full-Stack Engineer",
  description: "Building ideas into reality. Full-Stack Engineer based in Seoul, South Korea.",
  keywords: "풀스택 개발자, 웹 개발자, React, Next.js, TypeScript, Node.js, Python, 포트폴리오, 황민, Min Hwang",
  authors: [{ name: "Min Hwang", url: "https://pf.eungming.com" }],
  creator: "Min Hwang",
  publisher: "Min Hwang",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "https://pf.eungming.com/favicon.ico", sizes: "any" },
      { url: "https://pf.eungming.com/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "https://pf.eungming.com/favicon.ico",
    apple: "https://pf.eungming.com/favicon.ico",
  },
  openGraph: {
    title: "Min Hwang | Full-Stack Engineer",
    description: "Building ideas into reality. Full-Stack Engineer based in Seoul, South Korea.",
    url: "https://pf.eungming.com",
    siteName: "Min Hwang Portfolio",
    images: [
      {
        url: "https://pf.eungming.com/images/profile/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Min Hwang Profile",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Min Hwang | Full-Stack Engineer",
    description: "Building ideas into reality. Full-Stack Engineer based in Seoul, South Korea.",
    images: ["https://pf.eungming.com/images/profile/profile.jpeg"],
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
      <body className={`${inter.className} ${notoSansKR.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <DotNavigation />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
