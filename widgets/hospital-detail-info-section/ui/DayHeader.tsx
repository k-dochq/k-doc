import { type DayHeaderProps } from '../lib/types';

export function DayHeader({ day, dayIndex, isHoliday }: DayHeaderProps) {
  return (
    <div
      className={`border-b border-[#F4A8FF] px-1 py-2 text-center ${
        dayIndex < 6 ? 'border-r border-[#F4A8FF]' : ''
      } ${
        isHoliday ? 'bg-[#FFBCF4]' : 'bg-[#F9D1FF]'
      } ${dayIndex === 6 ? 'text-red-500' : 'text-black'}`}
    >
      <span className='block truncate text-sm font-medium' title={day}>
        {day}
      </span>
    </div>
  );
}
