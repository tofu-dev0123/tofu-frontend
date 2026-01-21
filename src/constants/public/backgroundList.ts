export type Event = {
  month: string;
  title: string;
};

export type YearEvents = {
  year: string;
  events: Event[];
};

export type BackgroundList = {
  yearEvents: YearEvents[];
};

export const backgroundList: BackgroundList = {
  yearEvents: [
    {
      year: '2026',
      events: [
        {
          month: '1',
          title: '個人サイトを公開',
        },
      ],
    },
    {
      year: '2025',
      events: [
        {
          month: '4',
          title: 'Webエンジニアに転職',
        },
      ],
    },
    {
      year: '2019',
      events: [
        {
          month: '4',
          title: '都内の公立中学校教員として着任',
        },
        {
          month: '3',
          title: '中央大学理工学部 卒業',
        },
      ],
    },
  ],
};
