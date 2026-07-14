import type { AboutTimeline } from '@/types/api/public/about';

type Props = {
  timelines: AboutTimeline[];
};

function Background({ timelines }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="lg:text-2xl text-xl font-bold font-sub-logo tracking-[0.02em]">
        Background
      </h2>
      <div className="relative pl-[84px]">
        <div className="absolute left-[63px] top-2 bottom-2 w-px bg-gray-200" />
        {timelines.map((timeline, index) => {
          const prevYear = index > 0 ? timelines[index - 1].year : null;
          const showYear = timeline.year !== prevYear;
          return (
            <div key={timeline.timeline_id} className="relative pb-8 last:pb-0">
              {showYear && (
                <span className="absolute -left-[84px] top-0 w-12 text-right lg:text-lg text-base font-bold font-sub-logo tracking-[0.02em]">
                  {timeline.year}
                </span>
              )}
              <span className="absolute -left-[25px] top-[7px] size-[9px] rounded-full bg-gray-900 ring-4 ring-white" />
              {timeline.title && (
                <p className="lg:text-base text-sm font-semibold font-sub-logo tracking-[0.02em] leading-relaxed">
                  {timeline.title}
                </p>
              )}
              {timeline.body && (
                <p className="mt-1 text-sm font-sub-logo tracking-[0.02em] leading-relaxed text-gray-500">
                  {timeline.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Background;
