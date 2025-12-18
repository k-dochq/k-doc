'use client';

import { type Locale } from 'shared/config';
import { RecentLoginBadgeKoIcon } from './icons/RecentLoginBadgeKoIcon';
import { RecentLoginBadgeEnIcon } from './icons/RecentLoginBadgeEnIcon';
import { RecentLoginBadgeThIcon } from './icons/RecentLoginBadgeThIcon';

interface RecentLoginBadgeProps {
  lang: Locale;
}

export function RecentLoginBadge({ lang }: RecentLoginBadgeProps) {
  let Icon: typeof RecentLoginBadgeKoIcon;

  if (lang === 'ko') {
    Icon = RecentLoginBadgeKoIcon;
  } else if (lang === 'en') {
    Icon = RecentLoginBadgeEnIcon;
  } else {
    Icon = RecentLoginBadgeThIcon;
  }

  return (
    <div className='absolute -top-3 -left-2'>
      <Icon />
    </div>
  );
}
