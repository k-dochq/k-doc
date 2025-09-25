import { type ScheduleCellProps } from '../lib/types';
import { holidayTexts } from '../lib/constants';

export function ScheduleCell({ day, dayIndex, schedule, lang }: ScheduleCellProps) {
  const isHoliday = !schedule.isOpen;

  return (
    <div
      className={`px-1 py-3 text-center ${dayIndex > 0 ? 'border-l border-[#F4A8FF]' : ''} ${
        isHoliday ? 'bg-gradient-to-b from-[#FFBCF4] to-[#AB7DFF]' : 'bg-white'
      }`}
    >
      {schedule.isOpen ? (
        <div className='text-sm text-black'>
          <div className='font-medium'>{schedule.hours?.split(' ~ ')[0]}</div>
          <div className='text-xs text-gray-500'>~</div>
          <div className='font-medium'>{schedule.hours?.split(' ~ ')[1]}</div>
        </div>
      ) : (
        <div className={`text-sm font-medium ${isHoliday ? 'text-white' : 'text-gray-500'}`}>
          {holidayTexts[lang]}
        </div>
      )}
    </div>
  );
}
