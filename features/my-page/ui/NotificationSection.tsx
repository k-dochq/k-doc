'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SwitchMenuItem } from './SwitchMenuItem';

interface NotificationSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function NotificationSection({ lang, dict }: NotificationSectionProps) {
  const [myPostsEnabled, setMyPostsEnabled] = useState(true);
  const [eventServiceEnabled, setEventServiceEnabled] = useState(false);

  return (
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg font-semibold text-gray-900'>
        {dict.my?.notification?.title || '알림'}
      </h2>

      <div className='flex w-full flex-col gap-3'>
        <SwitchMenuItem
          title={dict.my?.notification?.myPosts || '내가 작성한 게시글'}
          checked={myPostsEnabled}
          onChange={setMyPostsEnabled}
        />
        <SwitchMenuItem
          title={dict.my?.notification?.eventService || '이벤트/서비스 혜택 알림'}
          checked={eventServiceEnabled}
          onChange={setEventServiceEnabled}
        />
      </div>
    </div>
  );
}
