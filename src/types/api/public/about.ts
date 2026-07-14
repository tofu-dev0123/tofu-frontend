export type AboutProfile = {
  headline: string;
  bio: string;
  site_description: string;
};

export type AboutTimeline = {
  timeline_id: number;
  year: number;
  title: string | null;
  body: string | null;
  sort_order: number;
};

export type AboutResponse = {
  profile: AboutProfile;
  timelines: AboutTimeline[];
};
