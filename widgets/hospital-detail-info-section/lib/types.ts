import { type Locale } from 'shared/config';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';

export interface HospitalDetailInfoSectionProps {
  hospital: Hospital & {
    openingHours?: OpeningHours;
    openingHoursNotice?: string;
  };
  lang: Locale;
}

export interface DayScheduleData {
  isOpen: boolean;
  hours: string | null;
}

export interface ScheduleCellProps {
  day: string;
  dayIndex: number;
  schedule: DayScheduleData;
  lang: Locale;
}

export interface DayHeaderProps {
  day: string;
  dayIndex: number;
  isHoliday: boolean;
}

export interface ScheduleTableProps {
  lang: Locale;
  openingHours?: OpeningHours;
}

export interface NoticeSectionProps {
  notice?: string;
}
