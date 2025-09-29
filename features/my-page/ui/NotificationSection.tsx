'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SwitchMenuItem } from './SwitchMenuItem';
import { useUserProfile } from 'features/user-profile';
import { useUpdateUserProfile } from 'features/user-profile';

interface NotificationSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function NotificationSection({ lang, dict }: NotificationSectionProps) {
  const { data: userProfile, isLoading } = useUserProfile();
  const updateUserProfile = useUpdateUserProfile({
    onSuccess: () => {
      console.log('마케팅 알림 설정이 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('마케팅 알림 설정 업데이트 실패:', error);
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

  if (isLoading) {
    return (
      <div className='flex w-full flex-col gap-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
          {dict.my?.notification?.title || '알림'}
        </h2>
        <div className='flex w-full flex-col gap-3'>
          <div className='flex w-full items-center justify-between rounded-lg bg-white/50 p-4'>
            <span className='text-sm font-medium text-gray-900'>
              {dict.my?.notification?.myPosts || '내가 작성한 게시글'}
            </span>
            <div className='h-6 w-11 animate-pulse rounded-full bg-gray-200'></div>
          </div>
          <div className='flex w-full items-center justify-between rounded-lg bg-white/50 p-4'>
            <span className='text-sm font-medium text-gray-900'>
              {dict.my?.notification?.eventService || '이벤트/서비스 혜택 알림'}
            </span>
            <div className='h-6 w-11 animate-pulse rounded-full bg-gray-200'></div>
          </div>
        </div>
      </div>
    );
  }

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
          onChange={handleEventServiceToggle}
          disabled={updateUserProfile.isPending}
        />
      </div>
    </div>
  );
}
