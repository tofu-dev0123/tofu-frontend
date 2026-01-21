import { backgroundList } from '@/constants/admin/backgroundList';

function Background() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="lg:text-2xl text-xl font-bold font-sub-logo tracking-[0.02em]">
        Background
      </h2>
      <div className="flex flex-col gap-8">
        {backgroundList.yearEvents.map((yearEvent) => (
          <div key={yearEvent.year} className="flex gap-8">
            <h3 className="lg:w-16 w-8 lg:text-lg text-base font-bold font-sub-logo tracking-[0.02em]">
              {yearEvent.year}
            </h3>
            <div className="flex-1 flex flex-col gap-2">
              <ul className="w-full list-disc list-inside flex flex-col gap-2">
                {yearEvent.events.map((event) => (
                  <div
                    key={`${yearEvent.year}-${event.month}`}
                    className="flex w-full"
                  >
                    <label className="lg:w-10 w-8 lg:text-lg text-base font-sub-logo tracking-[0.02em]">
                      {event.month}
                    </label>
                    <li
                      key={`${yearEvent.year}-${event.month}`}
                      className="flex-1 list-none lg:text-lg text-base font-sub-logo tracking-[0.02em]"
                    >
                      {event.title}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Background;
