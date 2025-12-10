import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { dayNames, holidayTexts } from '../lib/constants';
import { getDaySchedule } from '../lib/utils';

interface HospitalDetailOperatingHoursV2Props {
  openingHours?: OpeningHours;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailOperatingHoursV2({
  openingHours,
  lang,
  dict,
}: HospitalDetailOperatingHoursV2Props) {
  if (!openingHours) {
    return null;
  }

  const days = dayNames[lang];

  const formatHours = (hours: string | null) => {
    if (!hours) return null;
    return hours.replace(' ~ ', '\n~\n');
  };

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospital.info.operatingHours}
      </h2>

      <div className='overflow-hidden'>
        {/* 헤더 */}
        <div className='grid min-w-0 grid-cols-7'>
          {days.map((day, index) => {
            const schedule = getDaySchedule(openingHours, index);
            const isSunday = index === 6;
            return (
              <div
                key={day}
                className={`flex items-center justify-center border-b border-neutral-200 py-2 text-center text-[13px] leading-[19px] ${
                  isSunday ? 'bg-neutral-100 text-[#e7000b]' : 'bg-[#feefff] text-neutral-700'
                } ${index === 0 ? 'border-l-0' : 'border-l border-neutral-200'} border-t border-neutral-200`}
              >
                <p>{day}</p>
              </div>
            );
          })}
        </div>

        {/* 바디 */}
        <div className='grid min-w-0 grid-cols-7'>
          {days.map((day, index) => {
            const schedule = getDaySchedule(openingHours, index);
            const hours = formatHours(schedule.hours);
            const isSunday = index === 6;

            return (
              <div
                key={day}
                className={`flex items-center justify-center py-2 text-center ${
                  index === 0 ? 'border-l-0' : 'border-l border-neutral-200'
                } border-b border-neutral-200`}
              >
                {schedule.isOpen && hours ? (
                  <p className='text-[13px] leading-[19px] whitespace-pre-line text-neutral-700'>
                    {hours}
                  </p>
                ) : (
                  <p
                    className={`whitespace-pre-line ${
                      isSunday ? 'bg-neutral-100 text-[#e7000b]' : 'bg-neutral-100 text-[#e7000b]'
                    } rounded-sm px-1 py-1 text-xs leading-4`}
                  >
                    {holidayTexts[lang]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
