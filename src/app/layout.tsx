import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ToastContainer from '@/components/toast/ToastContainer';
import { logo, grotesk } from '@/lib/font';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'tofu blog | 学びと個人開発を綴るブログ',
  description:
    'tofuの個人ブログ。日々の学習内容や個人開発を通して得た気づきや知見を、エンジニア視点でまとめています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`
          h-full
          ${logo.variable}
          ${grotesk.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
