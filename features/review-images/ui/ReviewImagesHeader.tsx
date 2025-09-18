'use client';

import { type Locale } from 'shared/config';
import {
  type ImageNavigationData,
  generateHeaderText,
} from 'entities/review/model/image-navigation';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { BackIcon } from 'shared/ui/icons';

interface ReviewImagesHeaderProps {
  navigationData: ImageNavigationData | null;
  lang: Locale;
  className?: string;
}

export function ReviewImagesHeader({ navigationData, lang }: ReviewImagesHeaderProps) {
  const router = useLocalizedRouter();

  const handleBackClick = () => {
    router.back();
  };

  // 네비게이션 데이터가 없으면 기본 헤더 표시
  if (!navigationData) {
    return <div />;
  }

  const headerText = generateHeaderText(navigationData, lang);

  return (
    <div className='flex items-center justify-between px-5 py-4'>
      <button
        onClick={handleBackClick}
        aria-label='뒤로 가기'
        className='flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100'
      >
        <BackIcon />
      </button>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold text-neutral-900'>{headerText}</h1>
      </div>
    </div>
  );
}
