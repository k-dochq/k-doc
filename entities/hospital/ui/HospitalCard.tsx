import { type HospitalCardData } from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { HospitalThumbnail } from './HospitalThumbnail';
import { HospitalInfo } from './HospitalInfo';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { LikeButton } from 'shared/ui/buttons/LikeButton';
import { extractLocalizedText } from 'shared/lib';

interface HospitalCardProps {
  hospital: HospitalCardData;
  dict: Dictionary;
  lang: Locale;
  user?: User | null;
  onToggleLike?: (hospitalId: string) => void;
  isLikeLoading?: boolean;
  showLikeButton?: boolean;
}

export function HospitalCard({
  hospital,
  dict,
  lang,
  user,
  onToggleLike,
  isLikeLoading = false,
  showLikeButton = false,
}: HospitalCardProps) {
  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user && hospital.likedUserIds ? hospital.likedUserIds.includes(user.id) : false;

  // hospital.displayLocationName이 있으면 사용하고, 없으면 기존 address 사용
  const displayAddress = hospital.displayLocationName
    ? (hospital.displayLocationName as { ko_KR?: string; en_US?: string; th_TH?: string })
    : hospital.address;

  return (
    <div
      className='flex min-w-0 gap-3 rounded-xl border border-white shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'
      style={{
        background: 'rgba(255, 255, 255, 0.50)',
      }}
    >
      <HospitalThumbnail imageUrl={hospital.thumbnailImageUrl} />
      <div className='flex min-w-0 flex-1 flex-col justify-center gap-1 pr-3'>
        <div className='flex items-start justify-between'>
          <div className='min-w-0 flex-1'>
            <HospitalInfo
              name={hospital.name}
              address={displayAddress}
              prices={hospital.prices}
              rating={hospital.rating}
              reviewCount={hospital.reviewCount}
              discountRate={hospital.discountRate}
              medicalSpecialties={hospital.medicalSpecialties}
              likeCount={hospital.likeCount}
              dict={dict}
              lang={lang}
            />
          </div>

          {/* 좋아요 버튼 - 항상 표시 */}
          {showLikeButton && hospital.likeCount !== undefined && (
            <div
              className='mt-auto flex shrink-0'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <LikeButton
                count={hospital.likeCount}
                isLiked={isLiked}
                onClick={() => onToggleLike?.(hospital.id)}
                isLoading={isLikeLoading}
                vertical={true}
                showCount={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
