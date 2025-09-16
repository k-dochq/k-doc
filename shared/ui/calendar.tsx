'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  locale: Locale;
  className?: string;
  disabled?: (date: Date) => boolean;
}

interface CalendarLocale {
  months: string[];
  weekdays: string[];
  today: string;
}

const locales: Record<Locale, CalendarLocale> = {
  ko: {
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  },
  en: {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  },
  th: {
    months: [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ],
    weekdays: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    today: 'วันนี้',
  },
};

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
  </svg>
);

export function Calendar({ selected, onSelect, locale, className = '', disabled }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date());
  const today = new Date();
  const calendarLocale = locales[locale];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달의 첫 번째 날과 마지막 날
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력에서 시작하는 날 (이전 달의 마지막 주 포함)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // 달력에서 끝나는 날 (다음 달의 첫 주 포함)
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  // 달력에 표시할 모든 날짜들
  const calendarDays: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    if (disabled && disabled(date)) return;
    onSelect?.(date);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date) => isSameDay(date, today);
  const isSelected = (date: Date) => (selected ? isSameDay(date, selected) : false);
  const isCurrentMonth = (date: Date) => date.getMonth() === month;

  return (
    <div className={`w-fit rounded-lg border bg-white p-3 shadow-sm ${className}`}>
      {/* 헤더 */}
      <div className='mb-4 flex items-center justify-between'>
        <button
          type='button'
          onClick={() => navigateMonth('prev')}
          className='flex h-8 w-8 items-center justify-center rounded-md hover:bg-neutral-100'
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </button>

        <div className='text-sm font-medium'>
          {calendarLocale.months[month]} {year}
        </div>

        <button
          type='button'
          onClick={() => navigateMonth('next')}
          className='flex h-8 w-8 items-center justify-center rounded-md hover:bg-neutral-100'
        >
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className='mb-2 grid grid-cols-7 gap-1'>
        {calendarLocale.weekdays.map((weekday) => (
          <div
            key={weekday}
            className='flex h-8 items-center justify-center text-xs font-medium text-neutral-500'
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className='grid grid-cols-7 gap-1'>
        {calendarDays.map((date, index) => {
          const isDisabled = disabled && disabled(date);
          const dayIsToday = isToday(date);
          const dayIsSelected = isSelected(date);
          const dayIsCurrentMonth = isCurrentMonth(date);

          return (
            <button
              key={index}
              type='button'
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
                dayIsSelected
                  ? 'bg-[#da47ef] text-white'
                  : dayIsToday
                    ? 'bg-neutral-100 font-medium'
                    : 'hover:bg-neutral-50'
              } ${!dayIsCurrentMonth ? 'text-neutral-400' : 'text-neutral-900'} ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
