import homeIcon from '@/assets/images/home-icon.png';
import articleIcon from '@/assets/images/articles-icon.png';
import createIcon from '@/assets/images/create-icon.png';

export const NAVIGATION_ITEMS = [
  {
    icon: homeIcon,
    label: 'ホーム',
    href: '/home',
  },
  {
    icon: articleIcon,
    label: '記事一覧',
    href: '/posts',
  },
  {
    icon: createIcon,
    label: '記事作成',
    href: '/posts/new',
  },
];
