'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { FavoritesHeartIcon, ReservationCalendarIcon } from './LikeReservationIcons';

interface LikeReservationSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function LikeReservationSection({ lang, dict }: LikeReservationSectionProps) {
  const favoritesLabel = dict.my?.likeReservation?.favorites ?? 'Favorites';
  const reservationsLabel = dict.my?.likeReservation?.reservations ?? 'My Reservations';

  return (
    <div className='flex flex-col rounded-xl border border-neutral-200 bg-white'>
      <LocaleLink
        href='/favorites'
        locale={lang}
        className='flex items-center gap-2 p-4'
      >
        <FavoritesHeartIcon />
        <span className='text-sm font-medium leading-5 text-neutral-700'>
          {favoritesLabel}
        </span>
      </LocaleLink>
      <LocaleLink
        href='/consultation?tab=appointment'
        locale={lang}
        className='flex items-center gap-2 p-4'
      >
        <ReservationCalendarIcon />
        <span className='text-sm font-medium leading-5 text-neutral-700'>
          {reservationsLabel}
        </span>
      </LocaleLink>
    </div>
  );
}
