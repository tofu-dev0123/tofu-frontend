import homeGrayIcon from '@/assets/images/home-gray-icon.png';
import listIcon from '@/assets/images/list-icon.png';
import addIcon from '@/assets/images/add-icon.png';

export const NAVIGATION_ITEMS = [
  {
    icon: homeGrayIcon,
    alt: 'home',
    path: '/admin/home',
    title: 'ホーム',
  },
  {
    icon: listIcon,
    alt: 'list',
    path: '/admin/posts',
    title: '投稿一覧',
  },
  {
    icon: addIcon,
    alt: 'add',
    path: '/admin/posts/new',
    title: '投稿作成',
  },
];

// アクティブなアイコンのインデックスを計算
export const getActiveIndex = (pathname: string): number => {
  return NAVIGATION_ITEMS.findIndex((item) => item.path === pathname);
};
