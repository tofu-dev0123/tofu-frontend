import AboutMain from '@/components/features/public/about/AboutMain';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { AboutResponse } from '@/types/api/public/about';

export const revalidate = 3600;

const FALLBACK: AboutResponse = {
  profile: {
    headline: 'Web Developer / Software Engineer',
    bio: '',
    site_description: '',
  },
  timelines: [],
};

export default async function Page() {
  let data: AboutResponse;
  try {
    data = await get<AboutResponse>(API_ENDPOINTS.about.get);
  } catch (error) {
    // バックエンド不通時はビルドを止めず ISR で後から反映させる
    console.warn('[about] 取得に失敗:', error);
    data = FALLBACK;
  }

  return (
    <div>
      <AboutMain profile={data.profile} timelines={data.timelines} />
    </div>
  );
}
