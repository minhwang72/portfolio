import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "황민 포트폴리오",
  description: "본질에 집중하는 개발자, 황민입니다.",
  openGraph: {
    title: "황민 포트폴리오",
    description: "본질에 집중하는 개발자, 황민입니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "황민 포트폴리오",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
