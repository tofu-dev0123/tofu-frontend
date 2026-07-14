import AboutMain from '@/components/features/public/about/AboutMain';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { AboutResponse } from '@/types/api/public/about';

export const revalidate = 3600;

export default async function Page() {
  const { profile, timelines } = await get<AboutResponse>(
    API_ENDPOINTS.about.get
  );

  return (
    <div>
      <AboutMain profile={profile} timelines={timelines} />
    </div>
  );
}
