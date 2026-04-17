import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';

const WEEKDAY_INDEX: Record<keyof OpeningHours, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  launchTime: -1,
};

export function getHospitalClosedWeekdays(openingHours: OpeningHours | undefined): Set<number> {
  const closed = new Set<number>();
  if (!openingHours) return closed;

  (Object.keys(WEEKDAY_INDEX) as Array<keyof OpeningHours>).forEach((key) => {
    const index = WEEKDAY_INDEX[key];
    if (index < 0) return;
    if (openingHours[key]?.holiday === true) {
      closed.add(index);
    }
  });

  return closed;
}
