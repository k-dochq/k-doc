'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MyPostsIcon, ConsultationChatIcon } from './ActivityStatsIcons';

interface ActivityStatsSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ActivityStatsSectionV2({ lang, dict }: ActivityStatsSectionV2Props) {
  // 하드코딩된 데이터 (나중에 데이터 바인딩으로 교체)
  const myPostsCount = 2;
  const consultationChatCount = 3;

  const myPostsLabel = dict.my?.activityStats?.myPosts || '내가 작성한 글';
  const consultationChatListLabel =
    dict.my?.activityStats?.consultationChatList || '상담 채팅 목록';

  return (
    <div className='flex items-center justify-between rounded-xl border border-neutral-200 bg-white py-5'>
      {/* 내가 작성한 글 섹션 */}
      <div className='flex flex-1 flex-col items-center justify-center gap-1'>
        <MyPostsIcon />
        <div className='flex items-start gap-0.5 text-sm leading-[20px] text-neutral-700'>
          <p className='font-medium'>{myPostsLabel}</p>
          <p className='font-semibold'>{myPostsCount}</p>
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className='flex h-8 items-center justify-center'>
        <div className='h-8 w-px bg-neutral-200' />
      </div>

      {/* 상담 채팅 목록 섹션 */}
      <div className='flex flex-1 flex-col items-center justify-center gap-1'>
        <ConsultationChatIcon />
        <div className='flex items-start gap-0.5 text-sm leading-[20px] text-neutral-700'>
          <p className='font-medium'>{consultationChatListLabel}</p>
          <p className='font-semibold'>{consultationChatCount}</p>
        </div>
      </div>
    </div>
  );
}
