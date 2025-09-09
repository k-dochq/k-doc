import { Clock } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type OpeningHours } from '../api/entities/opening-hours-types';

interface HospitalOperatingHoursProps {
  openingHours?: OpeningHours;
  lang: Locale;
}

const DAYS_OF_WEEK = {
  ko: ['월', '화', '수', '목', '금', '토', '일'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  th: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
};

export function HospitalOperatingHours({ openingHours, lang }: HospitalOperatingHoursProps) {
  // 운영시간 포맷팅
  const formatOperatingHours = () => {
    if (!openingHours) {
      return '운영시간 정보 없음';
    }

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = DAYS_OF_WEEK[lang] || DAYS_OF_WEEK.ko;

    return days
      .map((day, index) => {
        const dayInfo = openingHours?.[day as keyof OpeningHours];
        const dayName = dayNames[index];

        if (!dayInfo) {
          return `${dayName}: 정보 없음`;
        }

        if (dayInfo.holiday === true) {
          return `${dayName}: 휴무`;
        }

        if (!dayInfo.openTime || !dayInfo.closeTime) {
          return `${dayName}: 시간 미정`;
        }

        // ISO 시간을 한국 시간으로 변환
        const openTime = new Date(dayInfo.openTime).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const closeTime = new Date(dayInfo.closeTime).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        return `${dayName}: ${openTime} - ${closeTime}`;
      })
      .join('\n');
  };

  return (
    <div className='mb-6'>
      <h3 className='mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900'>
        <Clock className='h-5 w-5' />
        운영시간
      </h3>
      <div className='rounded-lg bg-gray-50 p-4'>
        <pre className='font-mono text-sm whitespace-pre-line text-gray-700'>
          {formatOperatingHours()}
        </pre>
      </div>
    </div>
  );
}
