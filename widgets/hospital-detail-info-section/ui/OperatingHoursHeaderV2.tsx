import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type Locale } from 'shared/config';
import { dayNames } from '../lib/constants';
import { getDaySchedule } from '../lib/utils';

interface OperatingHoursHeaderV2Props {
  openingHours: OpeningHours;
  lang: Locale;
}

export function OperatingHoursHeaderV2({ openingHours, lang }: OperatingHoursHeaderV2Props) {
  const days = dayNames[lang];

  const getHeaderClassName = (index: number, isClosed: boolean) => {
    const isSunday = index === 6;
    const baseClasses =
      'flex items-center justify-center border-b border-neutral-200 py-2 text-center text-[13px] leading-[19px]';
    const backgroundClass = isSunday ? 'bg-neutral-100' : 'bg-[#feefff]';
    const textColorClass = isSunday
      ? isClosed
        ? 'text-[#e7000b]'
        : 'text-primary'
      : 'text-neutral-700';
    const borderClass = index === 0 ? 'border-l-0' : 'border-l border-neutral-200';
    const topBorderClass = 'border-t border-neutral-200';

    return `${baseClasses} ${backgroundClass} ${textColorClass} ${borderClass} ${topBorderClass}`;
  };

  return (
    <div className='grid min-w-0 grid-cols-7'>
      {days.map((day, index) => {
        const schedule = getDaySchedule(openingHours, index);
        const isClosed = !schedule.isOpen || !schedule.hours;

        return (
          <div key={day} className={getHeaderClassName(index, isClosed)}>
            <p>{day}</p>
          </div>
        );
      })}
    </div>
  );
}
