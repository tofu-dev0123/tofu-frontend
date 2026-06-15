import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tofu | Webエンジニアの個人サイト',
  description:
    'Tofuの個人サイト。日々の学習内容や個人開発を通して得た気づきや知見を、エンジニア視点でまとめています。',
  openGraph: {
    title: 'Tofu | Webエンジニアの個人サイト',
    description:
      'Tofuの個人サイト。日々の学習内容や個人開発を通して得た気づきや知見を、エンジニア視点でまとめています。',
    type: 'website',
    url: 'https://www.tofubase.com',
    images: [
      {
        url: 'https://www.tofubase.com/ogp/default.png',
        width: 1200,
        height: 630,
        alt: 'Tofu',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tofu | Webエンジニアの個人サイト',
    description:
      'Tofuの個人サイト。日々の学習内容や個人開発を通して得た気づきや知見を、エンジニア視点でまとめています。',
    images: ['https://www.tofubase.com/ogp/default.png'],
  },
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
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
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
