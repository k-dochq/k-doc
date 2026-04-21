'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { type Locale } from 'shared/config';
import { resolveDrawer } from 'shared/lib/drawer';

interface DatePickerDrawerContentV2Props {
  initialValue?: Date;
  locale: Locale;
  disabled?: (date: Date) => boolean;
  confirmLabel: string;
  titlePlaceholder: string;
  minMonth?: Date;
  maxMonth?: Date;
}

const INTL_LOCALE_MAP: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  th: 'th-TH',
  'zh-Hant': 'zh-Hant',
  ja: 'ja-JP',
  hi: 'hi-IN',
  tl: 'fil-PH',
  ar: 'ar',
  ru: 'ru-RU',
};

const DEFAULT_MONTHS_AHEAD = 24;

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const monthDiff = (from: Date, to: Date): number =>
  (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());

const buildCalendarDays = (visibleMonth: Date): Date[] => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const start = new Date(firstDay);
  start.setDate(start.getDate() - firstDay.getDay());

  const end = new Date(lastDay);
  end.setDate(end.getDate() + (6 - lastDay.getDay()));

  const days: Date[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
};

const TitleCalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      d='M2.5 9.5H21.5V20.5C21.5 21.0523 21.0523 21.5 20.5 21.5H3.5C2.94771 21.5 2.5 21.0523 2.5 20.5V9.5Z'
      fill='#F15BFF'
      stroke='#F15BFF'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <path
      d='M2.5 5C2.5 4.44771 2.94771 4 3.5 4H20.5C21.0523 4 21.5 4.44771 21.5 5V9.5H2.5V5Z'
      stroke='#F15BFF'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
    <path d='M8 2.5V6.5' stroke='#F15BFF' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M16 2.5V6.5' stroke='#F15BFF' strokeWidth='1.5' strokeLinecap='round' />
    <path
      d='M8 15.5L10.6667 18L16 13'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      d='M5 7.5L10 12.5L15 7.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export function DatePickerDrawerContentV2({
  initialValue,
  locale,
  disabled,
  confirmLabel,
  titlePlaceholder,
  minMonth,
  maxMonth,
}: DatePickerDrawerContentV2Props) {
  const intlLocale = INTL_LOCALE_MAP[locale];
  const today = useMemo(() => startOfDay(new Date()), []);

  const resolvedMinMonth = useMemo(
    () => startOfMonth(minMonth ?? today),
    [minMonth, today],
  );
  const resolvedMaxMonth = useMemo(() => {
    if (maxMonth) return startOfMonth(maxMonth);
    const fallback = new Date(today);
    fallback.setMonth(fallback.getMonth() + DEFAULT_MONTHS_AHEAD);
    return startOfMonth(fallback);
  }, [maxMonth, today]);

  const clampToRange = (candidate: Date): Date => {
    const c = startOfMonth(candidate);
    if (c < resolvedMinMonth) return resolvedMinMonth;
    if (c > resolvedMaxMonth) return resolvedMaxMonth;
    return c;
  };

  const [selected, setSelected] = useState<Date | undefined>(initialValue);
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    clampToRange(initialValue ?? today),
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleMouseDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [dropdownOpen]);

  const weekdayLabels = useMemo(() => {
    const labels: string[] = [];
    const base = new Date(2024, 5, 16);
    const formatter = new Intl.DateTimeFormat(intlLocale, { weekday: 'short' });
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      labels.push(formatter.format(d));
    }
    return labels;
  }, [intlLocale]);

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(intlLocale, { year: 'numeric', month: 'long' }),
    [intlLocale],
  );

  const monthOptions = useMemo(() => {
    const count = monthDiff(resolvedMinMonth, resolvedMaxMonth) + 1;
    return Array.from({ length: Math.max(count, 1) }).map((_, index) => {
      const optionDate = new Date(resolvedMinMonth);
      optionDate.setMonth(resolvedMinMonth.getMonth() + index);
      return optionDate;
    });
  }, [resolvedMinMonth, resolvedMaxMonth]);

  const titleText = useMemo(() => {
    if (!selected) return titlePlaceholder;
    const datePart = new Intl.DateTimeFormat(intlLocale, {
      month: 'long',
      day: 'numeric',
    }).format(selected);
    const weekday = new Intl.DateTimeFormat(intlLocale, { weekday: 'short' }).format(selected);
    return `${datePart} (${weekday})`;
  }, [intlLocale, selected, titlePlaceholder]);

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);

  const handleDayClick = (date: Date) => {
    if (disabled?.(date)) return;
    setSelected(date);
  };

  const handleSelectMonth = (candidate: Date) => {
    setVisibleMonth(startOfMonth(candidate));
    setDropdownOpen(false);
  };

  const handleConfirm = () => {
    resolveDrawer(selected);
  };

  return (
    <div className='flex w-full flex-col bg-white pb-10'>
      <div className='flex items-center gap-2 px-5 py-4'>
        <TitleCalendarIcon className='h-6 w-6' />
        <p className='text-lg leading-7 font-semibold text-neutral-700'>{titleText}</p>
      </div>

      <div className='flex flex-col gap-5 px-5'>
        <div ref={dropdownRef} className='relative'>
          <button
            type='button'
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup='listbox'
            className='flex items-center gap-1 text-base leading-6 font-semibold text-neutral-700'
          >
            <span>{monthFormatter.format(visibleMonth)}</span>
            <ChevronDownIcon
              className={`h-5 w-5 text-neutral-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {dropdownOpen && (
            <ul
              role='listbox'
              className='absolute top-full left-0 z-10 mt-2 max-h-[240px] w-48 overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg'
            >
              {monthOptions.map((optionDate) => {
                const isActive = isSameMonth(optionDate, visibleMonth);
                return (
                  <li key={optionDate.toISOString()}>
                    <button
                      type='button'
                      role='option'
                      aria-selected={isActive}
                      onClick={() => handleSelectMonth(optionDate)}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100 ${
                        isActive ? 'font-semibold text-primary-900' : 'text-neutral-700'
                      }`}
                    >
                      {monthFormatter.format(optionDate)}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            {weekdayLabels.map((label) => (
              <div
                key={label}
                className='flex w-[42px] items-center justify-center text-sm leading-5 font-medium text-neutral-500'
              >
                {label}
              </div>
            ))}
          </div>

          {Array.from({ length: calendarDays.length / 7 }).map((_, weekIndex) => (
            <div key={weekIndex} className='flex items-center justify-between'>
              {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
                const dayIsDisabled = disabled ? disabled(date) : false;
                const dayIsSelected = selected ? isSameDay(date, selected) : false;
                const dayIsToday = isSameDay(date, today);
                const dayInMonth = isSameMonth(date, visibleMonth);
                const isMuted = !dayInMonth || dayIsDisabled;

                let textClass = 'text-neutral-700';
                if (dayIsSelected) {
                  textClass = 'text-white';
                } else if (dayIsToday) {
                  textClass = 'text-primary-900';
                } else if (isMuted) {
                  textClass = 'text-neutral-300';
                }

                return (
                  <button
                    key={date.toISOString()}
                    type='button'
                    onClick={() => handleDayClick(date)}
                    disabled={dayIsDisabled}
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-lg text-base leading-6 font-medium transition-colors ${
                      dayIsSelected ? 'bg-primary-900' : ''
                    } ${dayIsDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${textClass}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className='px-5 pt-4'>
        <button
          type='button'
          onClick={handleConfirm}
          disabled={!selected}
          className='bg-sub-900 hover:bg-sub-900/90 flex h-14 w-full items-center justify-center rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
