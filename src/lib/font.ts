import { Roboto, IBM_Plex_Serif } from 'next/font/google';

export const logo = Roboto({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // ロゴ用に少し太さを持たせる
  variable: '--font-logo',
  display: 'swap',
});

export const subLogo = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sub-logo',
  display: 'swap',
});
