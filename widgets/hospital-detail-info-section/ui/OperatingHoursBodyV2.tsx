import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type Locale } from 'shared/config';
import { dayNames, holidayTexts } from '../lib/constants';
import { getDaySchedule } from '../lib/utils';

interface OperatingHoursBodyV2Props {
  openingHours: OpeningHours;
  lang: Locale;
}

function formatHours(hours: string | null): string | null {
  if (!hours) return null;
  return hours.replace(' ~ ', '\n~\n');
}

export function OperatingHoursBodyV2({ openingHours, lang }: OperatingHoursBodyV2Props) {
  const days = dayNames[lang];

  const getBodyClassName = (index: number, isClosed: boolean) => {
    const baseClasses = 'flex items-center justify-center py-2 text-center';
    const borderClass = index === 0 ? 'border-l-0' : 'border-l border-neutral-200';
    const bottomBorderClass = 'border-b border-neutral-200';
    const backgroundClass = isClosed ? 'bg-neutral-100' : '';

    return `${baseClasses} ${borderClass} ${bottomBorderClass} ${backgroundClass}`;
  };

  return (
    <div className='grid min-w-0 grid-cols-7'>
      {days.map((day, index) => {
        const schedule = getDaySchedule(openingHours, index);
        const hours = formatHours(schedule.hours);
        const isClosed = !schedule.isOpen || !hours;

        return (
          <div key={day} className={getBodyClassName(index, isClosed)}>
            {schedule.isOpen && hours ? (
              <p className='text-[13px] leading-[19px] whitespace-pre-line text-neutral-700'>
                {hours}
              </p>
            ) : (
              <p className='rounded-sm px-1 py-1 text-xs leading-4 whitespace-pre-line text-[#e7000b]'>
                {holidayTexts[lang]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
