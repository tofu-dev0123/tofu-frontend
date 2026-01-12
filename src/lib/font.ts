import { IBM_Plex_Serif, Space_Grotesk } from 'next/font/google';

export const logo = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // ロゴ用に少し太さを持たせる
  variable: '--font-logo',
  display: 'swap',
});

export const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});
