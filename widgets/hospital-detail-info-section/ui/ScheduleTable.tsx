import { type ScheduleTableProps } from '../lib/types';
import { dayNames } from '../lib/constants';
import { getDaySchedule } from '../lib/utils';
import { DayHeader } from './DayHeader';
import { ScheduleCell } from './ScheduleCell';

export function ScheduleTable({ lang, openingHours }: ScheduleTableProps) {
  return (
    <div className='overflow-hidden border border-[#F4A8FF]'>
      {/* 요일 헤더 */}
      <div className='mb-0 grid grid-cols-7 gap-0'>
        {dayNames[lang].map((day, index) => {
          const schedule = getDaySchedule(openingHours, index);
          const isHoliday = !schedule.isOpen;

          return <DayHeader key={day} day={day} dayIndex={index} isHoliday={isHoliday} />;
        })}
      </div>

      {/* 운영시간 테이블 */}
      <div className='grid grid-cols-7 gap-0'>
        {dayNames[lang].map((day, index) => {
          const schedule = getDaySchedule(openingHours, index);

          return (
            <ScheduleCell key={day} day={day} dayIndex={index} schedule={schedule} lang={lang} />
          );
        })}
      </div>
    </div>
  );
}
