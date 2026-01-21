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
      year: '2019',
      events: [
        {
          month: '3',
          title: '中央大学理工学部数学科 卒業',
        },
        {
          month: '4',
          title: '都内の公立中学校に数学科教員として着任',
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
  ],
};
