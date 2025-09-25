import { type DayHeaderProps } from '../lib/types';

export function DayHeader({ day, dayIndex, isHoliday }: DayHeaderProps) {
  return (
    <div
      className={`px-1 py-2 text-center ${dayIndex > 0 ? 'border-l border-[#F4A8FF]' : ''} ${
        isHoliday ? 'bg-[#FFBCF4]' : 'bg-[#F9D1FF]'
      } ${dayIndex === 6 ? 'text-red-500' : 'text-black'}`}
    >
      <span className='text-sm font-medium'>{day}</span>
    </div>
  );
}
