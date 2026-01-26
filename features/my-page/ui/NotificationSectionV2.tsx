'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SwitchMenuItemV2 } from './SwitchMenuItemV2';
import { useUserProfile } from 'features/user-profile';
import { useUpdateUserProfile } from 'features/user-profile';

interface NotificationSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function NotificationSectionV2({ lang, dict }: NotificationSectionV2Props) {
  const { data: userProfile, isLoading } = useUserProfile();
  const updateUserProfile = useUpdateUserProfile({
    onSuccess: () => {
      console.log('Marketing notification settings updated');
    },
    onError: (error) => {
      console.error('Failed to update marketing notification settings:', error);
    },
  });

  const [myPostsEnabled, setMyPostsEnabled] = useState(true);
  const [eventServiceEnabled, setEventServiceEnabled] = useState(false);

  // 사용자 프로필에서 마케팅 알림 설정 로드
  useEffect(() => {
    if (userProfile?.raw_user_meta_data?.marketing_notifications !== undefined) {
      setEventServiceEnabled(userProfile.raw_user_meta_data.marketing_notifications);
    }
  }, [userProfile]);

  const handleEventServiceToggle = (checked: boolean) => {
    setEventServiceEnabled(checked);
    updateUserProfile.mutate({
      marketingNotifications: checked,
    });
  };

  const title = dict.my?.notification?.title || 'Notifications';
  const myPostsLabel = dict.my?.notification?.myPosts || 'My Posts';
  const eventServiceLabel = dict.my?.notification?.eventService || 'Event/Service Benefits';

  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-lg font-semibold text-neutral-700'>{title}</h2>

      <div className='mt-2 flex w-full flex-col'>
        <SwitchMenuItemV2
          title={myPostsLabel}
          checked={myPostsEnabled}
          onChange={setMyPostsEnabled}
        />
        <div className='mt-3'>
          <SwitchMenuItemV2
            title={eventServiceLabel}
            checked={eventServiceEnabled}
            onChange={handleEventServiceToggle}
            disabled={updateUserProfile.isPending || isLoading}
          />
        </div>
      </div>
    </div>
  );
}
