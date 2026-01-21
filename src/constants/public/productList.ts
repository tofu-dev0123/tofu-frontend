export type Product = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  githubUrl?: string;
};

export const productList: Product[] = [
  {
    title: '個人サイト',
    description:
      'Tofuの個人サイト。ブログや個人開発のプロダクトを公開しています。今閲覧しているサイトがこちらになります。',
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'MySQL',
      'AWS',
      'Vercel',
    ],
    url: 'https://www.tofubase.com/',
  },
];
