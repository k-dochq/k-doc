import { type ScheduleCellProps } from '../lib/types';
import { holidayTexts } from '../lib/constants';

export function ScheduleCell({ day, dayIndex, schedule, lang }: ScheduleCellProps) {
  const isHoliday = !schedule.isOpen;

  return (
    <div
      className={`py-3 text-center ${dayIndex < 6 ? 'border-r border-[#F4A8FF]' : ''} ${
        isHoliday ? 'bg-gradient-to-b from-[#FFBCF4] to-[#AB7DFF]' : 'bg-white'
      }`}
    >
      {schedule.isOpen ? (
        <div className='text-xs text-black'>
          <div className='truncate font-normal' title={schedule.hours?.split(' ~ ')[0]}>
            {schedule.hours?.split(' ~ ')[0]}
          </div>
          <div className='text-xs text-gray-500'>~</div>
          <div className='truncate font-normal' title={schedule.hours?.split(' ~ ')[1]}>
            {schedule.hours?.split(' ~ ')[1]}
          </div>
        </div>
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center truncate text-xs font-normal ${isHoliday ? 'text-white' : 'text-gray-500'}`}
        >
          {holidayTexts[lang]}
        </div>
      )}
    </div>
  );
}
