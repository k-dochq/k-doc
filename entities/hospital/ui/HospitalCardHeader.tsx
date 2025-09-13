'use client';

import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { LikeButton } from 'shared/ui/buttons/LikeButton';
import { HospitalCardLocation } from './HospitalCardLocation';

interface HospitalCardHeaderProps {
  hospital: Hospital;
  lang: Locale;
  user: User | null;
  onToggleLike?: (hospitalId: string) => void;
}

export function HospitalCardHeader({
  hospital,
  lang,
  user,
  onToggleLike,
}: HospitalCardHeaderProps) {
  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user ? hospital.likedUserIds.includes(user.id) : false;

  return (
    <div className='flex w-full flex-col items-start justify-between'>
      <div className='flex w-full items-center'>
        <HospitalCardLocation hospital={hospital} lang={lang} />
        <div
          className='ml-auto'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <LikeButton
            count={hospital.likeCount}
            isLiked={isLiked}
            onClick={() => onToggleLike?.(hospital.id)}
          />
        </div>
      </div>
    </div>
  );
}
